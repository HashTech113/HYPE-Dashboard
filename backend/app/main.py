"""FastAPI app factory. Routers are registered from app/routers/*."""

from __future__ import annotations

import logging
import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from .config import SNAPSHOTS_DIR
from .db import init_schema
from .routers import attendance, faces, health, ingest, logs
from .services.logs import seed_from_filesystem_if_empty

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")

# Exact-match origins the deployed frontend(s) use. Keep explicit so the
# browser's preflight matches even when no regex does.
DEFAULT_EXACT_ORIGINS = [
    "https://hype.camera2ai.com",
]

# Extra origins can be added at runtime via the ALLOWED_ORIGINS env var
# (comma-separated), so adding a new frontend domain doesn't need a redeploy
# of the code — just a Railway variable update.
EXTRA_ORIGINS = [
    o.strip() for o in os.getenv("ALLOWED_ORIGINS", "").split(",") if o.strip()
]

ALLOWED_ORIGIN_REGEX = (
    r"https?://(localhost|127\.0\.0\.1)(:\d+)?"
    r"|https://.*\.pages\.dev"
    r"|https://.*\.vercel\.app"
    r"|https://.*\.up\.railway\.app"
    r"|https://.*\.workers\.dev"
    r"|https://.*\.camera2ai\.com"
)


@asynccontextmanager
async def lifespan(_app: FastAPI):
    SNAPSHOTS_DIR.mkdir(parents=True, exist_ok=True)
    init_schema()
    seed_from_filesystem_if_empty()
    yield


def create_app() -> FastAPI:
    app = FastAPI(title="Camera Capture API", version="0.6.0", lifespan=lifespan)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=[*DEFAULT_EXACT_ORIGINS, *EXTRA_ORIGINS],
        allow_origin_regex=ALLOWED_ORIGIN_REGEX,
        allow_methods=["GET", "POST", "OPTIONS"],
        allow_headers=["*"],
    )

    app.mount("/snapshots", StaticFiles(directory=str(SNAPSHOTS_DIR)), name="snapshots")

    app.include_router(health.router)
    app.include_router(faces.router)
    app.include_router(attendance.router)
    app.include_router(logs.router)
    app.include_router(ingest.router)

    return app


app = create_app()
