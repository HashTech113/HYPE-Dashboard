"""Pydantic schemas for /api/cameras."""

from __future__ import annotations

from typing import Literal, Optional

from pydantic import BaseModel, Field

CameraType = Literal["ENTRY", "EXIT"]


class CameraOut(BaseModel):
    id: str
    name: str
    location: str
    ip: str
    port: int
    username: str
    rtsp_path: str
    rtsp_url_preview: str  # masked; never includes the password
    connection_status: str
    enable_face_ingest: bool
    auto_discovery_enabled: bool
    type: CameraType = "ENTRY"
    last_known_ip: Optional[str]
    last_discovered_at: Optional[str]
    last_checked_at: Optional[str]
    last_check_message: Optional[str]
    created_at: str
    updated_at: str


class CameraCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=128)
    location: str = Field("", max_length=256)
    ip: str = Field(..., min_length=1, max_length=64)
    port: int = Field(554, ge=1, le=65535)
    username: str = Field(..., min_length=1, max_length=128)
    password: str = Field(..., min_length=1, max_length=256)
    rtsp_path: str = Field("/Streaming/Channels/101", min_length=1, max_length=256)
    # Both flags are optional at create-time. When omitted, the model
    # defaults (face_ingest=True, auto_discovery=False) apply, preserving
    # the pre-toggle behavior. The frontend form sends explicit values so
    # the user's choice in the Add Camera dialog is honored.
    enable_face_ingest: Optional[bool] = None
    auto_discovery_enabled: Optional[bool] = None
    # ENTRY (default) or EXIT. Drives the attendance state machine —
    # see services.attendance_state.STATE_TRANSITIONS.
    type: Optional[CameraType] = None


class CameraUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=128)
    location: Optional[str] = Field(None, max_length=256)
    ip: Optional[str] = Field(None, min_length=1, max_length=64)
    port: Optional[int] = Field(None, ge=1, le=65535)
    username: Optional[str] = Field(None, min_length=1, max_length=128)
    # Empty / None = leave the existing password unchanged.
    password: Optional[str] = Field(None, max_length=256)
    rtsp_path: Optional[str] = Field(None, min_length=1, max_length=256)
    enable_face_ingest: Optional[bool] = None
    auto_discovery_enabled: Optional[bool] = None
    type: Optional[CameraType] = None


class CameraCheckRequest(BaseModel):
    """Form-time check — uses values being typed without saving a row."""
    ip: str = Field(..., min_length=1, max_length=64)
    port: int = Field(554, ge=1, le=65535)
    username: str = Field(..., min_length=1, max_length=128)
    password: str = Field(..., min_length=1, max_length=256)
    rtsp_path: str = Field("/Streaming/Channels/101", min_length=1, max_length=256)


class CameraCheckResponse(BaseModel):
    ok: bool
    message: str
    latency_ms: int


class CameraListResponse(BaseModel):
    items: list[CameraOut]


class StreamTokenResponse(BaseModel):
    token: str
    expires_in: int


class CameraRediscoverResponse(BaseModel):
    """Result of a manual auto-discovery sweep for one DB-backed camera.

    ``previous_ip`` and ``new_ip`` are equal when discovery confirmed the
    saved IP is still correct (still useful — signals the camera is alive
    on the LAN). ``new_ip`` is None when no Uniview host on the camera's
    /24 passed the login probe."""
    ok: bool
    message: str
    previous_ip: str
    new_ip: Optional[str]
