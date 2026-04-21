"""Response schemas for /api/attendance and /api/snapshots."""

from __future__ import annotations

from typing import Optional

from pydantic import BaseModel


class SnapshotItem(BaseModel):
    id: int
    name: str
    timestamp: str
    image_url: str


class SnapshotListResponse(BaseModel):
    items: list[SnapshotItem]


class AttendanceSummaryItem(BaseModel):
    id: str
    name: str
    date: str
    entry_time: Optional[str]
    exit_time: Optional[str]
    late_entry_minutes: int
    late_entry_seconds: int
    early_exit_minutes: int
    early_exit_seconds: int
    status: str
    total_hours: str
    entry_image_url: Optional[str]
    exit_image_url: Optional[str]


class AttendanceSummaryResponse(BaseModel):
    items: list[AttendanceSummaryItem]
