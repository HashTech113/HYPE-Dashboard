import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# Resolve the SQLite location, in priority order:
#   1. DATABASE_PATH env var — set this on Railway to `/data/database.db`
#      (or wherever your persistent volume is mounted) so the file survives
#      redeploys. The directory is created if it does not exist.
#   2. Legacy default: backend/database.db next to the source tree. Only
#      suitable for local dev — ephemeral on any platform whose container
#      filesystem is wiped between deploys (including Railway without a
#      volume).
_db_env = os.getenv("DATABASE_PATH", "").strip()
DB_PATH = Path(_db_env) if _db_env else BASE_DIR / "database.db"
DB_PATH.parent.mkdir(parents=True, exist_ok=True)

CAMERA_HOST = os.getenv("CAMERA_HOST", "172.18.11.162")
CAMERA_USER = os.getenv("CAMERA_USER", "admin")
CAMERA_PASS = os.getenv("CAMERA_PASS", "Grow@123")
CAMERA_BASE_URL = f"http://{CAMERA_HOST}"

CAPTURE_INTERVAL_SECONDS = float(os.getenv("CAPTURE_INTERVAL_SECONDS", "5"))
SEARCH_COUNT = int(os.getenv("SEARCH_COUNT", "20"))
SEARCH_SIMILARITY = int(os.getenv("SEARCH_SIMILARITY", "70"))
REQUEST_TIMEOUT_SECONDS = float(os.getenv("REQUEST_TIMEOUT_SECONDS", "30"))

DEFAULT_HISTORY_START = os.getenv("DEFAULT_HISTORY_START", "2026-04-15")
DEFAULT_PAGE_LIMIT = int(os.getenv("DEFAULT_PAGE_LIMIT", "50"))
MAX_PAGE_LIMIT = int(os.getenv("MAX_PAGE_LIMIT", "500"))

# Attendance shift defaults — clock-in 09:30, clock-out 18:30, IST (+05:30).
SHIFT_START = os.getenv("SHIFT_START", "09:30")
SHIFT_END = os.getenv("SHIFT_END", "18:30")
LATE_GRACE_MIN = int(os.getenv("LATE_GRACE_MIN", "5"))
EARLY_EXIT_GRACE_MIN = int(os.getenv("EARLY_EXIT_GRACE_MIN", "5"))
LOCAL_TZ_OFFSET_MIN = int(os.getenv("LOCAL_TZ_OFFSET_MIN", "330"))
