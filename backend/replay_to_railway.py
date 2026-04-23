"""One-shot backfill: POST every local snapshot_logs row to a remote ingest URL.

Usage:
    python replay_to_railway.py \
        --target https://hype-dashboard-production-8938.up.railway.app/api/ingest

The remote side's UNIQUE(image_path) constraint makes this idempotent — rerunning
skips rows it already stored. We derive snap_id from the local image_path
(`ingest_<snap_id>.jpg`) so the remote reconstructs the same image_path and dedup
works end-to-end.
"""

from __future__ import annotations

import argparse
import sys
import time

import requests

from app.db import connect


def extract_snap_id(image_path: str) -> str | None:
    if image_path.startswith("ingest_") and image_path.endswith(".jpg"):
        return image_path[len("ingest_"):-len(".jpg")]
    return None


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--target", required=True, help="Remote /api/ingest URL")
    parser.add_argument("--timeout", type=float, default=30.0)
    parser.add_argument("--sleep", type=float, default=0.05, help="Seconds between posts")
    args = parser.parse_args()

    with connect() as conn:
        rows = conn.execute(
            "SELECT name, timestamp, image_path, image_data FROM snapshot_logs "
            "WHERE image_data IS NOT NULL AND image_data != '' "
            "ORDER BY id ASC"
        ).fetchall()

    total = len(rows)
    print(f"replaying {total} rows to {args.target}")

    session = requests.Session()
    stored = skipped = failed = 0
    for i, row in enumerate(rows, 1):
        payload = {
            "name": row["name"],
            "timestamp": row["timestamp"],
            "image_base64": row["image_data"],
            "snap_id": extract_snap_id(row["image_path"]),
        }
        try:
            resp = session.post(args.target, json=payload, timeout=args.timeout)
        except requests.RequestException as exc:
            failed += 1
            print(f"[{i}/{total}] POST failed: {exc}")
            continue
        if resp.status_code != 200:
            failed += 1
            print(f"[{i}/{total}] HTTP {resp.status_code}: {resp.text[:200]}")
            continue
        body = resp.json()
        if body.get("stored"):
            stored += 1
        else:
            skipped += 1
        if i % 100 == 0 or i == total:
            print(f"[{i}/{total}] stored={stored} skipped={skipped} failed={failed}")
        time.sleep(args.sleep)

    print(f"done — stored={stored} skipped={skipped} failed={failed}")
    return 0 if failed == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
