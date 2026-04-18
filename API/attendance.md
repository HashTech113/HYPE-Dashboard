# Attendance API

Backend endpoints that turn the camera's face captures into attendance records
(entry, exit, total hours, status) against a configurable shift.

Default shift: **09:30 – 18:30 IST**, with **5-minute** late and early-exit grace.

> Source data is the same `snapshots/` directory used by `/api/faces/history`.
> No DB. Restarting the backend does not lose anything; deleting a snapshot
> does.

## Configuration (env vars, all optional)

| Variable | Default | Notes |
|---|---|---|
| `SHIFT_START` | `09:30` | Local clock-in time, `HH:MM`. |
| `SHIFT_END` | `18:30` | Local clock-out time, `HH:MM`. |
| `LATE_GRACE_MIN` | `5` | Minutes past `SHIFT_START` before a person is flagged "Late". |
| `EARLY_EXIT_GRACE_MIN` | `5` | Minutes before `SHIFT_END` before a person is flagged "Early Exit". |
| `LOCAL_TZ_OFFSET_MIN` | `330` | Local timezone offset from UTC, in minutes. `330` = IST (+05:30). |

Every endpoint also accepts the same values as query overrides — handy for
testing different shifts in Postman without restarting the server.

## Endpoints

All endpoints are GET, return JSON, no auth.

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/attendance/config` | Inspect the active shift. |
| GET | `/api/attendance/daily` | One row per person on a given date. |
| GET | `/api/attendance/range` | Daily rows over a date range, optional name filter. |

### Status logic

For each `(name, local_date)` we take the **earliest** capture as `entry` and
the **latest** as `exit`. Then:

- `late_minutes` = max(0, entry − shift_start)
- `early_exit_minutes` = max(0, shift_end − exit)
- `status`:
  - **Late** if `late_minutes > LATE_GRACE_MIN`
  - else **Early Exit** if `early_exit_minutes > EARLY_EXIT_GRACE_MIN`
  - else **Present**
  - **Absent** is only returned if you pass `?names=` and a name has no captures
- `total_hours` = `exit − entry`, formatted `Hh MMm`. Only one capture in the
  day → `total_hours = "—"`.

---

## `GET /api/attendance/config`

```http
GET http://localhost:8000/api/attendance/config
```

Response:

```json
{
  "start": "09:30",
  "end": "18:30",
  "late_grace_min": 5,
  "early_exit_grace_min": 5,
  "timezone_offset_minutes": 330
}
```

---

## `GET /api/attendance/daily`

### Query params

| Param | Default | Description |
|---|---|---|
| `date` | today (local) | `YYYY-MM-DD` |
| `names` | — | Comma-separated expected names. Missing names are added as `Absent`. |
| `shift_start`, `shift_end` | env defaults | `HH:MM` overrides. |
| `late_grace_min`, `early_exit_grace_min` | env defaults | Override grace windows. |
| `tz_offset_minutes` | `330` | Override local timezone offset. |

### Sample request

```http
GET http://localhost:8000/api/attendance/daily?date=2026-04-18&names=Akash,Akhil,Aromal,Vaishnav,Greeshma,Ambika,Maria
```

### Sample response (truncated)

```json
{
  "date": "2026-04-18",
  "shift": {
    "start": "09:30",
    "end": "18:30",
    "late_grace_min": 5,
    "early_exit_grace_min": 5,
    "timezone_offset_minutes": 330
  },
  "count": 7,
  "items": [
    {
      "name": "Akash",
      "date": "2026-04-18",
      "entry": "09:32:11",
      "exit": "18:34:02",
      "entry_iso": "2026-04-18T09:32:11+05:30",
      "exit_iso": "2026-04-18T18:34:02+05:30",
      "total_hours": "9h 01m",
      "total_minutes": 541,
      "status": "Present",
      "late_minutes": 2,
      "early_exit_minutes": 0,
      "capture_count": 6,
      "entry_image_url": "http://localhost:8000/snapshots/snap_20260418T040211Z_..._Akash_866.jpg",
      "exit_image_url":  "http://localhost:8000/snapshots/snap_20260418T130402Z_..._Akash_910.jpg"
    },
    {
      "name": "Maria",
      "date": "2026-04-18",
      "entry": null,
      "exit": null,
      "entry_iso": null,
      "exit_iso": null,
      "total_hours": "—",
      "total_minutes": 0,
      "status": "Absent",
      "late_minutes": 0,
      "early_exit_minutes": 0,
      "capture_count": 0,
      "entry_image_url": null,
      "exit_image_url": null
    }
  ]
}
```

---

## `GET /api/attendance/range`

### Query params

| Param | Required | Description |
|---|---|---|
| `start` | yes | `YYYY-MM-DD` (local) |
| `end` | yes | `YYYY-MM-DD` (local), inclusive, max 366 days. |
| `name` | no | Restrict to one person (case-insensitive). |
| Shift / grace / tz overrides | no | Same as `/daily`. |

### Sample request

```http
GET http://localhost:8000/api/attendance/range?start=2026-04-15&end=2026-04-18&name=Akash
```

### Sample response

```json
{
  "start": "2026-04-15",
  "end": "2026-04-18",
  "shift": {
    "start": "09:30",
    "end": "18:30",
    "late_grace_min": 5,
    "early_exit_grace_min": 5,
    "timezone_offset_minutes": 330
  },
  "count": 1,
  "items": [
    {
      "name": "Akash",
      "date": "2026-04-18",
      "entry": "17:06:00",
      "exit": "17:06:00",
      "entry_iso": "2026-04-18T17:06:00+05:30",
      "exit_iso": "2026-04-18T17:06:00+05:30",
      "total_hours": "—",
      "total_minutes": 0,
      "status": "Late",
      "late_minutes": 456,
      "early_exit_minutes": 84,
      "capture_count": 1,
      "entry_image_url": "http://localhost:8000/snapshots/snap_20260418T113600Z_..._Akash_866.jpg",
      "exit_image_url":  "http://localhost:8000/snapshots/snap_20260418T113600Z_..._Akash_866.jpg"
    }
  ]
}
```

---

## Postman quick-start

No camera login required for these endpoints — they read the local
`snapshots/` directory. Just point Postman at `http://localhost:8000`.

### Collection layout

```
Attendance API/
├── 01 Get config         GET /api/attendance/config
├── 02 Daily — today      GET /api/attendance/daily
├── 03 Daily — by date    GET /api/attendance/daily?date=2026-04-18&names=...
├── 04 Range — one person GET /api/attendance/range?start=...&end=...&name=Akash
└── 05 Range — all        GET /api/attendance/range?start=...&end=...
```

### Steps

1. **Start the backend.**
   ```bash
   bash backend/start.sh
   # listens on :8000, reads snapshots/ for source data
   ```
2. **Sanity-check.**
   ```bash
   curl -s http://localhost:8000/api/health | python3 -m json.tool
   curl -s http://localhost:8000/api/attendance/config | python3 -m json.tool
   ```
3. **Daily for today (live).** In Postman:
   - Method: `GET`
   - URL: `http://localhost:8000/api/attendance/daily`
   - **Send.** Response lists everyone seen today.
4. **Daily with absents.** Add the `names` query (comma-separated):
   `?date=2026-04-18&names=Akash,Akhil,Aromal,Vaishnav,Greeshma,Ambika,Maria`.
   Anyone in the list without captures is reported as `"status": "Absent"`.
5. **Range for one person.**
   `?start=2026-04-01&end=2026-04-30&name=Akash`.
6. **Try a different shift on the fly** (no restart needed):
   `?date=2026-04-18&shift_start=08:00&shift_end=17:00&late_grace_min=10`.

### Postman test-script snippets

Paste into the request's **Tests** tab to validate the response on Send:

```javascript
pm.test("status 200", () => pm.response.to.have.status(200));

const body = pm.response.json();
pm.test("shift echoed", () => {
  pm.expect(body.shift.start).to.eql("09:30");
  pm.expect(body.shift.end).to.eql("18:30");
});

pm.test("each item has required fields", () => {
  body.items.forEach((row) => {
    pm.expect(row).to.include.keys(
      "name","date","entry","exit","total_hours","status",
      "late_minutes","early_exit_minutes","capture_count"
    );
    pm.expect(["Present","Late","Early Exit","Absent"]).to.include(row.status);
  });
});
```

### Pre-request: today's date as a variable

```javascript
const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, "0");
const dd = String(today.getDate()).padStart(2, "0");
pm.collectionVariables.set("today", `${yyyy}-${mm}-${dd}`);
```

Then use `{{today}}` in the URL: `…/daily?date={{today}}`.

---

## Errors

| HTTP | When |
|---|---|
| `400` | Bad `date` / `start` / `end` (must be `YYYY-MM-DD`); start after end; `shift_start >= shift_end`; range > 366 days. |
| `200` with `count: 0` | No captures and no `names` filter. Not an error — just an empty day. |

## Reference implementation

- Logic: [backend/app/services/attendance.py](../backend/app/services/attendance.py)
- HTTP: [backend/app/routers/attendance.py](../backend/app/routers/attendance.py)
- Config: [backend/app/config.py](../backend/app/config.py)
- Schemas: [backend/app/schemas/attendance.py](../backend/app/schemas/attendance.py)
