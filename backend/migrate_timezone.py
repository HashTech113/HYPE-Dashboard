"""One-off migration: shift all existing attendance/snapshot records by -5h30m.

Why:
    Earlier, na\u00efve local-IST timestamps from the camera were tagged as UTC at
    write time. Stored timestamps therefore read 5h30m higher than reality.
    This script corrects:
      * `attendance_logs.timestamp` and `snapshot_logs.timestamp`
      * The file names in `snapshots/` (whose `snap_<start>Z_<end>Z_...` prefix
        encodes the same incorrect UTC value)
      * `image_path` columns that reference those renamed files

The script is idempotent: it writes a marker file and refuses to run again.
"""

from __future__ import annotations

import logging
import re
import sqlite3
from datetime import datetime, timedelta, timezone
from pathlib import Path

from app.config import DB_PATH, SNAPSHOTS_DIR

log = logging.getLogger("migrate_timezone")

OFFSET = timedelta(minutes=330)  # IST offset
TS_FMT = "%Y%m%dT%H%M%SZ"

MARKER_PATH = Path(__file__).resolve().parent / ".migration-timezone-ist-v1.applied"

FILENAME_RE = re.compile(
    r"^snap_(?P<start>\d{8}T\d{6}Z)_(?P<end>\d{8}T\d{6}Z)_(?P<rest>.+)\.(?P<ext>jpg|jpeg|png)$"
)


def _shift_compact(compact: str) -> str:
    dt = datetime.strptime(compact, TS_FMT).replace(tzinfo=timezone.utc)
    return (dt - OFFSET).strftime(TS_FMT)


def _shift_iso(iso: str) -> str:
    """Parse whatever the DB stored and return an ISO string 5h30m earlier, UTC."""
    raw = iso.replace("Z", "+00:00")
    try:
        dt = datetime.fromisoformat(raw)
    except ValueError:
        dt = datetime.strptime(raw, "%Y-%m-%d %H:%M:%S")
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    return (dt - OFFSET).astimezone(timezone.utc).isoformat()


def rename_snapshot_files() -> dict[str, str]:
    """Rename every `snap_<start>Z_<end>Z_..` file and return {old: new}."""
    renames: dict[str, str] = {}
    if not SNAPSHOTS_DIR.exists():
        return renames

    planned: list[tuple[Path, Path]] = []
    for path in sorted(SNAPSHOTS_DIR.iterdir()):
        if not path.is_file():
            continue
        m = FILENAME_RE.match(path.name)
        if not m:
            continue
        new_start = _shift_compact(m["start"])
        new_end = _shift_compact(m["end"])
        new_name = f"snap_{new_start}_{new_end}_{m['rest']}.{m['ext']}"
        if new_name == path.name:
            continue
        new_path = path.parent / new_name
        if new_path.exists():
            log.warning("Skip rename %s -> %s: target already exists", path.name, new_name)
            continue
        planned.append((path, new_path))

    for src, dst in planned:
        src.rename(dst)
        renames[src.name] = dst.name

    log.info("Renamed %d snapshot files", len(renames))
    return renames


def shift_db(renames: dict[str, str]) -> None:
    with sqlite3.connect(str(DB_PATH)) as conn:
        conn.execute("BEGIN IMMEDIATE")
        try:
            for table in ("attendance_logs", "snapshot_logs"):
                rows = conn.execute(f"SELECT id, timestamp FROM {table}").fetchall()
                for row_id, ts in rows:
                    try:
                        new_ts = _shift_iso(ts)
                    except Exception as exc:  # noqa: BLE001
                        log.warning("Skip %s id=%s: bad timestamp %r (%s)", table, row_id, ts, exc)
                        continue
                    conn.execute(
                        f"UPDATE {table} SET timestamp = ? WHERE id = ?",
                        (new_ts, row_id),
                    )
                log.info("Shifted %d timestamps in %s", len(rows), table)

                if renames:
                    for old, new in renames.items():
                        conn.execute(
                            f"UPDATE {table} SET image_path = ? WHERE image_path = ?",
                            (new, old),
                        )
                    log.info("Updated image_path references in %s", table)

            conn.execute("COMMIT")
        except Exception:
            conn.execute("ROLLBACK")
            raise


def main() -> None:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")

    if MARKER_PATH.exists():
        log.info("Migration marker present at %s — nothing to do", MARKER_PATH)
        return

    renames = rename_snapshot_files()
    shift_db(renames)

    MARKER_PATH.write_text(datetime.now(timezone.utc).isoformat() + "\n", encoding="utf-8")
    log.info("Migration complete. Marker written to %s", MARKER_PATH)


if __name__ == "__main__":
    main()
