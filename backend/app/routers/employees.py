"""GET /api/employees — canonical employee directory."""

from __future__ import annotations

from fastapi import APIRouter
from pydantic import BaseModel

from ..services import employees as employees_service

router = APIRouter(tags=["employees"])


class EmployeeOut(BaseModel):
    id: str
    name: str
    employeeId: str
    company: str
    department: str
    shift: str
    role: str


class EmployeeListResponse(BaseModel):
    items: list[EmployeeOut]


@router.get("/api/employees", response_model=EmployeeListResponse)
def list_employees() -> EmployeeListResponse:
    rows = employees_service.all_employees()
    return EmployeeListResponse(
        items=[
            EmployeeOut(
                id=e.id,
                name=e.name,
                employeeId=e.employee_id,
                company=e.company,
                department=e.department,
                shift=e.shift,
                role=e.role,
            )
            for e in rows
        ]
    )
