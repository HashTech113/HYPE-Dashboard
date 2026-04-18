#!/usr/bin/env bash
# Starts capture.py + uvicorn together. Invoked by `npm run dev` at the repo root
# via concurrently, or runnable on its own (`bash backend/start.sh`).
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

if [ -f ".venv/bin/activate" ]; then
  # shellcheck disable=SC1091
  source .venv/bin/activate
fi

mkdir -p snapshots

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

echo "[capture] starting..."
python capture.py &
pids+=($!)

echo "[api] starting on :8000..."
uvicorn app.main:app --reload --port 8000 &
pids+=($!)

# Exit when either child exits, so concurrently sees the failure.
wait -n "${pids[@]}"
