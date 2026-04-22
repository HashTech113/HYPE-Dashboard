"""Request/response schemas for /api/admin/*."""

from __future__ import annotations

from pydantic import BaseModel, Field


class PruneRequest(BaseModel):
    confirm: str = Field(
        ...,
        description="Must be exactly 'YES_DELETE_LEGACY' to execute. Guards against "
        "accidental invocation.",
    )


class PruneResponse(BaseModel):
    status: str
    snapshot_legacy_deleted: int
    snapshot_duplicates_deleted: int
    attendance_legacy_deleted: int
    attendance_duplicates_deleted: int
