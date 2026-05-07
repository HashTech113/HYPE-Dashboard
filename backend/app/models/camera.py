"""Camera registry.

Passwords are stored as Fernet-encrypted ciphertext (``services.crypto``)
and never returned to the frontend. The CHECK on ``connection_status``
mirrors the original SQLite schema so legacy rows survive migration.
"""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Optional

from sqlalchemy import CheckConstraint, DateTime, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from ._base import Base


def _utc_now() -> datetime:
    return datetime.now(timezone.utc)


class Camera(Base):
    __tablename__ = "cameras"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    name: Mapped[str] = mapped_column(String(128), nullable=False)
    location: Mapped[str] = mapped_column(String(128), nullable=False, default="", server_default="")
    ip: Mapped[str] = mapped_column(String(64), nullable=False)
    port: Mapped[int] = mapped_column(Integer, nullable=False, default=554, server_default="554")
    username: Mapped[str] = mapped_column(String(64), nullable=False, default="", server_default="")
    password_encrypted: Mapped[str] = mapped_column(Text, nullable=False, default="", server_default="")
    rtsp_path: Mapped[str] = mapped_column(
        String(255), nullable=False,
        default="/Streaming/Channels/101", server_default="/Streaming/Channels/101",
    )
    connection_status: Mapped[str] = mapped_column(
        String(16), nullable=False, default="unknown", server_default="unknown", index=True,
    )
    last_checked_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    last_check_message: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, default=_utc_now)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=_utc_now, onupdate=_utc_now,
    )

    __table_args__ = (
        CheckConstraint(
            "connection_status IN ('unknown','connected','failed')",
            name="ck_cameras_status",
        ),
    )
