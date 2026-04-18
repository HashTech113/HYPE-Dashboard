#!/usr/bin/env bash
# Starts the capture loop + FastAPI together (and optionally the frontend).
# Ctrl+C cleanly stops every child process via the trap below.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT/backend"

# Activate venv if present
if [ -f ".venv/bin/activate" ]; then
  # shellcheck disable=SC1091
  source .venv/bin/activate
fi

# Make sure the schema exists before anything inserts
python init_db.py

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

echo "[capture] starting..."
python capture.py &
pids+=($!)

echo "[api] starting on :8000 ..."
uvicorn app.main:app --reload --port 8000 &
pids+=($!)

# Uncomment to also launch the Vite dev server:
# (
#   cd "$ROOT/frontend"
#   VITE_API_BASE_URL="http://localhost:8000" npm run dev
# ) &
# pids+=($!)

wait -n "${pids[@]}"
