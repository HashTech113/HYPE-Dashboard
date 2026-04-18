"""Retention: delete snapshot files older than a cutoff (based on file mtime).

Usable two ways:
  - Imported: `purge_older_than(days)` — called periodically by capture.py
  - Standalone: `python -m app.services.retention [--days N]`
"""

from __future__ import annotations

import argparse
import logging
import sys
import time
from dataclasses import dataclass

from ..config import RETENTION_DAYS, SNAPSHOTS_DIR

log = logging.getLogger(__name__)


@dataclass
class PurgeResult:
    cutoff_epoch: float
    files_deleted: int
    files_skipped: int


def purge_older_than(days: int = RETENTION_DAYS) -> PurgeResult:
    if days <= 0:
        log.info("Retention disabled (days=%s)", days)
        return PurgeResult(cutoff_epoch=0.0, files_deleted=0, files_skipped=0)

    cutoff = time.time() - days * 86400.0
    files_deleted = 0
    files_skipped = 0

    if not SNAPSHOTS_DIR.exists():
        return PurgeResult(cutoff_epoch=cutoff, files_deleted=0, files_skipped=0)

    for path in SNAPSHOTS_DIR.iterdir():
        if not path.is_file():
            continue
        try:
            if path.stat().st_mtime >= cutoff:
                files_skipped += 1
                continue
            path.unlink()
            files_deleted += 1
        except OSError as e:
            log.warning("Failed to process %s: %s", path, e)

    log.info(
        "Cleanup done: cutoff_epoch=%.0f files_deleted=%d files_kept=%d",
        cutoff,
        files_deleted,
        files_skipped,
    )
    return PurgeResult(cutoff_epoch=cutoff, files_deleted=files_deleted, files_skipped=files_skipped)


def _main() -> int:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")
    parser = argparse.ArgumentParser(description="Delete snapshot files older than --days.")
    parser.add_argument("--days", type=int, default=RETENTION_DAYS)
    args = parser.parse_args()
    purge_older_than(args.days)
    return 0


if __name__ == "__main__":
    sys.exit(_main())
