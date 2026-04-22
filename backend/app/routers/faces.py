"""GET /api/faces/history — paginated face-capture history (DB-backed)."""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Optional

from fastapi import APIRouter, HTTPException, Query

from ..config import DEFAULT_HISTORY_START, DEFAULT_PAGE_LIMIT, MAX_PAGE_LIMIT
from ..db import connect
from ..schemas.faces import FaceHistoryItem, FaceHistoryResponse

router = APIRouter(tags=["faces"])


def _parse_boundary(value: str, field: str, *, end: bool) -> datetime:
    raw = value.strip()
    try:
        if raw.lower() == "now":
            return datetime.now(timezone.utc)
        if len(raw) == 10:
            dt = datetime.fromisoformat(raw).replace(tzinfo=timezone.utc)
            if end:
                dt = dt.replace(hour=23, minute=59, second=59)
            return dt
        dt = datetime.fromisoformat(raw.replace("Z", "+00:00"))
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        return dt
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid '{field}' value: {value!r}. Expected 'now', 'YYYY-MM-DD', or ISO-8601.",
        )


def _build_image_url(row: dict) -> Optional[str]:
    data = row.get("image_data")
    return f"data:image/jpeg;base64,{data}" if data else None


@router.get("/api/faces/history", response_model=FaceHistoryResponse)
def face_history(
    start: str = Query(DEFAULT_HISTORY_START),
    end: str = Query("now"),
    limit: int = Query(DEFAULT_PAGE_LIMIT, ge=1, le=MAX_PAGE_LIMIT),
    offset: int = Query(0, ge=0),
    latest: Optional[int] = Query(None, ge=1, le=MAX_PAGE_LIMIT),
) -> FaceHistoryResponse:
    if latest is not None:
        effective_limit = latest
        effective_offset = 0
        where_sql = ""
        where_args: list = []
    else:
        start_dt = _parse_boundary(start, "start", end=False)
        end_dt = _parse_boundary(end, "end", end=True)
        if start_dt > end_dt:
            raise HTTPException(
                status_code=400,
                detail=f"'start' ({start}) must be on or before 'end' ({end}).",
            )
        effective_limit = limit
        effective_offset = offset
        where_sql = " WHERE timestamp >= ? AND timestamp <= ?"
        where_args = [start_dt.isoformat(), end_dt.isoformat()]

    with connect() as conn:
        total = conn.execute(
            f"SELECT COUNT(*) AS c FROM snapshot_logs{where_sql}", where_args
        ).fetchone()["c"]
        rows = [
            dict(r)
            for r in conn.execute(
                "SELECT id, name, timestamp, image_path, image_data FROM snapshot_logs"
                f"{where_sql} ORDER BY timestamp DESC, id DESC LIMIT ? OFFSET ?",
                [*where_args, effective_limit, effective_offset],
            ).fetchall()
        ]

    items = [
        FaceHistoryItem(
            id=row["image_path"],
            name=row["name"],
            entry=row["timestamp"],
            exit=row["timestamp"],
            image_url=_build_image_url(row),
        )
        for row in rows
    ]
    return FaceHistoryResponse(
        count=len(items),
        total=total,
        limit=effective_limit,
        offset=effective_offset,
        items=items,
    )
