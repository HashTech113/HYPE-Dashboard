"""Camera → ingest pipeline (dual-write capable).

Runs on the machine that has LAN access to the camera. Pulls FaceInfo records
from the camera API, extracts the captured face image, and POSTs each one to
one or more backends' /api/ingest endpoints (local, Railway, or both).

Environment variables
---------------------
MODE               "local" | "production" | "both"  (default: local)
                   - local       → http://localhost:8000/api/ingest
                   - production  → https://hype-dashboard-production-8938.up.railway.app/api/ingest
                   - both        → posts to both of the above
INGEST_API_URL     Optional override: comma-separated list of ingest URLs.
                   Takes precedence over MODE when set.

CAMERA_HOST/USER/PASS — passed through to app.services.camera

The loop never crashes on a single failure: camera errors reconnect, ingest
errors retry per-target on the next tick. A snap_id is considered processed
once *any* target accepts it — rerun sync_snapshots_to_prod.py later if a
specific target was down to catch it up.
"""

from __future__ import annotations

import logging
import os
import signal
import sys
import time
from collections import deque
from datetime import datetime, timezone
from typing import Optional

import requests

from app.config import CAPTURE_INTERVAL_SECONDS
from app.services import snapshots
from app.services.camera import CameraClient

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")
log = logging.getLogger("capture")

RECONNECT_BACKOFF_SECONDS = 5.0
INGEST_TIMEOUT_SECONDS = 30.0
INGEST_RETRY_BACKOFF = 2.0
INGEST_RETRY_MAX = 3
SEEN_SNAP_IDS_MAX = 2000

MODE = os.getenv("MODE", "local").strip().lower()

DEFAULT_INGEST_URLS: dict[str, list[str]] = {
    "local": ["http://localhost:8000/api/ingest"],
    "production": ["https://hype-dashboard-production-8938.up.railway.app/api/ingest"],
    "both": [
        "http://localhost:8000/api/ingest",
        "https://hype-dashboard-production-8938.up.railway.app/api/ingest",
    ],
}

_urls_env = os.getenv("INGEST_API_URL", "").strip()
if _urls_env:
    INGEST_API_URLS = [u.strip() for u in _urls_env.split(",") if u.strip()]
else:
    INGEST_API_URLS = DEFAULT_INGEST_URLS.get(MODE, DEFAULT_INGEST_URLS["local"])


def _extract_image_b64(item: dict) -> Optional[str]:
    for field in snapshots.IMAGE_FIELDS:
        v = item.get(field)
        if isinstance(v, str) and v:
            return v
    return None


def _extract_timestamp(item: dict) -> datetime:
    for field in ("StartTime", "EndTime"):
        ts = snapshots._to_utc(item.get(field))
        if ts is not None:
            return ts
    return datetime.now(timezone.utc)


def _extract_name(item: dict) -> str:
    raw = item.get("Name")
    if not isinstance(raw, str) or not raw.strip():
        return "Unknown"
    return snapshots.sanitize_name(raw).replace("_", " ")


def _extract_snap_id(item: dict) -> Optional[str]:
    for field in ("SnapId", "Id", "GrpId"):
        v = item.get(field)
        if v is not None and str(v):
            return str(v)
    return None


def _post_one(session: requests.Session, url: str, payload: dict) -> bool:
    """POST to a single target with bounded retry. Never raises."""
    for attempt in range(1, INGEST_RETRY_MAX + 1):
        try:
            resp = session.post(url, json=payload, timeout=INGEST_TIMEOUT_SECONDS)
            if resp.status_code == 200:
                return True
            log.warning(
                "%s returned %d (attempt %d/%d) body=%s",
                url, resp.status_code, attempt, INGEST_RETRY_MAX, resp.text[:200],
            )
        except requests.RequestException as e:
            log.warning("%s post failed (attempt %d/%d): %s", url, attempt, INGEST_RETRY_MAX, e)
        if attempt < INGEST_RETRY_MAX:
            time.sleep(INGEST_RETRY_BACKOFF * attempt)
    return False


def post_ingest(session: requests.Session, payload: dict) -> tuple[int, int]:
    """POST payload to every configured target. Returns (ok_count, fail_count)."""
    ok = fail = 0
    for url in INGEST_API_URLS:
        if _post_one(session, url, payload):
            ok += 1
        else:
            fail += 1
    return ok, fail


def run() -> int:
    stop = {"flag": False}

    def _handle_signal(signum, _frame):
        log.info("Received signal %s — shutting down", signum)
        stop["flag"] = True

    signal.signal(signal.SIGINT, _handle_signal)
    signal.signal(signal.SIGTERM, _handle_signal)

    log.info("MODE=%s targets=%s", MODE, INGEST_API_URLS)

    camera = CameraClient()
    session = requests.Session()
    seen_ids: deque[str] = deque(maxlen=SEEN_SNAP_IDS_MAX)
    seen_set: set[str] = set()

    while not stop["flag"]:
        try:
            faces = camera.fetch_alarms()
        except requests.HTTPError as e:
            status = e.response.status_code if e.response is not None else "?"
            log.warning("Camera HTTP error %s — re-logging in", status)
            camera.invalidate()
            time.sleep(RECONNECT_BACKOFF_SECONDS)
            continue
        except requests.RequestException as e:
            log.warning("Camera request failed: %s — retrying", e)
            camera.invalidate()
            time.sleep(RECONNECT_BACKOFF_SECONDS)
            continue
        except Exception:
            log.exception("Camera iteration failed (continuing)")
            camera.invalidate()
            time.sleep(RECONNECT_BACKOFF_SECONDS)
            continue

        n_faces = len(faces)
        posted = 0
        skipped = 0
        partial = 0
        failed = 0
        for item in faces:
            snap_id = _extract_snap_id(item)
            if snap_id and snap_id in seen_set:
                skipped += 1
                continue

            image_b64 = _extract_image_b64(item)
            if not image_b64:
                skipped += 1
                continue

            payload = {
                "name": _extract_name(item),
                "timestamp": _extract_timestamp(item).isoformat(),
                "image_base64": image_b64,
                "snap_id": snap_id,
            }
            ok, fail = post_ingest(session, payload)
            if ok > 0 and fail == 0:
                posted += 1
            elif ok > 0:
                partial += 1
            else:
                failed += 1

            if snap_id and ok > 0:
                if len(seen_ids) == seen_ids.maxlen:
                    seen_set.discard(seen_ids[0])
                seen_ids.append(snap_id)
                seen_set.add(snap_id)

        if n_faces:
            log.info(
                "Poll returned %d face(s) — posted=%d partial=%d skipped=%d failed=%d",
                n_faces, posted, partial, skipped, failed,
            )

        time.sleep(CAPTURE_INTERVAL_SECONDS)

    log.info("Capture loop exited")
    return 0


if __name__ == "__main__":
    sys.exit(run())
