import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Download, FileText, Filter, RefreshCw } from "lucide-react";
import {
  getAttendanceLogs,
  type AttendanceSummaryItem,
  type Employee,
} from "@/api/dashboardApi";
import { useEmployees } from "@/contexts/EmployeesContext";
import { matchesEmployeeName } from "@/lib/nameMatch";
import { SectionShell } from "@/components/dashboard/SectionShell";
import { DatePicker } from "@/components/dashboard/DatePicker";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { formatClock12, formatDateKeyDash } from "@/lib/dateFormat";

export const Route = createFileRoute("/_dashboard/reports")({
  component: ReportsPage,
});

const POLL_INTERVAL_MS = 5_000;
const FETCH_LIMIT = 500;

// Mirrors Attendance History / Live Captures so Reports renders identical values.
function formatDurationSeconds(totalSeconds: number): string {
  if (!totalSeconds || totalSeconds <= 0) return "On Time";
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

function lateEntryCell(item: AttendanceSummaryItem): string {
  if (!item.entry_time) return "—";
  const seconds = item.late_entry_seconds ?? item.late_entry_minutes * 60;
  return formatDurationSeconds(seconds);
}

function earlyExitCell(item: AttendanceSummaryItem): string {
  if (!item.exit_time) return "—";
  const seconds = item.early_exit_seconds ?? item.early_exit_minutes * 60;
  return formatDurationSeconds(seconds);
}

function findEmployeeForName(employees: Employee[], captureName: string): Employee | null {
  if (!captureName) return null;
  for (const employee of employees) {
    if (matchesEmployeeName(captureName, employee.name)) return employee;
  }
  return null;
}

function csvEscape(value: string | number | null | undefined): string {
  const text = String(value ?? "");
  if (text.includes(",") || text.includes("\"") || text.includes("\n")) {
    return `"${text.replace(/"/g, "\"\"")}"`;
  }
  return text;
}

function downloadCsv(rows: string[][], filename: string) {
  const csv = rows.map((row) => row.map(csvEscape).join(",")).join("\n");
  const blob = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function ReportsPage() {
  const { employees } = useEmployees();

  const [selectedEmployee, setSelectedEmployee] = useState<string>("all");
  const [selectedCompany, setSelectedCompany] = useState<string>("all");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [attendanceItems, setAttendanceItems] = useState<AttendanceSummaryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const activeRef = useRef(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const companyOptions = useMemo(
    () => Array.from(new Set(employees.map((e) => e.company))).sort(),
    [employees],
  );

  const employeesForSelectedCompany = useMemo(
    () =>
      selectedCompany === "all"
        ? employees
        : employees.filter((e) => e.company === selectedCompany),
    [employees, selectedCompany],
  );

  useEffect(() => {
    if (selectedEmployee === "all") return;
    const stillVisible = employeesForSelectedCompany.some(
      (e) => e.employeeId === selectedEmployee,
    );
    if (!stillVisible) setSelectedEmployee("all");
  }, [employeesForSelectedCompany, selectedEmployee]);

  const fetchData = useCallback(
    async ({ manual = false }: { manual?: boolean } = {}) => {
      if (manual) setRefreshing(true);
      try {
        const data = await getAttendanceLogs({ limit: FETCH_LIMIT });
        if (!activeRef.current) return;
        setAttendanceItems(data.items);
        setError(null);
      } catch (err) {
        if (!activeRef.current) return;
        setError(err instanceof Error ? err.message : "Failed to load report data");
      } finally {
        if (activeRef.current) {
          setLoading(false);
          if (manual) setRefreshing(false);
        }
      }
    },
    [],
  );

  useEffect(() => {
    activeRef.current = true;
    setLoading(true);
    fetchData();
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => fetchData(), POLL_INTERVAL_MS);
    return () => {
      activeRef.current = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchData]);

  const selectedEmployeeObj = useMemo(
    () => employees.find((e) => e.employeeId === selectedEmployee) ?? null,
    [employees, selectedEmployee],
  );

  const filteredItems = useMemo(() => {
    return attendanceItems.filter((item) => {
      const matchedEmployee = findEmployeeForName(employees, item.name);

      if (selectedEmployee !== "all") {
        if (!selectedEmployeeObj) return false;
        if (matchedEmployee?.employeeId !== selectedEmployee) return false;
      } else if (selectedCompany !== "all") {
        const rowCompany = item.company ?? matchedEmployee?.company ?? null;
        if (rowCompany !== selectedCompany) return false;
      }

      if (startDate && item.date < startDate) return false;
      if (endDate && item.date > endDate) return false;

      return true;
    });
  }, [
    attendanceItems,
    employees,
    selectedEmployee,
    selectedEmployeeObj,
    selectedCompany,
    startDate,
    endDate,
  ]);

  const handleExport = useCallback(() => {
    const header = [
      "Employee Name",
      "Company",
      "Date",
      "Entry Time",
      "Late Entry Time",
      "Exit Time",
      "Early Exit Time",
      "Total Hours",
    ];
    const rows = filteredItems.map((item) => {
      const emp = findEmployeeForName(employees, item.name);
      return [
        item.name,
        item.company ?? emp?.company ?? "—",
        formatDateKeyDash(item.date),
        formatClock12(item.entry_time),
        lateEntryCell(item),
        formatClock12(item.exit_time),
        earlyExitCell(item),
        item.total_hours,
      ];
    });
    const tag = [startDate || "all", endDate || "all"].join("_to_");
    downloadCsv([header, ...rows], `attendance-report-${tag}.csv`);
  }, [employees, filteredItems, startDate, endDate]);

  const itemCount = filteredItems.length;

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <SectionShell
        title="Reports"
        icon={<FileText className="h-5 w-5 text-primary" />}
        className="animate-fade-in-up"
        actions={
          <div className="flex w-full flex-wrap items-center gap-2 md:w-auto md:gap-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>
                {itemCount} record{itemCount === 1 ? "" : "s"}
              </span>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-10 gap-1.5 px-4"
              onClick={() => fetchData({ manual: true })}
              disabled={refreshing}
              title="Refresh report data"
            >
              <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
              {refreshing ? "Refreshing…" : "Refresh"}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="h-10 gap-1.5 px-4"
              onClick={handleExport}
              disabled={itemCount === 0}
              title="Export filtered rows as CSV"
            >
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        }
      >
        <Card className="flex min-h-0 flex-1 flex-col">
          <CardContent className="flex min-h-0 flex-1 flex-col gap-3 pt-4">
            <div className="flex flex-col gap-3 border-b border-slate-200 pb-3 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <Filter className="h-4 w-4 text-muted-foreground" />

                <div className="flex items-center gap-2">
                  <span className="whitespace-nowrap text-xs font-medium text-slate-600">
                    Employees:
                  </span>
                  <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                    <SelectTrigger className="h-9 w-[140px] sm:w-[150px] md:w-[160px]">
                      <SelectValue placeholder="All Employees" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Employees</SelectItem>
                      {employeesForSelectedCompany.map((employee) => (
                        <SelectItem key={employee.employeeId} value={employee.employeeId}>
                          {employee.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="whitespace-nowrap text-xs font-medium text-slate-600">
                    Companies:
                  </span>
                  <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                    <SelectTrigger className="h-9 w-[125px] sm:w-[135px] md:w-[145px]">
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
                  <span className="whitespace-nowrap text-xs font-medium text-slate-600">
                    Start Date:
                  </span>
                  <DatePicker
                    value={startDate}
                    onChange={setStartDate}
                    className="w-[215px]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="whitespace-nowrap text-xs font-medium text-slate-600">
                    End Date:
                  </span>
                  <DatePicker
                    value={endDate}
                    onChange={setEndDate}
                    className="w-[215px]"
                  />
                </div>

                {(startDate || endDate || selectedEmployee !== "all" || selectedCompany !== "all") ? (
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="h-9 px-3 text-xs"
                    onClick={() => {
                      setSelectedEmployee("all");
                      setSelectedCompany("all");
                      setStartDate("");
                      setEndDate("");
                    }}
                  >
                    Clear filters
                  </Button>
                ) : null}
              </div>
            </div>

            {error ? (
              <div className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            ) : null}

            <div className="min-h-0 flex-1 overflow-hidden">
              <ReportTable
                items={filteredItems}
                employees={employees}
                loading={loading}
              />
            </div>
          </CardContent>
        </Card>
      </SectionShell>
    </div>
  );
}

function ReportTable({
  items,
  employees,
  loading,
}: {
  items: AttendanceSummaryItem[];
  employees: Employee[];
  loading: boolean;
}) {
  return (
    <Table className="min-w-[1100px]">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px] whitespace-nowrap font-bold text-slate-700">Employee</TableHead>
          <TableHead className="w-[110px] whitespace-nowrap font-bold text-slate-700">Company</TableHead>
          <TableHead className="w-[110px] whitespace-nowrap font-bold text-slate-700">Date</TableHead>
          <TableHead className="w-[110px] whitespace-nowrap font-bold text-slate-700">Entry Image</TableHead>
          <TableHead className="w-[120px] whitespace-nowrap font-bold text-slate-700">Entry Time</TableHead>
          <TableHead className="w-[140px] whitespace-nowrap font-bold text-slate-700">Late Entry Time</TableHead>
          <TableHead className="w-[110px] whitespace-nowrap font-bold text-slate-700">Exit Image</TableHead>
          <TableHead className="w-[120px] whitespace-nowrap font-bold text-slate-700">Exit Time</TableHead>
          <TableHead className="w-[140px] whitespace-nowrap font-bold text-slate-700">Early Exit Time</TableHead>
          <TableHead className="w-[110px] whitespace-nowrap font-bold text-slate-700">Total Hours</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length === 0 ? (
          <TableRow>
            <TableCell colSpan={10} className="py-10 text-center text-muted-foreground">
              {loading ? "Loading report…" : "No attendance records match the current filters."}
            </TableCell>
          </TableRow>
        ) : (
          items.map((item) => {
            const emp = findEmployeeForName(employees, item.name);
            const company = item.company ?? emp?.company ?? "—";
            return (
              <TableRow key={item.id}>
                <TableCell className="py-2 align-middle">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 shrink-0 border border-slate-200 bg-slate-100">
                      {emp?.imageUrl ? (
                        <AvatarImage
                          src={emp.imageUrl}
                          alt={item.name}
                          className="object-cover"
                        />
                      ) : null}
                      <AvatarFallback className="text-xs font-semibold text-slate-600">
                        {initials(item.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="whitespace-nowrap font-medium text-foreground">
                      {item.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap py-2 align-middle text-muted-foreground">
                  {company}
                </TableCell>
                <TableCell className="whitespace-nowrap py-2 align-middle text-muted-foreground">
                  {formatDateKeyDash(item.date)}
                </TableCell>
                <TableCell className="py-2 align-middle">
                  {item.entry_image_url ? (
                    <img
                      src={item.entry_image_url}
                      alt={`${item.name} entry`}
                      className="h-12 w-12 shrink-0 rounded-md border border-border object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-md border border-dashed border-slate-300 bg-slate-50" />
                  )}
                </TableCell>
                <TableCell className="whitespace-nowrap py-2 align-middle text-muted-foreground">
                  {formatClock12(item.entry_time)}
                </TableCell>
                <TableCell className="whitespace-nowrap py-2 align-middle text-muted-foreground">
                  {lateEntryCell(item)}
                </TableCell>
                <TableCell className="py-2 align-middle">
                  {item.exit_image_url ? (
                    <img
                      src={item.exit_image_url}
                      alt={`${item.name} exit`}
                      className="h-12 w-12 shrink-0 rounded-md border border-border object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-md border border-dashed border-slate-300 bg-slate-50" />
                  )}
                </TableCell>
                <TableCell className="whitespace-nowrap py-2 align-middle text-muted-foreground">
                  {formatClock12(item.exit_time)}
                </TableCell>
                <TableCell className="whitespace-nowrap py-2 align-middle text-muted-foreground">
                  {earlyExitCell(item)}
                </TableCell>
                <TableCell className="whitespace-nowrap py-2 align-middle text-muted-foreground">
                  {item.total_hours}
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}
