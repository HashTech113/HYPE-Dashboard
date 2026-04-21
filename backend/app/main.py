"""FastAPI app factory. Routers are registered from app/routers/*."""

from __future__ import annotations

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from .config import SNAPSHOTS_DIR
from .db import init_schema
from .routers import attendance, faces, health, logs

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")


@asynccontextmanager
async def lifespan(_app: FastAPI):
    SNAPSHOTS_DIR.mkdir(parents=True, exist_ok=True)
    init_schema()
    yield


def create_app() -> FastAPI:
    app = FastAPI(title="Camera Capture API", version="0.6.0", lifespan=lifespan)

    app.add_middleware(
        CORSMiddleware,
        allow_origin_regex=r"https?://(localhost|127\.0\.0\.1)(:\d+)?|https://.*\.pages\.dev|https://.*\.vercel\.app|https://.*\.up\.railway\.app|https://.*\.workers\.dev",
        allow_methods=["GET"],
        allow_headers=["*"],
    )

    app.mount("/snapshots", StaticFiles(directory=str(SNAPSHOTS_DIR)), name="snapshots")

    app.include_router(health.router)
    app.include_router(faces.router)
    app.include_router(attendance.router)
    app.include_router(logs.router)

    return app


app = create_app()
