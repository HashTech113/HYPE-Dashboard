"""One-shot migration: walk backend/snapshots/*.jpg and POST each file to
/api/ingest so the images end up in the DB as base64. Uses the same MODE
switch as capture.py so you can aim it at either the local backend or the
Railway one.

Usage
-----
    MODE=local      python backend/migrate_to_db.py
    MODE=production python backend/migrate_to_db.py

    # or override the URL directly:
    INGEST_API_URL=https://example.com/api/ingest python backend/migrate_to_db.py
"""

from __future__ import annotations

import base64
import logging
import os
import sys
import time
from pathlib import Path

import requests

from app.config import SNAPSHOTS_DIR
from app.services.snapshots import parse_filename

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")
log = logging.getLogger("migrate")

MODE = os.getenv("MODE", "local").strip().lower()
DEFAULT_URLS = {
    "local": "http://localhost:8000/api/ingest",
    "production": "https://hype-dashboard-production-8938.up.railway.app/api/ingest",
}
INGEST_API_URL = os.getenv("INGEST_API_URL", "").strip() or DEFAULT_URLS.get(
    MODE, DEFAULT_URLS["local"]
)

REQUEST_TIMEOUT = 60.0
RETRY_BACKOFF = 2.0
RETRY_MAX = 3


def _post_one(session: requests.Session, payload: dict, filename: str) -> bool:
    for attempt in range(1, RETRY_MAX + 1):
        try:
            resp = session.post(INGEST_API_URL, json=payload, timeout=REQUEST_TIMEOUT)
            if resp.status_code == 200:
                return True
            log.warning(
                "%s: ingest returned %d (attempt %d/%d)",
                filename, resp.status_code, attempt, RETRY_MAX,
            )
        except requests.RequestException as e:
            log.warning(
                "%s: ingest post failed (attempt %d/%d): %s",
                filename, attempt, RETRY_MAX, e,
            )
        if attempt < RETRY_MAX:
            time.sleep(RETRY_BACKOFF * attempt)
    return False


def run(snapshots_dir: Path = SNAPSHOTS_DIR) -> int:
    if not snapshots_dir.exists():
        log.error("Snapshots directory not found: %s", snapshots_dir)
        return 1

    jpgs = sorted(
        p for p in snapshots_dir.iterdir()
        if p.is_file() and p.suffix.lower() in {".jpg", ".jpeg", ".png"}
    )
    if not jpgs:
        log.info("No snapshots to migrate in %s", snapshots_dir)
        return 0

    log.info("MODE=%s ingest_url=%s files=%d", MODE, INGEST_API_URL, len(jpgs))

    session = requests.Session()
    posted = 0
    failed = 0
    skipped = 0

    for jpg in jpgs:
        snap = parse_filename(jpg)
        if snap is None:
            skipped += 1
            continue

        try:
            raw = jpg.read_bytes()
        except OSError as e:
            log.warning("%s: cannot read (%s)", jpg.name, e)
            failed += 1
            continue

        payload = {
            "name": snap.name,
            "timestamp": snap.entry.isoformat(),
            "image_base64": base64.b64encode(raw).decode("ascii"),
            "snap_id": jpg.stem,
        }

        if _post_one(session, payload, jpg.name):
            posted += 1
            if posted % 50 == 0:
                log.info("progress: %d/%d posted", posted, len(jpgs))
        else:
            failed += 1

    log.info("Done. posted=%d failed=%d skipped=%d", posted, failed, skipped)
    return 0 if failed == 0 else 2


if __name__ == "__main__":
    sys.exit(run())
