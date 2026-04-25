"""Admin utilities — narrow, explicit operations that don't fit elsewhere.

- ``/api/admin/rename-name`` — rename a captured face across snapshot_logs,
  attendance_logs, and the employees table in one go.
- ``/api/admin/backfill-from-camera`` — scan the camera's SnapedFaces history
  for a time window and re-ingest anything missing from snapshot_logs. Used
  to recover from capture.py / network outages.
- ``/api/admin/prune-snapshots`` — manually trigger the snapshot retention
  cleanup (also runs on startup and at local midnight).
"""

from __future__ import annotations

import logging
from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from ..db import connect

log = logging.getLogger(__name__)

router = APIRouter(tags=["admin"])


class RenameNameRequest(BaseModel):
    old_name: str = Field(..., min_length=1)
    new_name: str = Field(..., min_length=1)


class RenameNameResponse(BaseModel):
    old_name: str
    new_name: str
    snapshot_logs_updated: int
    attendance_logs_updated: int
    employees_updated: int


@router.post("/api/admin/rename-name", response_model=RenameNameResponse)
def rename_name(payload: RenameNameRequest) -> RenameNameResponse:
    old = payload.old_name.strip()
    new = payload.new_name.strip()
    if not old or not new:
        raise HTTPException(status_code=400, detail="old_name and new_name must be non-empty")
    if old == new:
        return RenameNameResponse(
            old_name=old,
            new_name=new,
            snapshot_logs_updated=0,
            attendance_logs_updated=0,
            employees_updated=0,
        )

    with connect() as conn:
        snap = conn.execute(
            "UPDATE snapshot_logs SET name = ? WHERE name = ?", (new, old)
        ).rowcount
        att = conn.execute(
            "UPDATE attendance_logs SET name = ? WHERE name = ?", (new, old)
        ).rowcount
        emp = conn.execute(
            "UPDATE employees SET name = ? WHERE name = ?", (new, old)
        ).rowcount

    return RenameNameResponse(
        old_name=old,
        new_name=new,
        snapshot_logs_updated=snap,
        attendance_logs_updated=att,
        employees_updated=emp,
    )


class BackfillFromCameraRequest(BaseModel):
    start: str = Field(..., description="ISO8601 timestamp, UTC preferred")
    end: str = Field(..., description="ISO8601 timestamp, UTC preferred")
    dry_run: bool = Field(False, description="If true, count what would be added without writing")


def _parse_iso_utc(value: str, field: str) -> datetime:
    try:
        dt = datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError:
        raise HTTPException(status_code=400, detail=f"{field} must be ISO8601")
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    return dt.astimezone(timezone.utc)


@router.post("/api/admin/prune-snapshots")
def prune_snapshots() -> dict:
    from ..services.cleanup import prune_old_snapshots

    try:
        cleared = prune_old_snapshots()
    except Exception as exc:
        log.exception("manual snapshot prune failed")
        raise HTTPException(status_code=500, detail=f"prune failed: {exc}")
    return {"status": "ok", "cleared": cleared}


@router.post("/api/admin/backfill-from-camera")
def backfill_from_camera(payload: BackfillFromCameraRequest) -> dict:
    # Imported lazily so a Railway deploy (with no camera reachability) can
    # still boot the API even if camera config is missing.
    from ..services.camera import CameraClient
    from ..services import camera_backfill

    start_utc = _parse_iso_utc(payload.start, "start")
    end_utc = _parse_iso_utc(payload.end, "end")
    if start_utc >= end_utc:
        raise HTTPException(status_code=400, detail="start must be before end")

    try:
        camera = CameraClient()
        result = camera_backfill.backfill_window(
            camera, start_utc, end_utc, dry_run=payload.dry_run
        )
    except Exception as exc:
        log.exception("backfill-from-camera failed")
        raise HTTPException(status_code=502, detail=f"camera backfill failed: {exc}")
    return result
