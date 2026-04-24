"""Employee directory CRUD."""

from __future__ import annotations

import uuid
from typing import Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

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
    dob: str = ""
    imageUrl: str = ""


class EmployeeListResponse(BaseModel):
    items: list[EmployeeOut]


class EmployeeCreate(BaseModel):
    id: Optional[str] = None
    name: str = Field(..., min_length=1)
    employeeId: str = Field(..., min_length=1)
    company: str = ""
    department: str = ""
    shift: str = ""
    role: str = "Employee"
    dob: str = ""
    imageUrl: str = ""


class EmployeeUpdate(BaseModel):
    name: Optional[str] = None
    employeeId: Optional[str] = None
    company: Optional[str] = None
    department: Optional[str] = None
    shift: Optional[str] = None
    role: Optional[str] = None
    dob: Optional[str] = None
    imageUrl: Optional[str] = None


def _serialize(emp) -> EmployeeOut:
    return EmployeeOut(
        id=emp.id,
        name=emp.name,
        employeeId=emp.employee_id,
        company=emp.company,
        department=emp.department,
        shift=emp.shift,
        role=emp.role,
        dob=emp.dob,
        imageUrl=emp.image_url,
    )


@router.get("/api/employees", response_model=EmployeeListResponse)
def list_employees() -> EmployeeListResponse:
    return EmployeeListResponse(items=[_serialize(e) for e in employees_service.all_employees()])


@router.post("/api/employees", response_model=EmployeeOut, status_code=201)
def create_employee(payload: EmployeeCreate) -> EmployeeOut:
    new_id = payload.id or f"emp-{uuid.uuid4().hex[:10]}"
    if employees_service.get_by_id(new_id):
        raise HTTPException(status_code=409, detail=f"employee id already exists: {new_id}")
    created = employees_service.create(
        id=new_id,
        name=payload.name,
        employee_id=payload.employeeId,
        company=payload.company,
        department=payload.department,
        shift=payload.shift,
        role=payload.role,
        dob=payload.dob,
        image_url=payload.imageUrl,
    )
    return _serialize(created)


@router.put("/api/employees/{employee_id}", response_model=EmployeeOut)
def update_employee(employee_id: str, payload: EmployeeUpdate) -> EmployeeOut:
    patch = payload.model_dump(exclude_none=True)
    # Map camelCase input → snake_case DB columns
    if "employeeId" in patch:
        patch["employee_id"] = patch.pop("employeeId")
    if "imageUrl" in patch:
        patch["image_url"] = patch.pop("imageUrl")
    updated = employees_service.update(employee_id, patch)
    if updated is None:
        raise HTTPException(status_code=404, detail=f"employee not found: {employee_id}")
    return _serialize(updated)


@router.delete("/api/employees/{employee_id}")
def delete_employee(employee_id: str) -> dict:
    ok = employees_service.delete(employee_id)
    if not ok:
        raise HTTPException(status_code=404, detail=f"employee not found: {employee_id}")
    return {"status": "deleted", "id": employee_id}
