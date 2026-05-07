"""Idempotent boot-time upgrades that ``Base.metadata.create_all`` cannot
express on its own.

Three responsibilities, all safe to re-run on every startup:

1. **Add columns introduced by this refactor to pre-existing tables.**
   ``Base.metadata.create_all`` only creates *new* tables — it doesn't
   ALTER existing ones. Databases created against the legacy schema are
   missing the new ``employee_id`` FK columns on the log tables, so we
   add them here when absent. ALTER TABLE ADD COLUMN with a nullable type
   is supported on both PostgreSQL and SQLite.

2. **Data copy from the legacy ``attendance_corrections`` table into the
   new ``attendance_report_edits`` table.** Only runs when the source
   table exists AND the destination is empty — so it's a one-shot move
   the first time the new schema appears, and a no-op forever after.
   The legacy table is *not* dropped here; per the refactor plan it stays
   for one release as an in-DB safety net. A follow-up commit will drop
   it once the new table is confirmed authoritative in production.

   TODO: drop ``attendance_corrections`` in a follow-up commit once the
   ``attendance_report_edits`` rollout is confirmed stable in production.

3. **Best-effort backfill of ``employee_id`` FK columns** on the three
   tables that gained the new column (``attendance_logs``,
   ``snapshot_logs``, ``attendance_report_edits``). Resolves by
   case-insensitive name match against ``employees.name``; rows whose
   name doesn't match any employee are left as ``employee_id IS NULL``.

Each step runs in its own transaction so a failure late in the sequence
does not roll back earlier successful work.
"""

from __future__ import annotations

import logging
from datetime import date as date_cls, datetime, timezone
from typing import Optional

from sqlalchemy import inspect, select, text

from .db import session_scope
from .models import AttendanceReportEdit, Employee

log = logging.getLogger(__name__)


# Columns that did not exist on the legacy schema. Each tuple is
# (table, column, sql_type) — type is the dialect-portable bit you'd
# write after ADD COLUMN. NULLable, no default, so the ALTER is cheap on
# even very large existing tables.
_NEW_COLUMNS: tuple[tuple[str, str, str], ...] = (
    ("attendance_logs", "employee_id", "VARCHAR(64)"),
    ("snapshot_logs", "employee_id", "VARCHAR(64)"),
)


def _parse_iso(value: Optional[str]) -> Optional[datetime]:
    if not value:
        return None
    try:
        dt = datetime.fromisoformat(str(value).replace("Z", "+00:00"))
    except (TypeError, ValueError):
        return None
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    return dt


def _parse_date(value) -> Optional[date_cls]:
    if value is None:
        return None
    if isinstance(value, date_cls):
        return value
    try:
        return date_cls.fromisoformat(str(value))
    except (TypeError, ValueError):
        return None


def _add_missing_columns(session) -> dict[str, list[str]]:
    """ALTER TABLE ADD COLUMN for every column in ``_NEW_COLUMNS`` that
    doesn't already exist. Returns ``{table: [columns_added]}`` for
    logging purposes."""
    inspector = inspect(session.get_bind())
    added: dict[str, list[str]] = {}
    for table, column, col_type in _NEW_COLUMNS:
        if not inspector.has_table(table):
            continue
        existing = {c["name"] for c in inspector.get_columns(table)}
        if column in existing:
            continue
        # No FK constraint clause here — adding a real FK to a populated
        # table on SQLite is fiddly (table-rebuild required) and on PG
        # requires a separate ALTER. The new ORM model already declares
        # the FK, so any *new* deploys (fresh DB) get it via create_all.
        # Existing deploys keep the column without the FK constraint —
        # which is acceptable because every callsite resolves
        # ``employee_id`` against ``employees.id`` defensively (NULL on
        # miss, ON DELETE-equivalent semantics handled in app code).
        session.execute(text(f"ALTER TABLE {table} ADD COLUMN {column} {col_type}"))
        added.setdefault(table, []).append(column)
    return added


def _legacy_table_exists(session) -> bool:
    return inspect(session.get_bind()).has_table("attendance_corrections")


def _new_table_empty(session) -> bool:
    count = session.execute(
        text("SELECT COUNT(*) FROM attendance_report_edits")
    ).scalar_one()
    return int(count or 0) == 0


def _build_employee_name_map(session) -> dict[str, str]:
    """Map ``lower(name) -> employees.id``. Used to populate the new
    ``employee_id`` FK on legacy rows. Best-effort; misses leave the FK
    as NULL."""
    rows = session.execute(select(Employee.id, Employee.name)).all()
    out: dict[str, str] = {}
    for emp_id, name in rows:
        if not name:
            continue
        out.setdefault(str(name).strip().lower(), str(emp_id))
    return out


def _copy_legacy_corrections(session) -> int:
    """Copy every legacy ``attendance_corrections`` row into
    ``attendance_report_edits``. Returns the number of rows inserted."""
    name_map = _build_employee_name_map(session)
    legacy_rows = session.execute(
        text(
            "SELECT name, date, entry_iso, exit_iso, total_break_seconds, "
            "missing_checkout_resolved, note, status_override, paid_leave, "
            "lop, wfh, updated_by, updated_at FROM attendance_corrections"
        )
    ).mappings().all()

    inserted = 0
    for row in legacy_rows:
        work_date = _parse_date(row["date"])
        if work_date is None:
            log.warning(
                "upgrade: skipping legacy correction with unparseable date "
                "(name=%r, date=%r)", row["name"], row["date"],
            )
            continue
        updated_at = _parse_iso(row["updated_at"]) or datetime.now(timezone.utc)
        edit = AttendanceReportEdit(
            employee_id=name_map.get(str(row["name"] or "").strip().lower()),
            name=str(row["name"] or "").strip(),
            work_date=work_date,
            entry_iso=_parse_iso(row["entry_iso"]),
            exit_iso=_parse_iso(row["exit_iso"]),
            total_break_seconds=row["total_break_seconds"],
            missing_checkout_resolved=bool(row["missing_checkout_resolved"] or 0),
            notes=row["note"],
            status_override=row["status_override"],
            paid_leave=bool(row["paid_leave"] or 0),
            lop=bool(row["lop"] or 0),
            wfh=bool(row["wfh"] or 0),
            updated_by=row["updated_by"],
            created_at=updated_at,
            updated_at=updated_at,
        )
        session.add(edit)
        inserted += 1
    return inserted


def _backfill_employee_ids(session) -> dict[str, int]:
    """Populate ``employee_id`` on log + edit tables for rows where it's
    NULL but the denormalized ``name`` resolves to a known employee.

    Uses a dialect-portable UPDATE-with-correlated-subquery rather than
    UPDATE FROM / JOIN so SQLite (no UPDATE FROM until 3.33+, no FROM at
    all in many embeddings) and PostgreSQL share one code path.
    """
    counts: dict[str, int] = {}
    inspector = inspect(session.get_bind())
    for table in ("attendance_logs", "snapshot_logs", "attendance_report_edits"):
        # Only run if the table exists AND has the column. Defensive: every
        # table is created by init_db, but the column may be absent on legacy
        # tables that haven't gone through _add_missing_columns yet (e.g. if
        # that step failed earlier — fail-soft so this step still runs).
        if not inspector.has_table(table):
            counts[table] = 0
            continue
        cols = {c["name"] for c in inspector.get_columns(table)}
        if "employee_id" not in cols or "name" not in cols:
            counts[table] = 0
            continue
        result = session.execute(
            text(
                f"UPDATE {table} SET employee_id = ("
                "  SELECT e.id FROM employees e "
                f"  WHERE lower(e.name) = lower({table}.name) LIMIT 1"
                ") "
                "WHERE employee_id IS NULL AND name IS NOT NULL"
            )
        )
        counts[table] = int(result.rowcount or 0)
    return counts


def run() -> None:
    """Idempotent boot upgrade — called from ``main.lifespan`` after
    ``init_db()`` and before the seed helpers.

    Each step runs in its own ``session_scope()`` so a failure in a later
    step does NOT roll back successful work from earlier ones.
    """
    # Step 1 — add new columns to pre-existing tables (must run before any
    # SELECT/UPDATE that references those columns).
    try:
        with session_scope() as session:
            added = _add_missing_columns(session)
        if added:
            log.info("upgrade: added missing columns: %s", added)
    except Exception:
        log.exception("upgrade: ALTER TABLE ADD COLUMN failed; continuing")

    # Step 2 — one-shot data copy of legacy corrections into the new table.
    try:
        with session_scope() as session:
            if _legacy_table_exists(session) and _new_table_empty(session):
                copied = _copy_legacy_corrections(session)
                log.info(
                    "upgrade: copied %d row(s) from attendance_corrections -> "
                    "attendance_report_edits (legacy table preserved as a "
                    "safety net; drop in a follow-up commit)",
                    copied,
                )
    except Exception:
        log.exception("upgrade: legacy correction copy failed; continuing")

    # Step 3 — backfill employee_id FKs (idempotent; UPDATE only touches NULLs).
    try:
        with session_scope() as session:
            counts = _backfill_employee_ids(session)
        if any(counts.values()):
            log.info("upgrade: employee_id backfill counts=%s", counts)
    except Exception:
        log.exception("upgrade: employee_id backfill failed; continuing")
