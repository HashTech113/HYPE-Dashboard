"""GET /api/attendance (per-day summaries) and GET /api/snapshots (per-event)."""

from __future__ import annotations

from datetime import date as date_cls, datetime, timedelta, timezone
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query

from ..config import (
    EARLY_EXIT_GRACE_MIN,
    LATE_GRACE_MIN,
    LOCAL_TZ_OFFSET_MIN,
    SHIFT_END,
    SHIFT_START,
)
from ..dependencies import require_admin_or_hr
from ..schemas.logs import (
    AttendanceSummaryItem,
    AttendanceSummaryResponse,
    SnapshotItem,
    SnapshotListResponse,
)
from ..services import employees as employees_service, logs
from ..services.attendance import ShiftSettings, parse_hhmm

router = APIRouter(tags=["logs"], dependencies=[Depends(require_admin_or_hr)])

DEFAULT_SUMMARY_DAYS = 90


def _default_shift() -> ShiftSettings:
    return ShiftSettings(
        start=parse_hhmm(SHIFT_START),
        end=parse_hhmm(SHIFT_END),
        late_grace_min=LATE_GRACE_MIN,
        early_exit_grace_min=EARLY_EXIT_GRACE_MIN,
        tz_offset_min=LOCAL_TZ_OFFSET_MIN,
    )


def _today_local(tz_offset_min: int) -> date_cls:
    return datetime.now(timezone.utc).astimezone(
        timezone(timedelta(minutes=tz_offset_min))
    ).date()


def _parse_date(value: str, field: str) -> date_cls:
    try:
        return date_cls.fromisoformat(value)
    except ValueError:
        raise HTTPException(status_code=400, detail=f"{field} must be YYYY-MM-DD")


def _to_snapshot_item(row: dict, directory: list) -> SnapshotItem:
    data = row.get("image_data")
    return SnapshotItem(
        id=row["id"],
        name=row["name"],
        company=employees_service.company_for(row["name"], employees=directory),
        timestamp=row["timestamp"],
        image_url=f"data:image/jpeg;base64,{data}" if data else None,
    )


def _to_summary_item(row: dict, directory: list) -> AttendanceSummaryItem:
    total_hours = row.get("total_hours", "—")
    return AttendanceSummaryItem(
        id=f"{row['name']}|{row['date']}",
        name=row["name"],
        company=employees_service.company_for(row["name"], employees=directory),
        date=row["date"],
        entry_time=row.get("entry"),
        exit_time=row.get("exit"),
        late_entry_minutes=int(row.get("late_minutes") or 0),
        late_entry_seconds=int(row.get("late_seconds") or 0),
        early_exit_minutes=int(row.get("early_exit_minutes") or 0),
        early_exit_seconds=int(row.get("early_exit_seconds") or 0),
        status=row.get("status", "Absent"),
        total_hours=total_hours,
        total_working_hours=row.get("total_working_hours", total_hours),
        total_break_time=row.get("total_break_time", "—"),
        total_break_seconds=int(row.get("total_break_seconds") or 0),
        break_details=row.get("break_details") or [],
        entry_image_url=row.get("entry_image_url"),
        exit_image_url=row.get("exit_image_url"),
        entry_image_archived=bool(row.get("entry_image_archived")),
        exit_image_archived=bool(row.get("exit_image_archived")),
        missing_checkout=bool(row.get("missing_checkout")),
        is_active=bool(row.get("is_active")),
        correction_applied=bool(row.get("correction_applied")),
        paid_leave=bool(row.get("paid_leave")),
        lop=bool(row.get("lop")),
        wfh=bool(row.get("wfh")),
    )


@router.get("/api/attendance", response_model=AttendanceSummaryResponse)
def list_attendance(
    start: Optional[str] = Query(None, description="Start date YYYY-MM-DD (local)."),
    end: Optional[str] = Query(None, description="End date YYYY-MM-DD (local)."),
    name: Optional[str] = Query(None, description="Prefix filter, case-insensitive."),
    limit: Optional[int] = Query(None, ge=1, description="Omit for all rows."),
    offset: int = Query(0, ge=0),
) -> AttendanceSummaryResponse:
    shift = _default_shift()
    end_date = _parse_date(end, "end") if end else _today_local(shift.tz_offset_min)
    start_date = (
        _parse_date(start, "start") if start else end_date - timedelta(days=DEFAULT_SUMMARY_DAYS - 1)
    )
    if start_date > end_date:
        raise HTTPException(status_code=400, detail="start must be on or before end")

    rows = logs.build_attendance_summaries(
        start_date=start_date,
        end_date=end_date,
        shift=shift,
        base_url="",
        name_filter=name,
    )
    window = rows[offset:] if limit is None else rows[offset : offset + limit]
    directory = employees_service.all_employees()
    return AttendanceSummaryResponse(items=[_to_summary_item(r, directory) for r in window])


@router.get("/api/snapshots", response_model=SnapshotListResponse)
def list_snapshots(
    limit: Optional[int] = Query(None, ge=1, description="Omit for all rows."),
    offset: int = Query(0, ge=0),
    name: Optional[str] = Query(None, description="Prefix filter, case-insensitive."),
) -> SnapshotListResponse:
    rows = logs.fetch_snapshot_logs(limit=limit, offset=offset, name=name)
    directory = employees_service.all_employees()
    return SnapshotListResponse(items=[_to_snapshot_item(r, directory) for r in rows])
