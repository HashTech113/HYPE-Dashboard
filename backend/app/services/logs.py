"""DB reads/writes for attendance_logs and snapshot_logs.

Every detected face is inserted into `snapshot_logs`. Recognized employees
(i.e. not 'Unknown') are also inserted into `attendance_logs`.
"""

from __future__ import annotations

import logging
import sqlite3
from datetime import date as date_cls, datetime, timezone
from typing import Optional

from ..db import connect
from .attendance import ShiftSettings, build_range_records
from .snapshots import Snapshot

log = logging.getLogger(__name__)

UNKNOWN_NAME = "unknown"


def _is_recognized(name: str) -> bool:
    return bool(name) and name.strip().lower() != UNKNOWN_NAME


def record_capture(*, name: str, timestamp_iso: str, image_path: str) -> None:
    """Insert one detection into `snapshot_logs`, and into `attendance_logs`
    when the face is a recognized employee.

    `image_path` should be the stored filename (e.g. `snap_...jpg`); the
    UNIQUE constraint makes re-runs idempotent.
    """
    try:
        with connect() as conn:
            conn.execute(
                "INSERT OR IGNORE INTO snapshot_logs (name, timestamp, image_path) VALUES (?, ?, ?)",
                (name, timestamp_iso, image_path),
            )
            if _is_recognized(name):
                conn.execute(
                    "INSERT OR IGNORE INTO attendance_logs (name, timestamp, image_path) VALUES (?, ?, ?)",
                    (name, timestamp_iso, image_path),
                )
    except sqlite3.DatabaseError as e:
        log.warning("Failed to record capture %s: %s", image_path, e)


def fetch_snapshot_logs(*, limit: int, offset: int, name: Optional[str]) -> list[dict]:
    return _fetch("snapshot_logs", limit=limit, offset=offset, name=name)


def fetch_attendance_logs(*, limit: int, offset: int, name: Optional[str]) -> list[dict]:
    return _fetch("attendance_logs", limit=limit, offset=offset, name=name)


_ALLOWED_TABLES = {"snapshot_logs", "attendance_logs"}


def _fetch(table: str, *, limit: int, offset: int, name: Optional[str]) -> list[dict]:
    if table not in _ALLOWED_TABLES:
        raise ValueError(f"unknown table: {table}")
    sql = f"SELECT id, name, timestamp, image_path FROM {table}"
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
    return Snapshot(filename=row["image_path"], name=row["name"], entry=ts, exit=ts)


def build_attendance_summaries(
    *,
    start_date: date_cls,
    end_date: date_cls,
    shift: ShiftSettings,
    base_url: str,
    name_filter: Optional[str] = None,
) -> list[dict]:
    """Group attendance_logs into one record per (name, local_date)
    with entry/exit times, late/early minutes, status, and images.

    Returned rows follow `build_range_records`'s dict shape and are
    sorted newest-first by (date DESC, name ASC).
    """
    sql = "SELECT id, name, timestamp, image_path FROM attendance_logs"
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
    # `build_range_records` already returns rows sorted (date ASC, name ASC).
    # A stable sort by date DESC then produces (date DESC, name ASC), which is
    # what the UI expects — newest days on top.
    records.sort(key=lambda r: r["date"], reverse=True)
    return records
