# Camera Capture API

FastAPI service that:

- Polls the camera's real-time AI event API (`POST /API/AI/processAlarm/Get`) — see [../API/processAlarm_get.md](../API/processAlarm_get.md)
- POSTs each new face capture to `/api/ingest`, which stores it in SQLite (name, timestamp, `image_data` base64)
- Serves attendance summaries, snapshot logs, and the employee roster to the React dashboard

**SQLite is the single source of truth.** Captures are stored inline as base64 in `snapshot_logs.image_data` / `attendance_logs.image_data`. There is no filesystem snapshot store any more — the backend does not read or write JPEGs on disk.

## Layout

```
backend/
├── app/
│   ├── __init__.py
│   ├── config.py             ← env + paths
│   ├── main.py               ← FastAPI factory (create_app)
│   ├── db.py                 ← sqlite connection + schema
│   ├── routers/
│   │   ├── health.py         ← GET /api/health
│   │   ├── faces.py          ← GET /api/faces/history
│   │   ├── attendance.py     ← GET /api/attendance/daily, /range, /config
│   │   ├── logs.py           ← GET /api/attendance, /api/snapshots
│   │   ├── employees.py      ← CRUD on /api/employees
│   │   └── ingest.py         ← POST /api/ingest
│   ├── services/
│   │   ├── camera.py         ← CameraClient (login + processAlarm/Get)
│   │   ├── snapshots.py      ← shared name/timestamp helpers (no I/O)
│   │   ├── attendance.py     ← pure shift/attendance logic
│   │   ├── employees.py      ← DB CRUD + seed-if-empty
│   │   └── logs.py           ← DB reads/writes for snapshot_logs & attendance_logs
│   └── schemas/              ← pydantic response models
├── capture.py                ← polls camera, POSTs each face to INGEST_API_URL
├── data/
│   └── employees.json        ← first-boot seed for the employees table
├── database.db               ← SQLite store (gitignored)
├── start.sh                  ← launches capture + uvicorn
└── requirements.txt
```

## Setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Run

### Backend only (local)

```bash
bash backend/start.sh
```

`start.sh` defaults `INGEST_API_URL` to `http://localhost:8000/api/ingest` and starts uvicorn + capture.py together.

### Two terminals (manual)

```bash
# terminal 1 — API
cd backend && source .venv/bin/activate && uvicorn app.main:app --reload --port 8000

# terminal 2 — capture
cd backend && source .venv/bin/activate \
  && INGEST_API_URL=http://localhost:8000/api/ingest python capture.py
```

`capture.py` refuses to start if `INGEST_API_URL` is unset — there are no more implicit fallbacks. Use a comma-separated list to fan out to multiple targets:

```bash
INGEST_API_URL=http://localhost:8000/api/ingest,https://hype-dashboard-production-8938.up.railway.app/api/ingest \
  python capture.py
```

## Endpoints

### `GET /api/health`

```json
{ "status": "ok", "snapshot_count": 1801 }
```

Both fields read from SQLite.

### `GET /api/faces/history?latest=5`

Paginated list of detections from `snapshot_logs`, newest first. `image_url` is always a `data:image/jpeg;base64,...` URL.

### `GET /api/attendance/daily?date=YYYY-MM-DD`

One record per recognised person seen on the local day, with entry/exit times and Late / Early Exit / Present / Absent status. Sourced from `attendance_logs`.

### `GET /api/attendance/range?start=YYYY-MM-DD&end=YYYY-MM-DD&name=...`

Same shape, across a date range. Optional `name` filter.

### `GET /api/attendance?start=...&end=...`

Per-day summary view (the dashboard's main table). Sourced from `attendance_logs`.

### `GET /api/snapshots?limit=50&offset=0`

Paginated log of every capture (recognised + Unknown). Sourced from `snapshot_logs`.

### CRUD `/api/employees`

`GET / POST / PUT /{id} / DELETE /{id}` — first boot seeds from `data/employees.json` **only when the table is empty**. After that the DB is the source of truth and edits persist through the API.

## Environment variables

| Variable | Default | Purpose |
|---|---|---|
| `CAMERA_HOST` | `172.18.11.62` | Camera IP / hostname |
| `CAMERA_USER` | `admin` | Login username |
| `CAMERA_PASS` | (set in code) | Login password |
| `CAPTURE_INTERVAL_SECONDS` | `5` | Seconds between `processAlarm/Get` polls |
| `REQUEST_TIMEOUT_SECONDS` | `30` | HTTP timeout for camera calls |
| `INGEST_API_URL` | **required for capture.py** | Comma-separated ingest target(s) |
| `DEFAULT_HISTORY_START` | `2026-04-15` | Fallback `start` for `/api/faces/history` |
| `DEFAULT_PAGE_LIMIT` | `50` | Default `limit` for list endpoints |
| `MAX_PAGE_LIMIT` | `500` | Max `limit` / `latest` |
| `SHIFT_START` | `09:30` | Local shift start |
| `SHIFT_END` | `18:30` | Local shift end |
| `LATE_GRACE_MIN` | `5` | Minutes of grace before a late arrival |
| `EARLY_EXIT_GRACE_MIN` | `5` | Minutes of grace before an early exit |
| `LOCAL_TZ_OFFSET_MIN` | `330` | Local timezone offset from UTC |
| `ALLOWED_ORIGINS` | *(unset)* | Extra CORS origins, comma-separated |

## Deploying to Railway

Railway's container filesystem is ephemeral, so pair the deploy with a **persistent volume** mounted at `/app/backend`. Without a volume, `database.db` is reset on every redeploy and you will see the "data keeps changing" symptom that this refactor set out to fix.

Required Railway env vars:
- `INGEST_API_URL` (only if you run `capture.py` inside the same service — otherwise the LAN machine running capture posts directly to Railway's `/api/ingest`)
- `ALLOWED_ORIGINS` if your frontend runs on a host not already in the regex allowlist

Checklist for a clean deploy:
1. Railway → service → **Volumes** → add a volume at `/app/backend` (or wherever `database.db` lives).
2. Verify `GET /api/health` returns `snapshot_count > 0` after the first ingest.
3. Point the LAN capture machine at Railway: `INGEST_API_URL=https://<your-service>.up.railway.app/api/ingest`.

## Troubleshooting

| Symptom | First check | Likely cause → fix |
|---|---|---|
| `Camera HTTP error 401` | Credentials + Digest auth | Update `CAMERA_USER` / `CAMERA_PASS`. |
| `Poll returned 0 faces` forever | Stand in front of the camera | This endpoint is a real-time alarm buffer, not a history query. |
| `No image data for SnapId=...` | The `keys=[...]` in the warning | Firmware uses a different image field. Extend `IMAGE_FIELDS` in [app/services/snapshots.py](app/services/snapshots.py). |
| Empty attendance on Railway after redeploy | `GET /api/health` `snapshot_count` | DB was reset because the Railway service has no persistent volume. |
| Frontend fetch blocked by CORS | Browser devtools network tab | Add origin to `ALLOWED_ORIGINS` env var or to the regex in [app/main.py](app/main.py). |

## Frontend wiring

[../frontend/src/api/dashboardApi.ts](../frontend/src/api/dashboardApi.ts) exports the read/write helpers the dashboard uses. Images come through as `data:` URLs — no special proxy or static mount is required.
