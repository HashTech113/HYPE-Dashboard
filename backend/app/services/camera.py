"""
Camera HTTP client.

Thin wrapper around `requests` that handles the Login → X-csrftoken →
`/API/AI/processAlarm/Get` (live) and `/API/AI/SnapedFaces/Search` +
`GetByIndex` (historical backfill) flows.
"""

from __future__ import annotations

import logging
from datetime import datetime
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

    def search_history(
        self,
        start_local: datetime,
        end_local: datetime,
        similarity: int = 70,
    ) -> int:
        """Initiate a SnapedFaces search over the given local-time window.

        The camera uses this call to seed an internal cursor; actual rows are
        fetched via ``get_snaped_by_index``. Returns the total match count.
        """
        session = self._ensure_session()
        payload = {
            "msgType": "AI_searchSnapedFaces",
            "data": {
                "MsgId": None,
                "StartTime": start_local.strftime("%Y-%m-%d %H:%M:%S"),
                "EndTime": end_local.strftime("%Y-%m-%d %H:%M:%S"),
                "Similarity": similarity,
                "Engine": 0,
            },
        }
        resp = session.post(
            f"{CAMERA_BASE_URL}/API/AI/SnapedFaces/Search",
            json=payload,
            timeout=REQUEST_TIMEOUT_SECONDS,
        )
        resp.raise_for_status()
        data = resp.json().get("data", {}) or {}
        total = int(data.get("Count") or 0)
        log.info(
            "SnapedFaces/Search %s→%s total=%d",
            payload["data"]["StartTime"],
            payload["data"]["EndTime"],
            total,
        )
        return total

    def get_snaped_by_index(
        self,
        start_index: int,
        count: int,
        *,
        with_face_image: bool = True,
        matched_only: bool = True,
    ) -> list[dict]:
        """Page through the current SnapedFaces cursor. Call after search_history."""
        session = self._ensure_session()
        payload = {
            "data": {
                "MsgId": None,
                "Engine": 0,
                "MatchedFaces": 1 if matched_only else 0,
                "StartIndex": start_index,
                "Count": count,
                "SimpleInfo": 0,
                "WithFaceImage": 1 if with_face_image else 0,
                "WithBodyImage": 0,
                "WithBackgroud": 0,
                "WithFeature": 0,
            }
        }
        resp = session.post(
            f"{CAMERA_BASE_URL}/API/AI/SnapedFaces/GetByIndex",
            json=payload,
            timeout=REQUEST_TIMEOUT_SECONDS,
        )
        resp.raise_for_status()
        data = resp.json().get("data", {}) or {}
        rows = data.get("SnapedFaceInfo")
        return rows if isinstance(rows, list) else []
