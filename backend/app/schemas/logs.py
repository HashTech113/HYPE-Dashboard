"""Response schemas for /api/attendance and /api/snapshots."""

from __future__ import annotations

from typing import Optional

from pydantic import BaseModel


class SnapshotItem(BaseModel):
    id: int
    name: str
    company: Optional[str] = None
    timestamp: str
    image_url: Optional[str] = None


class SnapshotListResponse(BaseModel):
    items: list[SnapshotItem]


class BreakInterval(BaseModel):
    break_out: str
    break_in: str
    break_out_iso: str
    break_in_iso: str
    duration_seconds: int
    duration: str


class AttendanceSummaryItem(BaseModel):
    id: str
    name: str
    company: Optional[str] = None
    date: str
    entry_time: Optional[str]
    exit_time: Optional[str]
    late_entry_minutes: int
    late_entry_seconds: int
    early_exit_minutes: int
    early_exit_seconds: int
    status: str
    total_hours: str
    total_working_hours: str
    total_break_time: str
    total_break_seconds: int
    break_details: list[BreakInterval] = []
    entry_image_url: Optional[str]
    exit_image_url: Optional[str]
    entry_image_archived: bool = False
    exit_image_archived: bool = False
    missing_checkout: bool = False
    is_active: bool = False
    correction_applied: bool = False
    paid_leave: bool = False
    lop: bool = False
    wfh: bool = False


class AttendanceSummaryResponse(BaseModel):
    items: list[AttendanceSummaryItem]
