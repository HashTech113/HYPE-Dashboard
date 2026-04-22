"""POST /api/admin/prune-legacy-captures — one-shot cleanup to make prod match
the data the sync pipeline has pushed.

The capture.py loop and direct camera ingestion write rows with image_path like
``snap_<ts>_<ts>_<name>_<id>.jpg``. The /api/ingest endpoint synthesizes paths
as ``ingest_<snap_id>.jpg``. When a server has received BOTH streams for the
same underlying capture, it holds two rows — same (name, timestamp) but
different image_paths. This endpoint removes the legacy copies, then dedups
any remaining (name, timestamp) collisions by keeping MIN(id).

Guarded by the ADMIN_TOKEN environment variable; if unset, the endpoint is
always disabled. Send the token in an ``X-Admin-Token`` header.
"""

from __future__ import annotations

import logging
import os
from typing import Optional

from fastapi import APIRouter, Header, HTTPException

from ..db import connect
from ..schemas.admin import PruneRequest, PruneResponse

CONFIRM_PHRASE = "YES_DELETE_LEGACY"

log = logging.getLogger(__name__)

router = APIRouter(tags=["admin"])


def _token_env() -> Optional[str]:
    value = os.getenv("ADMIN_TOKEN", "").strip()
    return value or None


def _require_token(header_value: Optional[str]) -> None:
    expected = _token_env()
    if expected is None:
        raise HTTPException(status_code=503, detail="admin endpoints disabled (ADMIN_TOKEN unset)")
    if not header_value or header_value != expected:
        raise HTTPException(status_code=403, detail="invalid admin token")


def _prune_table(conn, table: str) -> tuple[int, int]:
    legacy_cur = conn.execute(
        f"DELETE FROM {table} WHERE image_path NOT LIKE 'ingest\\_%' ESCAPE '\\'"
    )
    legacy = legacy_cur.rowcount

    dup_cur = conn.execute(
        f"DELETE FROM {table} WHERE id NOT IN "
        f"(SELECT MIN(id) FROM {table} GROUP BY name, timestamp)"
    )
    dups = dup_cur.rowcount

    return legacy, dups


@router.post("/api/admin/prune-legacy-captures", response_model=PruneResponse)
def prune_legacy_captures(
    payload: PruneRequest,
    x_admin_token: Optional[str] = Header(None, alias="X-Admin-Token"),
) -> PruneResponse:
    _require_token(x_admin_token)
    if payload.confirm != CONFIRM_PHRASE:
        raise HTTPException(
            status_code=400,
            detail=f"confirm must equal {CONFIRM_PHRASE!r}",
        )
    with connect() as conn:
        snap_legacy, snap_dups = _prune_table(conn, "snapshot_logs")
        att_legacy, att_dups = _prune_table(conn, "attendance_logs")
    log.info(
        "prune: snapshot_logs legacy=%d dups=%d | attendance_logs legacy=%d dups=%d",
        snap_legacy, snap_dups, att_legacy, att_dups,
    )
    return PruneResponse(
        status="ok",
        snapshot_legacy_deleted=snap_legacy,
        snapshot_duplicates_deleted=snap_dups,
        attendance_legacy_deleted=att_legacy,
        attendance_duplicates_deleted=att_dups,
    )
