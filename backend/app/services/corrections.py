"""Manual attendance corrections.

When automatic detection from snapshot timestamps gets it wrong (camera
outage, mis-recognised face, missing checkout), an admin can override the
computed values for a single (name, local_date) pair. The corrections live
in the ``attendance_corrections`` table and are merged on top of the
auto-detected record at read time.
"""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Optional

from ..db import connect


def _normalize(name: str) -> str:
    return " ".join(name.strip().split())


def upsert_correction(
    *,
    name: str,
    date: str,
    entry_iso: Optional[str] = None,
    exit_iso: Optional[str] = None,
    total_break_seconds: Optional[int] = None,
    missing_checkout_resolved: bool = False,
    note: Optional[str] = None,
) -> dict:
    canonical = _normalize(name)
    if not canonical:
        raise ValueError("name must be non-empty")
    if not date:
        raise ValueError("date must be non-empty")
    now_iso = datetime.now(timezone.utc).isoformat()
    with connect() as conn:
        conn.execute(
            "INSERT INTO attendance_corrections "
            "(name, date, entry_iso, exit_iso, total_break_seconds, "
            " missing_checkout_resolved, note, updated_at) "
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?) "
            "ON CONFLICT(name, date) DO UPDATE SET "
            "entry_iso = COALESCE(excluded.entry_iso, attendance_corrections.entry_iso), "
            "exit_iso = COALESCE(excluded.exit_iso, attendance_corrections.exit_iso), "
            "total_break_seconds = COALESCE(excluded.total_break_seconds, attendance_corrections.total_break_seconds), "
            "missing_checkout_resolved = excluded.missing_checkout_resolved, "
            "note = COALESCE(excluded.note, attendance_corrections.note), "
            "updated_at = excluded.updated_at",
            (
                canonical,
                date,
                entry_iso,
                exit_iso,
                total_break_seconds,
                1 if missing_checkout_resolved else 0,
                note,
                now_iso,
            ),
        )
        row = conn.execute(
            "SELECT name, date, entry_iso, exit_iso, total_break_seconds, "
            "missing_checkout_resolved, note, updated_at "
            "FROM attendance_corrections WHERE name = ? AND date = ?",
            (canonical, date),
        ).fetchone()
    return dict(row) if row else {}


def delete_correction(*, name: str, date: str) -> int:
    canonical = _normalize(name)
    with connect() as conn:
        cur = conn.execute(
            "DELETE FROM attendance_corrections WHERE name = ? AND date = ?",
            (canonical, date),
        )
        return cur.rowcount


def load_corrections() -> dict[tuple[str, str], dict]:
    """Return all corrections keyed by (lowercased_name, date)."""
    with connect() as conn:
        rows = conn.execute(
            "SELECT name, date, entry_iso, exit_iso, total_break_seconds, "
            "missing_checkout_resolved, note, updated_at "
            "FROM attendance_corrections"
        ).fetchall()
    out: dict[tuple[str, str], dict] = {}
    for r in rows:
        key = (r["name"].strip().lower(), r["date"])
        out[key] = dict(r)
    return out
