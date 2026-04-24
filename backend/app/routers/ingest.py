"""POST /api/ingest — receives captures pushed by capture.py."""

from __future__ import annotations

import hashlib
import logging
from datetime import datetime, timezone
from typing import Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from ..schemas.ingest import IngestRequest, IngestResponse
from ..services import logs as logs_service

log = logging.getLogger(__name__)

router = APIRouter(tags=["ingest"])

# Anything older than this is flagged "stale" — tuned to a few multiples of
# the expected capture cadence so brief pauses don't trip the alarm.
INGEST_STALE_THRESHOLD_SECONDS = 120


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


class IngestLastSeenResponse(BaseModel):
    last_seen: Optional[str]
    seconds_ago: Optional[int]
    stale: bool
    threshold_seconds: int


@router.get("/api/ingest/last-seen", response_model=IngestLastSeenResponse)
def ingest_last_seen() -> IngestLastSeenResponse:
    last = logs_service.snapshot_last_timestamp()
    if not last:
        return IngestLastSeenResponse(
            last_seen=None,
            seconds_ago=None,
            stale=True,
            threshold_seconds=INGEST_STALE_THRESHOLD_SECONDS,
        )
    try:
        dt = datetime.fromisoformat(last.replace("Z", "+00:00"))
    except ValueError:
        return IngestLastSeenResponse(
            last_seen=last,
            seconds_ago=None,
            stale=True,
            threshold_seconds=INGEST_STALE_THRESHOLD_SECONDS,
        )
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    seconds_ago = max(0, int((datetime.now(timezone.utc) - dt).total_seconds()))
    return IngestLastSeenResponse(
        last_seen=dt.astimezone(timezone.utc).isoformat(),
        seconds_ago=seconds_ago,
        stale=seconds_ago > INGEST_STALE_THRESHOLD_SECONDS,
        threshold_seconds=INGEST_STALE_THRESHOLD_SECONDS,
    )
