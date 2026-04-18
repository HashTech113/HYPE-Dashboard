"""GET /api/faces/history — paginated face-capture history."""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Optional

from fastapi import APIRouter, HTTPException, Query, Request

from ..config import DEFAULT_HISTORY_START, DEFAULT_PAGE_LIMIT, MAX_PAGE_LIMIT
from ..schemas.faces import FaceHistoryItem, FaceHistoryResponse
from ..services import snapshots

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


def _image_url(request: Request, filename: str) -> str:
    base = str(request.base_url).rstrip("/")
    return f"{base}/snapshots/{filename}"


@router.get("/api/faces/history", response_model=FaceHistoryResponse)
def face_history(
    request: Request,
    start: str = Query(DEFAULT_HISTORY_START),
    end: str = Query("now"),
    limit: int = Query(DEFAULT_PAGE_LIMIT, ge=1, le=MAX_PAGE_LIMIT),
    offset: int = Query(0, ge=0),
    latest: Optional[int] = Query(None, ge=1, le=MAX_PAGE_LIMIT),
) -> FaceHistoryResponse:
    all_snapshots = snapshots.scan()

    if latest is not None:
        filtered = all_snapshots
        effective_limit = latest
        effective_offset = 0
    else:
        start_dt = _parse_boundary(start, "start", end=False)
        end_dt = _parse_boundary(end, "end", end=True)
        if start_dt > end_dt:
            raise HTTPException(
                status_code=400,
                detail=f"'start' ({start}) must be on or before 'end' ({end}).",
            )
        filtered = [s for s in all_snapshots if start_dt <= s.exit <= end_dt]
        effective_limit = limit
        effective_offset = offset

    total = len(filtered)
    window = filtered[effective_offset : effective_offset + effective_limit]

    items = [
        FaceHistoryItem(
            id=s.filename,
            name=s.name,
            entry=s.entry.isoformat(),
            exit=s.exit.isoformat(),
            image_url=_image_url(request, s.filename),
        )
        for s in window
    ]
    return FaceHistoryResponse(
        count=len(items),
        total=total,
        limit=effective_limit,
        offset=effective_offset,
        items=items,
    )
