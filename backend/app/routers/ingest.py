"""POST /api/ingest — receives captures pushed by capture.py."""

from __future__ import annotations

import hashlib
import logging
from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException

from ..schemas.ingest import IngestRequest, IngestResponse
from ..services import logs as logs_service

log = logging.getLogger(__name__)

router = APIRouter(tags=["ingest"])


def _normalize_timestamp(value: str) -> str:
    try:
        dt = datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError:
        raise HTTPException(status_code=400, detail="timestamp must be ISO8601")
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    return dt.astimezone(timezone.utc).isoformat()


def _synthesize_image_path(snap_id: str | None, image_b64: str, timestamp_iso: str) -> str:
    """image_path is UNIQUE-constrained in the DB, so we need something stable
    per logical capture. Prefer an explicit snap_id from the caller; fall back
    to a content-addressed hash so repeated ingest of the same bytes dedups."""
    if snap_id:
        return f"ingest_{snap_id}.jpg"
    digest = hashlib.sha1(image_b64.encode("ascii", errors="ignore")).hexdigest()[:16]
    return f"ingest_{timestamp_iso.replace(':', '').replace('-', '')}_{digest}.jpg"


@router.post("/api/ingest", response_model=IngestResponse)
def ingest(payload: IngestRequest) -> IngestResponse:
    timestamp_iso = _normalize_timestamp(payload.timestamp)
    image_path = _synthesize_image_path(payload.snap_id, payload.image_base64, timestamp_iso)

    stored = logs_service.record_capture(
        name=payload.name.strip(),
        timestamp_iso=timestamp_iso,
        image_path=image_path,
        image_data=payload.image_base64,
    )
    return IngestResponse(status="ok", stored=stored)
