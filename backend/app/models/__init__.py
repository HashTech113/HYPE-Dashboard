"""ORM model package.

Importing this package registers every model with ``Base.metadata`` so
``Base.metadata.create_all(engine)`` (called from ``app.db.init_db``)
sees them all.
"""

from __future__ import annotations

from ._base import Base
from .attendance import AttendanceLog, AttendanceReportEdit, SnapshotLog
from .camera import Camera
from .employee import Employee
from .setting import Setting
from .user import User

__all__ = [
    "Base",
    "User",
    "Employee",
    "Camera",
    "AttendanceLog",
    "SnapshotLog",
    "AttendanceReportEdit",
    "Setting",
]
