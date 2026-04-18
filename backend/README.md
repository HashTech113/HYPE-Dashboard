# Camera Capture API

Minimal FastAPI service that:

- Polls the camera's **event API** (`/API/AI/SnapedFaces/Search`) — the device is an AI event camera, not a video stream, so OpenCV `VideoCapture` does **not** work against it
- Saves each new face detection as a JPEG under `snapshots/`
- Periodically deletes snapshots older than the retention window
- Serves them (with pagination + date filtering) to the React dashboard

**No database.** The `snapshots/` directory is the source of truth. The timestamp of each capture is encoded in the filename:

```
snap_YYYYMMDDTHHMMSSZ_<UUId>.jpg
```

The API recovers the timestamp by parsing the filename.

Capture and API run as **separate processes**. The API never talks to the camera.

## Setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Run

### One command — everything (recommended)

From the **project root**:

```bash
npm install        # first time only — installs `concurrently`
npm run dev
```

Launches in parallel:
- `BACKEND` — [backend/start.sh](start.sh) activates `.venv` and starts `capture.py` + `uvicorn` (port 8000)
- `FRONTEND` — Vite dev server (`npm run dev --prefix frontend`, port 8080)

Ctrl+C shuts down every child cleanly. Individual halves: `npm run dev:backend`, `npm run dev:frontend`.

### Backend only (without Node)

```bash
bash backend/start.sh
```

### Two terminals (manual)

```bash
# terminal 1
cd backend && source .venv/bin/activate && python capture.py

# terminal 2
cd backend && source .venv/bin/activate && uvicorn app.main:app --reload --port 8000
```

Run both from `backend/` so `snapshots/` resolves correctly.

## Endpoints

### `GET /api/health`

Liveness + current snapshot count.

### `GET /api/faces/history`

| Param   | Default                 | Notes |
|---------|-------------------------|-------|
| `start` | `DEFAULT_HISTORY_START` | `YYYY-MM-DD`, ISO-8601, or `now` |
| `end`   | `now`                   | same formats |
| `limit` | `50`                    | `1..500` |
| `offset`| `0`                     | page offset |
| `latest`| *(unset)*               | If set, ignores `start`/`end` and returns the N most recent |

Bad dates / `start > end` → **HTTP 400**.

Response (sorted newest → oldest):

```json
{
  "count": 5,
  "total": 42,
  "limit": 5,
  "offset": 0,
  "items": [
    {
      "id": "snap_20260418T114500Z_abcd-ef12.jpg",
      "timestamp": "2026-04-18T11:45:00+00:00",
      "image_path": "/snapshots/snap_20260418T114500Z_abcd-ef12.jpg",
      "image_url": "http://localhost:8000/snapshots/snap_20260418T114500Z_abcd-ef12.jpg"
    }
  ]
}
```

- `count` = items on this page
- `total` = total snapshots matching the filter
- `id`    = the filename (stable, unique)

Examples:

```
GET /api/faces/history?latest=10
GET /api/faces/history?start=2026-04-15&end=now&limit=50&offset=50
```

### `GET /snapshots/<file>.jpg`

Static image served from `backend/snapshots/`.

## Retention

`capture.py` runs cleanup on startup and every `CLEANUP_INTERVAL_SECONDS`. Files whose mtime is older than `RETENTION_DAYS` are deleted. (Capture sets mtime to the event time when saving, so this lines up with the filename timestamp.)

Manual run:

```bash
python -m app.cleanup --days 7
```

`RETENTION_DAYS=0` disables automatic purging.

## Environment variables

| Variable | Default | Purpose |
|---|---|---|
| `CAMERA_HOST` | `172.18.10.26` | Camera IP / hostname |
| `CAMERA_USER` | `admin` | Login username |
| `CAMERA_PASS` | `Opt@12345` | Login password |
| `CAPTURE_INTERVAL_SECONDS` | `5` | Seconds between `SnapedFaces/Search` polls |
| `SEARCH_COUNT` | `20` | Max events returned per poll |
| `SEARCH_SIMILARITY` | `70` | Similarity threshold passed to the camera API |
| `REQUEST_TIMEOUT_SECONDS` | `10` | HTTP timeout for camera calls |
| `DEFAULT_HISTORY_START` | `2026-04-15` | Fallback `start` when the query omits it |
| `DEFAULT_PAGE_LIMIT` | `50` | Default `limit` for `/api/faces/history` |
| `MAX_PAGE_LIMIT` | `500` | Max `limit` / `latest` |
| `RETENTION_DAYS` | `7` | Delete snapshots older than this (0 disables) |
| `CLEANUP_INTERVAL_SECONDS` | `3600` | How often the capture loop runs cleanup |

## Verify it's working

```bash
# 1. Files are being saved
ls backend/snapshots/ | wc -l      # should grow over time

# 2. API sees them
curl -s http://localhost:8000/api/health
# {"status":"ok","snapshot_count":N}

curl -s "http://localhost:8000/api/faces/history?latest=5" | python -m json.tool

# 3. A snapshot renders
#   open an item's image_url from the response above in a browser
```

## Debug the camera API

If capture logs `Search 400 rejected by camera` or `No image data for UUId=...`:

```bash
cd backend
python debug_camera.py
```

One-shot login + search that prints the full request and response so you can see exactly what the camera expects. Flags: `--start`, `--end`, `--count`, `--similarity`, `--engine`.

## Troubleshooting

| Symptom | First check | Likely cause → fix |
|---|---|---|
| `capture.py` logs `Camera request failed ... retrying` | `curl -u admin:Opt@12345 --digest -X POST http://172.18.10.26/API/Web/Login -d '{"data":{}}'` from the same host | Camera unreachable or wrong creds — fix network / `CAMERA_HOST` / `CAMERA_USER` / `CAMERA_PASS`. |
| `capture.py` logs `Search 4xx rejected by camera — request=... response=...` | The response body in that line | Payload field the firmware doesn't like. Use `python debug_camera.py` to iterate. |
| `capture.py` logs `No image data for UUId=...` | `keys=[...]` in the warning | Response image field not in `IMAGE_FIELDS`. Extend the tuple in [capture.py](capture.py) with the real field name. |
| No files in `snapshots/` | `ls -ld backend/snapshots` | Dir missing or not writable; confirm `CAPTURE_INTERVAL_SECONDS` isn't huge. |
| `/api/faces/history` returns `total: 0` | Try `?latest=10` (bypasses dates) | Date window excludes everything, or `start > end` (returns 400). |
| `/api/faces/history` → HTTP 400 | Response body `detail` | Invalid date format or `start > end`. |
| Image URL 404s | `ls backend/snapshots/<file>.jpg` | File purged by retention, or uvicorn started from wrong cwd so `SNAPSHOTS_DIR` resolves elsewhere — start uvicorn from `backend/`. |
| Image URL has wrong host (e.g. `127.0.0.1`) | `request.base_url` reflects the host the client hit | Call the API via the URL you want reflected back, or reverse-proxy and rewrite `Host`. |
| Frontend fetch blocked by CORS | Browser devtools network tab | Add origin to `allow_origins` in [app/main.py](app/main.py); defaults cover `5173`, `3000`, `8080`, and `127.0.0.1` variants. |
| `Address already in use` on `:8000` | `lsof -iTCP:8000 -sTCP:LISTEN` | Kill the old uvicorn or use `--port 8001` + matching `VITE_API_BASE_URL`. |
| Disk filling up | `du -sh backend/snapshots` | Lower `RETENTION_DAYS` or run `python -m app.cleanup --days N`. |

## Layout

```
backend/
  app/
    main.py      # FastAPI entrypoint + /api/faces/history (reads snapshots/)
    cleanup.py   # Retention purge (importable + `python -m app.cleanup`)
    config.py    # Env + paths
  capture.py     # Standalone camera loop (+ periodic cleanup)
  debug_camera.py  # One-shot login + search diagnostic
  start.sh       # Launches capture + uvicorn together
  requirements.txt
  snapshots/     # runtime, source of truth
```

## Frontend wiring

[frontend/src/api/dashboardApi.ts](../frontend/src/api/dashboardApi.ts)
exports `getFaceHistory({ start, end, limit, offset, latest })`. Response
includes `image_url` which the dashboard renders directly. Override the
backend URL with `VITE_API_BASE_URL` if the server runs elsewhere.
