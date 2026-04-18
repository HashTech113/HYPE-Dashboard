# Camera Capture API

FastAPI service that:

- Polls the camera's real-time AI event API (`POST /API/AI/processAlarm/Get`) — see [../API/processAlarm_get.md](../API/processAlarm_get.md)
- Saves each new face capture as a JPEG under `snapshots/`
- Purges snapshots older than the retention window
- Serves name + entry/exit timestamps + image URL to the React dashboard

**No database.** The `snapshots/` directory is the source of truth. Each filename encodes the name, entry and exit timestamps, and SnapId:

```
snap_<startISO>_<endISO>_<name>_<snapId>.jpg
```

Capture and API run as **separate processes**. The API never talks to the camera.

## Layout

```
backend/
├── app/
│   ├── __init__.py
│   ├── config.py             ← env + paths
│   ├── main.py               ← FastAPI factory (create_app)
│   ├── routers/              ← URL → handler
│   │   ├── health.py         ← GET /api/health
│   │   └── faces.py          ← GET /api/faces/history
│   ├── services/             ← business logic (no HTTP details)
│   │   ├── camera.py         ← CameraClient (login + processAlarm/Get)
│   │   ├── snapshots.py      ← filesystem I/O + filename parsing
│   │   └── retention.py      ← periodic purge
│   └── schemas/
│       └── faces.py          ← Pydantic response models
├── capture.py                ← entrypoint: polls camera, writes snapshots
├── debug_camera.py           ← one-shot diagnostic
├── start.sh                  ← launches capture + uvicorn
├── requirements.txt
└── snapshots/                ← runtime
```

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

Launches capture.py + uvicorn + Vite dev server in parallel.

### Backend only

```bash
bash backend/start.sh
```

### Two terminals (manual)

```bash
# terminal 1 — capture
cd backend && source .venv/bin/activate && python capture.py

# terminal 2 — API
cd backend && source .venv/bin/activate && uvicorn app.main:app --reload --port 8000
```

Both commands must run from `backend/` so `snapshots/` resolves.

## Endpoints

### `GET /api/health`

```json
{ "status": "ok", "snapshot_count": 42 }
```

### `GET /api/faces/history`

| Param   | Default                  | Notes |
|---------|--------------------------|-------|
| `start` | `DEFAULT_HISTORY_START`  | `YYYY-MM-DD`, ISO-8601, or `now` |
| `end`   | `now`                    | same formats |
| `limit` | `50`                     | `1..500` |
| `offset`| `0`                      | page offset |
| `latest`| *(unset)*                | If set, ignores `start`/`end` and returns the N most recent |

Response (sorted newest → oldest):

```json
{
  "count": 5, "total": 42, "limit": 5, "offset": 0,
  "items": [
    {
      "id": "snap_20260418T114500Z_20260418T114510Z_Mike_1250.jpg",
      "name": "Mike",
      "entry": "2026-04-18T11:45:00+00:00",
      "exit":  "2026-04-18T11:45:10+00:00",
      "image_url": "http://localhost:8000/snapshots/snap_20260418T114500Z_20260418T114510Z_Mike_1250.jpg"
    }
  ]
}
```

### `GET /snapshots/<file>.jpg`

Static image served from `backend/snapshots/`.

## Testing with Postman

The full walk-through is in [../API/postman.md](../API/postman.md):

1. **Login** — `POST http://172.18.10.26/API/Web/Login` with Digest auth (`admin` / `Opt@12345`) + body `{"data": {}}`. Save the `X-csrftoken` response header.
2. **Fetch face events** — `POST http://172.18.10.26/API/AI/processAlarm/Get`, header `X-csrftoken: <token>`, body `{}`. Response is `data.FaceInfo[]`.
3. **Test our API** — hit `GET http://localhost:8000/api/faces/history?latest=5` while `npm run dev` is running.

## Retention

`capture.py` runs retention on startup and every `CLEANUP_INTERVAL_SECONDS`. Files whose mtime is older than `RETENTION_DAYS` are deleted.

Manual run:

```bash
python -m app.services.retention --days 7
```

`RETENTION_DAYS=0` disables automatic purging.

## Environment variables

| Variable | Default | Purpose |
|---|---|---|
| `CAMERA_HOST` | `172.18.10.26` | Camera IP / hostname |
| `CAMERA_USER` | `admin` | Login username |
| `CAMERA_PASS` | `Opt@12345` | Login password |
| `CAPTURE_INTERVAL_SECONDS` | `5` | Seconds between `processAlarm/Get` polls |
| `REQUEST_TIMEOUT_SECONDS` | `10` | HTTP timeout for camera calls |
| `SEARCH_COUNT` | `20` | (unused, kept for backward-compat) |
| `SEARCH_SIMILARITY` | `70` | (unused, kept for backward-compat) |
| `DEFAULT_HISTORY_START` | `2026-04-15` | Fallback `start` when the query omits it |
| `DEFAULT_PAGE_LIMIT` | `50` | Default `limit` for `/api/faces/history` |
| `MAX_PAGE_LIMIT` | `500` | Max `limit` / `latest` |
| `RETENTION_DAYS` | `7` | Delete snapshots older than this (0 disables) |
| `CLEANUP_INTERVAL_SECONDS` | `3600` | How often the capture loop runs cleanup |

## Verify the pipeline

```bash
# files are being saved
ls backend/snapshots/ | wc -l

# API sees them
curl -s http://localhost:8000/api/health
curl -s "http://localhost:8000/api/faces/history?latest=5" | python -m json.tool

# open one image_url in a browser to confirm the static mount works
```

## Debug the camera API

```bash
cd backend
source .venv/bin/activate
python debug_camera.py
```

Prints every `FaceInfo` record the camera currently has in its alarm buffer, with base64 image fields summarized as `<base64 N chars>`. Final line lists every key observed — useful when the firmware varies and you need to confirm field names.

## Troubleshooting

| Symptom | First check | Likely cause → fix |
|---|---|---|
| `Camera HTTP error 401` | Credentials + Digest auth | Update `CAMERA_USER` / `CAMERA_PASS`. |
| `processAlarm/Get 400` | response body in the log | Missing `X-csrftoken` — client invalidated the session, will re-log in on next poll. |
| `Poll returned 0 faces` forever | Stand in front of the camera | This endpoint is a real-time alarm buffer, not a history query. |
| `No image data for SnapId=...` | The `keys=[...]` in the warning | Firmware uses a different image field. Extend `IMAGE_FIELDS` in [app/services/snapshots.py](app/services/snapshots.py). |
| No files in `snapshots/` | `ls -ld backend/snapshots` | Dir missing or not writable. |
| Image URL 404s | `ls backend/snapshots/<file>.jpg` | Retention purged it, or uvicorn started from wrong cwd. |
| Frontend fetch blocked by CORS | Browser devtools network tab | Add origin to `allow_origins` in [app/main.py](app/main.py). |
| `Address already in use` on `:8000` | `lsof -iTCP:8000 -sTCP:LISTEN` | Kill old uvicorn or use `--port 8001`. |
| Disk filling up | `du -sh backend/snapshots` | Lower `RETENTION_DAYS` or run `python -m app.services.retention --days N`. |

## Frontend wiring

[../frontend/src/api/dashboardApi.ts](../frontend/src/api/dashboardApi.ts)
exports `getFaceHistory({ start, end, limit, offset, latest })`. The Live
Captures page ([../frontend/src/routes/_dashboard.requests.tsx](../frontend/src/routes/_dashboard.requests.tsx))
polls it every 5 s.


camera ip : http://172.18.10.123/