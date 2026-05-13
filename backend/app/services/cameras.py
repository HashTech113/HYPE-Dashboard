"""Cameras CRUD + RTSP connection check + MJPEG stream proxy generator.

Storage: ``cameras`` table (PostgreSQL in prod, SQLite locally), with
passwords symmetrically encrypted at rest (services.crypto). Plaintext
passwords never leave this process — the API surfaces only a masked
RTSP URL preview, and the live stream proxy decrypts internally to open
the camera connection.
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

from sqlalchemy import func, select

from ..db import session_scope
from ..models import Camera as CameraModel
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
    enable_face_ingest: bool
    auto_discovery_enabled: bool
    last_known_ip: Optional[str]
    last_discovered_at: Optional[str]
    last_checked_at: Optional[str]
    last_check_message: Optional[str]
    created_at: str
    updated_at: str


def _iso(value: Optional[datetime]) -> Optional[str]:
    if value is None:
        return None
    if value.tzinfo is None:
        value = value.replace(tzinfo=timezone.utc)
    return value.isoformat()


def _model_to_camera(row: CameraModel) -> Camera:
    return Camera(
        id=str(row.id),
        name=str(row.name),
        location=str(row.location or ""),
        ip=str(row.ip),
        port=int(row.port),
        username=str(row.username or ""),
        password_encrypted=str(row.password_encrypted or ""),
        rtsp_path=str(row.rtsp_path or ""),
        connection_status=str(row.connection_status or "unknown"),
        enable_face_ingest=bool(row.enable_face_ingest),
        auto_discovery_enabled=bool(row.auto_discovery_enabled),
        last_known_ip=row.last_known_ip,
        last_discovered_at=_iso(row.last_discovered_at),
        last_checked_at=_iso(row.last_checked_at),
        last_check_message=row.last_check_message,
        created_at=_iso(row.created_at) or "",
        updated_at=_iso(row.updated_at) or "",
    )


# ---- CRUD ------------------------------------------------------------------

def all_cameras() -> list[Camera]:
    with session_scope() as session:
        rows = session.execute(
            select(CameraModel).order_by(func.lower(CameraModel.name))
        ).scalars().all()
        return [_model_to_camera(r) for r in rows]


def connected_cameras_with_credentials() -> list[tuple[Camera, str]]:
    """Return ``(Camera, decrypted_password)`` pairs for every camera with
    ``connection_status='connected'`` AND ``enable_face_ingest=True``.

    Live-only cameras (enable_face_ingest=False) are excluded because
    capture.py speaks Uniview's HTTP face-detection API, which 404s on
    other brands. Those rows still show up in the cameras list / live
    view — they just don't get a capture worker spawned. Passwords that
    fail to decrypt (e.g. CAMERA_SECRET_KEY rotated) are skipped with a
    logged error so capture can keep running on the rest.
    """
    pairs: list[tuple[Camera, str]] = []
    for cam in all_cameras():
        if cam.connection_status != "connected":
            continue
        if not cam.enable_face_ingest:
            log.info(
                "Skipping camera %r (id=%s): live-only (enable_face_ingest=False)",
                cam.name, cam.id,
            )
            continue
        try:
            password = crypto.decrypt(cam.password_encrypted)
        except Exception as exc:
            log.error(
                "Skipping camera %r (id=%s): password decrypt failed (%s)",
                cam.name, cam.id, exc,
            )
            continue
        pairs.append((cam, password))
    return pairs


def get_by_id(camera_id: str) -> Optional[Camera]:
    with session_scope() as session:
        row = session.get(CameraModel, camera_id)
        return _model_to_camera(row) if row else None


def create(
    *,
    name: str,
    location: str,
    ip: str,
    port: int,
    username: str,
    password: str,
    rtsp_path: str,
    enable_face_ingest: Optional[bool] = None,
    auto_discovery_enabled: Optional[bool] = None,
) -> Camera:
    """Create a new camera row.

    ``enable_face_ingest`` and ``auto_discovery_enabled`` are None when
    the caller wants the model defaults (True / False respectively). The
    frontend's Add Camera dialog sends explicit values so the user's
    toggles in the form are honored at create-time.
    """
    new_id = f"cam-{uuid.uuid4().hex[:10]}"
    pw_enc = crypto.encrypt(password)
    extra: dict = {}
    if enable_face_ingest is not None:
        extra["enable_face_ingest"] = enable_face_ingest
    if auto_discovery_enabled is not None:
        extra["auto_discovery_enabled"] = auto_discovery_enabled
    with session_scope() as session:
        session.add(
            CameraModel(
                id=new_id,
                name=name,
                location=location,
                ip=ip,
                port=port,
                username=username,
                password_encrypted=pw_enc,
                rtsp_path=rtsp_path,
                connection_status="unknown",
                **extra,
            )
        )
        session.flush()
        row = session.get(CameraModel, new_id)
        assert row is not None
        return _model_to_camera(row)


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
    enable_face_ingest: Optional[bool] = None,
    auto_discovery_enabled: Optional[bool] = None,
) -> Optional[Camera]:
    with session_scope() as session:
        row = session.get(CameraModel, camera_id)
        if row is None:
            return None
        if name is not None:
            row.name = name
        if location is not None:
            row.location = location
        if ip is not None:
            row.ip = ip
        if port is not None:
            row.port = port
        if username is not None:
            row.username = username
        # Empty/None password = leave existing one untouched (so the operator
        # can edit the form without re-entering the password every time).
        if password is not None and password != "":
            row.password_encrypted = crypto.encrypt(password)
        if rtsp_path is not None:
            row.rtsp_path = rtsp_path
        if enable_face_ingest is not None:
            row.enable_face_ingest = enable_face_ingest
        if auto_discovery_enabled is not None:
            row.auto_discovery_enabled = auto_discovery_enabled
        # ``onupdate`` on the model bumps updated_at automatically.
        session.flush()
        return _model_to_camera(row)


def record_rediscovery(camera_id: str, *, new_ip: str) -> Optional[Camera]:
    """Persist a successful auto-rediscovery transition for a single camera.

    Atomically: stores the prior ``ip`` as ``last_known_ip``, swaps in the
    newly-discovered ``new_ip``, and stamps ``last_discovered_at`` to now.
    Returns the refreshed Camera, or None if the row vanished mid-call.
    Caller is responsible for ensuring ``new_ip`` was already validated
    against the camera (Uniview login probe) — this function trusts its
    input and never re-validates.
    """
    now = datetime.now(timezone.utc)
    with session_scope() as session:
        row = session.get(CameraModel, camera_id)
        if row is None:
            return None
        if row.ip != new_ip:
            row.last_known_ip = row.ip
            row.ip = new_ip
        row.last_discovered_at = now
        # Bumping connection_status here would race the worker's own
        # subsequent login probe — leave that to update_status() so we
        # don't paper over a failed post-rediscovery validation.
        session.flush()
        return _model_to_camera(row)


def delete(camera_id: str) -> bool:
    with session_scope() as session:
        row = session.get(CameraModel, camera_id)
        if row is None:
            return False
        session.delete(row)
        return True


def update_status(camera_id: str, *, status: str, message: str) -> None:
    now = datetime.now(timezone.utc)
    with session_scope() as session:
        row = session.get(CameraModel, camera_id)
        if row is None:
            return
        row.connection_status = status
        row.last_checked_at = now
        row.last_check_message = message


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

def _yield_mjpeg_chunk(chunk: bytes) -> bytes:
    """Wrap a single JPEG in the multipart-MJPEG framing the browser expects."""
    return (
        b"--frame\r\n"
        b"Content-Type: image/jpeg\r\n"
        b"Content-Length: " + str(len(chunk)).encode() + b"\r\n\r\n"
        + chunk + b"\r\n"
    )


def mjpeg_stream(
    rtsp_url: str,
    *,
    camera_id: Optional[str] = None,
    target_fps: int = 8,
    jpeg_quality: int = 70,
):
    """Yield multipart MJPEG bytes for FastAPI's StreamingResponse.

    When ``camera_id`` is set AND the recognition worker for that
    camera is publishing annotated frames into the shared
    :mod:`live_frames` buffer, this serves those frames directly — the
    operator sees bounding boxes + employee names overlaid in real
    time, with no duplicate RTSP read and no duplicate inference.

    Fallback: when no recent annotated frame is in the buffer (worker
    not running, just started, crashed, or this is a live-only camera),
    we open the RTSP socket ourselves and yield raw frames at
    ``target_fps``. The fallback is the original behavior and is
    selected per-request so existing call sites that omit
    ``camera_id`` keep working unchanged.
    """
    try:
        import cv2
    except Exception:
        log.exception("cv2 unavailable; cannot stream")
        return

    # Late import to avoid a service-layer cycle at module load.
    from . import live_frames

    # Path A: annotated frames from the recognition worker.
    if camera_id and live_frames.has_recent(camera_id):
        period = 1.0 / max(1, target_fps)
        next_at = time.monotonic()
        # We keep streaming from the cache as long as a fresh frame is
        # available. If the worker dies mid-stream the cache will go
        # stale within ``STALE_AFTER_SECONDS`` — at that point we break
        # out and the client will reconnect (or we could fall through
        # to direct RTSP, but that risks the camera vendor capping
        # concurrent RTSP sessions).
        while True:
            now = time.monotonic()
            if now < next_at:
                time.sleep(next_at - now)
            next_at = time.monotonic() + period
            frame = live_frames.get_fresh(camera_id)
            if frame is None:
                log.info(
                    "mjpeg_stream: live_frames buffer for %s went stale; closing",
                    camera_id,
                )
                return
            yield _yield_mjpeg_chunk(frame.jpeg_bytes)

    # Path B: original behavior — open our own RTSP socket.
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
            yield _yield_mjpeg_chunk(jpeg.tobytes())
    finally:
        cap.release()
