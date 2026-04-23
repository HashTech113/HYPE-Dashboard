"""Admin utilities — narrow, explicit operations that don't fit elsewhere.

Currently: one endpoint for renaming a captured face name in place across
snapshot_logs, attendance_logs, and the employees table. Used to correct a
recognition-side misspelling (e.g. "Mariya" → "Maria") without losing the
historical rows tied to the old name.
"""

from __future__ import annotations

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from ..db import connect

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
