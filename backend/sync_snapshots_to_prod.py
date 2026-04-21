"""Push every row in the local ``snapshot_logs`` SQLite table to a remote
backend's ``/api/ingest`` endpoint.

Idempotent: Railway's ingest dedups on ``snap_id`` / ``image_path``, so
re-running just skips rows already present. Rows without ``image_data``
are read from the filesystem path instead; rows with neither are skipped.

Usage
-----
    python backend/sync_snapshots_to_prod.py                      # local → Railway
    python backend/sync_snapshots_to_prod.py --since 2026-04-21   # only today
    TARGET_URL=https://example.com python backend/sync_snapshots_to_prod.py
"""

from __future__ import annotations

import argparse
import base64
import json
import logging
import os
import sys
import time
from pathlib import Path
from typing import Optional
from urllib import error as urlerr
from urllib import request as urlreq

# make `from app.xxx` imports work when run from repo root OR backend/
_THIS = Path(__file__).resolve()
sys.path.insert(0, str(_THIS.parent))

from app.config import SNAPSHOTS_DIR  # noqa: E402
from app.db import connect  # noqa: E402

logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")
log = logging.getLogger("sync-snaps")

TARGET_URL = os.getenv(
    "TARGET_URL",
    "https://hype-dashboard-production-8938.up.railway.app",
).rstrip("/")
INGEST_URL = f"{TARGET_URL}/api/ingest"


def _post(payload: dict) -> tuple[int, dict | None]:
    body = json.dumps(payload).encode()
    req = urlreq.Request(INGEST_URL, data=body, method="POST", headers={"Content-Type": "application/json"})
    try:
        with urlreq.urlopen(req, timeout=60) as resp:
            raw = resp.read().decode("utf-8")
            return resp.status, json.loads(raw) if raw else None
    except urlerr.HTTPError as e:
        raw = e.read().decode("utf-8", errors="replace") if e.fp else ""
        try:
            return e.code, json.loads(raw) if raw else None
        except ValueError:
            return e.code, {"_raw": raw}


def _image_base64(row: dict) -> Optional[str]:
    if row.get("image_data"):
        return row["image_data"]
    path = row.get("image_path")
    if not path:
        return None
    abs_path = SNAPSHOTS_DIR / path
    try:
        return base64.b64encode(abs_path.read_bytes()).decode("ascii")
    except OSError:
        return None


def _snap_id_from_path(image_path: str) -> str:
    # image_path examples:
    #   ingest_SomeId.jpg              (new, from /api/ingest)
    #   snap_<ts>_<ts>_<name>_<id>.jpg (legacy from capture.py)
    stem = image_path.rsplit("/", 1)[-1]
    if stem.endswith(".jpg") or stem.endswith(".jpeg") or stem.endswith(".png"):
        stem = stem.rsplit(".", 1)[0]
    return stem


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--since", help="Only rows with timestamp >= this ISO date (e.g. 2026-04-21)")
    ap.add_argument("--limit", type=int, default=None, help="Cap rows posted (for trial runs)")
    args = ap.parse_args(argv)

    log.info("target = %s", INGEST_URL)
    sql = "SELECT id, name, timestamp, image_path, image_data FROM snapshot_logs"
    params: list = []
    if args.since:
        sql += " WHERE timestamp >= ?"
        params.append(args.since)
    sql += " ORDER BY timestamp ASC"
    if args.limit:
        sql += " LIMIT ?"
        params.append(args.limit)

    with connect() as conn:
        rows = [dict(r) for r in conn.execute(sql, params).fetchall()]
    log.info("local rows to process: %d", len(rows))

    posted_new = skipped_dup = missing_img = failed = 0
    t0 = time.time()

    for idx, row in enumerate(rows, 1):
        image_b64 = _image_base64(row)
        if not image_b64:
            missing_img += 1
            continue

        payload = {
            "name": row["name"],
            "timestamp": row["timestamp"],
            "image_base64": image_b64,
            "snap_id": _snap_id_from_path(row["image_path"]),
        }
        status, body = _post(payload)
        if status == 200 and body:
            if body.get("stored") is True:
                posted_new += 1
            else:
                skipped_dup += 1
        else:
            failed += 1
            log.warning("POST failed (status=%s body=%s) for %s", status, body, row["image_path"])

        if idx % 50 == 0:
            log.info(
                "  progress %d/%d  new=%d  dup=%d  missing=%d  failed=%d  elapsed=%.1fs",
                idx, len(rows), posted_new, skipped_dup, missing_img, failed, time.time() - t0,
            )

    log.info(
        "done in %.1fs: new=%d dup=%d missing=%d failed=%d",
        time.time() - t0, posted_new, skipped_dup, missing_img, failed,
    )
    return 0 if failed == 0 else 2


if __name__ == "__main__":
    sys.exit(main())
