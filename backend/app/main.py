"""FastAPI app factory. Routers are registered from app/routers/*."""

from __future__ import annotations

import logging
import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import DB_PATH
from .db import init_schema
from .routers import admin, attendance, employees, faces, health, ingest, logs
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


@asynccontextmanager
async def lifespan(_app: FastAPI):
    log.info("using database at %s", DB_PATH)
    init_schema()
    seed_employees_if_empty()
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
    yield


def create_app() -> FastAPI:
    app = FastAPI(title="Camera Capture API", version="0.7.0", lifespan=lifespan)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=[*DEFAULT_EXACT_ORIGINS, *EXTRA_ORIGINS],
        allow_origin_regex=ALLOWED_ORIGIN_REGEX,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(health.router)
    app.include_router(faces.router)
    app.include_router(attendance.router)
    app.include_router(logs.router)
    app.include_router(ingest.router)
    app.include_router(employees.router)
    app.include_router(admin.router)

    return app


app = create_app()
