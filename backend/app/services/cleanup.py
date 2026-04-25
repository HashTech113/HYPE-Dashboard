"""Snapshot image retention.

Images live as base64 in the ``image_data`` column on ``snapshot_logs`` and
``attendance_logs``. To keep the DB from growing unbounded, this module
nulls out ``image_data`` on rows older than yesterday — except the first
ENTRY and final EXIT capture per (name, local_date), which we keep so the
attendance summary can still render entry/exit thumbnails.

Retention rule:
    today           — keep all images
    yesterday       — keep all images
    older           — keep first + last image per (employee, local date);
                      NULL out image_data on the rest

Attendance rows themselves are never deleted; only ``image_data`` is
cleared. The job is idempotent: the WHERE clause skips rows that were
already pruned, so re-running it is a no-op.
"""

from __future__ import annotations

import logging
from collections import defaultdict
from datetime import date as date_cls, datetime, time, timedelta, timezone
from typing import Optional

from ..config import LOCAL_TZ_OFFSET_MIN
from ..db import connect

log = logging.getLogger(__name__)

_TABLES = ("snapshot_logs", "attendance_logs")
_UPDATE_CHUNK = 500
_UNKNOWN_NAME = "unknown"


def _local_tz() -> timezone:
    return timezone(timedelta(minutes=LOCAL_TZ_OFFSET_MIN))


def today_local() -> date_cls:
    return datetime.now(timezone.utc).astimezone(_local_tz()).date()


def _local_midnight_utc_iso(local_date: date_cls) -> str:
    midnight_local = datetime.combine(local_date, time(0, 0), tzinfo=_local_tz())
    return midnight_local.astimezone(timezone.utc).isoformat()


def _parse_utc(ts: str) -> Optional[datetime]:
    try:
        dt = datetime.fromisoformat(ts.replace("Z", "+00:00"))
    except ValueError:
        return None
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    return dt.astimezone(timezone.utc)


def _is_unknown(name_key: str) -> bool:
    return not name_key or name_key == _UNKNOWN_NAME


def prune_old_snapshots() -> dict[str, int]:
    """Apply the retention rule. Returns the number of rows whose
    ``image_data`` was cleared, per table."""
    today = today_local()
    yesterday = today - timedelta(days=1)
    # Anything strictly older than the start of `yesterday` (local) is in scope.
    cutoff_utc_iso = _local_midnight_utc_iso(yesterday)
    tz = _local_tz()

    summary: dict[str, int] = {}
    for table in _TABLES:
        with connect() as conn:
            rows = conn.execute(
                f"SELECT id, name, timestamp FROM {table} "
                f"WHERE image_data IS NOT NULL AND timestamp < ?",
                (cutoff_utc_iso,),
            ).fetchall()

            groups: dict[tuple[str, date_cls], list[tuple[datetime, int]]] = defaultdict(list)
            for r in rows:
                ts = _parse_utc(r["timestamp"])
                if ts is None:
                    continue
                local_date = ts.astimezone(tz).date()
                # Defensive: a row whose UTC ts < cutoff but whose local date
                # still falls on `yesterday` (or later) should not be pruned.
                if local_date >= yesterday:
                    continue
                key = (r["name"].strip().lower(), local_date)
                groups[key].append((ts, r["id"]))

            ids_to_clear: list[int] = []
            kept_count = 0
            for (name_key, _date), items in groups.items():
                items.sort(key=lambda x: (x[0], x[1]))
                if _is_unknown(name_key):
                    # Unknown faces have no entry/exit semantics — drop all.
                    ids_to_clear.extend(_id for _, _id in items)
                else:
                    keep_ids = {items[0][1], items[-1][1]}
                    kept_count += len(keep_ids)
                    ids_to_clear.extend(_id for _, _id in items if _id not in keep_ids)

            cleared = 0
            for i in range(0, len(ids_to_clear), _UPDATE_CHUNK):
                chunk = ids_to_clear[i : i + _UPDATE_CHUNK]
                placeholders = ",".join("?" * len(chunk))
                conn.execute(
                    f"UPDATE {table} SET image_data = NULL WHERE id IN ({placeholders})",
                    chunk,
                )
                cleared += len(chunk)
            summary[table] = cleared

            log.info(
                "retention[%s]: scanned %d candidate rows older than %s (local), "
                "kept %d entry/exit images, cleared image_data on %d rows",
                table, len(rows), yesterday.isoformat(), kept_count, cleared,
            )
    return summary


def seconds_until_next_local_midnight() -> float:
    """Seconds from now until 00:00:30 local on the next local day. The 30s
    cushion makes sure the cleanup runs *after* the date boundary rather
    than racing it."""
    tz = _local_tz()
    now_local = datetime.now(timezone.utc).astimezone(tz)
    next_day = (now_local + timedelta(days=1)).date()
    next_run_local = datetime.combine(next_day, time(0, 0, 30), tzinfo=tz)
    delta = (next_run_local - now_local).total_seconds()
    return max(60.0, delta)
