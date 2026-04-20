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
        try:
            resp = session.post(
                f"{CAMERA_BASE_URL}/API/Web/Login",
                json={"data": {}},
                auth=HTTPDigestAuth(CAMERA_USER, CAMERA_PASS),
                timeout=REQUEST_TIMEOUT_SECONDS,
            )
        except requests.ReadTimeout as exc:
            log.warning(
                "Camera login timed out after %.1fs at %s",
                REQUEST_TIMEOUT_SECONDS,
                CAMERA_BASE_URL,
            )
            raise
        except requests.RequestException:
            log.warning("Camera login request failed at %s", CAMERA_BASE_URL)
            raise
        if resp.status_code != 200:
            raise RuntimeError(f"Login failed: {resp.status_code} {resp.text[:200]}")
        token = resp.headers.get("X-csrftoken")
        if not token:
            raise RuntimeError("Login response missing X-csrftoken header")
        session.headers.update({"X-csrftoken": token, "Content-Type": "application/json"})
        log.info("Camera login succeeded; X-csrftoken received")
        return session

    def _ensure_session(self) -> requests.Session:
        if self._session is None:
            self._session = self._login()
        return self._session

    def invalidate(self) -> None:
        self._session = None

    def fetch_alarms(self) -> list[dict]:
        """
        Return the current `data.FaceInfo[]` list.

        Some firmware builds appear to hold `processAlarm/Get` open briefly when
        there are no live events to return. In that case a read timeout should be
        treated as an empty poll, not as a dead session that forces a re-login.
        """
        session = self._ensure_session()
        try:
            resp = session.post(
                f"{CAMERA_BASE_URL}/API/AI/processAlarm/Get",
                json={},
                timeout=REQUEST_TIMEOUT_SECONDS,
            )
        except requests.ReadTimeout:
            log.info(
                "processAlarm/Get timed out after %.1fs; treating as no live events",
                REQUEST_TIMEOUT_SECONDS,
            )
            return []
        if resp.status_code >= 400:
            log.warning(
                "processAlarm/Get %s rejected — response=%s",
                resp.status_code,
                resp.text[:500],
            )
        resp.raise_for_status()
        data = resp.json().get("data", {}) or {}
        faces = data.get("FaceInfo")
        if isinstance(faces, list):
            log.info("processAlarm/Get succeeded; FaceInfo count=%d", len(faces))
        return faces if isinstance(faces, list) else []
