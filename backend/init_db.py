"""Initialize SQLite schema and backfill both log tables from existing snapshots/.

Run once on first boot (and it's safe to re-run — inserts are idempotent via
the UNIQUE(image_path) constraint).
"""

from __future__ import annotations

import logging

from app.db import init_schema
from app.services import logs, snapshots

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")
log = logging.getLogger("init_db")


def backfill() -> int:
    scanned = snapshots.scan()
    for snap in scanned:
        logs.record_capture(
            name=snap.name,
            timestamp_iso=snap.entry.isoformat(),
            image_path=snap.filename,
        )
    return len(scanned)


def main() -> None:
    init_schema()
    count = backfill()
    log.info("init_db complete — schema ready, %d snapshots backfilled", count)


if __name__ == "__main__":
    main()
