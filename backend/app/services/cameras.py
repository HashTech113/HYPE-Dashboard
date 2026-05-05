"""Cameras CRUD + RTSP connection check + MJPEG stream proxy generator.

Storage: SQLite ``cameras`` table, with passwords symmetrically encrypted
at rest (services.crypto). Plaintext passwords never leave this process —
the API surfaces only a masked RTSP URL preview, and the live stream proxy
decrypts internally to open the camera connection.
"""

from __future__ import annotations

import logging
import socket
import threading
import time
import uuid
from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Optional
from urllib.parse import quote

from ..db import connect
from . import crypto

log = logging.getLogger(__name__)


@dataclass(frozen=True)
class Camera:
    id: str
    name: str
    location: str
    ip: str
    port: int
    username: str
    password_encrypted: str
    rtsp_path: str
    connection_status: str
    last_checked_at: Optional[str]
    last_check_message: Optional[str]
    created_at: str
    updated_at: str


_COLS = (
    "id, name, location, ip, port, username, password_encrypted, rtsp_path, "
    "connection_status, last_checked_at, last_check_message, created_at, updated_at"
)


def _row_to_camera(row) -> Camera:
    return Camera(
        id=str(row["id"]),
        name=str(row["name"]),
        location=str(row["location"] or ""),
        ip=str(row["ip"]),
        port=int(row["port"]),
        username=str(row["username"] or ""),
        password_encrypted=str(row["password_encrypted"] or ""),
        rtsp_path=str(row["rtsp_path"] or ""),
        connection_status=str(row["connection_status"] or "unknown"),
        last_checked_at=row["last_checked_at"],
        last_check_message=row["last_check_message"],
        created_at=str(row["created_at"]),
        updated_at=str(row["updated_at"]),
    )


def _utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


# ---- CRUD ------------------------------------------------------------------

def all_cameras() -> list[Camera]:
    with connect() as conn:
        rows = conn.execute(
            f"SELECT {_COLS} FROM cameras ORDER BY name COLLATE NOCASE"
        ).fetchall()
    return [_row_to_camera(r) for r in rows]


def get_by_id(camera_id: str) -> Optional[Camera]:
    with connect() as conn:
        row = conn.execute(
            f"SELECT {_COLS} FROM cameras WHERE id = ?", (camera_id,)
        ).fetchone()
    return _row_to_camera(row) if row else None


def create(
    *,
    name: str,
    location: str,
    ip: str,
    port: int,
    username: str,
    password: str,
    rtsp_path: str,
) -> Camera:
    new_id = f"cam-{uuid.uuid4().hex[:10]}"
    now = _utc_now_iso()
    pw_enc = crypto.encrypt(password)
    with connect() as conn:
        conn.execute(
            "INSERT INTO cameras (id, name, location, ip, port, username, "
            "password_encrypted, rtsp_path, connection_status, "
            "last_checked_at, last_check_message, created_at, updated_at) "
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'unknown', NULL, NULL, ?, ?)",
            (new_id, name, location, ip, port, username, pw_enc, rtsp_path, now, now),
        )
    cam = get_by_id(new_id)
    assert cam is not None
    return cam


def update(
    camera_id: str,
    *,
    name: Optional[str] = None,
    location: Optional[str] = None,
    ip: Optional[str] = None,
    port: Optional[int] = None,
    username: Optional[str] = None,
    password: Optional[str] = None,
    rtsp_path: Optional[str] = None,
) -> Optional[Camera]:
    sets: list[str] = []
    params: list = []
    if name is not None:
        sets.append("name = ?"); params.append(name)
    if location is not None:
        sets.append("location = ?"); params.append(location)
    if ip is not None:
        sets.append("ip = ?"); params.append(ip)
    if port is not None:
        sets.append("port = ?"); params.append(port)
    if username is not None:
        sets.append("username = ?"); params.append(username)
    # Empty/None password = leave existing one untouched (so the operator
    # can edit the form without re-entering the password every time).
    if password is not None and password != "":
        sets.append("password_encrypted = ?"); params.append(crypto.encrypt(password))
    if rtsp_path is not None:
        sets.append("rtsp_path = ?"); params.append(rtsp_path)
    if not sets:
        return get_by_id(camera_id)
    sets.append("updated_at = ?"); params.append(_utc_now_iso())
    params.append(camera_id)
    with connect() as conn:
        cur = conn.execute(
            f"UPDATE cameras SET {', '.join(sets)} WHERE id = ?", params
        )
        if cur.rowcount == 0:
            return None
    return get_by_id(camera_id)


def delete(camera_id: str) -> bool:
    with connect() as conn:
        cur = conn.execute("DELETE FROM cameras WHERE id = ?", (camera_id,))
    return cur.rowcount > 0


def update_status(camera_id: str, *, status: str, message: str) -> None:
    now = _utc_now_iso()
    with connect() as conn:
        conn.execute(
            "UPDATE cameras SET connection_status = ?, last_checked_at = ?, "
            "last_check_message = ?, updated_at = ? WHERE id = ?",
            (status, now, message, now, camera_id),
        )


# ---- RTSP URL helpers ------------------------------------------------------

def build_rtsp_url(
    *,
    ip: str,
    port: int,
    username: str,
    password: str,
    rtsp_path: str,
) -> str:
    """Full credentialed RTSP URL — used internally to open the stream.
    URL-encodes credentials so symbols like '@' and ':' don't break parsing."""
    path = rtsp_path if rtsp_path.startswith("/") else f"/{rtsp_path}"
    if username:
        creds = f"{quote(username, safe='')}:{quote(password, safe='')}@"
    else:
        creds = ""
    return f"rtsp://{creds}{ip}:{port}{path}"


def build_rtsp_url_for_camera(cam: Camera) -> str:
    return build_rtsp_url(
        ip=cam.ip,
        port=cam.port,
        username=cam.username,
        password=crypto.decrypt(cam.password_encrypted),
        rtsp_path=cam.rtsp_path,
    )


def masked_rtsp_url(cam: Camera) -> str:
    """Credential-less preview, safe to return to the frontend."""
    path = cam.rtsp_path if cam.rtsp_path.startswith("/") else f"/{cam.rtsp_path}"
    if cam.username:
        return f"rtsp://{cam.username}:****@{cam.ip}:{cam.port}{path}"
    return f"rtsp://{cam.ip}:{cam.port}{path}"


# ---- Connection check ------------------------------------------------------

def _tcp_reachable(host: str, port: int, timeout_s: float = 3.0) -> tuple[bool, str]:
    try:
        with socket.create_connection((host, port), timeout=timeout_s):
            return True, "TCP reachable"
    except socket.gaierror:
        return False, "Could not resolve hostname — check the IP"
    except (socket.timeout, ConnectionRefusedError, OSError) as exc:
        return False, f"Camera unreachable: {exc.__class__.__name__}"


def check_connection(
    *,
    ip: str,
    port: int,
    username: str,
    password: str,
    rtsp_path: str,
    timeout_s: float = 8.0,
) -> tuple[bool, str, int]:
    """Open the RTSP stream, read one frame, return (ok, message, latency_ms).

    Bounded by ``timeout_s`` since cv2.VideoCapture can hang for ~60s on a
    bad URL. The probe runs in a daemon thread; if it overshoots the timeout
    we abandon it (the OpenCV capture releases when its local ref is GC'd).
    """
    started = time.monotonic()

    # Cheap reachability gate — avoids the heavier RTSP probe when the host
    # isn't even responding on the RTSP port.
    ok, msg = _tcp_reachable(ip, port, timeout_s=3.0)
    if not ok:
        return False, msg, int((time.monotonic() - started) * 1000)

    rtsp_url = build_rtsp_url(
        ip=ip, port=port, username=username, password=password, rtsp_path=rtsp_path
    )
    result: dict = {"ok": False, "msg": "Connection timed out"}

    def _attempt() -> None:
        try:
            import cv2
        except Exception as exc:
            result["msg"] = f"OpenCV unavailable: {exc}"
            return
        cap = None
        try:
            cap = cv2.VideoCapture(rtsp_url, cv2.CAP_FFMPEG)
            if not cap.isOpened():
                result["msg"] = "Could not open RTSP stream — check IP, port, and path"
                return
            ret, _frame = cap.read()
            if ret:
                result["ok"] = True
                result["msg"] = "Connected"
            else:
                result["msg"] = "Stream opened but no frame received — check credentials"
        except Exception as exc:
            result["msg"] = f"Connection error: {exc}"
        finally:
            if cap is not None:
                cap.release()

    t = threading.Thread(target=_attempt, daemon=True, name=f"rtsp-check-{ip}")
    t.start()
    t.join(timeout=timeout_s)
    latency_ms = int((time.monotonic() - started) * 1000)
    if t.is_alive():
        return False, "Connection timed out", latency_ms
    return bool(result["ok"]), str(result["msg"]), latency_ms


# ---- MJPEG generator -------------------------------------------------------

def mjpeg_stream(rtsp_url: str, *, target_fps: int = 8, jpeg_quality: int = 70):
    """Yield multipart MJPEG bytes for FastAPI's StreamingResponse.

    Bounded fps so we don't saturate the worker thread. When the camera
    drops frames we back off briefly and try again — if the disconnect is
    permanent the client will eventually close the connection and the
    generator exits via the ``finally`` cleanup."""
    try:
        import cv2
    except Exception:
        log.exception("cv2 unavailable; cannot stream")
        return

    cap = cv2.VideoCapture(rtsp_url, cv2.CAP_FFMPEG)
    if not cap.isOpened():
        log.warning("mjpeg_stream: could not open RTSP stream")
        return

    period = 1.0 / max(1, target_fps)
    next_at = time.monotonic()
    try:
        while True:
            now = time.monotonic()
            if now < next_at:
                time.sleep(next_at - now)
            next_at = time.monotonic() + period

            ret, frame = cap.read()
            if not ret:
                time.sleep(0.2)
                continue

            ok, jpeg = cv2.imencode(
                ".jpg", frame, [int(cv2.IMWRITE_JPEG_QUALITY), jpeg_quality]
            )
            if not ok:
                continue
            chunk = jpeg.tobytes()
            yield (
                b"--frame\r\n"
                b"Content-Type: image/jpeg\r\n"
                b"Content-Length: " + str(len(chunk)).encode() + b"\r\n\r\n"
                + chunk + b"\r\n"
            )
    finally:
        cap.release()
