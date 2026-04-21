"""Employee directory — name/company mapping consumed by routers.

Single source of truth is ``backend/data/employees.json``. In the future this
can be backed by a DB table without changing the callers.
"""

from __future__ import annotations

import json
import logging
import re
import threading
from dataclasses import dataclass
from pathlib import Path
from typing import Optional

log = logging.getLogger(__name__)

_DATA_PATH = Path(__file__).resolve().parent.parent.parent / "data" / "employees.json"
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


_cache_lock = threading.Lock()
_cache: Optional[list[Employee]] = None


def _load() -> list[Employee]:
    try:
        raw = json.loads(_DATA_PATH.read_text())
    except (OSError, ValueError) as e:
        log.warning("Could not read %s: %s — employees unavailable", _DATA_PATH, e)
        return []

    out: list[Employee] = []
    for item in raw:
        try:
            out.append(
                Employee(
                    id=str(item["id"]),
                    name=str(item["name"]),
                    employee_id=str(item.get("employeeId") or item["id"]),
                    company=str(item.get("company") or ""),
                    department=str(item.get("department") or ""),
                    shift=str(item.get("shift") or ""),
                    role=str(item.get("role") or "Employee"),
                )
            )
        except KeyError as e:
            log.warning("Skipping malformed employee row (missing %s): %s", e, item)
    return out


def all_employees() -> list[Employee]:
    global _cache
    with _cache_lock:
        if _cache is None:
            _cache = _load()
        return list(_cache)


def reload() -> int:
    """Force a reload — call after editing employees.json on disk."""
    global _cache
    with _cache_lock:
        _cache = _load()
        return len(_cache)


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
