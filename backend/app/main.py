from __future__ import annotations

import logging
import re
from contextlib import asynccontextmanager
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

from fastapi import FastAPI, HTTPException, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from .config import (
    DEFAULT_HISTORY_START,
    DEFAULT_PAGE_LIMIT,
    MAX_PAGE_LIMIT,
    SNAPSHOTS_DIR,
)

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")
log = logging.getLogger(__name__)

# capture.py writes: snap_<startISO>_<endISO>_<name>_<snapId>.jpg
# Fallback: older captures were snap_<ts>_<uuid>.jpg (entry == exit, name unknown).
FULL_FILENAME_RE = re.compile(
    r"^snap_"
    r"(?P<start>\d{8}T\d{6}Z)_"
    r"(?P<end>\d{8}T\d{6}Z)_"
    r"(?P<name>[A-Za-z0-9_]+)_"
    r"(?P<id>[A-Za-z0-9_-]+)\.(?:jpg|jpeg|png)$"
)
LEGACY_FILENAME_RE = re.compile(
    r"^snap_(?P<ts>\d{8}T\d{6}Z)_(?P<id>.+)\.(?:jpg|jpeg|png)$"
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    SNAPSHOTS_DIR.mkdir(parents=True, exist_ok=True)
    yield


app = FastAPI(title="Camera Capture API", version="0.5.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:8080",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:8080",
    ],
    allow_methods=["GET"],
    allow_headers=["*"],
)

app.mount("/snapshots", StaticFiles(directory=str(SNAPSHOTS_DIR)), name="snapshots")


class FaceHistoryItem(BaseModel):
    id: str
    name: str
    entry: str
    exit: str
    image_url: str


class FaceHistoryResponse(BaseModel):
    count: int
    total: int
    limit: int
    offset: int
    items: list[FaceHistoryItem]


@dataclass
class Snapshot:
    filename: str
    name: str
    entry: datetime
    exit: datetime


def _parse_compact(ts: str) -> Optional[datetime]:
    try:
        return datetime.strptime(ts, "%Y%m%dT%H%M%SZ").replace(tzinfo=timezone.utc)
    except ValueError:
        return None


def _parse_filename(path: Path) -> Optional[Snapshot]:
    name = path.name
    m = FULL_FILENAME_RE.match(name)
    if m:
        start = _parse_compact(m["start"])
        end = _parse_compact(m["end"]) or start
        if start is None:
            return None
        return Snapshot(filename=name, name=m["name"].replace("_", " "), entry=start, exit=end or start)
    m = LEGACY_FILENAME_RE.match(name)
    if m:
        ts = _parse_compact(m["ts"])
        if ts is None:
            return None
        return Snapshot(filename=name, name="Unknown", entry=ts, exit=ts)
    # Last-resort: fall back to mtime so unknown files still show up.
    try:
        mtime = datetime.fromtimestamp(path.stat().st_mtime, tz=timezone.utc)
    except OSError:
        return None
    return Snapshot(filename=name, name="Unknown", entry=mtime, exit=mtime)


def _scan_snapshots() -> list[Snapshot]:
    if not SNAPSHOTS_DIR.exists():
        return []
    out: list[Snapshot] = []
    for entry in SNAPSHOTS_DIR.iterdir():
        if not entry.is_file() or entry.suffix.lower() not in {".jpg", ".jpeg", ".png"}:
            continue
        snap = _parse_filename(entry)
        if snap is not None:
            out.append(snap)
    out.sort(key=lambda s: s.exit, reverse=True)
    return out


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


@app.get("/api/health")
def health() -> dict:
    return {"status": "ok", "snapshot_count": len(_scan_snapshots())}


@app.get("/api/faces/history", response_model=FaceHistoryResponse)
def face_history(
    request: Request,
    start: str = Query(DEFAULT_HISTORY_START),
    end: str = Query("now"),
    limit: int = Query(DEFAULT_PAGE_LIMIT, ge=1, le=MAX_PAGE_LIMIT),
    offset: int = Query(0, ge=0),
    latest: Optional[int] = Query(None, ge=1, le=MAX_PAGE_LIMIT),
) -> FaceHistoryResponse:
    snapshots = _scan_snapshots()

    if latest is not None:
        filtered = snapshots
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
        filtered = [s for s in snapshots if start_dt <= s.exit <= end_dt]
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
