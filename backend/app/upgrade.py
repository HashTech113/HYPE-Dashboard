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
from .services.lookups import (
    get_or_create_company_id,
    get_or_create_department_id,
    get_or_create_shift_id,
)

log = logging.getLogger(__name__)


# Columns that did not exist on the legacy schema. Each tuple is
# (table, column, sql_type) — type is the dialect-portable bit you'd
# write after ADD COLUMN. NULLable, no default, so the ALTER is cheap on
# even very large existing tables.
_NEW_COLUMNS: tuple[tuple[str, str, str], ...] = (
    ("attendance_logs", "employee_id", "VARCHAR(64)"),
    ("snapshot_logs", "employee_id", "VARCHAR(64)"),
    # users.email: new optional column on the User model (nullable VARCHAR
    # with a UNIQUE index when populated). The unique index is created on
    # fresh DBs by metadata.create_all but cannot be safely added to a
    # populated legacy table that may already have NULLs in the column —
    # we add the column itself here; the application treats email as
    # optional and any later UNIQUE-add would be a follow-up migration.
    ("users", "email", "VARCHAR(255)"),
    # Lookup-table FKs introduced by the normalization pass. The string
    # columns (users.company, employees.company / department / shift)
    # remain as transitional compat shims for one release; service writes
    # keep both in sync. A follow-up commit will drop the strings.
    ("users", "company_id", "INTEGER"),
    ("employees", "company_id", "INTEGER"),
    ("employees", "department_id", "INTEGER"),
    ("employees", "shift_id", "INTEGER"),
    # employees.is_active: NOT NULL with DEFAULT TRUE so existing rows are
    # all marked active without a separate UPDATE pass. ``DEFAULT TRUE`` is
    # accepted on both PostgreSQL (boolean literal) and SQLite (parsed as 1).
    ("employees", "is_active", "BOOLEAN NOT NULL DEFAULT TRUE"),
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


def _populate_lookup_tables(session) -> dict[str, int]:
    """Create rows in ``companies`` / ``departments`` / ``shifts`` for every
    distinct non-empty value currently stored in the legacy string columns
    on ``users`` and ``employees``. ``get_or_create_*`` is idempotent so
    re-running this is safe.

    Returns ``{table: rows_created_this_run}`` for logging.
    """
    inspector = inspect(session.get_bind())
    counts: dict[str, int] = {"companies": 0, "departments": 0, "shifts": 0}

    def _distinct(table: str, column: str) -> list[str]:
        if not inspector.has_table(table):
            return []
        cols = {c["name"] for c in inspector.get_columns(table)}
        if column not in cols:
            return []
        return [
            r[0]
            for r in session.execute(
                text(
                    f"SELECT DISTINCT {column} FROM {table} "
                    f"WHERE {column} IS NOT NULL AND {column} != ''"
                )
            ).all()
        ]

    # Track existing ids before insert so we can count *newly created* rows
    # (rather than total rows) for the log line.
    def _seed(model_table: str, names: list[str], helper) -> int:
        if not names:
            return 0
        before = session.execute(
            text(f"SELECT COUNT(*) FROM {model_table}")
        ).scalar_one()
        for name in names:
            helper(session, name)
        after = session.execute(
            text(f"SELECT COUNT(*) FROM {model_table}")
        ).scalar_one()
        return int(after) - int(before)

    company_names = sorted({*_distinct("users", "company"), *_distinct("employees", "company")})
    counts["companies"] = _seed("companies", company_names, get_or_create_company_id)

    dept_names = sorted(set(_distinct("employees", "department")))
    counts["departments"] = _seed("departments", dept_names, get_or_create_department_id)

    shift_names = sorted(set(_distinct("employees", "shift")))
    counts["shifts"] = _seed("shifts", shift_names, get_or_create_shift_id)

    return counts


def _backfill_lookup_fks(session) -> dict[str, int]:
    """Set ``company_id`` / ``department_id`` / ``shift_id`` on existing
    ``users`` and ``employees`` rows by joining the legacy string column to
    the lookup table on lower(name). Only touches rows where the FK is
    NULL, so re-runs are idempotent."""
    inspector = inspect(session.get_bind())
    counts: dict[str, int] = {}

    def _backfill(table: str, str_col: str, fk_col: str, lookup_table: str) -> int:
        if not inspector.has_table(table) or not inspector.has_table(lookup_table):
            return 0
        cols = {c["name"] for c in inspector.get_columns(table)}
        if fk_col not in cols or str_col not in cols:
            return 0
        result = session.execute(
            text(
                f"UPDATE {table} SET {fk_col} = ("
                f"  SELECT l.id FROM {lookup_table} l "
                f"  WHERE lower(l.name) = lower({table}.{str_col}) LIMIT 1"
                ") "
                f"WHERE {fk_col} IS NULL "
                f"  AND {str_col} IS NOT NULL AND {str_col} != ''"
            )
        )
        return int(result.rowcount or 0)

    counts["users.company_id"] = _backfill("users", "company", "company_id", "companies")
    counts["employees.company_id"] = _backfill("employees", "company", "company_id", "companies")
    counts["employees.department_id"] = _backfill("employees", "department", "department_id", "departments")
    counts["employees.shift_id"] = _backfill("employees", "shift", "shift_id", "shifts")
    return counts


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

    # Step 3 — populate the company / department / shift lookup tables from
    # the distinct values currently stored as legacy strings on users +
    # employees. Idempotent (get_or_create skips existing rows).
    try:
        with session_scope() as session:
            counts = _populate_lookup_tables(session)
        if any(counts.values()):
            log.info("upgrade: lookup tables populated counts=%s", counts)
    except Exception:
        log.exception("upgrade: lookup table population failed; continuing")

    # Step 4 — backfill the new FK columns (users.company_id,
    # employees.company_id / department_id / shift_id) by joining the legacy
    # string column to the lookup table.
    try:
        with session_scope() as session:
            counts = _backfill_lookup_fks(session)
        if any(counts.values()):
            log.info("upgrade: lookup FK backfill counts=%s", counts)
    except Exception:
        log.exception("upgrade: lookup FK backfill failed; continuing")

    # Step 5 — backfill employee_id FKs (idempotent; UPDATE only touches NULLs).
    try:
        with session_scope() as session:
            counts = _backfill_employee_ids(session)
        if any(counts.values()):
            log.info("upgrade: employee_id backfill counts=%s", counts)
    except Exception:
        log.exception("upgrade: employee_id backfill failed; continuing")
