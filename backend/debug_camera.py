"""
One-shot camera diagnostic.

Logs in and calls `/API/AI/processAlarm/Get` (see
API/doc/API/AI/Snaped_face_or_object/Get.html). Prints the response with
long base64 image fields truncated so the output is readable.

Usage:
    cd backend
    python debug_camera.py
"""

from __future__ import annotations

import json
import sys
from typing import Any

import requests
from requests.auth import HTTPDigestAuth

from app.config import (
    CAMERA_BASE_URL,
    CAMERA_PASS,
    CAMERA_USER,
    REQUEST_TIMEOUT_SECONDS,
)

IMAGE_KEYS = {"Image1", "Image2", "Image3", "Image4", "Feature", "ObjectImage", "Background"}


def _trim(obj: Any) -> Any:
    if isinstance(obj, dict):
        return {k: (f"<base64 {len(v)} chars>" if k in IMAGE_KEYS and isinstance(v, str) else _trim(v)) for k, v in obj.items()}
    if isinstance(obj, list):
        return [_trim(v) for v in obj]
    return obj


def login() -> requests.Session:
    session = requests.Session()
    url = f"{CAMERA_BASE_URL}/API/Web/Login"
    print(f"POST {url}")
    resp = session.post(
        url,
        json={"data": {}},
        auth=HTTPDigestAuth(CAMERA_USER, CAMERA_PASS),
        timeout=REQUEST_TIMEOUT_SECONDS,
    )
    print(f"  status: {resp.status_code}")
    if resp.status_code != 200:
        print(f"  body:   {resp.text[:500]}")
        sys.exit(1)
    token = resp.headers.get("X-csrftoken")
    if not token:
        sys.exit("Login missing X-csrftoken")
    session.headers.update({"X-csrftoken": token, "Content-Type": "application/json"})
    return session


def fetch_alarms(session: requests.Session) -> None:
    url = f"{CAMERA_BASE_URL}/API/AI/processAlarm/Get"
    print(f"\nPOST {url}")
    print("  request: {}")
    resp = session.post(url, json={}, timeout=REQUEST_TIMEOUT_SECONDS)
    print(f"  status: {resp.status_code}")
    try:
        body = resp.json()
    except ValueError:
        print("  body (non-JSON):")
        print(resp.text[:2000])
        return
    trimmed = _trim(body)
    print("  response:")
    print(json.dumps(trimmed, indent=2))

    data = body.get("data") if isinstance(body, dict) else None
    if isinstance(data, dict):
        faces = data.get("FaceInfo")
        objs = data.get("SnapedObjInfo")
        print("\n--- summary ---")
        print(f"  FaceInfo entries:     {len(faces) if isinstance(faces, list) else 'missing'}")
        print(f"  SnapedObjInfo entries:{len(objs)  if isinstance(objs,  list) else 'missing'}")
        if isinstance(faces, list) and faces:
            keys = sorted({k for f in faces for k in (f.keys() if isinstance(f, dict) else [])})
            print(f"  Face keys seen: {keys}")


def main() -> int:
    session = login()
    fetch_alarms(session)
    return 0


if __name__ == "__main__":
    sys.exit(main())
