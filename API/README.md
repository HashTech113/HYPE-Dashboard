# Camera API Reference

Hand-extracted notes on the two camera endpoints this project uses. The camera is at `http://172.18.10.26` (overridable via `CAMERA_HOST`). Source: the vendor's HTTP API Protocol For IP Media Device docs.

| File | What's in it |
|---|---|
| [login.md](login.md) | Digest auth + `X-csrftoken` handshake. Required before any other call. |
| [processAlarm_get.md](processAlarm_get.md) | `POST /API/AI/processAlarm/Get` — the real-time face event feed. This is where we collect timestamps + images from. |
| [postman.md](postman.md) | Step-by-step: import collection, authenticate, hit the endpoint, inspect response. |
| [INDEX.md](INDEX.md) | **Full vendor reference** — every endpoint the camera exposes, grouped by category (AI, Alarm, Record, Storage, Network, etc.) with one-line descriptions. |
| [reference/](reference/) | Per-endpoint markdown pages (auto-extracted from the vendor's HTTP API Protocol docs). |

## Quick reference

**Base URL:** `http://172.18.10.26`

**Auth flow:**
1. `POST /API/Web/Login` with Digest auth (user: `admin`, pass: `Opt@12345`) and body `{"data": {}}`
2. Read the `X-csrftoken` header off the 200 response
3. Attach `X-csrftoken` + the session cookie to every subsequent request

**Get face events:**
- `POST /API/AI/processAlarm/Get` with body `{}`
- Returns `data.FaceInfo[]` — each record has `StartTime`, `EndTime`, `SnapId`, optional `Name`, and `Image1..Image4` as base64 JPEGs

**Everything else the camera exposes** (thermal, storage, network config, recording, alarm linkage, PTZ, channels, ONVIF, etc.) is documented under [reference/](reference/) and summarized in [INDEX.md](INDEX.md). Only the two endpoints above are wired into the project today — the rest is there when you need to extend the dashboard (e.g. arm/disarm, schedule an auto-reboot, query storage health, fetch a recording, etc.).
