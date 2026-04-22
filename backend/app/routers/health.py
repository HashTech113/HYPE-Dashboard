"""Liveness + snapshot count (both sourced from the DB)."""

from __future__ import annotations

from fastapi import APIRouter

from ..services.logs import snapshot_log_count

router = APIRouter(tags=["health"])


@router.get("/api/health")
def health() -> dict:
    return {"status": "ok", "snapshot_count": snapshot_log_count()}
