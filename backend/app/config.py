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

CAMERA_HOST = os.getenv("CAMERA_HOST", "172.18.10.12")
CAMERA_USER = os.getenv("CAMERA_USER", "admin")
CAMERA_PASS = os.getenv("CAMERA_PASS", "Grow@123")
CAMERA_BASE_URL = f"http://{CAMERA_HOST}"
# Optional — pin the camera by MAC address (aa:bb:cc:dd:ee:ff). When set,
# the camera client falls back to ARP-based rediscovery if CAMERA_HOST
# stops responding (DHCP rotated the IP).
CAMERA_MAC = os.getenv("CAMERA_MAC", "").strip().lower()
# Comma-separated /24 prefixes to sweep during rediscovery, e.g.
# "172.18.10,172.18.11". Defaults to the subnet of CAMERA_HOST.
_default_prefix = ".".join(CAMERA_HOST.split(".")[:3])
CAMERA_DISCOVERY_SUBNETS: tuple[str, ...] = tuple(
    p.strip() for p in os.getenv("CAMERA_DISCOVERY_SUBNETS", _default_prefix).split(",") if p.strip()
)

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

# Minimum gap between consecutive *intermediate* captures (in minutes) that
# we treat as a break. We deliberately ignore the gap immediately after the
# first capture and immediately before the last capture, because those are
# bounded by entry/exit themselves and are not breaks. With sparse face
# captures the threshold should be conservative; manual correction (via
# /api/admin/correct-attendance) is the fallback when auto-detection
# misclassifies.
BREAK_GAP_THRESHOLD_MIN = int(os.getenv("BREAK_GAP_THRESHOLD_MIN", "30"))
