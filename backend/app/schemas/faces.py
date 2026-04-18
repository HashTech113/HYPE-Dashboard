"""Response models for /api/faces/*."""

from __future__ import annotations

from pydantic import BaseModel


class FaceHistoryItem(BaseModel):
    id: str
    name: str
    entry: str
    exit: str
    image_url: str


class FaceHistoryResponse(BaseModel):
    count: int
    total: int
    limit: int
    offset: int
    items: list[FaceHistoryItem]
