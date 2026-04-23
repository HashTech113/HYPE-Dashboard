#!/usr/bin/env bash
# Starts the capture loop + FastAPI together.
# Ctrl+C cleanly stops every child process via the trap below.
#
# Required env: INGEST_API_URL — where capture.py posts detections.
# For local dev this is typically http://localhost:8000/api/ingest.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT/backend"

# Activate venv if present
if [ -f ".venv/bin/activate" ]; then
  # shellcheck disable=SC1091
  source .venv/bin/activate
fi

: "${INGEST_API_URL:=http://localhost:8000/api/ingest,https://hype-dashboard-production-8938.up.railway.app/api/ingest}"
export INGEST_API_URL

pids=()

cleanup() {
  echo
  echo "Stopping children..."
  for pid in "${pids[@]:-}"; do
    if kill -0 "$pid" 2>/dev/null; then
      kill "$pid" 2>/dev/null || true
    fi
  done
  wait 2>/dev/null || true
}
trap cleanup INT TERM EXIT

echo "[api] starting on :8000 ..."
uvicorn app.main:app --reload --port 8000 &
pids+=($!)

# Give the API a moment to come up before the capture loop starts posting.
sleep 2

echo "[capture] starting... (INGEST_API_URL=$INGEST_API_URL)"
python capture.py &
pids+=($!)

wait -n "${pids[@]}"
