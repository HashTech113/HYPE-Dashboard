"""Camera → local SQLite (durable sink) → optional remote replication.

Runs on the machine with LAN access to the camera. Pulls FaceInfo records
from the camera API and writes each one **directly** into the local DB
via ``record_capture()``. The local DB is the durable outbox — even when
uvicorn or any remote ingest target is down, captures are never lost,
and ``replay_to_railway.py`` propagates them to Railway later.

Optional remote replication
---------------------------
``INGEST_API_URL`` (comma-separated) lets capture also POST each event to
remote ingest endpoints in parallel for low-latency replication. Localhost
URLs are stripped automatically because the direct DB write covers the
local backend already. If the env is unset, capture runs local-only and
relies entirely on ``replay_to_railway.py`` for remote sync.

CAMERA_HOST/USER/PASS — passed through to app.services.camera.

The loop never crashes on a single failure: camera errors trigger a
re-login, DB busy errors retry via PRAGMA busy_timeout, and remote POST
failures are tolerated because the local DB already has the row.
"""

from __future__ import annotations

import logging
import os
import signal
import sys
import time
from collections import deque
from datetime import datetime, timedelta, timezone
from typing import Optional
from urllib.parse import urlparse

import requests

from app.config import CAPTURE_INTERVAL_SECONDS
from app.db import connect
from app.services import logs as logs_service
from app.services import snapshots
from app.services.camera import CameraClient

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")
log = logging.getLogger("capture")

RECONNECT_BACKOFF_SECONDS = 5.0
INGEST_TIMEOUT_SECONDS = 30.0
INGEST_RETRY_BACKOFF = 2.0
INGEST_RETRY_MAX = 3
SEEN_SNAP_IDS_MAX = 2000
# How far back to seed seen_ids from the local DB at startup. Anything
# older has aged out of the camera's live alarm buffer anyway.
SEEN_REWARM_HOURS = 1
_LOCALHOST_HOSTS = {"localhost", "127.0.0.1", "0.0.0.0", "::1"}


def _is_localhost_url(url: str) -> bool:
    try:
        host = (urlparse(url).hostname or "").lower()
    except ValueError:
        return False
    return host in _LOCALHOST_HOSTS


def _resolve_remote_targets() -> list[str]:
    raw = os.getenv("INGEST_API_URL", "").strip()
    if not raw:
        return []
    targets = [u.strip() for u in raw.split(",") if u.strip()]
    remote: list[str] = []
    for url in targets:
        if _is_localhost_url(url):
            log.info(
                "INGEST_API_URL: skipping local target %s — capture writes "
                "directly to the local DB (no HTTP round-trip needed)",
                url,
            )
            continue
        remote.append(url)
    return remote


REMOTE_TARGETS = _resolve_remote_targets()
# Shared secret presented to the remote /api/ingest endpoint. Must match the
# server-side INGEST_API_KEY env var. Local DB writes don't need it because
# they bypass HTTP.
INGEST_API_KEY = os.getenv("INGEST_API_KEY", "").strip()


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
    headers = {"X-API-Key": INGEST_API_KEY} if INGEST_API_KEY else {}
    for attempt in range(1, INGEST_RETRY_MAX + 1):
        try:
            resp = session.post(url, json=payload, headers=headers, timeout=INGEST_TIMEOUT_SECONDS)
            if resp.status_code == 200:
                return True
            log.warning(
                "remote replicate %s returned %d (attempt %d/%d) body=%s",
                url, resp.status_code, attempt, INGEST_RETRY_MAX, resp.text[:200],
            )
        except requests.RequestException as e:
            log.warning(
                "remote replicate %s failed (attempt %d/%d): %s",
                url, attempt, INGEST_RETRY_MAX, e,
            )
        if attempt < INGEST_RETRY_MAX:
            time.sleep(INGEST_RETRY_BACKOFF * attempt)
    return False


def _replicate_remote(session: requests.Session, payload: dict) -> tuple[int, int]:
    """Fire-and-tolerate POST to every remote target. Returns (ok, fail).
    Failures are non-fatal: replay_to_railway.py covers anything missed."""
    if not REMOTE_TARGETS:
        return 0, 0
    ok = fail = 0
    for url in REMOTE_TARGETS:
        if _post_one(session, url, payload):
            ok += 1
        else:
            fail += 1
    return ok, fail


def _seed_seen_ids() -> tuple[deque[str], set[str]]:
    """Re-warm the in-process dedup cache from the local DB so a capture
    restart doesn't re-fetch and re-write the entire camera buffer.
    The DB UNIQUE constraint is the real safety net; this is just an
    optimization to keep startup quiet."""
    seen_ids: deque[str] = deque(maxlen=SEEN_SNAP_IDS_MAX)
    seen_set: set[str] = set()
    cutoff = (datetime.now(timezone.utc) - timedelta(hours=SEEN_REWARM_HOURS)).isoformat()
    try:
        with connect() as conn:
            rows = conn.execute(
                "SELECT image_path FROM snapshot_logs WHERE timestamp >= ? "
                "ORDER BY id DESC LIMIT ?",
                (cutoff, SEEN_SNAP_IDS_MAX),
            ).fetchall()
    except Exception:
        log.exception("seed_seen_ids: DB read failed; starting with empty cache")
        return seen_ids, seen_set
    for r in rows:
        path = r["image_path"]
        if path.startswith("ingest_") and path.endswith(".jpg"):
            sid = path[len("ingest_"):-len(".jpg")]
            # Skip the content-hash form (no SnapId was available) — only
            # the bare-id form maps cleanly back to camera SnapIds.
            if "_" not in sid and sid not in seen_set:
                seen_ids.append(sid)
                seen_set.add(sid)
    log.info("seeded seen_ids cache with %d recent snap_ids", len(seen_set))
    return seen_ids, seen_set


def run() -> int:
    stop = {"flag": False}

    def _handle_signal(signum, _frame):
        log.info("Received signal %s — shutting down", signum)
        stop["flag"] = True

    signal.signal(signal.SIGINT, _handle_signal)
    signal.signal(signal.SIGTERM, _handle_signal)

    if REMOTE_TARGETS:
        log.info("local DB write enabled; remote replication targets=%s", REMOTE_TARGETS)
        if not INGEST_API_KEY:
            log.warning(
                "INGEST_API_KEY is unset — remote /api/ingest calls will be "
                "rejected with 401. Set INGEST_API_KEY to the same value as "
                "the server-side env var."
            )
    else:
        log.info(
            "local DB write enabled; no remote replication (INGEST_API_URL unset). "
            "replay_to_railway.py will sync to Railway out-of-band."
        )

    camera = CameraClient()
    session = requests.Session()
    seen_ids, seen_set = _seed_seen_ids()

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
        queued = duplicate = skipped = 0
        replicated_ok = replicated_fail = 0
        for item in faces:
            snap_id = _extract_snap_id(item)
            if snap_id and snap_id in seen_set:
                duplicate += 1
                continue

            image_b64 = _extract_image_b64(item)
            if not image_b64:
                skipped += 1
                continue

            name = _extract_name(item)
            ts_iso = _extract_timestamp(item).isoformat()
            image_path = snapshots.synthesize_image_path(snap_id, image_b64, ts_iso)

            try:
                stored = logs_service.record_capture(
                    name=name,
                    timestamp_iso=ts_iso,
                    image_path=image_path,
                    image_data=image_b64,
                )
            except Exception:
                log.exception(
                    "local DB write failed for snap_id=%s — keeping seen_ids "
                    "untouched so the next poll retries",
                    snap_id,
                )
                continue

            if stored:
                queued += 1
                log.debug("event queued (DB) snap_id=%s name=%s", snap_id, name)
            else:
                duplicate += 1

            ok, fail = _replicate_remote(session, {
                "name": name,
                "timestamp": ts_iso,
                "image_base64": image_b64,
                "snap_id": snap_id,
            })
            replicated_ok += ok
            replicated_fail += fail

            if snap_id:
                if len(seen_ids) == seen_ids.maxlen:
                    seen_set.discard(seen_ids[0])
                seen_ids.append(snap_id)
                seen_set.add(snap_id)

        if n_faces:
            log.info(
                "Poll faces=%d queued=%d duplicate=%d skipped=%d "
                "remote_ok=%d remote_fail=%d",
                n_faces, queued, duplicate, skipped, replicated_ok, replicated_fail,
            )

        time.sleep(CAPTURE_INTERVAL_SECONDS)

    log.info("Capture loop exited")
    return 0


if __name__ == "__main__":
    sys.exit(run())
