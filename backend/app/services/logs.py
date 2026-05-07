"""DB reads/writes for attendance_logs and snapshot_logs.

Every detected face is inserted into `snapshot_logs`. Recognized employees
(i.e. not 'Unknown') are also inserted into `attendance_logs`. Images are
stored as base64 in the `image_data` column — the DB is the single source
of truth; no filesystem reads happen here.
"""

from __future__ import annotations

import logging
import sqlite3
from datetime import date as date_cls, datetime, timezone
from typing import Optional

from ..db import connect
from .attendance import ShiftSettings, build_daily_records, build_range_records
from .corrections import load_corrections
from .snapshots import Snapshot

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
    camera_id: Optional[str] = None,
) -> bool:
    """Insert one detection into `snapshot_logs`, and into `attendance_logs`
    when the face is a recognized employee. The UNIQUE constraint on
    image_path makes re-runs idempotent. Returns True if anything was
    inserted, False if the row was a duplicate.

    ``camera_id`` is optional — None for legacy / env-fallback mode and for
    historical rows ingested before multi-camera support landed.
    """
    # Resolve to the canonical employee name so every spelling the camera
    # might emit ("Akhil c v" vs "Akhil C V") lands in the DB under the
    # current roster name. Unknowns are passed through untouched.
    if _is_recognized(name):
        from . import employees as employees_service
        matched = employees_service.match(name)
        if matched and matched.name != name:
            name = matched.name
    try:
        with connect() as conn:
            cur = conn.execute(
                "INSERT OR IGNORE INTO snapshot_logs (name, timestamp, image_path, image_data, camera_id) "
                "VALUES (?, ?, ?, ?, ?)",
                (name, timestamp_iso, image_path, image_data, camera_id),
            )
            inserted = cur.rowcount > 0
            if _is_recognized(name):
                conn.execute(
                    "INSERT OR IGNORE INTO attendance_logs (name, timestamp, image_path, image_data, camera_id) "
                    "VALUES (?, ?, ?, ?, ?)",
                    (name, timestamp_iso, image_path, image_data, camera_id),
                )
            return inserted
    except sqlite3.DatabaseError as e:
        log.warning("Failed to record capture %s: %s", image_path, e)
        return False


def record_external_event(
    *,
    name: str,
    timestamp_iso: str,
    external_event_id: str,
    event_type: str,
) -> bool:
    """Insert one event from the external attendance API into ``attendance_logs``.

    External events have no image, so nothing lands in ``snapshot_logs`` (which
    powers Live Captures). The row is tagged ``source='external_api'`` and the
    vendor-side id is stored in ``external_event_id`` — a partial unique index
    on that column makes re-syncs idempotent.

    ``image_path`` still has to be unique-non-null per the table schema; we
    derive a synthetic value (``external_<id>``) so the existing constraint
    keeps working for both sources without an extra migration.

    Returns True if a new row was inserted, False if the event was already
    imported (duplicate ``external_event_id``)."""
    if _is_recognized(name):
        from . import employees as employees_service
        matched = employees_service.match(name)
        if matched and matched.name != name:
            name = matched.name

    image_path = f"external_{external_event_id}"
    try:
        with connect() as conn:
            cur = conn.execute(
                "INSERT OR IGNORE INTO attendance_logs "
                "(name, timestamp, image_path, image_data, camera_id, source, "
                "external_event_id, event_type) "
                "VALUES (?, ?, ?, NULL, NULL, 'external_api', ?, ?)",
                (name, timestamp_iso, image_path, external_event_id, event_type),
            )
            return cur.rowcount > 0
    except sqlite3.DatabaseError as e:
        log.warning(
            "Failed to record external event id=%s name=%s: %s",
            external_event_id, name, e,
        )
        return False


def fetch_snapshot_logs(*, limit: Optional[int], offset: int, name: Optional[str]) -> list[dict]:
    return _fetch("snapshot_logs", limit=limit, offset=offset, name=name)


def fetch_attendance_logs(*, limit: Optional[int], offset: int, name: Optional[str]) -> list[dict]:
    return _fetch("attendance_logs", limit=limit, offset=offset, name=name)


_ALLOWED_TABLES = {"snapshot_logs", "attendance_logs"}


def _fetch(table: str, *, limit: Optional[int], offset: int, name: Optional[str]) -> list[dict]:
    if table not in _ALLOWED_TABLES:
        raise ValueError(f"unknown table: {table}")
    # image_data IS NOT NULL hides rows whose image was pruned by the
    # retention job (see services/cleanup.py). For older dates this leaves
    # only the kept entry/exit captures per employee; today/yesterday are
    # untouched by retention and so show every event.
    sql = f"SELECT id, name, timestamp, image_path, image_data FROM {table} WHERE image_data IS NOT NULL"
    args: list = []
    if name:
        sql += " AND lower(name) LIKE ?"
        args.append(f"{name.strip().lower()}%")
    # SQLite treats LIMIT -1 as "no limit"; lets the same query shape serve
    # both bounded and unbounded calls.
    sql += " ORDER BY timestamp DESC, id DESC LIMIT ? OFFSET ?"
    args.extend([-1 if limit is None else limit, offset])
    with connect() as conn:
        rows = conn.execute(sql, args).fetchall()
    return [dict(row) for row in rows]


def snapshot_log_count() -> int:
    with connect() as conn:
        return conn.execute("SELECT COUNT(*) AS c FROM snapshot_logs").fetchone()["c"]


def snapshot_last_timestamp() -> Optional[str]:
    """Latest snapshot_logs.timestamp (ISO string) or None if table is empty."""
    with connect() as conn:
        row = conn.execute(
            "SELECT timestamp FROM snapshot_logs ORDER BY timestamp DESC, id DESC LIMIT 1"
        ).fetchone()
    return row["timestamp"] if row else None


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


def _load_attendance_snapshots(
    *,
    start_date: Optional[date_cls] = None,
    end_date: Optional[date_cls] = None,
    name_filter: Optional[str] = None,
) -> list[Snapshot]:
    sql = "SELECT id, name, timestamp, image_path, image_data FROM attendance_logs"
    clauses: list[str] = []
    args: list = []
    if name_filter:
        clauses.append("lower(name) LIKE ?")
        args.append(f"{name_filter.strip().lower()}%")
    if start_date is not None:
        clauses.append("timestamp >= ?")
        args.append(start_date.isoformat())
    if end_date is not None:
        # inclusive upper bound via the next day's 00:00
        from datetime import timedelta
        args_end = (end_date + timedelta(days=1)).isoformat()
        clauses.append("timestamp < ?")
        args.append(args_end)
    if clauses:
        sql += " WHERE " + " AND ".join(clauses)
    sql += " ORDER BY timestamp ASC"
    with connect() as conn:
        rows = [dict(r) for r in conn.execute(sql, args).fetchall()]
    return [_row_to_snapshot(r) for r in rows]


def build_attendance_daily(
    *,
    target_date: date_cls,
    shift: ShiftSettings,
    base_url: str,
    expected_names: Optional[list[str]] = None,
) -> list[dict]:
    """Per-person records for a single local day, sourced from attendance_logs."""
    snaps = _load_attendance_snapshots()
    return build_daily_records(
        snaps,
        target_date=target_date,
        shift=shift,
        base_url=base_url,
        expected_names=expected_names,
        corrections=load_corrections(),
    )


def build_attendance_range(
    *,
    start_date: date_cls,
    end_date: date_cls,
    shift: ShiftSettings,
    base_url: str,
    name_filter: Optional[str] = None,
) -> list[dict]:
    """Per-person-per-day records across a date range, from attendance_logs."""
    snaps = _load_attendance_snapshots(name_filter=name_filter)
    return build_range_records(
        snaps,
        start_date=start_date,
        end_date=end_date,
        shift=shift,
        base_url=base_url,
        name_filter=name_filter,
        corrections=load_corrections(),
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
    entry/exit times, late/early minutes, status, and data URLs for images.
    """
    snaps = _load_attendance_snapshots(name_filter=name_filter)
    records = build_range_records(
        snaps,
        start_date=start_date,
        end_date=end_date,
        shift=shift,
        base_url=base_url,
        corrections=load_corrections(),
    )
    records.sort(key=lambda r: r["date"], reverse=True)
    return records
