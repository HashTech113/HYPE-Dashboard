"""
Filesystem-backed snapshot store.

Filename convention (written by the capture loop):
    snap_<startISO>_<endISO>_<name>_<snapId>.jpg

Where:
    startISO / endISO = strftime("%Y%m%dT%H%M%SZ")   (UTC)
    name              = sanitized alphanumeric [0..32 chars]
    snapId            = SnapId from the camera (dedup key)

The API layer reads it back so the frontend gets name/entry/exit/image_url
without any grouping work.
"""

from __future__ import annotations

import base64
import binascii
import logging
import os
import re
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any, Optional

from ..config import LOCAL_TZ_OFFSET_MIN, SNAPSHOTS_DIR

log = logging.getLogger(__name__)

FILENAME_TS_FMT = "%Y%m%dT%H%M%SZ"
NAME_SAFE_RE = re.compile(r"[^A-Za-z0-9]+")

# Image field preference: captured-face, body, enrolled-face, background.
IMAGE_FIELDS = ("Image2", "Image3", "Image1", "Image4")

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


@dataclass
class Snapshot:
    filename: str
    name: str
    entry: datetime
    exit: datetime
    image_data: Optional[str] = None


def sanitize_name(name: str) -> str:
    cleaned = NAME_SAFE_RE.sub("_", name.strip()).strip("_")
    return cleaned[:32] or "Unknown"


def _epoch_local_to_utc(value: float) -> datetime:
    """The camera uses a non-standard "local-time seconds since 1970" epoch
    (the number represents IST on the camera's clock). Re-interpret it as
    such and return true UTC by subtracting the local offset.
    """
    as_if_utc = datetime.fromtimestamp(value, tz=timezone.utc)
    return as_if_utc - timedelta(minutes=LOCAL_TZ_OFFSET_MIN)


def _to_utc(value: Any) -> Optional[datetime]:
    if value is None:
        return None
    try:
        if isinstance(value, (int, float)):
            return _epoch_local_to_utc(float(value))
        if isinstance(value, str):
            v = value.strip()
            if v.isdigit():
                return _epoch_local_to_utc(float(v))
            try:
                return datetime.fromisoformat(v.replace("Z", "+00:00")).astimezone(timezone.utc)
            except ValueError:
                local_tz = timezone(timedelta(minutes=LOCAL_TZ_OFFSET_MIN))
                local_dt = datetime.strptime(v, "%Y-%m-%d %H:%M:%S").replace(tzinfo=local_tz)
                return local_dt.astimezone(timezone.utc)
    except (ValueError, OSError, OverflowError):
        return None
    return None


def _decode_image(b64: str) -> Optional[bytes]:
    payload = b64.split(",", 1)[1] if b64.startswith("data:") else b64
    try:
        return base64.b64decode(payload, validate=False)
    except (binascii.Error, ValueError) as e:
        log.warning("Base64 decode failed: %s", e)
        return None


def _parse_compact(ts: str) -> Optional[datetime]:
    try:
        return datetime.strptime(ts, FILENAME_TS_FMT).replace(tzinfo=timezone.utc)
    except ValueError:
        return None


def parse_filename(path: Path) -> Optional[Snapshot]:
    name = path.name
    m = FULL_FILENAME_RE.match(name)
    if m:
        start = _parse_compact(m["start"])
        end = _parse_compact(m["end"]) or start
        if start is None:
            return None
        return Snapshot(
            filename=name,
            name=m["name"].replace("_", " "),
            entry=start,
            exit=end or start,
        )
    m = LEGACY_FILENAME_RE.match(name)
    if m:
        ts = _parse_compact(m["ts"])
        if ts is None:
            return None
        return Snapshot(filename=name, name="Unknown", entry=ts, exit=ts)
    try:
        mtime = datetime.fromtimestamp(path.stat().st_mtime, tz=timezone.utc)
    except OSError:
        return None
    return Snapshot(filename=name, name="Unknown", entry=mtime, exit=mtime)


def scan() -> list[Snapshot]:
    if not SNAPSHOTS_DIR.exists():
        return []
    out: list[Snapshot] = []
    for entry in SNAPSHOTS_DIR.iterdir():
        if not entry.is_file() or entry.suffix.lower() not in {".jpg", ".jpeg", ".png"}:
            continue
        snap = parse_filename(entry)
        if snap is not None:
            out.append(snap)
    out.sort(key=lambda s: s.exit, reverse=True)
    return out


def already_captured(snap_id: str) -> bool:
    return next(SNAPSHOTS_DIR.glob(f"snap_*_{snap_id}.jpg"), None) is not None


def save_face(item: dict) -> Optional[str]:
    """
    Write one FaceInfo record to disk. Returns the filename written, or None
    if the record lacked an id / image or had already been captured.
    """
    snap_id_raw = item.get("SnapId") or item.get("Id") or item.get("GrpId")
    if not snap_id_raw:
        log.debug("Skipping FaceInfo without id: keys=%s", list(item.keys()))
        return None
    snap_id = str(snap_id_raw)

    if already_captured(snap_id):
        return None

    b64 = None
    for field in IMAGE_FIELDS:
        v = item.get(field)
        if isinstance(v, str) and v:
            b64 = v
            break
    if b64 is None:
        log.warning("No image data for SnapId=%s (keys=%s)", snap_id, list(item.keys()))
        return None

    raw = _decode_image(b64)
    if raw is None:
        return None

    start_dt = _to_utc(item.get("StartTime")) or datetime.now(timezone.utc)
    end_dt = _to_utc(item.get("EndTime")) or start_dt
    if end_dt < start_dt:
        end_dt = start_dt

    raw_name = item.get("Name")
    name = sanitize_name(raw_name if isinstance(raw_name, str) else "")

    start_str = start_dt.strftime(FILENAME_TS_FMT)
    end_str = end_dt.strftime(FILENAME_TS_FMT)
    filename = f"snap_{start_str}_{end_str}_{name}_{snap_id}.jpg"
    abs_path = SNAPSHOTS_DIR / filename
    abs_path.write_bytes(raw)

    epoch = end_dt.timestamp()
    try:
        os.utime(abs_path, (epoch, epoch))
    except OSError as e:
        log.debug("utime failed for %s: %s", abs_path, e)

    log.info(
        "Saved snapId=%s name=%s entry=%s exit=%s -> /snapshots/%s",
        snap_id, name, start_dt.isoformat(), end_dt.isoformat(), filename,
    )

    from . import logs as logs_service  # deferred to avoid circular import
    logs_service.record_capture(
        name=name.replace("_", " "),
        timestamp_iso=start_dt.isoformat(),
        image_path=filename,
    )
    return filename
