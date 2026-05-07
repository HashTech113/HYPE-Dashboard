"""Get-or-create helpers for the company / department / shift lookup tables.

Used by:
* ``services.employees`` and ``services.auth`` when creating or updating
  rows that reference these lookups.
* ``app.upgrade`` when backfilling FK columns from legacy string columns.
* ``scripts.migrate_sqlite_to_postgres`` when populating the destination
  PG instance from the legacy SQLite source.

The pattern is the same for all three: trim the input, treat empty as
"no lookup needed" (returns ``None``), look up by name (case-insensitive),
INSERT if missing, return the row id. Duplicates are guarded by the
``UNIQUE(name)`` constraint on every lookup table — a concurrent INSERT
that loses the race surfaces as an IntegrityError; the helper retries the
SELECT once and returns the now-existing id.
"""

from __future__ import annotations

from typing import Any, Optional, Type

from sqlalchemy import func, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from ..models import Company, Department, Shift


def _normalize(name: str) -> str:
    return " ".join((name or "").strip().split())


def _get_or_create(session: Session, model: Type[Any], name: str) -> Optional[int]:
    canonical = _normalize(name)
    if not canonical:
        return None
    # Case-insensitive lookup so "WAWU" and "wawu" don't get duplicate rows
    # if both spellings appear in seed/legacy data.
    row_id = session.execute(
        select(model.id).where(func.lower(model.name) == canonical.lower())
    ).scalar_one_or_none()
    if row_id is not None:
        return int(row_id)
    new_row = model(name=canonical)
    session.add(new_row)
    try:
        session.flush()
    except IntegrityError:
        session.rollback()
        # Another transaction won the race — re-read.
        row_id = session.execute(
            select(model.id).where(func.lower(model.name) == canonical.lower())
        ).scalar_one_or_none()
        if row_id is not None:
            return int(row_id)
        raise
    return int(new_row.id)


def get_or_create_company_id(session: Session, name: str) -> Optional[int]:
    return _get_or_create(session, Company, name)


def get_or_create_department_id(session: Session, name: str) -> Optional[int]:
    return _get_or_create(session, Department, name)


def get_or_create_shift_id(session: Session, name: str) -> Optional[int]:
    return _get_or_create(session, Shift, name)
