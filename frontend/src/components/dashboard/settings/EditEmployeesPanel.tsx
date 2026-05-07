import { useMemo, useState } from "react";
import { Pencil, Plus, Trash2, Users } from "lucide-react";

import { type Employee } from "@/api/dashboardApi";
import { useEmployees } from "@/contexts/EmployeesContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { SearchableSelect } from "@/components/ui/searchable-select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmployeeForm, COMPANY_OPTIONS } from "@/components/dashboard/EmployeeForm";
import { formatShiftTo12Hour } from "@/components/dashboard/ShiftTimingPicker";

// Settings → Edit Employee Management. Owns add / edit / delete; the
// /employees route is now read-only and links here for any modification.
export function EditEmployeesPanel() {
  const { employees, updateEmployee, addEmployee, deleteEmployee, scopedCompany } = useEmployees();
  const isCompanyScoped = scopedCompany !== null;

  const [companyFilter, setCompanyFilter] = useState<string>("all");
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);

  const companyOptions = useMemo(() => {
    const fromData = Array.from(new Set(employees.map((e) => e.company)));
    return Array.from(new Set([...COMPANY_OPTIONS, ...fromData]));
  }, [employees]);

  const filtered = useMemo(() => {
    if (companyFilter === "all") return employees;
    return employees.filter((employee) => employee.company === companyFilter);
  }, [employees, companyFilter]);
  const companyFilterOptions = useMemo(
    () => [
      { value: "all", label: "All Companies" },
      ...companyOptions.map((company) => ({ value: company, label: company })),
    ],
    [companyOptions],
  );

  const blankEmployee: Employee = {
    id: "",
    name: "",
    employeeId: "",
    imageUrl: "",
    company: scopedCompany ?? COMPANY_OPTIONS[0],
    department: "",
    shift: "09:00-18:00",
    role: "Employee",
    dob: "1990-01-01",
    email: "",
    mobile: "",
    salaryPackage: "",
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
          <Users className="h-5 w-5 text-primary" />
          Edit Employee Records
        </h2>
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="h-10 gap-1.5 px-4">
              <Plus className="h-4 w-4" />
              Add Employee
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
              onSave={(created) => {
                addEmployee({ ...created, id: created.id || `emp-${Date.now()}` });
                setAddDialogOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {!isCompanyScoped ? (
        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap text-sm font-semibold text-[#393E2E]">
            Company
          </span>
          <SearchableSelect
            value={companyFilter}
            onValueChange={setCompanyFilter}
            options={companyFilterOptions}
            clearValue="all"
            placeholder="All Companies"
            className="h-9 w-[180px] border-indigo-200 focus-visible:ring-indigo-300"
          />
        </div>
      ) : null}

      <Table className="min-w-[820px]">
        <TableHeader>
          <TableRow className="bg-slate-50/60">
            <TableHead className="w-14">S/N</TableHead>
            <TableHead className="w-[220px] text-sky-700">Employee</TableHead>
            <TableHead className="w-[120px]">ID</TableHead>
            {!isCompanyScoped ? <TableHead className="w-[160px] text-indigo-700">Company</TableHead> : null}
            <TableHead className="w-[160px] text-emerald-700">Employee Role</TableHead>
            <TableHead className="w-[150px] text-amber-700">Shift</TableHead>
            <TableHead className="w-[120px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((employee, index) => (
            <TableRow key={employee.id} className="hover:bg-slate-50/60">
              <TableCell className="text-slate-500">{index + 1}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  {employee.imageUrl ? (
                    <img
                      src={employee.imageUrl}
                      alt={employee.name}
                      className="h-9 w-9 shrink-0 rounded-full border border-sky-200 object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500">
                      {(employee.name.trim().charAt(0) || "?").toUpperCase()}
                    </div>
                  )}
                  <span className="truncate font-medium">{employee.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-slate-500">{employee.employeeId}</TableCell>
              {!isCompanyScoped ? (
                <TableCell className="font-medium text-indigo-700">{employee.company}</TableCell>
              ) : null}
              <TableCell className="font-medium text-emerald-700">{employee.department || "—"}</TableCell>
              <TableCell className="text-amber-700">{formatShiftTo12Hour(employee.shift)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-sky-700 hover:bg-sky-50 hover:text-sky-800"
                    onClick={() => {
                      setEditingEmployee(employee);
                      setEditDialogOpen(true);
                    }}
                  >
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
              <TableCell colSpan={isCompanyScoped ? 6 : 7} className="py-10 text-center text-muted-foreground">
                No employees match the current filter.
              </TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
          </DialogHeader>
          {editingEmployee ? (
            <EmployeeForm
              employee={editingEmployee}
              showCancel
              onCancel={() => setEditDialogOpen(false)}
              onSave={(updated) => {
                updateEmployee(updated.id, updated);
                setEditDialogOpen(false);
                setEditingEmployee(null);
              }}
            />
          ) : null}
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={Boolean(employeeToDelete)}
        onOpenChange={(open) => !open && setEmployeeToDelete(null)}
      >
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
              onClick={() => {
                if (!employeeToDelete) return;
                deleteEmployee(employeeToDelete.id);
                setEmployeeToDelete(null);
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
