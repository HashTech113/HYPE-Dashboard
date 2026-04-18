"""
Standalone capture loop (API-based, filesystem-only storage).

Uses `/API/AI/processAlarm/Get` (documented in API/doc/API/AI/Snaped_face_or_object/Get.html):
  - POST with empty body `{}`
  - Response `data.FaceInfo[]` contains per-face records with:
      StartTime / EndTime (Unix timestamps, UTC)
      SnapId (unique id)
      Name   (person name; NVR only — falls back to "Unknown")
      Image2 (base64 captured-face JPEG)

Each face becomes:
    snapshots/snap_<startISO>_<endISO>_<name>_<snapId>.jpg

Filename encodes everything the API layer needs to answer the frontend:
  - entry time = startISO
  - exit  time = endISO
  - person name = name segment
  - unique id   = snapId

Run separately from the API:
    python capture.py
"""

from __future__ import annotations

import base64
import binascii
import logging
import os
import re
import signal
import sys
import time
from datetime import datetime, timezone
from typing import Any, Optional

import requests
from requests.auth import HTTPDigestAuth

from app import cleanup
from app.config import (
    CAMERA_BASE_URL,
    CAMERA_PASS,
    CAMERA_USER,
    CAPTURE_INTERVAL_SECONDS,
    CLEANUP_INTERVAL_SECONDS,
    REQUEST_TIMEOUT_SECONDS,
    RETENTION_DAYS,
    SNAPSHOTS_DIR,
)

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")
log = logging.getLogger("capture")

RECONNECT_BACKOFF_SECONDS = 5.0
FILENAME_TS_FMT = "%Y%m%dT%H%M%SZ"

# Image field order: captured-face first, then body, then background — pick the most useful crop.
IMAGE_FIELDS = ("Image2", "Image3", "Image1", "Image4")
NAME_FIELDS = ("Name",)
ID_FIELDS = ("SnapId", "Id", "GrpId")

NAME_SAFE_RE = re.compile(r"[^A-Za-z0-9]+")


def _login() -> requests.Session:
    session = requests.Session()
    resp = session.post(
        f"{CAMERA_BASE_URL}/API/Web/Login",
        json={"data": {}},
        auth=HTTPDigestAuth(CAMERA_USER, CAMERA_PASS),
        timeout=REQUEST_TIMEOUT_SECONDS,
    )
    if resp.status_code != 200:
        raise RuntimeError(f"Login failed: {resp.status_code} {resp.text[:200]}")
    token = resp.headers.get("X-csrftoken")
    if not token:
        raise RuntimeError("Login response missing X-csrftoken header")
    session.headers.update({"X-csrftoken": token, "Content-Type": "application/json"})
    return session


def _fetch_alarms(session: requests.Session) -> list[dict]:
    resp = session.post(
        f"{CAMERA_BASE_URL}/API/AI/processAlarm/Get",
        json={},
        timeout=REQUEST_TIMEOUT_SECONDS,
    )
    if resp.status_code >= 400:
        log.warning(
            "processAlarm/Get %s rejected — response=%s",
            resp.status_code,
            resp.text[:500],
        )
    resp.raise_for_status()
    data = resp.json().get("data", {}) or {}
    faces = data.get("FaceInfo")
    return faces if isinstance(faces, list) else []


def _pick_first(item: dict, keys: tuple[str, ...]) -> Any:
    for k in keys:
        v = item.get(k)
        if v not in (None, "", 0):
            return v
    return None


def _sanitize_name(name: str) -> str:
    cleaned = NAME_SAFE_RE.sub("_", name.strip()).strip("_")
    return (cleaned[:32] or "Unknown")


def _to_utc(value: Any) -> Optional[datetime]:
    if value is None:
        return None
    try:
        if isinstance(value, (int, float)):
            return datetime.fromtimestamp(float(value), tz=timezone.utc)
        if isinstance(value, str):
            v = value.strip()
            if v.isdigit():
                return datetime.fromtimestamp(float(v), tz=timezone.utc)
            try:
                return datetime.fromisoformat(v.replace("Z", "+00:00"))
            except ValueError:
                return datetime.strptime(v, "%Y-%m-%d %H:%M:%S").replace(tzinfo=timezone.utc)
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


def _already_captured(snap_id: str) -> bool:
    return next(SNAPSHOTS_DIR.glob(f"snap_*_{snap_id}.jpg"), None) is not None


def _save_face(item: dict) -> Optional[str]:
    snap_id_raw = _pick_first(item, ID_FIELDS)
    if snap_id_raw is None:
        log.debug("Skipping FaceInfo without id: keys=%s", list(item.keys()))
        return None
    snap_id = str(snap_id_raw)

    if _already_captured(snap_id):
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

    name_raw = _pick_first(item, NAME_FIELDS)
    name = _sanitize_name(name_raw if isinstance(name_raw, str) else "") if name_raw else "Unknown"

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
    return filename


def _maybe_cleanup(last_run_monotonic: float) -> float:
    now = time.monotonic()
    if now - last_run_monotonic < CLEANUP_INTERVAL_SECONDS:
        return last_run_monotonic
    try:
        cleanup.purge_older_than(RETENTION_DAYS)
    except Exception:
        log.exception("Cleanup failed (continuing)")
    return now


def run() -> int:
    stop = {"flag": False}

    def _handle_signal(signum, _frame):
        log.info("Received signal %s — shutting down", signum)
        stop["flag"] = True

    signal.signal(signal.SIGINT, _handle_signal)
    signal.signal(signal.SIGTERM, _handle_signal)

    try:
        cleanup.purge_older_than(RETENTION_DAYS)
    except Exception:
        log.exception("Startup cleanup failed (continuing)")
    last_cleanup = time.monotonic()

    session: Optional[requests.Session] = None

    while not stop["flag"]:
        try:
            if session is None:
                log.info("Logging into camera at %s", CAMERA_BASE_URL)
                session = _login()

            faces = _fetch_alarms(session)
            new_files = 0
            for item in faces:
                if _save_face(item) is not None:
                    new_files += 1
            if faces:
                log.info("Poll returned %d face(s), stored %d new", len(faces), new_files)
            else:
                log.debug("Poll returned no faces")

            last_cleanup = _maybe_cleanup(last_cleanup)
        except requests.HTTPError as e:
            status = e.response.status_code if e.response is not None else "?"
            log.warning("Camera HTTP error %s — re-logging in", status)
            session = None
            time.sleep(RECONNECT_BACKOFF_SECONDS)
            continue
        except requests.RequestException as e:
            log.warning("Camera request failed: %s — retrying", e)
            session = None
            time.sleep(RECONNECT_BACKOFF_SECONDS)
            continue
        except Exception:
            log.exception("Capture iteration failed (continuing)")
            session = None
            time.sleep(RECONNECT_BACKOFF_SECONDS)
            continue

        time.sleep(CAPTURE_INTERVAL_SECONDS)

    log.info("Capture loop exited")
    return 0


if __name__ == "__main__":
    sys.exit(run())
