import { createFileRoute } from "@tanstack/react-router";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { Plus, Download, Search, Pencil, Trash2, Users, Filter } from "lucide-react";
import { type Employee } from "@/api/dashboardApi";
import { useEmployees } from "@/contexts/EmployeesContext";
import { SectionShell } from "@/components/dashboard/SectionShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
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

  const [search, setSearch] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<string>("all");
  const [selectedEmployee, setSelectedEmployee] = useState<string>("all");
  const [selectedRole, setSelectedRole] = useState<RoleFilter>(roleFromSearch ?? "all");

  useEffect(() => {
    setSelectedRole(roleFromSearch ?? "all");
  }, [roleFromSearch]);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  const deferredSearch = useDeferredValue(search);

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

  useEffect(() => {
    if (selectedEmployee === "all") return;
    const exists = employeesForSelectedCompany.some((e) => e.employeeId === selectedEmployee);
    if (!exists) setSelectedEmployee("all");
  }, [employeesForSelectedCompany, selectedEmployee]);

  const filtered = useMemo(() => {
    const query = deferredSearch.trim().toLowerCase();
    return employeesForSelectedCompany.filter((employee) => {
      if (selectedRole !== "all" && employee.role !== selectedRole) return false;
      if (selectedEmployee !== "all" && employee.employeeId !== selectedEmployee) return false;
      if (!query) return true;
      return (
        employee.name.toLowerCase().includes(query) ||
        employee.employeeId.toLowerCase().includes(query) ||
        employee.department.toLowerCase().includes(query)
      );
    });
  }, [employeesForSelectedCompany, deferredSearch, selectedEmployee, selectedRole]);

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
    company: COMPANY_OPTIONS[0],
    department: "",
    shift: "09:00-18:00",
    role: "Employee",
    password: "",
    dob: "1990-01-01",
  };

  return (
    <div className="flex min-h-full flex-col">
      <SectionShell
        title="Employee Management"
        icon={<Users className="h-5 w-5 text-primary" />}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-1 h-4 w-4" />Export
            </Button>
            <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="mr-1 h-4 w-4" />Add Employee
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
          </div>
        }
      >

      <Card className="p-4">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <Filter className="h-4 w-4 text-muted-foreground" />

            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap text-sm font-medium leading-none text-slate-600">Employees:</span>
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger className="h-10 w-[260px]">
                  <SelectValue placeholder="Select employee" />
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
              <span className="whitespace-nowrap text-sm font-medium leading-none text-slate-600">Companies:</span>
              <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                <SelectTrigger className="h-10 w-[240px]">
                  <SelectValue placeholder="Select company" />
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
              <span className="whitespace-nowrap text-sm font-medium leading-none text-slate-600">Role:</span>
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
                <SelectTrigger className="h-10 w-[180px]">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Employee">Employee</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, ID, or department..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </Card>

      <Card className="animate-fade-in-up">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-14">S/N</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>ID</TableHead>
              <TableHead className="hidden md:table-cell">Company</TableHead>
              <TableHead className="hidden md:table-cell">Department</TableHead>
              <TableHead className="hidden lg:table-cell">Shift</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((employee, index) => (
              <TableRow key={employee.id}>
                <TableCell className="text-muted-foreground">{index + 1}</TableCell>
                <TableCell className="font-medium">{employee.name}</TableCell>
                <TableCell className="text-muted-foreground">{employee.employeeId}</TableCell>
                <TableCell className="hidden md:table-cell">{employee.company}</TableCell>
                <TableCell className="hidden md:table-cell">{employee.department}</TableCell>
                <TableCell className="hidden lg:table-cell text-muted-foreground">{formatShiftTo12Hour(employee.shift)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(employee)}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
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
                <TableCell colSpan={7} className="py-8 text-center text-sm text-muted-foreground">
                  No employees match the current filters.
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
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
