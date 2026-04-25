"""Employee directory — name/company mapping consumed by routers.

Backed by SQLite (``employees`` table). On first boot an empty table is
seeded from ``backend/data/employees.json`` so the roster is never
accidentally blank after a fresh Railway deploy.

Edits go through create/update/delete; all writes persist as long as the
SQLite file survives (forever locally; until the next deploy on Railway
without a volume mount — consider Railway volumes or Postgres if long-
term persistence across redeploys is required).
"""

from __future__ import annotations

import json
import logging
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Optional

from ..db import connect

log = logging.getLogger(__name__)

_SEED_PATH = Path(__file__).resolve().parent.parent.parent / "data" / "employees.json"
_NORMALIZE_RE = re.compile(r"[^a-z0-9]+")


@dataclass(frozen=True)
class Employee:
    id: str
    name: str
    employee_id: str
    company: str
    department: str
    shift: str
    role: str
    dob: str = ""
    image_url: str = ""


def _row_to_employee(row) -> Employee:
    keys = row.keys()
    return Employee(
        id=str(row["id"]),
        name=str(row["name"]),
        employee_id=str(row["employee_id"]),
        company=str(row["company"] or ""),
        department=str(row["department"] or ""),
        shift=str(row["shift"] or ""),
        role=str(row["role"] or "Employee"),
        dob=str(row["dob"] or "") if "dob" in keys else "",
        image_url=str(row["image_url"] or "") if "image_url" in keys else "",
    )


_SELECT_COLUMNS = "id, name, employee_id, company, department, shift, role, dob, image_url"


def all_employees() -> list[Employee]:
    with connect() as conn:
        rows = conn.execute(
            f"SELECT {_SELECT_COLUMNS} FROM employees ORDER BY name COLLATE NOCASE"
        ).fetchall()
    return [_row_to_employee(r) for r in rows]


def get_by_id(employee_id: str) -> Optional[Employee]:
    with connect() as conn:
        row = conn.execute(
            f"SELECT {_SELECT_COLUMNS} FROM employees WHERE id = ?",
            (employee_id,),
        ).fetchone()
    return _row_to_employee(row) if row else None


def create(
    *,
    id: str,
    name: str,
    employee_id: str,
    company: str = "",
    department: str = "",
    shift: str = "",
    role: str = "Employee",
    dob: str = "",
    image_url: str = "",
) -> Employee:
    with connect() as conn:
        conn.execute(
            "INSERT INTO employees (id, name, employee_id, company, department, shift, role, dob, image_url) "
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (id, name, employee_id, company, department, shift, role, dob, image_url),
        )
    loaded = get_by_id(id)
    assert loaded is not None, "created employee should load back"
    return loaded


_UPDATABLE_COLUMNS = {
    "name", "employee_id", "company", "department", "shift", "role", "dob", "image_url",
}


def update(employee_id: str, patch: dict) -> Optional[Employee]:
    fields = [(k, v) for k, v in patch.items() if k in _UPDATABLE_COLUMNS and v is not None]
    if not fields:
        return get_by_id(employee_id)

    # If the name is changing, propagate the new name to every table that
    # stores it so attendance/reports for this person stay continuous.
    # Wrapped in BEGIN/COMMIT so the employees row + the historical rows
    # commit together; on any failure, nothing changes.
    new_name = patch.get("name")
    old_record = get_by_id(employee_id) if new_name else None
    rename_from: Optional[str] = (
        old_record.name if old_record and new_name and old_record.name != new_name else None
    )

    set_clause = ", ".join(f"{k} = ?" for k, _ in fields)
    values = [v for _, v in fields]
    with connect() as conn:
        try:
            conn.execute("BEGIN")
            cur = conn.execute(
                f"UPDATE employees SET {set_clause} WHERE id = ?",
                [*values, employee_id],
            )
            if cur.rowcount == 0:
                conn.execute("ROLLBACK")
                return None
            if rename_from:
                _rename_employee_name(conn, rename_from, new_name)
            conn.execute("COMMIT")
        except Exception:
            conn.execute("ROLLBACK")
            raise
    return get_by_id(employee_id)


def _rename_employee_name(conn, old_name: str, new_name: str) -> dict[str, int]:
    """Rewrite the employee name across every table that stores it. Caller
    is responsible for the surrounding transaction. Returns the rowcount
    per table for logging.
    """
    counts: dict[str, int] = {}
    for table in ("snapshot_logs", "attendance_logs", "attendance_corrections"):
        n = conn.execute(
            f"UPDATE {table} SET name = ? WHERE name = ?",
            (new_name, old_name),
        ).rowcount
        counts[table] = n
        log.info(
            "employee rename: %s rewrote %d rows from %r to %r",
            table, n, old_name, new_name,
        )
    return counts


def delete(employee_id: str) -> bool:
    with connect() as conn:
        cur = conn.execute("DELETE FROM employees WHERE id = ?", (employee_id,))
        return cur.rowcount > 0


def _seed_rows_from_json() -> list[dict]:
    try:
        raw = json.loads(_SEED_PATH.read_text())
    except (OSError, ValueError) as e:
        log.warning("Could not read seed %s: %s", _SEED_PATH, e)
        return []
    return raw if isinstance(raw, list) else []


def seed_if_empty() -> int:
    """Populate employees from the bundled JSON if the table is empty."""
    with connect() as conn:
        count = conn.execute("SELECT COUNT(*) AS c FROM employees").fetchone()["c"]
        if count > 0:
            return 0
        seed = _seed_rows_from_json()
        for row in seed:
            try:
                conn.execute(
                    "INSERT OR IGNORE INTO employees (id, name, employee_id, company, "
                    "department, shift, role, dob, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    (
                        str(row["id"]),
                        str(row["name"]),
                        str(row.get("employeeId") or row["id"]),
                        str(row.get("company") or ""),
                        str(row.get("department") or ""),
                        str(row.get("shift") or ""),
                        str(row.get("role") or "Employee"),
                        str(row.get("dob") or ""),
                        str(row.get("imageUrl") or ""),
                    ),
                )
            except KeyError as e:
                log.warning("Skipping malformed seed row (missing %s): %s", e, row)
    return len(seed)


def _normalize(value: str) -> str:
    return _NORMALIZE_RE.sub("", value.strip().lower())


def match(capture_name: str, *, employees: Optional[list[Employee]] = None) -> Optional[Employee]:
    """Ports frontend nameMatch.ts: case-insensitive, ignores punctuation/
    whitespace, allows bidirectional prefix match. "Ambika" matches
    "Ambika Menon"; "Akhil c v" matches "Akhil".
    """
    a = _normalize(capture_name)
    if not a:
        return None
    for emp in employees if employees is not None else all_employees():
        b = _normalize(emp.name)
        if not b:
            continue
        if a == b or a.startswith(b) or b.startswith(a):
            return emp
    return None


def company_for(capture_name: str, *, employees: Optional[list[Employee]] = None) -> Optional[str]:
    emp = match(capture_name, employees=employees)
    return emp.company if emp else None
