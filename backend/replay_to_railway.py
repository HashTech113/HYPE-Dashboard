"""Backfill local snapshot_logs + employees to a remote ingest URL.

Usage:
    # one-shot
    python replay_to_railway.py --target <URL>

    # continuous loop (re-scan every 300s, auto-heal any gaps)
    python replay_to_railway.py --target <URL> --loop 300

Two tables get synced on every pass:

1. snapshot_logs — append-only; the remote's UNIQUE(image_path) makes it
   idempotent. We derive snap_id from the local image_path so the remote
   reconstructs the same image_path and dedup works end-to-end.

2. employees — one-way local → remote upsert: POST if id not present,
   PUT if fields differ, skip if identical. Local is source of truth;
   edits made only on the deployed side will be overwritten within one
   loop pass. Deletions never propagate (safer). Disable with
   --no-sync-employees.
"""

from __future__ import annotations

import argparse
import sys
import time

import requests

from app.db import connect


def extract_snap_id(image_path: str) -> str | None:
    if image_path.startswith("ingest_") and image_path.endswith(".jpg"):
        return image_path[len("ingest_"):-len(".jpg")]
    return None


RETRY_MAX = 3
RETRY_BACKOFF = 2.0


def post_with_retry(session: requests.Session, url: str, payload: dict, timeout: float) -> tuple[bool, bool]:
    """Returns (ok, stored). On transient 5xx / network error retries up to RETRY_MAX."""
    for attempt in range(1, RETRY_MAX + 1):
        try:
            resp = session.post(url, json=payload, timeout=timeout)
        except requests.RequestException:
            if attempt < RETRY_MAX:
                time.sleep(RETRY_BACKOFF * attempt)
                continue
            return False, False
        if resp.status_code == 200:
            return True, bool(resp.json().get("stored"))
        if 500 <= resp.status_code < 600 and attempt < RETRY_MAX:
            time.sleep(RETRY_BACKOFF * attempt)
            continue
        return False, False
    return False, False


def replay_once(target: str, timeout: float, sleep_between: float) -> tuple[int, int, int]:
    with connect() as conn:
        rows = conn.execute(
            "SELECT name, timestamp, image_path, image_data FROM snapshot_logs "
            "WHERE image_data IS NOT NULL AND image_data != '' "
            "ORDER BY id ASC"
        ).fetchall()

    total = len(rows)
    print(f"replaying {total} rows to {target}", flush=True)

    session = requests.Session()
    stored = skipped = failed = 0
    for i, row in enumerate(rows, 1):
        payload = {
            "name": row["name"],
            "timestamp": row["timestamp"],
            "image_base64": row["image_data"],
            "snap_id": extract_snap_id(row["image_path"]),
        }
        ok, was_stored = post_with_retry(session, target, payload, timeout)
        if not ok:
            failed += 1
        elif was_stored:
            stored += 1
        else:
            skipped += 1
        if i % 100 == 0 or i == total:
            print(f"[{i}/{total}] stored={stored} skipped={skipped} failed={failed}", flush=True)
        time.sleep(sleep_between)

    print(f"pass complete — stored={stored} skipped={skipped} failed={failed}", flush=True)
    return stored, skipped, failed


def _derive_remote_base(ingest_url: str) -> str:
    base = ingest_url.rstrip("/")
    suffix = "/api/ingest"
    if base.endswith(suffix):
        base = base[: -len(suffix)]
    return base


def _employee_matches_remote(emp, remote: dict) -> bool:
    return (
        remote.get("name", "") == emp.name
        and remote.get("employeeId", "") == emp.employee_id
        and (remote.get("company") or "") == (emp.company or "")
        and (remote.get("department") or "") == (emp.department or "")
        and (remote.get("shift") or "") == (emp.shift or "")
        and (remote.get("role") or "Employee") == (emp.role or "Employee")
        and (remote.get("dob") or "") == (emp.dob or "")
    )


def sync_employees_once(remote_base: str, timeout: float) -> tuple[int, int, int]:
    """One-way local → remote upsert. Returns (upserted, skipped, failed)."""
    from app.services import employees as employees_service

    local = employees_service.all_employees()
    session = requests.Session()

    try:
        resp = session.get(f"{remote_base}/api/employees", timeout=timeout)
        resp.raise_for_status()
        remote_map = {e["id"]: e for e in resp.json().get("items", [])}
    except requests.RequestException as exc:
        print(f"employees: remote fetch failed: {exc}", flush=True)
        return 0, 0, 1

    upserted = skipped = failed = 0
    for emp in local:
        payload = {
            "name": emp.name,
            "employeeId": emp.employee_id,
            "company": emp.company,
            "department": emp.department,
            "shift": emp.shift,
            "role": emp.role,
            "dob": emp.dob or "",
        }
        try:
            if emp.id not in remote_map:
                resp = session.post(
                    f"{remote_base}/api/employees",
                    json={**payload, "id": emp.id},
                    timeout=timeout,
                )
                if resp.status_code in (200, 201):
                    upserted += 1
                else:
                    failed += 1
                    print(
                        f"employees POST {emp.id} HTTP {resp.status_code}: {resp.text[:200]}",
                        flush=True,
                    )
            elif not _employee_matches_remote(emp, remote_map[emp.id]):
                resp = session.put(
                    f"{remote_base}/api/employees/{emp.id}",
                    json=payload,
                    timeout=timeout,
                )
                if resp.status_code == 200:
                    upserted += 1
                else:
                    failed += 1
                    print(
                        f"employees PUT {emp.id} HTTP {resp.status_code}: {resp.text[:200]}",
                        flush=True,
                    )
            else:
                skipped += 1
        except requests.RequestException as exc:
            failed += 1
            print(f"employees {emp.id} failed: {exc}", flush=True)

    print(
        f"employees sync — upserted={upserted} skipped={skipped} failed={failed}",
        flush=True,
    )
    return upserted, skipped, failed


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--target", required=True, help="Remote /api/ingest URL")
    parser.add_argument("--timeout", type=float, default=30.0)
    parser.add_argument("--sleep", type=float, default=0.05, help="Seconds between posts")
    parser.add_argument("--loop", type=float, default=0.0,
                        help="If >0, run forever — sleep this many seconds between passes. "
                             "Most rows will be skipped (already present); only new/missing "
                             "rows get inserted.")
    parser.add_argument("--no-sync-employees", action="store_true",
                        help="Disable the one-way employees upsert (local → remote).")
    args = parser.parse_args()

    remote_base = _derive_remote_base(args.target)
    sync_employees = not args.no_sync_employees

    def _one_pass() -> int:
        _, _, snap_failed = replay_once(args.target, args.timeout, args.sleep)
        emp_failed = 0
        if sync_employees:
            _, _, emp_failed = sync_employees_once(remote_base, args.timeout)
        return snap_failed + emp_failed

    if args.loop <= 0:
        return 0 if _one_pass() == 0 else 1

    print(f"loop mode: pass every {args.loop}s (employees sync={'on' if sync_employees else 'off'})", flush=True)
    while True:
        try:
            _one_pass()
        except Exception as exc:
            print(f"pass crashed: {exc}", flush=True)
        time.sleep(args.loop)


if __name__ == "__main__":
    sys.exit(main())
