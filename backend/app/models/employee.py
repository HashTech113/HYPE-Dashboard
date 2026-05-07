"""Employee directory.

The DB column ``employee_id`` holds the human-facing employee code (e.g.
"E0023"); the Python attribute is named ``employee_code`` so the term
``employee_id`` is free for FKs to ``employees.id`` on the log tables.
``UniqueConstraint`` on (employee_id, company) lets the same code live
across companies but never collide within one.
"""

from __future__ import annotations

from sqlalchemy import Index, String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column

from ._base import Base


class Employee(Base):
    __tablename__ = "employees"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    # Python attr `employee_code` — DB column kept as `employee_id` so existing
    # API payloads, JSON seed, and migration paths don't have to change.
    employee_code: Mapped[str] = mapped_column(
        "employee_id", String(64), nullable=False, default="", server_default=""
    )
    company: Mapped[str] = mapped_column(String(128), nullable=False, default="", server_default="")
    department: Mapped[str] = mapped_column(String(128), nullable=False, default="", server_default="")
    shift: Mapped[str] = mapped_column(String(64), nullable=False, default="", server_default="")
    role: Mapped[str] = mapped_column(String(64), nullable=False, default="Employee", server_default="Employee")
    dob: Mapped[str] = mapped_column(String(32), nullable=False, default="", server_default="")
    image_url: Mapped[str] = mapped_column(Text, nullable=False, default="", server_default="")
    email: Mapped[str] = mapped_column(String(255), nullable=False, default="", server_default="")
    mobile: Mapped[str] = mapped_column(String(32), nullable=False, default="", server_default="")
    salary_package: Mapped[str] = mapped_column(String(64), nullable=False, default="", server_default="")

    __table_args__ = (
        UniqueConstraint("employee_id", "company", name="uq_employees_code_per_company"),
        Index("idx_employees_name", "name"),
    )
