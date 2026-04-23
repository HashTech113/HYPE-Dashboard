#!/usr/bin/env bash
# Starts capture.py + uvicorn together. Invoked by `npm run dev` at the repo root
# via concurrently, or runnable on its own (`bash backend/start.sh`).
#
# Required env: INGEST_API_URL — where capture.py posts detections.
# Defaults to the local API below.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

if [ -f ".venv/bin/activate" ]; then
  # shellcheck disable=SC1091
  source .venv/bin/activate
fi

: "${INGEST_API_URL:=http://localhost:8000/api/ingest,https://hype-dashboard-production-8938.up.railway.app/api/ingest}"
export INGEST_API_URL

# Remote auto-sync target(s) — replay any local rows that didn't make it to
# Railway (transient 502s, Railway offline, etc.). Comma-separated to match
# INGEST_API_URL. Set to "" to disable.
: "${REMOTE_SYNC_URLS:=https://hype-dashboard-production-8938.up.railway.app/api/ingest}"
: "${REMOTE_SYNC_INTERVAL:=300}"   # seconds between full-scan passes

pids=()

cleanup() {
  echo
  echo "[backend] stopping children..."
  for pid in "${pids[@]:-}"; do
    if kill -0 "$pid" 2>/dev/null; then
      kill "$pid" 2>/dev/null || true
    fi
  done
  wait 2>/dev/null || true
}
trap cleanup INT TERM EXIT

echo "[api] starting on :8000..."
uvicorn app.main:app --reload --port 8000 &
pids+=($!)

# Give the API a moment to come up before capture starts posting.
sleep 2

echo "[capture] starting... (INGEST_API_URL=$INGEST_API_URL)"
python capture.py &
pids+=($!)

if [ -n "$REMOTE_SYNC_URLS" ]; then
  IFS=',' read -r -a _sync_targets <<< "$REMOTE_SYNC_URLS"
  for target in "${_sync_targets[@]}"; do
    target_trimmed="$(echo "$target" | xargs)"
    [ -z "$target_trimmed" ] && continue
    echo "[sync] loop every ${REMOTE_SYNC_INTERVAL}s → $target_trimmed"
    python replay_to_railway.py --target "$target_trimmed" --loop "$REMOTE_SYNC_INTERVAL" --sleep 0.15 &
    pids+=($!)
  done
fi

# Exit when any child exits, so concurrently sees the failure.
wait -n "${pids[@]}"
