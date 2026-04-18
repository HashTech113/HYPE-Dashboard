# Camera API Reference

Hand-extracted notes on the two camera endpoints this project uses. The camera is at `http://172.18.10.26` (overridable via `CAMERA_HOST`). Source: the vendor's HTTP API Protocol For IP Media Device docs.

| File | What's in it |
|---|---|
| [login.md](login.md) | Digest auth + `X-csrftoken` handshake. Required before any other call. |
| [processAlarm_get.md](processAlarm_get.md) | `POST /API/AI/processAlarm/Get` — the real-time face event feed. This is where we collect timestamps + images from. |
| [postman.md](postman.md) | Step-by-step: import collection, authenticate, hit the endpoint, inspect response. |

## Quick reference

**Base URL:** `http://172.18.10.26`

**Auth flow:**
1. `POST /API/Web/Login` with Digest auth (user: `admin`, pass: `Opt@12345`) and body `{"data": {}}`
2. Read the `X-csrftoken` header off the 200 response
3. Attach `X-csrftoken` + the session cookie to every subsequent request

**Get face events:**
- `POST /API/AI/processAlarm/Get` with body `{}`
- Returns `data.FaceInfo[]` — each record has `StartTime`, `EndTime`, `SnapId`, optional `Name`, and `Image1..Image4` as base64 JPEGs

**Everything else the camera exposes** (thermal, storage, network config, recording, etc.) is out of scope for this project and has been intentionally removed from the docs tree.
