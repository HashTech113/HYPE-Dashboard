"""Push the local employee roster to a remote backend (e.g. Railway).

Source of truth: whatever GET /api/employees returns from the source (defaults
to localhost). Each employee is upserted into the target: PUT if the id
already exists, POST if not. Optionally deletes target-only rows.

Usage
-----
    # dry run — see what will change
    python backend/sync_employees_to_prod.py --dry-run

    # apply (default target: Railway production URL)
    python backend/sync_employees_to_prod.py

    # overrides
    SOURCE_URL=http://localhost:8000 \
    TARGET_URL=https://hype-dashboard-production-8938.up.railway.app \
        python backend/sync_employees_to_prod.py

    # also delete employees that exist on target but not in source
    python backend/sync_employees_to_prod.py --prune
"""

from __future__ import annotations

import argparse
import json
import logging
import os
import sys
from typing import Any
from urllib import error as urlerr
from urllib import request as urlreq

logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")
log = logging.getLogger("sync")

SOURCE_URL = os.getenv("SOURCE_URL", "http://localhost:8000").rstrip("/")
TARGET_URL = os.getenv(
    "TARGET_URL",
    "https://hype-dashboard-production-8938.up.railway.app",
).rstrip("/")


def _request(method: str, url: str, payload: dict | None = None) -> tuple[int, dict | None]:
    body = json.dumps(payload).encode() if payload is not None else None
    headers = {"Content-Type": "application/json"} if body else {}
    req = urlreq.Request(url, data=body, method=method, headers=headers)
    try:
        with urlreq.urlopen(req, timeout=30) as resp:
            raw = resp.read().decode("utf-8")
            return resp.status, json.loads(raw) if raw else None
    except urlerr.HTTPError as e:
        raw = e.read().decode("utf-8", errors="replace") if e.fp else ""
        try:
            return e.code, json.loads(raw) if raw else None
        except ValueError:
            return e.code, {"_raw": raw}


def list_employees(base: str) -> list[dict]:
    status, body = _request("GET", f"{base}/api/employees")
    if status != 200 or not body:
        raise RuntimeError(f"GET {base}/api/employees -> {status}: {body}")
    return body.get("items", [])


def _payload(emp: dict, *, include_id: bool) -> dict:
    # Backend EmployeeCreate/Update understands these fields.
    fields = ["name", "employeeId", "company", "department", "shift", "role", "dob"]
    out: dict[str, Any] = {k: emp[k] for k in fields if k in emp and emp[k] is not None}
    if include_id and "id" in emp:
        out["id"] = emp["id"]
    return out


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true", help="print actions without writing")
    ap.add_argument("--prune", action="store_true", help="delete target-only employees")
    args = ap.parse_args(argv)

    log.info("source = %s", SOURCE_URL)
    log.info("target = %s", TARGET_URL)
    log.info("dry-run=%s prune=%s", args.dry_run, args.prune)

    source = {e["id"]: e for e in list_employees(SOURCE_URL)}
    target = {e["id"]: e for e in list_employees(TARGET_URL)}
    log.info("source has %d employees, target has %d", len(source), len(target))

    created = updated = deleted = skipped = failed = 0

    # upsert: source → target
    for eid, src in source.items():
        tgt = target.get(eid)
        if tgt is None:
            log.info("  CREATE id=%s name=%s company=%s", eid, src["name"], src.get("company"))
            if args.dry_run:
                continue
            status, body = _request(
                "POST", f"{TARGET_URL}/api/employees",
                _payload(src, include_id=True),
            )
            if status in (200, 201):
                created += 1
            else:
                failed += 1
                log.warning("    POST failed: %s %s", status, body)
            continue

        fields_that_differ = [
            f for f in ("name", "employeeId", "company", "department", "shift", "role")
            if src.get(f) != tgt.get(f)
        ]
        if not fields_that_differ:
            skipped += 1
            continue

        log.info(
            "  UPDATE id=%s name=%s changed=%s",
            eid, src["name"],
            {f: (tgt.get(f), src.get(f)) for f in fields_that_differ},
        )
        if args.dry_run:
            continue
        status, body = _request(
            "PUT", f"{TARGET_URL}/api/employees/{eid}",
            _payload(src, include_id=False),
        )
        if status == 200:
            updated += 1
        else:
            failed += 1
            log.warning("    PUT failed: %s %s", status, body)

    # prune: delete target-only employees
    if args.prune:
        extras = [eid for eid in target if eid not in source]
        for eid in extras:
            log.info("  DELETE id=%s name=%s (target-only)", eid, target[eid].get("name"))
            if args.dry_run:
                continue
            status, body = _request("DELETE", f"{TARGET_URL}/api/employees/{eid}")
            if status in (200, 204):
                deleted += 1
            else:
                failed += 1
                log.warning("    DELETE failed: %s %s", status, body)

    log.info(
        "done. created=%d updated=%d deleted=%d skipped=%d failed=%d",
        created, updated, deleted, skipped, failed,
    )
    return 0 if failed == 0 else 2


if __name__ == "__main__":
    sys.exit(main())
