# Testing the Camera API with Postman

End-to-end walk-through: authenticate → fetch face events → inspect image.

## One-time setup

1. Download Postman → https://www.postman.com/downloads/
2. Create a new workspace (or use an existing one).
3. **Turn off SSL verification** for this collection (camera serves plain HTTP):
   Settings → General → *SSL certificate verification* → **OFF**.

## Step 1 — Login

Create a new request:

- **Method:** `POST`
- **URL:** `http://172.18.10.26/API/Web/Login`
- **Authorization** tab → Type: **Digest Auth**
  - Username: `admin`
  - Password: `Opt@12345`
- **Body** tab → `raw` → `JSON`:

```json
{
  "data": {}
}
```

Click **Send**. You should see:

- `200 OK`
- Click the **Headers** tab on the response. Find `X-csrftoken` — copy its value.
- Click the **Cookies** tab. You'll see `session=<...>` saved for `172.18.10.26`. Postman will resend this cookie automatically.

> If you get `401`, the credentials are wrong. If you get no `X-csrftoken` header back, the camera rejected the login (usually wrong user or locked account).

## Step 2 — Fetch face events

New request:

- **Method:** `POST`
- **URL:** `http://172.18.10.26/API/AI/processAlarm/Get`
- **Headers** tab (add one):
  - `X-csrftoken: <paste the token from Step 1>`
  - `Content-Type: application/json`
- **Authorization** tab → **No Auth** (cookie + CSRF header do the work now)
- **Body** tab → `raw` → `JSON`:

```json
{}
```

Click **Send**. Expected response:

```json
{
  "data": {
    "FaceInfo": [
      {
        "Id": 1,
        "SnapId": 1250,
        "StartTime": 1540444116,
        "EndTime":   1540444126,
        "Chn": "CH1",
        "Image2": "<very long base64 string>",
        "Name": "Mike"
      }
      // ...
    ],
    "SnapedObjInfo": []
  }
}
```

### If the response is `{}` or `FaceInfo: []`

The camera has no *current* face events in its alarm buffer. This endpoint is real-time — it returns what's happening now. To populate it, stand in front of the camera for a few seconds, then re-run the request.

## Step 3 — View a captured face

The `Image2` field is a base64-encoded JPEG. Two ways to view it:

**Option A — Postman Visualize (quickest):**

Click the **Visualize** tab in the response pane and paste:

```html
<img src="data:image/jpeg;base64,{{response.data.FaceInfo.[0].Image2}}" />
```

**Option B — decode to a file:**

```bash
# Copy the Image2 string into a file, then:
base64 -d image2.b64 > face.jpg
open face.jpg   # (macOS)   or: xdg-open face.jpg   (Linux)
```

## Step 4 — Verify our own backend returns the same data

Once `npm run dev` is running:

```bash
curl -s http://localhost:8000/api/health | python -m json.tool
# { "status": "ok", "snapshot_count": N }

curl -s "http://localhost:8000/api/faces/history?latest=5" | python -m json.tool
```

Expected:

```json
{
  "count": 5,
  "total": 42,
  "limit": 5,
  "offset": 0,
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

Opening the `image_url` in a browser should render the face crop.

## Postman collection quick setup

Save each request in a **Collection** called `Camera API`:

```
Camera API/
├── 01 Login (POST /API/Web/Login)
└── 02 Get face events (POST /API/AI/processAlarm/Get)
```

Use a **Collection variable** `csrftoken` and set it automatically in the Login request's **Scripts → Post-response** tab:

```javascript
const token = pm.response.headers.get("X-csrftoken");
if (token) pm.collectionVariables.set("csrftoken", token);
```

Then in request 02's header, use `{{csrftoken}}` instead of pasting manually.

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| `401 Unauthorized` on login | Wrong username/password, or Digest auth not selected |
| `X-csrftoken` missing from login response | Account locked, or not admin-level |
| `400 Bad Request` on `/processAlarm/Get` | Missing `X-csrftoken` header, or session cookie not replayed (check Postman Cookies jar) |
| `FaceInfo: []` | No current alarm — stand in front of camera, retry |
| Image2 starts with `/9j/` | That's a valid JPEG. Decode it and save as `.jpg` |
