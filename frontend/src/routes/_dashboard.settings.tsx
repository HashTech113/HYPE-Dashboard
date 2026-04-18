import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Settings as SettingsIcon, Users, ArrowRight, Pencil } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SectionShell } from "@/components/dashboard/SectionShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEmployees } from "@/contexts/EmployeesContext";
import { EmployeeForm, formatDobForDisplay } from "@/components/dashboard/EmployeeForm";
import { formatShiftTo12Hour } from "@/components/dashboard/ShiftTimingPicker";
import { type Employee } from "@/api/dashboardApi";

export const Route = createFileRoute("/_dashboard/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { employees, updateEmployee } = useEmployees();
  const [employeeSettings, setEmployeeSettings] = useState({
    selfCheckIn: true,
    leaveRequest: true,
    attendanceView: true,
  });
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("");
  const [editing, setEditing] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  useEffect(() => {
    if (employees.length === 0) {
      setSelectedEmployeeId("");
      return;
    }
    if (!employees.some((e) => e.id === selectedEmployeeId)) {
      setSelectedEmployeeId(employees[0].id);
    }
  }, [employees, selectedEmployeeId]);

  useEffect(() => {
    setEditing(false);
  }, [selectedEmployeeId]);

  const selected = employees.find((e) => e.id === selectedEmployeeId) ?? null;

  const handleSave = (updated: Employee) => {
    updateEmployee(updated.id, updated);
    setEditing(false);
    setSavedFlash(true);
    window.setTimeout(() => setSavedFlash(false), 2500);
  };

  return (
    <div className="flex min-h-full flex-col">
      <SectionShell title="Settings" icon={<SettingsIcon className="h-5 w-5 text-primary" />}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="animate-fade-in-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="h-4 w-4 text-primary" />
                Employee Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  key: "selfCheckIn",
                  label: "Self Check-In",
                  description: "Allow employees to mark their own attendance.",
                },
                {
                  key: "leaveRequest",
                  label: "Leave Requests",
                  description: "Allow employees to submit leave requests.",
                },
                {
                  key: "attendanceView",
                  label: "Attendance View",
                  description: "Allow employees to view their attendance history.",
                },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <Label className="text-sm">{item.label}</Label>
                    <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch
                    checked={employeeSettings[item.key as keyof typeof employeeSettings]}
                    onCheckedChange={(value) => setEmployeeSettings({ ...employeeSettings, [item.key]: value })}
                  />
                </div>
              ))}
              <Button className="mt-2 w-full">Save Employee Settings</Button>
            </CardContent>
          </Card>

          <Card className="animate-fade-in-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="h-4 w-4 text-primary" />
                Manage Employees
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                View and edit all employees in the system, manage their information, shift timings, and more.
              </p>
              <Link to="/employees" className="w-full">
                <Button className="mt-2 w-full" variant="default">
                  <Users className="mr-2 h-4 w-4" />
                  View All Employees
                  <ArrowRight className="ml-auto h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="animate-fade-in-up lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <Pencil className="h-4 w-4 text-primary" />
                Edit Employee
              </CardTitle>
              {savedFlash ? (
                <span className="text-xs font-medium text-emerald-600">Changes saved across all sections.</span>
              ) : null}
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Pick an employee to edit. Saving updates the record everywhere — Employees, Attendance History, and any selectors.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <div className="flex-1 space-y-1.5">
                  <Label className="text-xs font-medium text-slate-600">Select Employee</Label>
                  <Select
                    value={selectedEmployeeId}
                    onValueChange={(value) => setSelectedEmployeeId(value)}
                  >
                    <SelectTrigger className="h-10 w-full">
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map((emp) => (
                        <SelectItem key={emp.id} value={emp.id}>
                          {emp.name} — {emp.employeeId}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {selected && !editing ? (
                  <Button onClick={() => setEditing(true)} className="sm:w-40">
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit Details
                  </Button>
                ) : null}
              </div>

              {selected && !editing ? (
                <div className="grid grid-cols-1 gap-2 rounded-lg border border-slate-200 bg-slate-50/70 p-3 text-sm sm:grid-cols-2">
                  <SummaryRow label="Full Name" value={selected.name} />
                  <SummaryRow label="Employee ID" value={selected.employeeId} />
                  <SummaryRow label="Company" value={selected.company} />
                  <SummaryRow label="Department" value={selected.department} />
                  <SummaryRow label="Role" value={selected.role} />
                  <SummaryRow label="Date of Birth" value={formatDobForDisplay(selected.dob) || selected.dob} />
                  <SummaryRow
                    label="Shift Timing"
                    value={formatShiftTo12Hour(selected.shift) || selected.shift || "—"}
                  />
                </div>
              ) : null}

              {selected && editing ? (
                <EmployeeForm
                  employee={selected}
                  onSave={handleSave}
                  onCancel={() => setEditing(false)}
                  showCancel
                />
              ) : null}

              {!selected ? (
                <p className="rounded-lg border border-dashed border-slate-300 bg-slate-50/70 p-4 text-center text-sm text-muted-foreground">
                  No employees available to edit.
                </p>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </SectionShell>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col rounded-md border border-slate-200 bg-white px-3 py-2">
      <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500">{label}</span>
      <span className="mt-0.5 text-sm font-semibold text-slate-900 break-words">{value}</span>
    </div>
  );
}
