"""FastAPI app factory. Routers are registered from app/routers/*."""

from __future__ import annotations

import asyncio
import logging
import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import DB_PATH
from .db import init_schema
from .routers import admin, attendance, auth, cameras, corrections, employees, faces, health, ingest, logs
from .services.auth import seed_users_if_empty
from .services.cleanup import prune_old_snapshots, seconds_until_next_local_midnight
from .services.employees import seed_if_empty as seed_employees_if_empty
from .services.logs import snapshot_log_count

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")

# Exact-match origins. Production frontend + the two local Vite ports we
# actually use (5173 is Vite's default, 8080 is what this repo's dev server
# is pinned to).
DEFAULT_EXACT_ORIGINS = [
    "https://hype.camera2ai.com",
    "http://localhost:5173",
    "http://localhost:8080",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:8080",
]

# Extra origins can be added at runtime via the ALLOWED_ORIGINS env var
# (comma-separated), so adding a new frontend domain doesn't need a code
# change — just a Railway variable update + restart.
EXTRA_ORIGINS = [
    o.strip() for o in os.getenv("ALLOWED_ORIGINS", "").split(",") if o.strip()
]

# Regex backstop for preview/PR deployments (Cloudflare Pages, Vercel,
# Railway) and any *.camera2ai.com subdomain. Starlette echoes the matched
# origin back verbatim, so credentials still work.
ALLOWED_ORIGIN_REGEX = (
    r"https://.*\.pages\.dev"
    r"|https://.*\.vercel\.app"
    r"|https://.*\.up\.railway\.app"
    r"|https://.*\.workers\.dev"
    r"|https://.*\.camera2ai\.com"
    r"|http://172\.18\.\d+\.\d+(:\d+)?"
    r"|http://192\.168\.\d+\.\d+(:\d+)?"
    r"|http://10\.\d+\.\d+\.\d+(:\d+)?"
)


log = logging.getLogger(__name__)


async def _retention_loop() -> None:
    """Sleep until the next local midnight, run the snapshot retention
    cleanup, and repeat. Cancellation (on shutdown) is the only exit."""
    while True:
        delay = seconds_until_next_local_midnight()
        try:
            await asyncio.sleep(delay)
        except asyncio.CancelledError:
            return
        try:
            await asyncio.to_thread(prune_old_snapshots)
        except Exception:
            log.exception("scheduled snapshot retention cleanup failed")


@asynccontextmanager
async def lifespan(_app: FastAPI):
    log.info("using database at %s", DB_PATH)
    init_schema()
    seed_employees_if_empty()
    seed_users_if_empty()
    count = snapshot_log_count()
    if count == 0:
        log.warning(
            "snapshot_logs is empty — if this is production, check that the "
            "Railway persistent volume is mounted and DATABASE_PATH points "
            "inside it (current DB path: %s).",
            DB_PATH,
        )
    else:
        log.info("snapshot_logs has %d rows", count)

    try:
        prune_old_snapshots()
    except Exception:
        log.exception("startup snapshot retention cleanup failed")
    retention_task = asyncio.create_task(_retention_loop(), name="snapshot-retention")

    try:
        yield
    finally:
        retention_task.cancel()
        try:
            await retention_task
        except asyncio.CancelledError:
            pass


def create_app() -> FastAPI:
    app = FastAPI(title="Camera Capture API", version="0.7.0", lifespan=lifespan)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=[*DEFAULT_EXACT_ORIGINS, *EXTRA_ORIGINS],
        allow_origin_regex=ALLOWED_ORIGIN_REGEX,
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allow_headers=["Authorization", "Content-Type", "X-API-Key"],
    )

    app.include_router(health.router)
    app.include_router(auth.router)
    app.include_router(faces.router)
    app.include_router(attendance.router)
    app.include_router(logs.router)
    app.include_router(ingest.router)
    app.include_router(employees.router)
    app.include_router(cameras.router)
    app.include_router(corrections.router)
    app.include_router(admin.router)

    return app


app = create_app()
