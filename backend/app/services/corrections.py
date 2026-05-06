"""Manual attendance corrections.

Two flavors of override live in the same ``attendance_corrections`` table,
keyed on (employee name, local date):

* **Log corrections** — entry/exit ISO time + break seconds + missing-checkout
  flag. Used when face-capture timestamps are wrong (camera outage, missed
  exit, etc).
* **Report-level overrides** — ``status_override`` (final string), and the
  flags ``paid_leave``/``lop``/``wfh``. Used by HR/Admin to mark days that
  the camera pipeline can't infer (paid leave, LOP, WFH days).

Both flavors are applied on top of the auto-detected record at read time
inside ``services.attendance.build_daily_records``. Raw camera logs are
never mutated.
"""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Optional

from ..db import connect


def _normalize(name: str) -> str:
    return " ".join(name.strip().split())


# Whitelist for status_override. Includes the auto-classified statuses plus
# the HR-only overrides that the camera pipeline can't infer.
ALLOWED_STATUS_OVERRIDES: frozenset[str] = frozenset(
    {"Present", "Late", "Early Exit", "Absent", "WFH", "Paid Leave", "LOP", "Holiday"}
)


def upsert_correction(
    *,
    name: str,
    date: str,
    entry_iso: Optional[str] = None,
    exit_iso: Optional[str] = None,
    total_break_seconds: Optional[int] = None,
    missing_checkout_resolved: bool = False,
    note: Optional[str] = None,
    status_override: Optional[str] = None,
    paid_leave: Optional[bool] = None,
    lop: Optional[bool] = None,
    wfh: Optional[bool] = None,
    updated_by: Optional[str] = None,
) -> dict:
    canonical = _normalize(name)
    if not canonical:
        raise ValueError("name must be non-empty")
    if not date:
        raise ValueError("date must be non-empty")
    if status_override is not None and status_override not in ALLOWED_STATUS_OVERRIDES:
        raise ValueError(
            f"status_override must be one of {sorted(ALLOWED_STATUS_OVERRIDES)}"
        )
    now_iso = datetime.now(timezone.utc).isoformat()

    # Coerce flag booleans into 0/1 ints; None means "leave existing value".
    pl = None if paid_leave is None else (1 if paid_leave else 0)
    lp = None if lop is None else (1 if lop else 0)
    wf = None if wfh is None else (1 if wfh else 0)

    with connect() as conn:
        conn.execute(
            "INSERT INTO attendance_corrections "
            "(name, date, entry_iso, exit_iso, total_break_seconds, "
            " missing_checkout_resolved, note, status_override, "
            " paid_leave, lop, wfh, updated_by, updated_at) "
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, "
            "        COALESCE(?, 0), COALESCE(?, 0), COALESCE(?, 0), ?, ?) "
            "ON CONFLICT(name, date) DO UPDATE SET "
            "entry_iso = COALESCE(excluded.entry_iso, attendance_corrections.entry_iso), "
            "exit_iso = COALESCE(excluded.exit_iso, attendance_corrections.exit_iso), "
            "total_break_seconds = COALESCE(excluded.total_break_seconds, attendance_corrections.total_break_seconds), "
            "missing_checkout_resolved = excluded.missing_checkout_resolved, "
            "note = COALESCE(excluded.note, attendance_corrections.note), "
            "status_override = COALESCE(excluded.status_override, attendance_corrections.status_override), "
            "paid_leave = COALESCE(?, attendance_corrections.paid_leave), "
            "lop = COALESCE(?, attendance_corrections.lop), "
            "wfh = COALESCE(?, attendance_corrections.wfh), "
            "updated_by = COALESCE(excluded.updated_by, attendance_corrections.updated_by), "
            "updated_at = excluded.updated_at",
            (
                canonical,
                date,
                entry_iso,
                exit_iso,
                total_break_seconds,
                1 if missing_checkout_resolved else 0,
                note,
                status_override,
                pl,
                lp,
                wf,
                updated_by,
                now_iso,
                # Repeated for the ON CONFLICT clause so partial updates can
                # leave the existing flag untouched when None is supplied.
                pl,
                lp,
                wf,
            ),
        )
        row = conn.execute(
            "SELECT name, date, entry_iso, exit_iso, total_break_seconds, "
            "missing_checkout_resolved, note, status_override, "
            "paid_leave, lop, wfh, updated_by, updated_at "
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


def list_corrections(
    *,
    name: Optional[str] = None,
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
) -> list[dict]:
    """Return corrections optionally filtered by name and/or inclusive date
    range. Used by the HR-facing editor to pre-populate the month grid."""
    sql = (
        "SELECT name, date, entry_iso, exit_iso, total_break_seconds, "
        "missing_checkout_resolved, note, status_override, "
        "paid_leave, lop, wfh, updated_by, updated_at "
        "FROM attendance_corrections WHERE 1=1"
    )
    params: list = []
    if name:
        sql += " AND lower(name) = lower(?)"
        params.append(_normalize(name))
    if start_date:
        sql += " AND date >= ?"
        params.append(start_date)
    if end_date:
        sql += " AND date <= ?"
        params.append(end_date)
    sql += " ORDER BY date ASC, name ASC"
    with connect() as conn:
        rows = conn.execute(sql, params).fetchall()
    return [dict(r) for r in rows]


def load_corrections() -> dict[tuple[str, str], dict]:
    """Return all corrections keyed by (lowercased_name, date)."""
    with connect() as conn:
        rows = conn.execute(
            "SELECT name, date, entry_iso, exit_iso, total_break_seconds, "
            "missing_checkout_resolved, note, status_override, "
            "paid_leave, lop, wfh, updated_by, updated_at "
            "FROM attendance_corrections"
        ).fetchall()
    out: dict[tuple[str, str], dict] = {}
    for r in rows:
        key = (r["name"].strip().lower(), r["date"])
        out[key] = dict(r)
    return out
