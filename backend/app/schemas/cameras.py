"""Pydantic schemas for /api/cameras."""

from __future__ import annotations

from typing import Optional

from pydantic import BaseModel, Field


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


class CameraUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=128)
    location: Optional[str] = Field(None, max_length=256)
    ip: Optional[str] = Field(None, min_length=1, max_length=64)
    port: Optional[int] = Field(None, ge=1, le=65535)
    username: Optional[str] = Field(None, min_length=1, max_length=128)
    # Empty / None = leave the existing password unchanged.
    password: Optional[str] = Field(None, max_length=256)
    rtsp_path: Optional[str] = Field(None, min_length=1, max_length=256)


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
