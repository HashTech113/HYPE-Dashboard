"""Liveness + snapshot count."""

from __future__ import annotations

from fastapi import APIRouter

from ..services import snapshots

router = APIRouter(tags=["health"])


@router.get("/api/health")
def health() -> dict:
    return {"status": "ok", "snapshot_count": len(snapshots.scan())}
