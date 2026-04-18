"""GET /api/attendance/* — daily and range attendance derived from face captures."""

from __future__ import annotations

from datetime import date as date_cls, datetime, timedelta, timezone
from typing import Optional

from fastapi import APIRouter, HTTPException, Query, Request

from ..config import (
    EARLY_EXIT_GRACE_MIN,
    LATE_GRACE_MIN,
    LOCAL_TZ_OFFSET_MIN,
    SHIFT_END,
    SHIFT_START,
)
from ..schemas.attendance import (
    AttendanceDayResponse,
    AttendanceRangeResponse,
    AttendanceRecord,
    ShiftConfig,
)
from ..services import snapshots
from ..services.attendance import (
    ShiftSettings,
    build_daily_records,
    build_range_records,
    parse_hhmm,
)

router = APIRouter(tags=["attendance"], prefix="/api/attendance")


def _shift_settings(
    start_q: Optional[str],
    end_q: Optional[str],
    late_grace_q: Optional[int],
    early_grace_q: Optional[int],
    tz_q: Optional[int],
) -> ShiftSettings:
    try:
        start_t = parse_hhmm(start_q or SHIFT_START)
        end_t = parse_hhmm(end_q or SHIFT_END)
    except (ValueError, AttributeError):
        raise HTTPException(status_code=400, detail="shift_start/shift_end must be HH:MM")
    if (start_t.hour * 60 + start_t.minute) >= (end_t.hour * 60 + end_t.minute):
        raise HTTPException(status_code=400, detail="shift_start must be before shift_end")
    return ShiftSettings(
        start=start_t,
        end=end_t,
        late_grace_min=late_grace_q if late_grace_q is not None else LATE_GRACE_MIN,
        early_exit_grace_min=early_grace_q if early_grace_q is not None else EARLY_EXIT_GRACE_MIN,
        tz_offset_min=tz_q if tz_q is not None else LOCAL_TZ_OFFSET_MIN,
    )


def _shift_response(shift: ShiftSettings) -> ShiftConfig:
    return ShiftConfig(
        start=shift.start.strftime("%H:%M"),
        end=shift.end.strftime("%H:%M"),
        late_grace_min=shift.late_grace_min,
        early_exit_grace_min=shift.early_exit_grace_min,
        timezone_offset_minutes=shift.tz_offset_min,
    )


def _today_local(tz_offset_min: int) -> date_cls:
    return datetime.now(timezone.utc).astimezone(
        timezone(timedelta(minutes=tz_offset_min))
    ).date()


def _parse_iso_date(value: str, field: str) -> date_cls:
    try:
        return date_cls.fromisoformat(value)
    except ValueError:
        raise HTTPException(status_code=400, detail=f"{field} must be YYYY-MM-DD")


@router.get("/config", response_model=ShiftConfig)
def get_config() -> ShiftConfig:
    """Return the active shift configuration."""
    return _shift_response(_shift_settings(None, None, None, None, None))


@router.get("/daily", response_model=AttendanceDayResponse)
def daily(
    request: Request,
    date: Optional[str] = Query(None, description="YYYY-MM-DD (local). Defaults to today."),
    names: Optional[str] = Query(
        None,
        description="Comma-separated list of expected names; missing names are reported as Absent.",
    ),
    shift_start: Optional[str] = Query(None, description="Override shift start, HH:MM."),
    shift_end: Optional[str] = Query(None, description="Override shift end, HH:MM."),
    late_grace_min: Optional[int] = Query(None, ge=0, le=240),
    early_exit_grace_min: Optional[int] = Query(None, ge=0, le=240),
    tz_offset_minutes: Optional[int] = Query(None, ge=-720, le=840),
) -> AttendanceDayResponse:
    shift = _shift_settings(shift_start, shift_end, late_grace_min, early_exit_grace_min, tz_offset_minutes)
    target = _parse_iso_date(date, "date") if date else _today_local(shift.tz_offset_min)

    expected = [n for n in (names.split(",") if names else []) if n.strip()]
    base_url = str(request.base_url).rstrip("/")

    rows = build_daily_records(
        snapshots.scan(),
        target_date=target,
        shift=shift,
        base_url=base_url,
        expected_names=expected or None,
    )
    items = [AttendanceRecord(**row) for row in rows]
    return AttendanceDayResponse(
        date=target.isoformat(),
        shift=_shift_response(shift),
        count=len(items),
        items=items,
    )


@router.get("/range", response_model=AttendanceRangeResponse)
def range_(
    request: Request,
    start: str = Query(..., description="Range start date, YYYY-MM-DD (local)."),
    end: str = Query(..., description="Range end date, YYYY-MM-DD (local)."),
    name: Optional[str] = Query(None, description="Filter to one person (case-insensitive)."),
    shift_start: Optional[str] = Query(None),
    shift_end: Optional[str] = Query(None),
    late_grace_min: Optional[int] = Query(None, ge=0, le=240),
    early_exit_grace_min: Optional[int] = Query(None, ge=0, le=240),
    tz_offset_minutes: Optional[int] = Query(None, ge=-720, le=840),
) -> AttendanceRangeResponse:
    shift = _shift_settings(shift_start, shift_end, late_grace_min, early_exit_grace_min, tz_offset_minutes)
    start_d = _parse_iso_date(start, "start")
    end_d = _parse_iso_date(end, "end")
    if start_d > end_d:
        raise HTTPException(status_code=400, detail="start must be on or before end")
    if (end_d - start_d).days > 366:
        raise HTTPException(status_code=400, detail="range cannot exceed 366 days")

    base_url = str(request.base_url).rstrip("/")
    rows = build_range_records(
        snapshots.scan(),
        start_date=start_d,
        end_date=end_d,
        shift=shift,
        base_url=base_url,
        name_filter=name,
    )
    items = [AttendanceRecord(**row) for row in rows]
    return AttendanceRangeResponse(
        start=start_d.isoformat(),
        end=end_d.isoformat(),
        shift=_shift_response(shift),
        count=len(items),
        items=items,
    )
