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
    CAMERA_DISCOVERY_SUBNETS,
    CAMERA_MAC,
    CAMERA_PASS,
    CAMERA_USER,
    REQUEST_TIMEOUT_SECONDS,
)
from .camera_discovery import discover_camera

log = logging.getLogger(__name__)


class CameraClient:
    """Keeps a logged-in session; transparently re-logs in when the camera 401s.

    The base URL lives on the instance so we can swap in a freshly-
    discovered IP if the camera's DHCP lease rotates and the configured
    host stops responding (see ``_rediscover``).
    """

    def __init__(self) -> None:
        self._session: Optional[requests.Session] = None
        self._base_url: str = CAMERA_BASE_URL

    @property
    def base_url(self) -> str:
        return self._base_url

    def _login(self) -> requests.Session:
        log.info("Logging into camera at %s", self._base_url)
        session = requests.Session()
        try:
            resp = session.post(
                f"{self._base_url}/API/Web/Login",
                json={"data": {}},
                auth=HTTPDigestAuth(CAMERA_USER, CAMERA_PASS),
                timeout=REQUEST_TIMEOUT_SECONDS,
            )
        except requests.ReadTimeout:
            log.warning(
                "Camera login timed out after %.1fs at %s",
                REQUEST_TIMEOUT_SECONDS,
                self._base_url,
            )
            self._rediscover()
            raise
        except (requests.ConnectTimeout, requests.ConnectionError):
            # Connect-level failure is the classic "DHCP rotated the IP"
            # signal: we can't even reach the host. Try to find it again
            # before the next retry; the caller's existing retry/backoff
            # loop will pick up the new base URL on the next iteration.
            log.warning("Camera login could not connect to %s", self._base_url)
            self._rediscover()
            raise
        except requests.RequestException:
            log.warning("Camera login request failed at %s", self._base_url)
            raise
        if resp.status_code != 200:
            raise RuntimeError(f"Login failed: {resp.status_code} {resp.text[:200]}")
        token = resp.headers.get("X-csrftoken")
        if not token:
            raise RuntimeError("Login response missing X-csrftoken header")
        session.headers.update({"X-csrftoken": token, "Content-Type": "application/json"})
        log.info("Camera login succeeded; X-csrftoken received")
        return session

    def _rediscover(self) -> None:
        """Look up the camera's current IP via ARP. No-op if discovery
        finds the same address we already have, or if it finds nothing
        (we'll keep retrying the configured host)."""
        new_ip = discover_camera(
            user=CAMERA_USER,
            password=CAMERA_PASS,
            expected_mac=CAMERA_MAC or None,
            subnet_prefixes=CAMERA_DISCOVERY_SUBNETS,
        )
        if not new_ip:
            return
        candidate = f"http://{new_ip}"
        if candidate == self._base_url:
            return
        log.info(
            "Camera rediscovered: %s -> %s (MAC pin=%s)",
            self._base_url, candidate, CAMERA_MAC or "(OUI filter)",
        )
        self._base_url = candidate

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
                f"{self._base_url}/API/AI/processAlarm/Get",
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
            f"{self._base_url}/API/AI/SnapedFaces/Search",
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
            f"{self._base_url}/API/AI/SnapedFaces/GetByIndex",
            json=payload,
            timeout=REQUEST_TIMEOUT_SECONDS,
        )
        resp.raise_for_status()
        data = resp.json().get("data", {}) or {}
        rows = data.get("SnapedFaceInfo")
        return rows if isinstance(rows, list) else []
