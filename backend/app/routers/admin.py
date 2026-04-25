"""Admin utilities — narrow, explicit operations that don't fit elsewhere.

- ``/api/admin/rename-name`` — rename a captured face across snapshot_logs,
  attendance_logs, and the employees table in one go.
- ``/api/admin/backfill-from-camera`` — scan the camera's SnapedFaces history
  for a time window and re-ingest anything missing from snapshot_logs. Used
  to recover from capture.py / network outages.
- ``/api/admin/prune-snapshots`` — manually trigger the snapshot retention
  cleanup (also runs on startup and at local midnight).
- ``/api/admin/correct-attendance`` — override the auto-computed entry/exit/
  break values for one (employee, local date) when the captures are wrong.
"""

from __future__ import annotations

import logging
from datetime import date as date_cls, datetime, timezone
from typing import Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from ..db import connect
from ..services import corrections as corrections_service

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
    attendance_corrections_updated: int


@router.post("/api/admin/rename-name", response_model=RenameNameResponse)
def rename_name(payload: RenameNameRequest) -> RenameNameResponse:
    """Rename an employee everywhere it appears. Atomic: every table commits
    together or none does. Match is exact (no partial / similar-name
    collisions); attendance and snapshot rows are NEVER deleted, only the
    `name` column is updated."""
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
            attendance_corrections_updated=0,
        )

    with connect() as conn:
        try:
            conn.execute("BEGIN")
            snap = conn.execute(
                "UPDATE snapshot_logs SET name = ? WHERE name = ?", (new, old)
            ).rowcount
            att = conn.execute(
                "UPDATE attendance_logs SET name = ? WHERE name = ?", (new, old)
            ).rowcount
            emp = conn.execute(
                "UPDATE employees SET name = ? WHERE name = ?", (new, old)
            ).rowcount
            corr = conn.execute(
                "UPDATE attendance_corrections SET name = ? WHERE name = ?", (new, old)
            ).rowcount
            conn.execute("COMMIT")
        except Exception:
            conn.execute("ROLLBACK")
            log.exception("rename-name failed for %r -> %r; rolled back", old, new)
            raise HTTPException(status_code=500, detail="rename failed; no changes committed")

    log.info(
        "rename-name %r -> %r: snapshot_logs=%d attendance_logs=%d employees=%d "
        "attendance_corrections=%d",
        old, new, snap, att, emp, corr,
    )
    return RenameNameResponse(
        old_name=old,
        new_name=new,
        snapshot_logs_updated=snap,
        attendance_logs_updated=att,
        employees_updated=emp,
        attendance_corrections_updated=corr,
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


class CorrectAttendanceRequest(BaseModel):
    name: str = Field(..., min_length=1)
    date: str = Field(..., description="YYYY-MM-DD (local) for the day being corrected")
    entry_iso: Optional[str] = Field(None, description="ISO8601 entry time override")
    exit_iso: Optional[str] = Field(None, description="ISO8601 exit time override")
    total_break_seconds: Optional[int] = Field(
        None, ge=0, description="Override total break time in seconds"
    )
    missing_checkout_resolved: bool = Field(
        False, description="Mark a missing-checkout day as resolved"
    )
    note: Optional[str] = Field(None, description="Optional admin note")


class CorrectAttendanceResponse(BaseModel):
    name: str
    date: str
    entry_iso: Optional[str]
    exit_iso: Optional[str]
    total_break_seconds: Optional[int]
    missing_checkout_resolved: bool
    note: Optional[str]
    updated_at: str


def _validate_iso(value: Optional[str], field: str) -> Optional[str]:
    if value is None:
        return None
    try:
        dt = datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError:
        raise HTTPException(status_code=400, detail=f"{field} must be ISO8601")
    return dt.isoformat()


@router.post("/api/admin/correct-attendance", response_model=CorrectAttendanceResponse)
def correct_attendance(payload: CorrectAttendanceRequest) -> CorrectAttendanceResponse:
    try:
        date_cls.fromisoformat(payload.date)
    except ValueError:
        raise HTTPException(status_code=400, detail="date must be YYYY-MM-DD")

    entry_iso = _validate_iso(payload.entry_iso, "entry_iso")
    exit_iso = _validate_iso(payload.exit_iso, "exit_iso")

    if (
        entry_iso is None
        and exit_iso is None
        and payload.total_break_seconds is None
        and not payload.missing_checkout_resolved
        and not payload.note
    ):
        raise HTTPException(
            status_code=400,
            detail="provide at least one of entry_iso, exit_iso, total_break_seconds, "
            "missing_checkout_resolved, note",
        )

    row = corrections_service.upsert_correction(
        name=payload.name,
        date=payload.date,
        entry_iso=entry_iso,
        exit_iso=exit_iso,
        total_break_seconds=payload.total_break_seconds,
        missing_checkout_resolved=payload.missing_checkout_resolved,
        note=payload.note,
    )
    return CorrectAttendanceResponse(
        name=row["name"],
        date=row["date"],
        entry_iso=row.get("entry_iso"),
        exit_iso=row.get("exit_iso"),
        total_break_seconds=row.get("total_break_seconds"),
        missing_checkout_resolved=bool(row.get("missing_checkout_resolved")),
        note=row.get("note"),
        updated_at=row["updated_at"],
    )


@router.delete("/api/admin/correct-attendance")
def delete_attendance_correction(name: str, date: str) -> dict:
    try:
        date_cls.fromisoformat(date)
    except ValueError:
        raise HTTPException(status_code=400, detail="date must be YYYY-MM-DD")
    deleted = corrections_service.delete_correction(name=name, date=date)
    return {"status": "ok", "deleted": deleted}
