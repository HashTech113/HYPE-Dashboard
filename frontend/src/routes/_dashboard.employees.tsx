import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Plus, Download, Pencil, Trash2, Users, Filter } from "lucide-react";
import { type Employee } from "@/api/dashboardApi";
import { useEmployees } from "@/contexts/EmployeesContext";
import { SectionShell } from "@/components/dashboard/SectionShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { EmployeeForm, COMPANY_OPTIONS } from "@/components/dashboard/EmployeeForm";
import { formatShiftTo12Hour } from "@/components/dashboard/ShiftTimingPicker";

type RoleFilter = "all" | Employee["role"];

type EmployeesSearch = {
  role?: RoleFilter;
};

export const Route = createFileRoute("/_dashboard/employees")({
  validateSearch: (search: Record<string, unknown>): EmployeesSearch => {
    const role = search.role;
    if (role === "Admin" || role === "Employee" || role === "all") {
      return { role };
    }
    return {};
  },
  component: EmployeesPage,
});

function EmployeesPage() {
  const { employees, updateEmployee, addEmployee, deleteEmployee } = useEmployees();
  const navigate = Route.useNavigate();
  const { role: roleFromSearch } = Route.useSearch();

  const [selectedCompany, setSelectedCompany] = useState<string>("all");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedEmployee, setSelectedEmployee] = useState<string>("all");
  const [selectedRole, setSelectedRole] = useState<RoleFilter>(roleFromSearch ?? "all");

  useEffect(() => {
    setSelectedRole(roleFromSearch ?? "all");
  }, [roleFromSearch]);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);

  const companyOptions = useMemo(() => {
    const fromData = Array.from(new Set(employees.map((employee) => employee.company)));
    return Array.from(new Set([...COMPANY_OPTIONS, ...fromData]));
  }, [employees]);

  const employeesForSelectedCompany = useMemo(
    () =>
      selectedCompany === "all"
        ? employees
        : employees.filter((employee) => employee.company === selectedCompany),
    [employees, selectedCompany]
  );

  const departmentOptions = useMemo(() => {
    const unique = new Set<string>();
    for (const e of employeesForSelectedCompany) {
      const dept = (e.department ?? "").trim();
      if (dept) unique.add(dept);
    }
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, [employeesForSelectedCompany]);

  useEffect(() => {
    if (selectedDepartment === "all") return;
    if (!departmentOptions.includes(selectedDepartment)) setSelectedDepartment("all");
  }, [departmentOptions, selectedDepartment]);

  useEffect(() => {
    if (selectedEmployee === "all") return;
    const exists = employeesForSelectedCompany.some((e) => e.employeeId === selectedEmployee);
    if (!exists) setSelectedEmployee("all");
  }, [employeesForSelectedCompany, selectedEmployee]);

  const filtered = useMemo(() => {
    return employeesForSelectedCompany.filter((employee) => {
      if (selectedRole !== "all" && employee.role !== selectedRole) return false;
      if (selectedEmployee !== "all" && employee.employeeId !== selectedEmployee) return false;
      if (selectedDepartment !== "all" && (employee.department ?? "").trim() !== selectedDepartment) return false;
      return true;
    });
  }, [employeesForSelectedCompany, selectedEmployee, selectedRole, selectedDepartment]);

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = (updated: Employee) => {
    updateEmployee(updated.id, updated);
    setEditDialogOpen(false);
    setEditingEmployee(null);
  };

  const handleAddSave = (created: Employee) => {
    addEmployee({ ...created, id: created.id || `emp-${Date.now()}` });
    setAddDialogOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (!employeeToDelete) return;
    deleteEmployee(employeeToDelete.id);
    setEmployeeToDelete(null);
  };

  const blankEmployee: Employee = {
    id: "",
    name: "",
    employeeId: "",
    imageUrl: "",
    company: COMPANY_OPTIONS[0],
    department: "",
    shift: "09:00-18:00",
    role: "Employee",
    password: "",
    dob: "1990-01-01",
  };

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <SectionShell
        title="Employee Management"
        icon={<Users className="h-5 w-5 text-primary" />}
        className="animate-fade-in-up"
        actions={
          <div className="flex w-full flex-wrap items-center gap-2 md:w-auto md:gap-3">
            <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="h-10 gap-1.5 px-4">
                  <Plus className="h-4 w-4" />Add Employee
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Add New Employee</DialogTitle>
                </DialogHeader>
                <EmployeeForm
                  employee={blankEmployee}
                  saveLabel="Save Employee"
                  showCancel
                  onCancel={() => setAddDialogOpen(false)}
                  onSave={handleAddSave}
                />
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="sm" className="h-10 gap-1.5 px-4">
              <Download className="h-4 w-4" />Export
            </Button>
          </div>
        }
      >
      <Card className="flex min-h-0 flex-1 flex-col">
        <CardContent className="flex min-h-0 flex-1 flex-col gap-3 pt-4">
          {/* Filter row */}
          <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 pb-3">
            <Filter className="h-4 w-4 text-primary" />

            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap text-xs font-medium text-sky-700">Employees</span>
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger className="h-9 w-[160px] border-sky-200 focus:ring-sky-300">
                  <SelectValue placeholder="All Employees" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Employees</SelectItem>
                  {employeesForSelectedCompany.map((emp) => (
                    <SelectItem key={emp.employeeId} value={emp.employeeId}>
                      {emp.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap text-xs font-medium text-indigo-700">Companies</span>
              <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                <SelectTrigger className="h-9 w-[150px] border-indigo-200 focus:ring-indigo-300">
                  <SelectValue placeholder="All Companies" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Companies</SelectItem>
                  {companyOptions.map((company) => (
                    <SelectItem key={company} value={company}>
                      {company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap text-xs font-medium text-emerald-700">Departments</span>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="h-9 w-[160px] border-emerald-200 focus:ring-emerald-300">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departmentOptions.map((department) => (
                    <SelectItem key={department} value={department}>
                      {department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap text-xs font-medium text-amber-700">Role</span>
              <Select
                value={selectedRole}
                onValueChange={(value) => {
                  const next = value as RoleFilter;
                  setSelectedRole(next);
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      role: next === "all" ? undefined : next,
                    }),
                    replace: true,
                  });
                }}
              >
                <SelectTrigger className="h-9 w-[140px] border-amber-200 focus:ring-amber-300">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Employee">Employee</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-auto">
            <Table className="min-w-[910px] table-fixed">
              <TableHeader>
                <TableRow className="bg-slate-50/60 hover:bg-slate-50/80">
                  <TableHead className="w-14 whitespace-nowrap border-r border-slate-200 font-bold uppercase tracking-wide text-slate-700 last:border-r-0">S/N</TableHead>
                  <TableHead className="w-[220px] whitespace-nowrap border-r border-slate-200 font-bold uppercase tracking-wide text-sky-700 last:border-r-0">Employee Name</TableHead>
                  <TableHead className="w-[120px] whitespace-nowrap border-r border-slate-200 font-bold uppercase tracking-wide text-slate-700 last:border-r-0">ID</TableHead>
                  <TableHead className="hidden md:table-cell w-[160px] whitespace-nowrap border-r border-slate-200 font-bold uppercase tracking-wide text-indigo-700 last:border-r-0">Company</TableHead>
                  <TableHead className="hidden md:table-cell w-[160px] whitespace-nowrap border-r border-slate-200 font-bold uppercase tracking-wide text-emerald-700 last:border-r-0">Department</TableHead>
                  <TableHead className="hidden lg:table-cell w-[150px] whitespace-nowrap border-r border-slate-200 font-bold uppercase tracking-wide text-amber-700 last:border-r-0">Shift</TableHead>
                  <TableHead className="w-[120px] whitespace-nowrap border-r border-slate-200 text-right font-bold uppercase tracking-wide text-slate-700 last:border-r-0">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((employee, index) => (
                  <TableRow key={employee.id} className="transition-colors hover:bg-slate-50/60">
                    <TableCell className="border-r border-slate-200 py-2 align-middle text-slate-500 last:border-r-0">{index + 1}</TableCell>
                    <TableCell className="border-r border-slate-200 py-2 align-middle last:border-r-0">
                      <div className="flex items-center gap-3">
                        {employee.imageUrl ? (
                          <img
                            src={employee.imageUrl}
                            alt={employee.name}
                            className="h-10 w-10 shrink-0 rounded-full border border-sky-200 object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500">
                            {(employee.name.trim().charAt(0) || "?").toUpperCase()}
                          </div>
                        )}
                        <span className="truncate font-medium text-foreground">{employee.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="border-r border-slate-200 py-2 align-middle text-slate-500 last:border-r-0">{employee.employeeId}</TableCell>
                    <TableCell className="hidden md:table-cell whitespace-nowrap border-r border-slate-200 py-2 align-middle font-medium text-indigo-700 last:border-r-0">{employee.company}</TableCell>
                    <TableCell className="hidden md:table-cell whitespace-nowrap border-r border-slate-200 py-2 align-middle font-medium text-emerald-700 last:border-r-0">{employee.department || "—"}</TableCell>
                    <TableCell className="hidden lg:table-cell whitespace-nowrap border-r border-slate-200 py-2 align-middle text-amber-700 last:border-r-0">{formatShiftTo12Hour(employee.shift)}</TableCell>
                    <TableCell className="border-r border-slate-200 py-2 align-middle text-right last:border-r-0">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-sky-700 hover:bg-sky-50 hover:text-sky-800" onClick={() => handleEdit(employee)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:bg-rose-50 hover:text-destructive"
                          onClick={() => setEmployeeToDelete(employee)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                      No employees match the current filters.
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
          </DialogHeader>
          {editingEmployee ? (
            <EmployeeForm
              employee={editingEmployee}
              onSave={handleSaveEdit}
              onCancel={() => setEditDialogOpen(false)}
              showCancel
            />
          ) : null}
        </DialogContent>
      </Dialog>

      <AlertDialog open={Boolean(employeeToDelete)} onOpenChange={(open) => !open && setEmployeeToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm employee deletion</AlertDialogTitle>
            <AlertDialogDescription>
              {employeeToDelete
                ? `Are you sure you want to delete ${employeeToDelete.name} (${employeeToDelete.employeeId})?`
                : "Are you sure you want to delete this employee?"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </SectionShell>
    </div>
  );
}
