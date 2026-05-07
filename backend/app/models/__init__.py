"""ORM model package.

Importing this package registers every model with ``Base.metadata`` so
``Base.metadata.create_all(engine)`` (called from ``app.db.init_db``)
sees them all.
"""

from __future__ import annotations

from ._base import Base
from .api_key import ApiKey
from .attendance import AttendanceLog, AttendanceReportEdit, SnapshotLog
from .camera import Camera
from .company import Company
from .department import Department
from .employee import Employee
from .setting import Setting
from .shift import Shift
from .user import User

__all__ = [
    "Base",
    "User",
    "Employee",
    "Camera",
    "Company",
    "Department",
    "Shift",
    "AttendanceLog",
    "SnapshotLog",
    "AttendanceReportEdit",
    "Setting",
    "ApiKey",
]
