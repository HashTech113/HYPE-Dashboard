import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DB_PATH = BASE_DIR / "database.db"
SNAPSHOTS_DIR = BASE_DIR / "snapshots"

CAMERA_HOST = os.getenv("CAMERA_HOST", "172.18.10.26")
CAMERA_USER = os.getenv("CAMERA_USER", "admin")
CAMERA_PASS = os.getenv("CAMERA_PASS", "Opt@12345")
CAMERA_BASE_URL = f"http://{CAMERA_HOST}"

CAPTURE_INTERVAL_SECONDS = float(os.getenv("CAPTURE_INTERVAL_SECONDS", "5"))
SEARCH_COUNT = int(os.getenv("SEARCH_COUNT", "20"))
SEARCH_SIMILARITY = int(os.getenv("SEARCH_SIMILARITY", "70"))
REQUEST_TIMEOUT_SECONDS = float(os.getenv("REQUEST_TIMEOUT_SECONDS", "10"))

DEFAULT_HISTORY_START = os.getenv("DEFAULT_HISTORY_START", "2026-04-15")
DEFAULT_PAGE_LIMIT = int(os.getenv("DEFAULT_PAGE_LIMIT", "50"))
MAX_PAGE_LIMIT = int(os.getenv("MAX_PAGE_LIMIT", "500"))

RETENTION_DAYS = int(os.getenv("RETENTION_DAYS", "7"))
CLEANUP_INTERVAL_SECONDS = int(os.getenv("CLEANUP_INTERVAL_SECONDS", "3600"))

SNAPSHOTS_DIR.mkdir(parents=True, exist_ok=True)
