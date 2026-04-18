"""
Standalone capture loop. Polls the camera's real-time face alarm feed and
writes each new event to `snapshots/` as a JPEG. Runs retention on a timer.

All I/O logic lives in app/services/*:
  - app.services.camera     — login + processAlarm/Get
  - app.services.snapshots  — filesystem writes
  - app.services.retention  — cleanup

Run separately from the API:
    python capture.py
"""

from __future__ import annotations

import logging
import signal
import sys
import time

import requests

from app.config import (
    CAPTURE_INTERVAL_SECONDS,
    CLEANUP_INTERVAL_SECONDS,
    RETENTION_DAYS,
)
from app.services import retention, snapshots
from app.services.camera import CameraClient

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")
log = logging.getLogger("capture")

RECONNECT_BACKOFF_SECONDS = 5.0


def _maybe_cleanup(last_run_monotonic: float) -> float:
    now = time.monotonic()
    if now - last_run_monotonic < CLEANUP_INTERVAL_SECONDS:
        return last_run_monotonic
    try:
        retention.purge_older_than(RETENTION_DAYS)
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
        retention.purge_older_than(RETENTION_DAYS)
    except Exception:
        log.exception("Startup cleanup failed (continuing)")
    last_cleanup = time.monotonic()

    client = CameraClient()

    while not stop["flag"]:
        try:
            faces = client.fetch_alarms()
            new_files = 0
            for item in faces:
                if snapshots.save_face(item) is not None:
                    new_files += 1
            if faces:
                log.info("Poll returned %d face(s), stored %d new", len(faces), new_files)
            else:
                log.debug("Poll returned no faces")

            last_cleanup = _maybe_cleanup(last_cleanup)
        except requests.HTTPError as e:
            status = e.response.status_code if e.response is not None else "?"
            log.warning("Camera HTTP error %s — re-logging in", status)
            client.invalidate()
            time.sleep(RECONNECT_BACKOFF_SECONDS)
            continue
        except requests.RequestException as e:
            log.warning("Camera request failed: %s — retrying", e)
            client.invalidate()
            time.sleep(RECONNECT_BACKOFF_SECONDS)
            continue
        except Exception:
            log.exception("Capture iteration failed (continuing)")
            client.invalidate()
            time.sleep(RECONNECT_BACKOFF_SECONDS)
            continue

        time.sleep(CAPTURE_INTERVAL_SECONDS)

    log.info("Capture loop exited")
    return 0


if __name__ == "__main__":
    sys.exit(run())
