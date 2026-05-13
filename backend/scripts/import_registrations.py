"""Bulk-import the registration-form/ tree into the employees table.

Reads each ``registration form/<folder>/details.json`` and ``front.jpg``,
maps fields to the existing Employee schema, normalizes a handful of
company spellings to match the existing seeded HR scopes, and writes via
``services.employees.create()`` so the lookup tables (companies/
departments/shifts) get populated automatically.

Idempotent: if an Employee with the same primary key (the registration's
UUID) already exists, the row is skipped. Re-runs are safe.

Usage (from backend/):
    python -m scripts.import_registrations [--dry-run]
"""

from __future__ import annotations

import argparse
import base64
import json
import logging
import sys
from pathlib import Path
from typing import Optional

# Make the script runnable as a module from the backend/ directory.
ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from app.db import session_scope  # noqa: E402
from app.models import Employee as EmployeeModel  # noqa: E402
from app.services import employees as employees_service  # noqa: E402

REGISTRATION_DIR = ROOT.parent / "registration form"

# Fold registration company strings into the canonical names that existing
# HR accounts are scoped to. Without this fold, the case/space variants
# would create duplicate rows in `companies` and the existing HR users
# would not see the new employees (HR scoping compares lowercased company
# strings, and "perform 100x" != "perform100x").
COMPANY_NORMALIZE = {
    "perform 100x": "Perform100x",
    "karumitra": "Karu Mitra",
    "karu miyta": "Karu Mitra",
    "startup televison": "Startup TV",
    "startup television": "Startup TV",
    "startup tv": "Startup TV",
    "startup park": "Startup Park",
    "startup school": "Startup School",
    "sib": "Study in Bengaluru",
    "franchisify": "Franchisify",
    "rent your hr": "Rent Your HR",
    "ceo2": "CEO Square",
    "ique ventures": "iQue Ventures",
    "ique cap - delhi team": "iQue CAP - Delhi Team",
    "ique cap - blr team": "iQue CAP - BLR Team",
    "ique cap - kl team": "iQue CAP - KL Team",
    "ique cap - mh team": "iQue CAP - MH Team",
    "ique cap - mp": "iQue CAP - MP Team",
    "ique cap - andra pradesh": "iQue CAP - AP Team",
    "ique cap - andhra pradesh": "iQue CAP - AP Team",
    "ique cap - tn team": "iQue CAP - TN Team",
    "ique cap punjab": "iQue CAP - Punjab Team",
    "ique cap - punjab team": "iQue CAP - Punjab Team",
    "iquecap - core team": "iQue CAP - Core Team",
    "skill univ": "Skill Univ",
    "moonbliss": "Moon Bliss",
    "incubenation": "Incubenation",
    "ceo square": "CEO Square",
    "legal quotient": "Legal Quotient",
    "grow": "Grow",
    "owlytics and grow": "Owlytics",
}

SHIFT_MAP = {
    "morning": "09:30-18:30",
    "night": "22:00-07:00",
    "custom": "09:30-18:30",
}
DEFAULT_SHIFT = "09:30-18:30"

logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")
log = logging.getLogger("import_registrations")


def normalize_company(raw: str) -> str:
    raw = (raw or "").strip()
    if not raw:
        return ""
    return COMPANY_NORMALIZE.get(raw.lower(), raw)


def map_shift(raw: Optional[str]) -> str:
    if not raw:
        return DEFAULT_SHIFT
    return SHIFT_MAP.get(raw.strip().lower(), DEFAULT_SHIFT)


def format_mobile(raw: Optional[str]) -> str:
    digits = "".join(ch for ch in (raw or "") if ch.isdigit())
    if len(digits) == 10:
        return f"+91 {digits[:5]} {digits[5:]}"
    if 10 < len(digits) <= 12:
        cc_len = len(digits) - 10
        cc, local = digits[:cc_len], digits[cc_len:]
        return f"+{cc} {local[:5]} {local[5:]}"
    return raw or ""


def build_full_name(data: dict) -> str:
    parts = [data.get("first_name"), data.get("middle_name"), data.get("last_name")]
    return " ".join(p.strip() for p in parts if p and str(p).strip())


def encode_front_jpeg(folder: Path) -> str:
    f = folder / "front.jpg"
    if not f.exists():
        return ""
    raw = f.read_bytes()
    return f"data:image/jpeg;base64,{base64.b64encode(raw).decode('ascii')}"


def is_test_entry(name: str) -> bool:
    return name.strip().lower().startswith("test")


def collect_records() -> list[dict]:
    out: list[dict] = []
    for folder in sorted(REGISTRATION_DIR.iterdir()):
        if not folder.is_dir():
            continue
        details = folder / "details.json"
        if not details.exists():
            continue
        data = json.loads(details.read_text())
        name = build_full_name(data)
        if is_test_entry(name):
            continue
        out.append({
            "folder": folder,
            "data": data,
            "name": name,
        })
    return out


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true",
                        help="Print actions without writing to the DB.")
    args = parser.parse_args()

    if not REGISTRATION_DIR.exists():
        log.error("registration form/ not found at %s", REGISTRATION_DIR)
        return 1

    records = collect_records()
    log.info("Discovered %d non-test records", len(records))

    created = 0
    skipped_exists = 0
    failed = 0
    new_companies: set[str] = set()

    with session_scope() as session:
        existing_companies = {
            (row[0] or "").strip().lower()
            for row in session.execute(
                __import__("sqlalchemy").text("SELECT name FROM companies")
            ).all()
        }

    for rec in records:
        data = rec["data"]
        emp_id = str(data["id"])

        # Idempotency: skip if this UUID is already an employee row.
        with session_scope() as session:
            if session.get(EmployeeModel, emp_id) is not None:
                skipped_exists += 1
                continue

        company = normalize_company(data.get("company_name") or "")
        if company and company.lower() not in existing_companies:
            new_companies.add(company)

        payload = dict(
            id=emp_id,
            name=rec["name"],
            employee_id=str(data.get("unique_user_id") or ""),
            company=company,
            department=str(data.get("designation") or "").strip(),
            shift=map_shift(data.get("shift_time")),
            role="Employee",
            dob=str(data.get("date_of_birth") or "").strip(),
            image_url=encode_front_jpeg(rec["folder"]),
            email=str(data.get("email") or "").strip(),
            mobile=format_mobile(data.get("phone_number")),
            salary_package="",
        )

        if args.dry_run:
            log.info("DRY-RUN would create: %s | %s | %s",
                     payload["employee_id"], payload["name"], payload["company"])
            created += 1
            continue

        try:
            employees_service.create(**payload)
            created += 1
        except Exception:
            failed += 1
            log.exception("FAILED %s %s", payload["employee_id"], payload["name"])

    log.info("--- summary ---")
    log.info("created       : %d", created)
    log.info("skipped (dup) : %d", skipped_exists)
    log.info("failed        : %d", failed)
    log.info("new companies : %d (%s)",
             len(new_companies), ", ".join(sorted(new_companies)))
    return 0 if failed == 0 else 2


if __name__ == "__main__":
    raise SystemExit(main())
