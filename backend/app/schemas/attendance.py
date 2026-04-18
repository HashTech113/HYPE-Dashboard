"""Response models for /api/attendance/*."""

from __future__ import annotations

from typing import Literal, Optional

from pydantic import BaseModel


Status = Literal["Present", "Late", "Early Exit", "Absent"]


class ShiftConfig(BaseModel):
    start: str               # "HH:MM" local
    end: str                 # "HH:MM" local
    late_grace_min: int
    early_exit_grace_min: int
    timezone_offset_minutes: int


class AttendanceRecord(BaseModel):
    name: str
    date: str                              # YYYY-MM-DD (local)
    entry: Optional[str] = None            # "HH:MM:SS" (local)
    exit: Optional[str] = None             # "HH:MM:SS" (local)
    entry_iso: Optional[str] = None        # ISO 8601 with tz offset
    exit_iso: Optional[str] = None
    total_hours: str                       # "Hh Mm" — "—" when absent
    total_minutes: int                     # 0 when absent
    status: Status
    late_minutes: int
    early_exit_minutes: int
    capture_count: int
    entry_image_url: Optional[str] = None
    exit_image_url: Optional[str] = None


class AttendanceDayResponse(BaseModel):
    date: str
    shift: ShiftConfig
    count: int
    items: list[AttendanceRecord]


class AttendanceRangeResponse(BaseModel):
    start: str
    end: str
    shift: ShiftConfig
    count: int
    items: list[AttendanceRecord]
