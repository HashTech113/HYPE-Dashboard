"""Pure attendance logic — group face captures into per-employee daily records.

Storage layer (snapshots/) gives us UTC entry/exit per face crop.
This module turns that into one row per (name, local_date) with status against
a configured shift.
"""

from __future__ import annotations

from dataclasses import dataclass
from datetime import date as date_cls, datetime, time, timedelta, timezone
from typing import Iterable, Optional

from .snapshots import Snapshot


@dataclass(frozen=True)
class ShiftSettings:
    start: time              # local
    end: time                # local
    late_grace_min: int
    early_exit_grace_min: int
    tz_offset_min: int       # local timezone offset from UTC, in minutes


def parse_hhmm(value: str) -> time:
    hh, mm = value.split(":")
    return time(hour=int(hh), minute=int(mm))


def _local_tz(offset_min: int) -> timezone:
    return timezone(timedelta(minutes=offset_min))


def _to_local(dt: datetime, tz_offset_min: int) -> datetime:
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    return dt.astimezone(_local_tz(tz_offset_min))


def _format_hours_minutes(minutes: int) -> str:
    if minutes <= 0:
        return "—"
    hours = minutes // 60
    mins = minutes % 60
    return f"{hours}h {mins:02d}m"


def _classify(
    entry_local: datetime,
    exit_local: datetime,
    shift: ShiftSettings,
) -> tuple[str, int, int, int, int]:
    """Returns (status, late_minutes, early_exit_minutes, late_seconds, early_exit_seconds)."""
    shift_start = entry_local.replace(
        hour=shift.start.hour, minute=shift.start.minute, second=0, microsecond=0
    )
    shift_end = entry_local.replace(
        hour=shift.end.hour, minute=shift.end.minute, second=0, microsecond=0
    )

    late_seconds = max(0, int((entry_local - shift_start).total_seconds()))
    early_exit_seconds = max(0, int((shift_end - exit_local).total_seconds()))
    late_min = late_seconds // 60
    early_min = early_exit_seconds // 60

    is_late = late_seconds > shift.late_grace_min * 60
    is_early = early_exit_seconds > shift.early_exit_grace_min * 60

    # Priority: arriving late dominates, then early exit, else present.
    if is_late:
        status = "Late"
    elif is_early:
        status = "Early Exit"
    else:
        status = "Present"

    return status, late_min, early_min, late_seconds, early_exit_seconds


def _image_url(base_url: str, filename: str) -> str:
    return f"{base_url.rstrip('/')}/snapshots/{filename}"


def _normalize_name(name: str) -> str:
    return " ".join(name.strip().split())


def build_daily_records(
    snapshots: Iterable[Snapshot],
    *,
    target_date: date_cls,
    shift: ShiftSettings,
    base_url: str,
    expected_names: Optional[list[str]] = None,
) -> list[dict]:
    """One record per name detected on `target_date` (local). Optionally
    fills in 'Absent' rows for `expected_names` not found.
    """
    by_name: dict[str, list[Snapshot]] = {}
    for snap in snapshots:
        entry_local = _to_local(snap.entry, shift.tz_offset_min)
        if entry_local.date() != target_date:
            continue
        key = _normalize_name(snap.name)
        if not key:
            continue
        by_name.setdefault(key, []).append(snap)

    records: list[dict] = []
    for name, snaps in by_name.items():
        snaps_sorted = sorted(snaps, key=lambda s: s.entry)
        first = snaps_sorted[0]
        last = snaps_sorted[-1]
        entry_local = _to_local(first.entry, shift.tz_offset_min)
        exit_local = _to_local(last.exit, shift.tz_offset_min)

        total_min = max(0, int((exit_local - entry_local).total_seconds() // 60))
        status, late_min, early_min, late_seconds, early_exit_seconds = _classify(entry_local, exit_local, shift)

        records.append({
            "name": name,
            "date": target_date.isoformat(),
            "entry": entry_local.strftime("%H:%M:%S"),
            "exit": exit_local.strftime("%H:%M:%S"),
            "entry_iso": entry_local.isoformat(),
            "exit_iso": exit_local.isoformat(),
            "total_hours": _format_hours_minutes(total_min),
            "total_minutes": total_min,
            "status": status,
            "late_minutes": late_min,
            "late_seconds": late_seconds,
            "early_exit_minutes": early_min,
            "early_exit_seconds": early_exit_seconds,
            "capture_count": len(snaps_sorted),
            "entry_image_url": _image_url(base_url, first.filename),
            "exit_image_url": _image_url(base_url, last.filename),
        })

    if expected_names:
        seen = {r["name"].lower() for r in records}
        for raw in expected_names:
            normalized = _normalize_name(raw)
            if not normalized or normalized.lower() in seen:
                continue
            records.append({
                "name": normalized,
                "date": target_date.isoformat(),
                "entry": None,
                "exit": None,
                "entry_iso": None,
                "exit_iso": None,
                "total_hours": "—",
                "total_minutes": 0,
                "status": "Absent",
                "late_minutes": 0,
                "late_seconds": 0,
                "early_exit_minutes": 0,
                "early_exit_seconds": 0,
                "capture_count": 0,
                "entry_image_url": None,
                "exit_image_url": None,
            })

    records.sort(key=lambda r: (r["status"] == "Absent", r["name"].lower()))
    return records


def build_range_records(
    snapshots: Iterable[Snapshot],
    *,
    start_date: date_cls,
    end_date: date_cls,
    shift: ShiftSettings,
    base_url: str,
    name_filter: Optional[str] = None,
) -> list[dict]:
    """Daily records across a date range. If `name_filter` is given, only
    that person's days are returned (case-insensitive, ignores extra spaces).
    """
    snaps_list = list(snapshots)
    if name_filter:
        target = _normalize_name(name_filter).lower()
        snaps_list = [s for s in snaps_list if _normalize_name(s.name).lower() == target]

    out: list[dict] = []
    cursor = start_date
    while cursor <= end_date:
        out.extend(
            build_daily_records(
                snaps_list,
                target_date=cursor,
                shift=shift,
                base_url=base_url,
            )
        )
        cursor += timedelta(days=1)

    out.sort(key=lambda r: (r["date"], r["name"].lower()))
    return out
