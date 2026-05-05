"""Cameras router — CRUD, connection-check, and MJPEG stream proxy.

All CRUD/check endpoints require the admin role. The MJPEG stream uses a
separate short-lived stream token (5 min, scoped to camera_id) so that
``<img>`` tags — which can't send Authorization headers — can authenticate
via query string without exposing the long-lived JWT.
"""

from __future__ import annotations

import logging
import time

import jwt
from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.responses import StreamingResponse

from ..config import JWT_ALGORITHM, JWT_SECRET
from ..dependencies import require_admin
from ..schemas.cameras import (
    CameraCheckRequest,
    CameraCheckResponse,
    CameraCreate,
    CameraListResponse,
    CameraOut,
    CameraUpdate,
    StreamTokenResponse,
)
from ..services import cameras as cameras_service
from ..services import crypto

log = logging.getLogger(__name__)

router = APIRouter(tags=["cameras"], prefix="/api/cameras")

STREAM_TOKEN_TTL_SECONDS = 300  # 5 min — refreshed by the frontend
STREAM_TOKEN_SCOPE = "camera-stream"


def _serialize(cam: cameras_service.Camera) -> CameraOut:
    return CameraOut(
        id=cam.id,
        name=cam.name,
        location=cam.location,
        ip=cam.ip,
        port=cam.port,
        username=cam.username,
        rtsp_path=cam.rtsp_path,
        rtsp_url_preview=cameras_service.masked_rtsp_url(cam),
        connection_status=cam.connection_status,
        last_checked_at=cam.last_checked_at,
        last_check_message=cam.last_check_message,
        created_at=cam.created_at,
        updated_at=cam.updated_at,
    )


@router.get(
    "",
    response_model=CameraListResponse,
    dependencies=[Depends(require_admin)],
)
def list_cameras() -> CameraListResponse:
    return CameraListResponse(items=[_serialize(c) for c in cameras_service.all_cameras()])


@router.post(
    "",
    response_model=CameraOut,
    status_code=201,
    dependencies=[Depends(require_admin)],
)
def create_camera(payload: CameraCreate) -> CameraOut:
    cam = cameras_service.create(
        name=payload.name.strip(),
        location=payload.location.strip(),
        ip=payload.ip.strip(),
        port=payload.port,
        username=payload.username.strip(),
        password=payload.password,
        rtsp_path=(payload.rtsp_path.strip() or "/Streaming/Channels/101"),
    )
    # Run an immediate connection check so the new row carries a real status
    # rather than 'unknown'.
    ok, msg, _ = cameras_service.check_connection(
        ip=cam.ip,
        port=cam.port,
        username=cam.username,
        password=payload.password,
        rtsp_path=cam.rtsp_path,
    )
    cameras_service.update_status(
        cam.id, status="connected" if ok else "failed", message=msg
    )
    refreshed = cameras_service.get_by_id(cam.id)
    assert refreshed is not None
    return _serialize(refreshed)


@router.post(
    "/check",
    response_model=CameraCheckResponse,
    dependencies=[Depends(require_admin)],
)
def check_pre_save(payload: CameraCheckRequest) -> CameraCheckResponse:
    """Connection check against form values before saving — no DB row written."""
    ok, msg, latency = cameras_service.check_connection(
        ip=payload.ip.strip(),
        port=payload.port,
        username=payload.username.strip(),
        password=payload.password,
        rtsp_path=payload.rtsp_path.strip(),
    )
    return CameraCheckResponse(ok=ok, message=msg, latency_ms=latency)


@router.get(
    "/{camera_id}",
    response_model=CameraOut,
    dependencies=[Depends(require_admin)],
)
def get_camera(camera_id: str) -> CameraOut:
    cam = cameras_service.get_by_id(camera_id)
    if cam is None:
        raise HTTPException(status_code=404, detail=f"camera not found: {camera_id}")
    return _serialize(cam)


@router.put(
    "/{camera_id}",
    response_model=CameraOut,
    dependencies=[Depends(require_admin)],
)
def update_camera(camera_id: str, payload: CameraUpdate) -> CameraOut:
    cam = cameras_service.update(
        camera_id,
        name=payload.name.strip() if payload.name else None,
        location=payload.location.strip() if payload.location is not None else None,
        ip=payload.ip.strip() if payload.ip else None,
        port=payload.port,
        username=payload.username.strip() if payload.username else None,
        password=payload.password if payload.password else None,
        rtsp_path=payload.rtsp_path.strip() if payload.rtsp_path else None,
    )
    if cam is None:
        raise HTTPException(status_code=404, detail=f"camera not found: {camera_id}")
    return _serialize(cam)


@router.delete("/{camera_id}", dependencies=[Depends(require_admin)])
def delete_camera(camera_id: str) -> dict:
    if not cameras_service.delete(camera_id):
        raise HTTPException(status_code=404, detail=f"camera not found: {camera_id}")
    return {"status": "deleted", "id": camera_id}


@router.post(
    "/{camera_id}/check",
    response_model=CameraCheckResponse,
    dependencies=[Depends(require_admin)],
)
def check_existing(camera_id: str) -> CameraCheckResponse:
    cam = cameras_service.get_by_id(camera_id)
    if cam is None:
        raise HTTPException(status_code=404, detail=f"camera not found: {camera_id}")
    ok, msg, latency = cameras_service.check_connection(
        ip=cam.ip,
        port=cam.port,
        username=cam.username,
        password=crypto.decrypt(cam.password_encrypted),
        rtsp_path=cam.rtsp_path,
    )
    cameras_service.update_status(
        camera_id, status="connected" if ok else "failed", message=msg
    )
    return CameraCheckResponse(ok=ok, message=msg, latency_ms=latency)


@router.post(
    "/{camera_id}/stream-token",
    response_model=StreamTokenResponse,
    dependencies=[Depends(require_admin)],
)
def stream_token(camera_id: str) -> StreamTokenResponse:
    """Issue a short-lived token for embedding in <img src> for the MJPEG
    stream. Scoped to camera_id and 5-minute TTL so leakage is bounded."""
    cam = cameras_service.get_by_id(camera_id)
    if cam is None:
        raise HTTPException(status_code=404, detail=f"camera not found: {camera_id}")
    now = int(time.time())
    payload = {
        "scope": STREAM_TOKEN_SCOPE,
        "cam": camera_id,
        "iat": now,
        "exp": now + STREAM_TOKEN_TTL_SECONDS,
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return StreamTokenResponse(token=token, expires_in=STREAM_TOKEN_TTL_SECONDS)


@router.get("/{camera_id}/stream")
def stream(camera_id: str, token: str = Query(...)) -> StreamingResponse:
    """MJPEG proxy. Auth via short-lived ``?token=`` because <img> tags
    can't set Authorization headers. The actual RTSP credentials are
    decrypted server-side and never leave this process."""
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Stream token expired")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid stream token")
    if payload.get("scope") != STREAM_TOKEN_SCOPE or payload.get("cam") != camera_id:
        raise HTTPException(status_code=403, detail="Token not scoped to this camera")

    cam = cameras_service.get_by_id(camera_id)
    if cam is None:
        raise HTTPException(status_code=404, detail=f"camera not found: {camera_id}")

    rtsp_url = cameras_service.build_rtsp_url_for_camera(cam)
    return StreamingResponse(
        cameras_service.mjpeg_stream(rtsp_url),
        media_type="multipart/x-mixed-replace; boundary=frame",
    )
