# Login

All AI endpoints require a logged-in session. The camera uses **HTTP Digest** on the login call, then returns a CSRF token you attach to everything afterwards.

## Endpoint

```
POST http://172.18.10.26/API/Web/Login
Content-Type: application/json
Authorization: Digest username="admin", password="Opt@12345", ...
```

Body:

```json
{ "data": {} }
```

## Success response

- `200 OK`
- Header `X-csrftoken: <token>` — save this
- `Set-Cookie: session=<...>` — also save (requests library handles this via `Session`)

## What to send on subsequent calls

```
X-csrftoken: <token from login response>
Content-Type: application/json
Cookie: session=<set automatically>
```

Without both the cookie and the `X-csrftoken` header, other endpoints return 401 / 400.

## Session lifetime

The vendor docs recommend pinging `POST /API/Login/Heartbeat` every 30 s to keep the session alive. In this project the capture loop just re-logs in on any 4xx/5xx — simpler and self-healing.

## Reference implementation

See `_login()` in [backend/app/services/camera.py](../backend/app/services/camera.py).
