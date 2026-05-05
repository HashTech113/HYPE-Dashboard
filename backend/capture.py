"""Camera → local SQLite (durable sink) → optional remote replication.

Runs on the machine with LAN access to the cameras. Pulls FaceInfo records
from each camera's API and writes them **directly** into the local DB via
``record_capture()``. The local DB is the durable outbox — even when the
remote ingest target is unreachable, captures are never lost, and
``replay_to_railway.py`` propagates them to Railway later.

Modes
-----
* **Multi-camera**: when the ``cameras`` table contains rows with
  ``connection_status='connected'``, capture spawns one worker thread per
  camera. Each worker has its own ``CameraClient``, login session, and
  in-process dedup cache. Events are tagged with ``camera_id`` so two
  cameras emitting the same SnapId don't collide on the
  ``UNIQUE(image_path)`` constraint.

* **Legacy single-camera**: when no connected cameras are found in the
  table, capture falls back to the old single-camera path driven by the
  ``CAMERA_HOST`` / ``CAMERA_USER`` / ``CAMERA_PASS`` env vars. ARP
  rediscovery (``CAMERA_MAC`` / ``CAMERA_DISCOVERY_SUBNETS``) is enabled
  only in this mode.

Optional remote replication
---------------------------
``INGEST_API_URL`` (comma-separated) lets every worker also POST each
event to remote ingest endpoints in parallel for low-latency replication.
Localhost URLs are stripped automatically because the direct DB write
covers the local backend already. ``INGEST_API_KEY`` must match the
server's ``INGEST_API_KEY`` env var; without it the remote will reject
the POST with 401.

Frame rate cap
--------------
Each worker's poll interval is at least 1.0s (configurable upward via
``CAPTURE_INTERVAL_SECONDS``), keeping CPU bounded even with many
cameras.
"""

from __future__ import annotations

import logging
import os
import signal
import sys
import threading
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
# Per-worker minimum poll interval. Caps CPU at "1 frame/sec/camera"
# regardless of how aggressively CAPTURE_INTERVAL_SECONDS is tuned.
MIN_POLL_INTERVAL_SECONDS = 1.0

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
INGEST_API_KEY = os.getenv("INGEST_API_KEY", "").strip()


# ---- camera event extraction -----------------------------------------------

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


# ---- remote replication ----------------------------------------------------

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


# ---- dedup cache -----------------------------------------------------------

def _seed_seen_ids(camera_id: Optional[str]) -> tuple[deque[str], set[str]]:
    """Re-warm the in-process dedup cache from the local DB so a capture
    restart doesn't re-fetch and re-write the entire camera buffer. The
    cache is **scoped to one camera** in multi-camera mode — two cameras
    can legitimately emit the same SnapId, and we don't want one worker's
    cache to dedupe another's events.

    For env-fallback (camera_id is None), we look at rows where
    ``camera_id IS NULL`` (legacy + fallback writes) so the cache rebuilds
    cleanly. The DB UNIQUE(image_path) constraint is still the real
    safety net; this is just an optimization to keep startup quiet."""
    seen_ids: deque[str] = deque(maxlen=SEEN_SNAP_IDS_MAX)
    seen_set: set[str] = set()
    cutoff = (datetime.now(timezone.utc) - timedelta(hours=SEEN_REWARM_HOURS)).isoformat()
    try:
        with connect() as conn:
            if camera_id:
                rows = conn.execute(
                    "SELECT image_path FROM snapshot_logs "
                    "WHERE timestamp >= ? AND camera_id = ? "
                    "ORDER BY id DESC LIMIT ?",
                    (cutoff, camera_id, SEEN_SNAP_IDS_MAX),
                ).fetchall()
                expected_prefix = f"ingest_{camera_id}_"
            else:
                rows = conn.execute(
                    "SELECT image_path FROM snapshot_logs "
                    "WHERE timestamp >= ? AND camera_id IS NULL "
                    "ORDER BY id DESC LIMIT ?",
                    (cutoff, SEEN_SNAP_IDS_MAX),
                ).fetchall()
                expected_prefix = "ingest_"
    except Exception:
        log.exception("seed_seen_ids: DB read failed; starting with empty cache")
        return seen_ids, seen_set
    for r in rows:
        path = r["image_path"]
        if path.startswith(expected_prefix) and path.endswith(".jpg"):
            sid = path[len(expected_prefix):-len(".jpg")]
            # Skip the content-hash form (no SnapId was available) — only
            # the bare-id form maps cleanly back to camera SnapIds.
            if "_" not in sid and sid not in seen_set:
                seen_ids.append(sid)
                seen_set.add(sid)
    return seen_ids, seen_set


# ---- per-worker poll loop --------------------------------------------------

def _process_event(
    item: dict,
    *,
    client: CameraClient,
    session: requests.Session,
    seen_ids: deque[str],
    seen_set: set[str],
) -> tuple[str, int, int]:
    """Insert one camera event into the local DB and replicate to remotes.
    Returns (status, replicated_ok, replicated_fail) where status is one
    of ``queued``, ``duplicate``, ``skipped``."""
    snap_id = _extract_snap_id(item)
    if snap_id and snap_id in seen_set:
        return "duplicate", 0, 0

    image_b64 = _extract_image_b64(item)
    if not image_b64:
        return "skipped", 0, 0

    name = _extract_name(item)
    ts_iso = _extract_timestamp(item).isoformat()
    image_path = snapshots.synthesize_image_path(
        snap_id, image_b64, ts_iso, camera_id=client.camera_id or None
    )

    try:
        stored = logs_service.record_capture(
            name=name,
            timestamp_iso=ts_iso,
            image_path=image_path,
            image_data=image_b64,
            camera_id=client.camera_id or None,
        )
    except Exception:
        log.exception(
            "[%s] local DB write failed for snap_id=%s — keeping seen_ids "
            "untouched so the next poll retries",
            client.label, snap_id,
        )
        return "skipped", 0, 0

    if stored:
        log.debug("[%s] event queued (DB) snap_id=%s name=%s", client.label, snap_id, name)
        status = "queued"
    else:
        status = "duplicate"

    ok, fail = _replicate_remote(session, {
        "name": name,
        "timestamp": ts_iso,
        "image_base64": image_b64,
        "snap_id": snap_id,
        "camera_id": client.camera_id or None,
    })

    if snap_id:
        if len(seen_ids) == seen_ids.maxlen:
            seen_set.discard(seen_ids[0])
        seen_ids.append(snap_id)
        seen_set.add(snap_id)

    return status, ok, fail


def _worker_loop(client: CameraClient, stop: dict) -> None:
    """Long-running poll loop for a single camera. Runs until ``stop['flag']``
    is set by the signal handler."""
    log.info(
        "[%s] worker starting (id=%s, location=%s)",
        client.label, client.camera_id or "(legacy)", client.camera_location or "—",
    )
    session = requests.Session()
    seen_ids, seen_set = _seed_seen_ids(client.camera_id or None)
    log.info("[%s] seeded seen_ids cache with %d recent snap_ids", client.label, len(seen_set))

    poll_interval = max(MIN_POLL_INTERVAL_SECONDS, CAPTURE_INTERVAL_SECONDS)

    while not stop["flag"]:
        try:
            faces = client.fetch_alarms()
        except requests.HTTPError as e:
            status = e.response.status_code if e.response is not None else "?"
            log.warning("[%s] Camera HTTP error %s — re-logging in", client.label, status)
            client.invalidate()
            time.sleep(RECONNECT_BACKOFF_SECONDS)
            continue
        except requests.RequestException as e:
            log.warning("[%s] Camera request failed: %s — retrying", client.label, e)
            client.invalidate()
            time.sleep(RECONNECT_BACKOFF_SECONDS)
            continue
        except Exception:
            log.exception("[%s] Camera iteration failed (continuing)", client.label)
            client.invalidate()
            time.sleep(RECONNECT_BACKOFF_SECONDS)
            continue

        n_faces = len(faces)
        queued = duplicate = skipped = 0
        replicated_ok = replicated_fail = 0
        for item in faces:
            status, ok, fail = _process_event(
                item, client=client, session=session, seen_ids=seen_ids, seen_set=seen_set,
            )
            if status == "queued":
                queued += 1
            elif status == "duplicate":
                duplicate += 1
            else:
                skipped += 1
            replicated_ok += ok
            replicated_fail += fail

        if n_faces:
            log.info(
                "[%s] poll faces=%d queued=%d duplicate=%d skipped=%d "
                "remote_ok=%d remote_fail=%d",
                client.label, n_faces, queued, duplicate, skipped,
                replicated_ok, replicated_fail,
            )

        # `time.sleep` is interruptible by signals on Linux/macOS; capped so
        # workers don't oversleep when SIGTERM arrives mid-cycle.
        slept = 0.0
        while slept < poll_interval and not stop["flag"]:
            chunk = min(0.5, poll_interval - slept)
            time.sleep(chunk)
            slept += chunk

    log.info("[%s] worker exiting", client.label)


# ---- mode selection --------------------------------------------------------

def _load_db_workers() -> list[CameraClient]:
    """Load every camera with ``connection_status='connected'`` and return
    a configured ``CameraClient`` for each. Empty list (and a logged
    reason) when the table is empty, no rows are connected, or
    CAMERA_SECRET_KEY isn't set so passwords can't be decrypted."""
    try:
        from app.services.cameras import connected_cameras_with_credentials
    except Exception:
        log.exception("could not import cameras service; falling back to legacy mode")
        return []

    try:
        pairs = connected_cameras_with_credentials()
    except Exception as exc:
        # Most likely cause: CAMERA_SECRET_KEY is unset. Surface clearly.
        log.error("could not load cameras from DB: %s", exc)
        return []

    clients: list[CameraClient] = []
    for cam, password in pairs:
        clients.append(
            CameraClient(
                host=cam.ip,
                user=cam.username,
                password=password,
                camera_id=cam.id,
                camera_name=cam.name,
                camera_location=cam.location,
            )
        )
    return clients


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

    db_clients = _load_db_workers()
    if db_clients:
        log.info("Multi-camera mode: %d connected cameras loaded from DB", len(db_clients))
        for c in db_clients:
            log.info(
                "  - %s @ %s [%s] (camera_id=%s)",
                c.camera_name or "(unnamed)", c.base_url,
                c.camera_location or "no location", c.camera_id,
            )
        return _run_workers(db_clients, stop)

    log.info("Legacy single-camera mode: no connected cameras in DB, falling back to env config")
    legacy = CameraClient()  # env-driven defaults; rediscovery enabled
    return _run_workers([legacy], stop)


def _run_workers(clients: list[CameraClient], stop: dict) -> int:
    threads: list[threading.Thread] = []
    for client in clients:
        name = f"capture-{client.camera_id or 'legacy'}"
        t = threading.Thread(target=_worker_loop, args=(client, stop), daemon=True, name=name)
        t.start()
        threads.append(t)

    # Park the main thread until shutdown. We poll instead of join() so the
    # signal handler can trip stop['flag'] without first having to wake one
    # specific thread.
    try:
        while not stop["flag"] and any(t.is_alive() for t in threads):
            time.sleep(0.5)
    finally:
        stop["flag"] = True
        for t in threads:
            t.join(timeout=RECONNECT_BACKOFF_SECONDS + 1.0)

    log.info("Capture loop exited")
    return 0


if __name__ == "__main__":
    sys.exit(run())
