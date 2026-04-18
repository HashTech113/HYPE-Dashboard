# `POST /API/AI/processAlarm/Get`

Real-time "snapped face or object" alarm feed. This is the endpoint the capture loop polls to collect timestamps + images.

## Request

```http
POST http://172.18.10.26/API/AI/processAlarm/Get
Content-Type: application/json
X-csrftoken: <token from /API/Web/Login>
```

Body:

```json
{}
```

The body is intentionally empty — the camera returns whatever face / object events are currently available.

## Response shape

```json
{
  "data": {
    "FaceInfo":      [ /* per-face records — see Table A */ ],
    "SnapedObjInfo": [ /* per-object records — see Table B */ ]
  }
}
```

### Table A — `FaceInfo[]` (faces)

| Field | Type | Notes |
|---|---|---|
| `Id` | int | Face ID, unique (NVR only) |
| `GrpId` | int | Group ID (NVR only) |
| `SnapId` | uint | Frame ID when the IPC captured the face — **stable unique id we dedup on** |
| `Type` | int | Capture object type, `0` = face |
| `StartTime` | uint64 | **Entry time** — Unix timestamp, UTC |
| `EndTime` | uint64 | **Exit time** — Unix timestamp, UTC |
| `Similarity` | float | Match similarity (NVR only) |
| `Score` | int | Image confidence (NVR only) |
| `Gender`, `fAttrAge`, `Beauty`, `GlassesType`, `Expression`, `MouthMask`, `Race` | int | Face attributes |
| `Chn` / `StrChn` | int / string | Channel (`"CH1"`, etc.) |
| `Image1` | base64 | Imported face picture (enrolled reference) |
| `Image2` | base64 | **Captured face crop** — what we save to `snapshots/` |
| `Image3` | base64 | Captured body crop |
| `Image4` | base64 | Background snapshot |
| `Feature` | base64 | Feature vector (NVR only) |
| `Name` | string | **Person name — NVR only.** IPC firmware usually omits this; fallback is `"Unknown"` |
| `Country`, `Nation`, `NativePlace`, `IdCode`, `Job`, `Phone`, `Email`, `Domicile`, `Remark` | string | Enrollment metadata (NVR only) |

### Table B — `SnapedObjInfo[]` (non-face objects)

| Field | Type | Notes |
|---|---|---|
| `Chn` / `StrChn` | int / string | Channel |
| `GrpId` | int | Group ID |
| `StartTime` | uint64 | Unix ts, UTC |
| `EndTime` | uint64 | Unix ts, UTC |
| `ObjectImage` | base64 | Cropped object picture |
| `Background` | base64 | Scene snapshot |
| `SnapId` | uint | Frame ID |
| `Type` | int | `0` face, `1` figure, `2` vehicle, `3` PID figure, `4` PID vehicle, `5` LCD figure, `6` LCD vehicle |

This project ignores `SnapedObjInfo` for now — it only stores face captures.

## Sample truncated response

```json
{
  "data": {
    "FaceInfo": [
      {
        "Id": 1,
        "SnapId": 1250,
        "StartTime": 1540444116,
        "EndTime": 1540444126,
        "Chn": "CH1",
        "Image2": "<base64 jpeg>",
        "Name": "Mike"
      }
    ],
    "SnapedObjInfo": []
  }
}
```

## How we collect timestamps + images

For each `FaceInfo` record:

1. `SnapId` → dedup key (skip if a file already matches `snapshots/snap_*_<SnapId>.jpg`)
2. `StartTime` / `EndTime` → parsed as UTC datetimes → encoded into the filename
3. `Name` → sanitized (non-alphanumerics → `_`, `"Unknown"` if missing) → encoded into the filename
4. `Image2` → base64-decoded → written as a JPEG

Result: `snapshots/snap_<startISO>_<endISO>_<name>_<SnapId>.jpg`. The API layer parses this back into a row for the dashboard.

## Not-200 responses

The camera returns plain 400 with a short body when anything is malformed. `capture.py` logs the body text so you can see the camera's own error message.

## Reference implementation

- `_fetch_alarms()` in [backend/app/services/camera.py](../backend/app/services/camera.py) — the HTTP call
- `save_face()` in [backend/app/services/snapshots.py](../backend/app/services/snapshots.py) — decode, name, write
