"""DB reads/writes for attendance_logs and snapshot_logs.

Every detected face is inserted into ``snapshot_logs``. Recognized
employees (i.e. not "Unknown") are also inserted into ``attendance_logs``.
Images are stored as base64 in the ``image_data`` column — the DB is the
single source of truth; no filesystem reads happen here.

Inserts use the dialect-aware ``ON CONFLICT (image_path) DO NOTHING`` upsert
helper (``app.db.upsert_on_conflict_do_nothing``) so re-runs are idempotent
on both SQLite and PostgreSQL.
"""

from __future__ import annotations

import logging
from datetime import date as date_cls, datetime, timezone
from typing import Any, Optional

from sqlalchemy import func, select, text
from sqlalchemy.exc import SQLAlchemyError

from ..db import session_scope, upsert_on_conflict_do_nothing
from ..models import AttendanceLog, SnapshotLog
from .attendance import ShiftSettings, build_daily_records, build_range_records
from .corrections import load_corrections
from .snapshots import Snapshot

log = logging.getLogger(__name__)

UNKNOWN_NAME = "unknown"


def _is_recognized(name: str) -> bool:
    return bool(name) and name.strip().lower() != UNKNOWN_NAME


def _parse_iso(value: Any) -> Optional[datetime]:
    """Accept either a naive/aware ISO string or a datetime; always return
    a UTC-aware datetime (or None when ``value`` is empty/unparseable)."""
    if isinstance(value, datetime):
        dt = value
    elif value is None or value == "":
        return None
    else:
        try:
            dt = datetime.fromisoformat(str(value).replace("Z", "+00:00"))
        except (TypeError, ValueError):
            return None
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    return dt.astimezone(timezone.utc)


def _ts_to_str(value: Any) -> str:
    """Format a row's timestamp column for output. The ORM may return either
    a string (SQLite) or a datetime (Postgres) — normalize to ISO string."""
    if isinstance(value, datetime):
        if value.tzinfo is None:
            value = value.replace(tzinfo=timezone.utc)
        return value.isoformat()
    return str(value or "")


def record_capture(
    *,
    name: str,
    timestamp_iso: str,
    image_path: str,
    image_data: Optional[str] = None,
    camera_id: Optional[str] = None,
) -> bool:
    """Insert one detection into ``snapshot_logs``, and into ``attendance_logs``
    when the face is a recognized employee. The UNIQUE constraint on
    image_path makes re-runs idempotent. Returns True if anything was
    inserted, False if the row was a duplicate.

    ``camera_id`` is optional — None for legacy / env-fallback mode and for
    historical rows ingested before multi-camera support landed.
    """
    # Resolve to the canonical employee name so every spelling the camera
    # might emit lands in the DB under the current roster name. Unknowns
    # are passed through untouched. Also resolve the FK (employee_id) so
    # new rows are linkable without an after-the-fact backfill.
    employee_id: Optional[str] = None
    if _is_recognized(name):
        from . import employees as employees_service
        matched = employees_service.match(name)
        if matched is not None:
            if matched.name != name:
                name = matched.name
            employee_id = matched.id

    timestamp = _parse_iso(timestamp_iso)
    if timestamp is None:
        log.warning("record_capture: unparseable timestamp %r", timestamp_iso)
        return False

    snapshot_values = {
        "name": name,
        "employee_id": employee_id,
        "timestamp": timestamp,
        "image_path": image_path,
        "image_data": image_data,
        "camera_id": camera_id,
    }
    attendance_values = {
        **snapshot_values,
        "source": "local_camera",
        "external_event_id": None,
        "event_type": None,
    }

    try:
        with session_scope() as session:
            snap_result = upsert_on_conflict_do_nothing(
                session,
                SnapshotLog,
                snapshot_values,
                index_elements=["image_path"],
            )
            inserted = int(snap_result.rowcount or 0) > 0
            if _is_recognized(name):
                upsert_on_conflict_do_nothing(
                    session,
                    AttendanceLog,
                    attendance_values,
                    index_elements=["image_path"],
                )
            return inserted
    except SQLAlchemyError as e:
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

    External events have no image, so nothing lands in ``snapshot_logs``
    (which powers Live Captures). The row is tagged ``source='external_api'``
    and the vendor-side id is stored in ``external_event_id`` — a partial
    unique index on that column makes re-syncs idempotent.

    ``image_path`` still has to be unique-non-null per the table schema; we
    derive a synthetic value (``external_<id>``) so the existing constraint
    keeps working for both sources without an extra migration.

    Returns True if a new row was inserted, False if the event was already
    imported (duplicate ``external_event_id``)."""
    employee_id: Optional[str] = None
    if _is_recognized(name):
        from . import employees as employees_service
        matched = employees_service.match(name)
        if matched is not None:
            if matched.name != name:
                name = matched.name
            employee_id = matched.id

    timestamp = _parse_iso(timestamp_iso)
    if timestamp is None:
        log.warning("record_external_event: unparseable timestamp %r", timestamp_iso)
        return False

    image_path = f"external_{external_event_id}"
    values = {
        "name": name,
        "employee_id": employee_id,
        "timestamp": timestamp,
        "image_path": image_path,
        "image_data": None,
        "camera_id": None,
        "source": "external_api",
        "external_event_id": external_event_id,
        "event_type": event_type,
    }

    try:
        with session_scope() as session:
            result = upsert_on_conflict_do_nothing(
                session,
                AttendanceLog,
                values,
                index_elements=["image_path"],
            )
            return int(result.rowcount or 0) > 0
    except SQLAlchemyError as e:
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
    sql = (
        f"SELECT id, name, timestamp, image_path, image_data "
        f"FROM {table} WHERE image_data IS NOT NULL"
    )
    params: dict = {}
    if name:
        sql += " AND lower(name) LIKE :name_prefix"
        params["name_prefix"] = f"{name.strip().lower()}%"
    sql += " ORDER BY timestamp DESC, id DESC"
    if limit is not None:
        sql += " LIMIT :limit OFFSET :offset"
        params["limit"] = limit
        params["offset"] = offset
    elif offset:
        sql += " OFFSET :offset"
        params["offset"] = offset
    with session_scope() as session:
        rows = session.execute(text(sql), params).mappings().all()
        return [
            {
                "id": r["id"],
                "name": r["name"],
                "timestamp": _ts_to_str(r["timestamp"]),
                "image_path": r["image_path"],
                "image_data": r["image_data"],
            }
            for r in rows
        ]


def snapshot_log_count() -> int:
    with session_scope() as session:
        result = session.execute(select(func.count()).select_from(SnapshotLog)).scalar_one()
        return int(result or 0)


def snapshot_last_timestamp() -> Optional[str]:
    """Latest snapshot_logs.timestamp (ISO string) or None if table is empty."""
    with session_scope() as session:
        row = session.execute(
            select(SnapshotLog.timestamp)
            .order_by(SnapshotLog.timestamp.desc(), SnapshotLog.id.desc())
            .limit(1)
        ).first()
        return _ts_to_str(row[0]) if row else None


def _row_to_snapshot(row: dict) -> Snapshot:
    raw_ts = row["timestamp"]
    ts = _parse_iso(raw_ts) or datetime.now(timezone.utc)
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
    params: dict = {}
    if name_filter:
        clauses.append("lower(name) LIKE :name_prefix")
        params["name_prefix"] = f"{name_filter.strip().lower()}%"
    if start_date is not None:
        clauses.append("timestamp >= :start_ts")
        params["start_ts"] = start_date.isoformat()
    if end_date is not None:
        from datetime import timedelta
        clauses.append("timestamp < :end_ts")
        params["end_ts"] = (end_date + timedelta(days=1)).isoformat()
    if clauses:
        sql += " WHERE " + " AND ".join(clauses)
    sql += " ORDER BY timestamp ASC"
    with session_scope() as session:
        rows = session.execute(text(sql), params).mappings().all()
        return [_row_to_snapshot(dict(r)) for r in rows]


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
