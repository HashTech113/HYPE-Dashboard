"""DB reads/writes for attendance_logs and snapshot_logs.

Every detected face is inserted into `snapshot_logs`. Recognized employees
(i.e. not 'Unknown') are also inserted into `attendance_logs`. Images are
stored as base64 in the `image_data` column — filesystem-backed rows kept
for legacy compatibility.
"""

from __future__ import annotations

import base64
import logging
import sqlite3
from datetime import date as date_cls, datetime, timezone
from pathlib import Path
from typing import Optional

from ..db import connect
from .attendance import ShiftSettings, build_range_records
from .snapshots import Snapshot, SNAPSHOTS_DIR, scan as scan_snapshots

log = logging.getLogger(__name__)

UNKNOWN_NAME = "unknown"


def _is_recognized(name: str) -> bool:
    return bool(name) and name.strip().lower() != UNKNOWN_NAME


def record_capture(
    *,
    name: str,
    timestamp_iso: str,
    image_path: str,
    image_data: Optional[str] = None,
) -> bool:
    """Insert one detection into `snapshot_logs`, and into `attendance_logs`
    when the face is a recognized employee. The UNIQUE constraint on
    image_path makes re-runs idempotent. Returns True if anything was
    inserted, False if the row was a duplicate.
    """
    try:
        with connect() as conn:
            cur = conn.execute(
                "INSERT OR IGNORE INTO snapshot_logs (name, timestamp, image_path, image_data) "
                "VALUES (?, ?, ?, ?)",
                (name, timestamp_iso, image_path, image_data),
            )
            inserted = cur.rowcount > 0
            if _is_recognized(name):
                conn.execute(
                    "INSERT OR IGNORE INTO attendance_logs (name, timestamp, image_path, image_data) "
                    "VALUES (?, ?, ?, ?)",
                    (name, timestamp_iso, image_path, image_data),
                )
            return inserted
    except sqlite3.DatabaseError as e:
        log.warning("Failed to record capture %s: %s", image_path, e)
        return False


def seed_from_filesystem_if_empty() -> int:
    """On first boot (e.g. fresh Railway container with shipped JPGs but no
    database.db), populate snapshot_logs + attendance_logs from disk. Each
    file's bytes are base64-encoded into `image_data` so the endpoints don't
    need the filesystem to serve images thereafter. Idempotent — only runs
    when both tables are empty.
    """
    with connect() as conn:
        snap_count = conn.execute("SELECT COUNT(*) AS c FROM snapshot_logs").fetchone()["c"]
        attn_count = conn.execute("SELECT COUNT(*) AS c FROM attendance_logs").fetchone()["c"]
    if snap_count or attn_count:
        return 0

    seeded = 0
    for snap in scan_snapshots():
        abs_path = SNAPSHOTS_DIR / snap.filename
        image_data: Optional[str] = None
        try:
            image_data = base64.b64encode(abs_path.read_bytes()).decode("ascii")
        except OSError as e:
            log.debug("Could not read %s for seed: %s", abs_path, e)

        if record_capture(
            name=snap.name,
            timestamp_iso=snap.entry.isoformat(),
            image_path=snap.filename,
            image_data=image_data,
        ):
            seeded += 1
    if seeded:
        log.info("Seeded %d rows into snapshot_logs from filesystem", seeded)
    return seeded


def fetch_snapshot_logs(*, limit: int, offset: int, name: Optional[str]) -> list[dict]:
    return _fetch("snapshot_logs", limit=limit, offset=offset, name=name)


def fetch_attendance_logs(*, limit: int, offset: int, name: Optional[str]) -> list[dict]:
    return _fetch("attendance_logs", limit=limit, offset=offset, name=name)


_ALLOWED_TABLES = {"snapshot_logs", "attendance_logs"}


def _fetch(table: str, *, limit: int, offset: int, name: Optional[str]) -> list[dict]:
    if table not in _ALLOWED_TABLES:
        raise ValueError(f"unknown table: {table}")
    sql = f"SELECT id, name, timestamp, image_path, image_data FROM {table}"
    args: list = []
    if name:
        sql += " WHERE lower(name) LIKE ?"
        args.append(f"{name.strip().lower()}%")
    sql += " ORDER BY timestamp DESC, id DESC LIMIT ? OFFSET ?"
    args.extend([limit, offset])
    with connect() as conn:
        rows = conn.execute(sql, args).fetchall()
    return [dict(row) for row in rows]


def _row_to_snapshot(row: dict) -> Snapshot:
    raw_ts = row["timestamp"]
    try:
        ts = datetime.fromisoformat(raw_ts.replace("Z", "+00:00"))
    except ValueError:
        ts = datetime.now(timezone.utc)
    if ts.tzinfo is None:
        ts = ts.replace(tzinfo=timezone.utc)
    return Snapshot(
        filename=row["image_path"],
        name=row["name"],
        entry=ts,
        exit=ts,
        image_data=row.get("image_data"),
    )


def build_attendance_summaries(
    *,
    start_date: date_cls,
    end_date: date_cls,
    shift: ShiftSettings,
    base_url: str,
    name_filter: Optional[str] = None,
) -> list[dict]:
    """Group attendance_logs into one record per (name, local_date) with
    entry/exit times, late/early minutes, status, and image URLs (data URLs
    when the capture was ingested into DB, /snapshots/<file> for legacy rows).
    """
    sql = "SELECT id, name, timestamp, image_path, image_data FROM attendance_logs"
    args: list = []
    if name_filter:
        sql += " WHERE lower(name) LIKE ?"
        args.append(f"{name_filter.strip().lower()}%")
    sql += " ORDER BY timestamp ASC"
    with connect() as conn:
        raw_rows = [dict(r) for r in conn.execute(sql, args).fetchall()]

    snaps = [_row_to_snapshot(r) for r in raw_rows]
    records = build_range_records(
        snaps,
        start_date=start_date,
        end_date=end_date,
        shift=shift,
        base_url=base_url,
    )
    records.sort(key=lambda r: r["date"], reverse=True)
    return records
