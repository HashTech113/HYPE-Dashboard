"""
One-shot camera diagnostic.

Logs in and calls `/API/AI/processAlarm/Get`. Prints the response with long
base64 image fields truncated so the output is readable.

Usage:
    cd backend
    python debug_camera.py
"""

from __future__ import annotations

import json
import sys
from typing import Any

from app.services.camera import CameraClient

IMAGE_KEYS = {"Image1", "Image2", "Image3", "Image4", "Feature", "ObjectImage", "Background"}


def _trim(obj: Any) -> Any:
    if isinstance(obj, dict):
        return {
            k: (f"<base64 {len(v)} chars>" if k in IMAGE_KEYS and isinstance(v, str) else _trim(v))
            for k, v in obj.items()
        }
    if isinstance(obj, list):
        return [_trim(v) for v in obj]
    return obj


def main() -> int:
    client = CameraClient()
    faces = client.fetch_alarms()
    print(f"FaceInfo entries: {len(faces)}\n")
    if not faces:
        print("(no faces in current alarm buffer — stand in front of the camera and retry)")
        return 0
    for i, face in enumerate(faces):
        print(f"--- Face #{i} ---")
        print(json.dumps(_trim(face), indent=2))
    keys = sorted({k for f in faces for k in f.keys()})
    print(f"\nAll keys observed: {keys}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
