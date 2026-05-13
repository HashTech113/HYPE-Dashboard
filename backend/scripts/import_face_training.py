"""Bulk-import face training images from the ``registration form/`` tree.

For every subfolder:

  1. Read ``details.json`` → pluck ``unique_user_id``.
  2. Look up the matching Employee row by ``employee_id``.
  3. Upload ``front.jpg`` / ``left.jpg`` / ``right.jpg`` as ``FaceImage``
     rows via :func:`services.face_images.add` — same path the UI's
     "Upload images" button uses, so the DB ends up in the exact state
     a manual upload would produce.
  4. Run :func:`services.face_training.enroll_face_image` for each
     freshly-uploaded image so the buffalo_l embedding is computed +
     persisted + cache-refreshed. (Equivalent to clicking "Train".)

Idempotent by default: employees who already have at least one face
image on file are skipped. Pass ``--force`` to delete + re-upload.

Usage (from backend/):
    python -m scripts.import_face_training [--dry-run] [--force]
                                           [--filter NAMEFRAGMENT]
                                           [--limit N]

Exit code: 0 if anything imported, 1 if nothing matched, 2 if a fatal
error halted the run.
"""

from __future__ import annotations

import argparse
import base64
import json
import logging
import sys
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Optional

# Make the script runnable as ``python -m scripts.import_face_training``
# from the backend/ directory — same pattern import_registrations.py uses.
ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from sqlalchemy import select  # noqa: E402

from app.db import session_scope  # noqa: E402
from app.models import Employee  # noqa: E402
from app.services import face_images as face_images_service  # noqa: E402
from app.services import face_training  # noqa: E402

log = logging.getLogger("import_face_training")


# The three pose files every registration folder ships with. Order matters
# only for human-friendly logging — the label is also persisted on the
# FaceImage row so the operator can see which pose each row came from.
POSE_FILES: tuple[tuple[str, str], ...] = (
    ("front.jpg", "front"),
    ("left.jpg", "left"),
    ("right.jpg", "right"),
)


@dataclass
class FolderResult:
    folder: str
    employee_id: Optional[str]
    employee_name: Optional[str]
    uploaded: int = 0
    enrolled: int = 0
    skipped: int = 0
    errors: list[str] = None

    def __post_init__(self) -> None:
        if self.errors is None:
            self.errors = []


def _registration_root() -> Path:
    """Resolve the ``registration form/`` tree relative to the repo root.

    The script lives at ``backend/scripts/`` so the project root is two
    levels up. ``registration form/`` is at the project root.
    """
    return ROOT.parent / "registration form"


def _resolve_employee_id(unique_user_id: str) -> tuple[Optional[str], Optional[str]]:
    """Map a registration's ``unique_user_id`` (e.g. ``USR-2026-000044``)
    to the DB's ``employees.id`` (UUID). Returns (id, name) or (None, None).

    NB: the model attribute is ``employee_code`` even though the underlying
    DB column is ``employee_id`` (see app/models/employee.py — the rename
    keeps "employee_id" free for FKs to ``employees.id`` on log tables).
    """
    with session_scope() as session:
        row = session.execute(
            select(Employee.id, Employee.name).where(Employee.employee_code == unique_user_id)
        ).one_or_none()
        if row is None:
            return None, None
        return str(row[0]), str(row[1])


def _existing_image_count(employee_id: str) -> int:
    return face_images_service.count_for_employee(employee_id)


def _read_b64_jpeg(path: Path) -> Optional[str]:
    if not path.exists() or not path.is_file():
        return None
    try:
        raw = path.read_bytes()
    except OSError as exc:
        log.warning("could not read %s: %s", path, exc)
        return None
    if not raw:
        return None
    return base64.b64encode(raw).decode("ascii")


def _process_folder(
    folder: Path,
    *,
    dry_run: bool,
    force: bool,
) -> FolderResult:
    result = FolderResult(folder=folder.name, employee_id=None, employee_name=None)

    details_path = folder / "details.json"
    if not details_path.exists():
        result.errors.append("missing details.json")
        return result

    try:
        details = json.loads(details_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        result.errors.append(f"details.json unreadable: {exc}")
        return result

    unique_user_id = (details.get("unique_user_id") or "").strip()
    if not unique_user_id:
        result.errors.append("details.json has no unique_user_id")
        return result

    emp_id, emp_name = _resolve_employee_id(unique_user_id)
    result.employee_id = emp_id
    result.employee_name = emp_name
    if emp_id is None:
        result.errors.append(f"employee {unique_user_id} not found in DB")
        return result

    existing = _existing_image_count(emp_id)
    if existing > 0 and not force:
        result.skipped = existing
        return result

    # Force-mode would normally wipe the existing images first; doing that
    # safely (i.e. without orphaning embeddings) is intentionally OUT OF
    # SCOPE for this batch script. If --force is needed, prefer to delete
    # via the admin UI's "delete face image" flow which already cascades.
    if existing > 0 and force:
        result.errors.append(
            f"--force not implemented yet; please delete the {existing} existing "
            f"images for {unique_user_id} via the UI before re-running"
        )
        return result

    for filename, label in POSE_FILES:
        image_path = folder / filename
        b64 = _read_b64_jpeg(image_path)
        if b64 is None:
            result.errors.append(f"{filename}: missing or unreadable")
            continue

        if dry_run:
            result.uploaded += 1
            continue

        try:
            record = face_images_service.add(
                employee_id=emp_id,
                image_data=b64,
                label=label,
                created_by="import_face_training",
            )
        except LookupError as exc:
            result.errors.append(f"{filename}: {exc}")
            continue
        except Exception as exc:  # narrow if we hit a recurring class
            result.errors.append(f"{filename}: add failed: {exc}")
            continue
        result.uploaded += 1

        # Inline enrollment — same model the UI's per-image flow uses.
        # We don't bail the loop on a per-image enrollment failure; the
        # operator can run "Train" from the UI later to retry the
        # individual misses.
        try:
            outcome = face_training.enroll_face_image(record.id)
        except Exception as exc:
            result.errors.append(f"{filename}: enroll crashed: {exc}")
            continue
        if outcome.accepted:
            result.enrolled += 1
        else:
            result.errors.append(
                f"{filename}: enroll failed: {outcome.error or 'unknown'}"
            )

    return result


def _summarize(results: list[FolderResult]) -> None:
    matched = [r for r in results if r.employee_id is not None]
    unmatched = [r for r in results if r.employee_id is None]
    skipped = [r for r in matched if r.skipped > 0]
    uploaded = sum(r.uploaded for r in matched)
    enrolled = sum(r.enrolled for r in matched)

    log.info("---- Summary ----")
    log.info("Folders scanned:           %d", len(results))
    log.info("Employees matched:         %d", len(matched))
    log.info("Employees skipped (existing): %d", len(skipped))
    log.info("Employees unmatched in DB: %d", len(unmatched))
    log.info("Face images uploaded:      %d", uploaded)
    log.info("Embeddings persisted:      %d", enrolled)

    failures = [
        r for r in results
        if r.errors and r.employee_id is not None and r.uploaded == 0
    ]
    if failures:
        log.info("")
        log.info("Folders where no image uploaded:")
        for r in failures[:20]:
            log.info("  %s (%s): %s", r.folder, r.employee_name or "?", "; ".join(r.errors))
        if len(failures) > 20:
            log.info("  … and %d more", len(failures) - 20)

    if unmatched:
        log.info("")
        log.info("Folders without a matching employee in DB:")
        for r in unmatched[:15]:
            log.info("  %s — %s", r.folder, "; ".join(r.errors))
        if len(unmatched) > 15:
            log.info("  … and %d more", len(unmatched) - 15)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument(
        "--dry-run", action="store_true",
        help="Walk the tree and resolve employees, but don't write any rows.",
    )
    parser.add_argument(
        "--force", action="store_true",
        help="Re-import even if an employee already has face images on file. "
             "Not implemented yet — currently surfaces a clear error per row.",
    )
    parser.add_argument(
        "--filter", metavar="SUBSTR", default=None,
        help="Process only folders whose name contains SUBSTR (case-insensitive). "
             "Useful for testing on one or two employees first.",
    )
    parser.add_argument(
        "--limit", type=int, default=None,
        help="Stop after processing N folders. Useful for trial runs.",
    )
    parser.add_argument(
        "-v", "--verbose", action="store_true",
        help="Log each folder's per-pose result, not just the summary.",
    )
    args = parser.parse_args()

    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(name)s | %(message)s",
    )

    root = _registration_root()
    if not root.exists():
        log.error("registration form folder not found at %s", root)
        return 2

    folders = sorted(
        p for p in root.iterdir() if p.is_dir() and not p.name.startswith(".")
    )
    if args.filter:
        needle = args.filter.lower()
        folders = [p for p in folders if needle in p.name.lower()]
    if args.limit is not None:
        folders = folders[: args.limit]
    if not folders:
        log.warning("no folders matched")
        return 1

    log.info(
        "starting %s for %d folder(s)%s",
        "dry-run" if args.dry_run else "import",
        len(folders),
        " (filtered)" if args.filter else "",
    )
    started = time.monotonic()
    results: list[FolderResult] = []
    for i, folder in enumerate(folders, 1):
        result = _process_folder(folder, dry_run=args.dry_run, force=args.force)
        results.append(result)
        if args.verbose:
            log.info(
                "[%d/%d] %s emp=%s uploaded=%d enrolled=%d skipped=%d errors=%s",
                i, len(folders), folder.name,
                result.employee_name or "(no match)",
                result.uploaded, result.enrolled, result.skipped,
                "; ".join(result.errors) if result.errors else "—",
            )
        elif i % 25 == 0:
            log.info("processed %d/%d folders…", i, len(folders))

    elapsed = time.monotonic() - started
    log.info("done in %.1fs", elapsed)
    _summarize(results)
    return 0


if __name__ == "__main__":
    sys.exit(main())
