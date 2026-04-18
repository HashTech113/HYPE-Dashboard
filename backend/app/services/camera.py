"""
Camera HTTP client.

Thin wrapper around `requests` that handles the Login → X-csrftoken → `/API/AI/processAlarm/Get`
flow documented in API/login.md and API/processAlarm_get.md.
"""

from __future__ import annotations

import logging
from typing import Optional

import requests
from requests.auth import HTTPDigestAuth

from ..config import (
    CAMERA_BASE_URL,
    CAMERA_PASS,
    CAMERA_USER,
    REQUEST_TIMEOUT_SECONDS,
)

log = logging.getLogger(__name__)


class CameraClient:
    """Keeps a logged-in session; transparently re-logs in when the camera 401s."""

    def __init__(self) -> None:
        self._session: Optional[requests.Session] = None

    def _login(self) -> requests.Session:
        log.info("Logging into camera at %s", CAMERA_BASE_URL)
        session = requests.Session()
        resp = session.post(
            f"{CAMERA_BASE_URL}/API/Web/Login",
            json={"data": {}},
            auth=HTTPDigestAuth(CAMERA_USER, CAMERA_PASS),
            timeout=REQUEST_TIMEOUT_SECONDS,
        )
        if resp.status_code != 200:
            raise RuntimeError(f"Login failed: {resp.status_code} {resp.text[:200]}")
        token = resp.headers.get("X-csrftoken")
        if not token:
            raise RuntimeError("Login response missing X-csrftoken header")
        session.headers.update({"X-csrftoken": token, "Content-Type": "application/json"})
        return session

    def _ensure_session(self) -> requests.Session:
        if self._session is None:
            self._session = self._login()
        return self._session

    def invalidate(self) -> None:
        self._session = None

    def fetch_alarms(self) -> list[dict]:
        """Return the current `data.FaceInfo[]` list (may be empty)."""
        session = self._ensure_session()
        resp = session.post(
            f"{CAMERA_BASE_URL}/API/AI/processAlarm/Get",
            json={},
            timeout=REQUEST_TIMEOUT_SECONDS,
        )
        if resp.status_code >= 400:
            log.warning(
                "processAlarm/Get %s rejected — response=%s",
                resp.status_code,
                resp.text[:500],
            )
        resp.raise_for_status()
        data = resp.json().get("data", {}) or {}
        faces = data.get("FaceInfo")
        return faces if isinstance(faces, list) else []
