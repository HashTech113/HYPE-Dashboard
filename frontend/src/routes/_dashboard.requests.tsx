import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Download, Filter, RefreshCw, Users } from "lucide-react";
import {
  getAttendanceLogs,
  getSnapshotLogs,
  type AttendanceSummaryItem,
  type Employee,
  type SnapshotLogItem,
} from "@/api/dashboardApi";
import { useEmployees } from "@/contexts/EmployeesContext";
import { matchesEmployeeName } from "@/lib/nameMatch";
import { SectionShell } from "@/components/dashboard/SectionShell";
import { DatePicker } from "@/components/dashboard/DatePicker";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  formatClock12,
  formatDateDash,
  formatDateKeyDash,
  formatTime12,
} from "@/lib/dateFormat";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/_dashboard/requests")({
  component: LiveCapturesPage,
});

type Usecase = "snapshot" | "attendance";

const POLL_INTERVAL_MS = 5_000;
const FETCH_LIMIT = 500;

const USECASE_LABEL: Record<Usecase, string> = {
  snapshot: "Snapshot",
  attendance: "Attendance",
};

function formatMinutes(minutes: number): string {
  if (!minutes || minutes <= 0) return "—";
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hours}h` : `${hours}h ${String(rest).padStart(2, "0")}m`;
}

// Mirrors formatDurationSeconds() in _dashboard.presence.tsx so Live Captures
// renders late/early durations identically to Attendance History.
function formatDurationSeconds(totalSeconds: number): string {
  if (!totalSeconds || totalSeconds <= 0) return "On Time";
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

function lateEntryCell(item: { entry_time: string | null; late_entry_seconds: number; late_entry_minutes: number }): string {
  if (!item.entry_time) return "—";
  const seconds = item.late_entry_seconds ?? item.late_entry_minutes * 60;
  return formatDurationSeconds(seconds);
}

function earlyExitCell(item: { exit_time: string | null; early_exit_seconds: number; early_exit_minutes: number }): string {
  if (!item.exit_time) return "—";
  const seconds = item.early_exit_seconds ?? item.early_exit_minutes * 60;
  return formatDurationSeconds(seconds);
}

function snapshotLocalDateKey(isoTimestamp: string): string {
  const d = new Date(isoTimestamp);
  if (Number.isNaN(d.getTime())) return "";
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}

function findEmployeeForName(
  employees: Employee[],
  captureName: string,
): Employee | null {
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
  // Leading BOM (\uFEFF) tells Excel the file is UTF-8 so characters like "—"
  // (U+2014) render correctly instead of as "â€"".
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

function LiveCapturesPage() {
  const { employees } = useEmployees();

  const [usecase, setUsecase] = useState<Usecase>("snapshot");
  const [selectedEmployee, setSelectedEmployee] = useState<string>("all");
  const [selectedCompany, setSelectedCompany] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<string>("");

  const [snapshotItems, setSnapshotItems] = useState<SnapshotLogItem[]>([]);
  const [attendanceItems, setAttendanceItems] = useState<AttendanceSummaryItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const activeRef = useRef(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const companyOptions = useMemo(
    () => Array.from(new Set(employees.map((employee) => employee.company))).sort(),
    [employees],
  );

  const employeesForSelectedCompany = useMemo(
    () =>
      selectedCompany === "all"
        ? employees
        : employees.filter((employee) => employee.company === selectedCompany),
    [employees, selectedCompany],
  );

  useEffect(() => {
    if (selectedEmployee === "all") return;
    const stillVisible = employeesForSelectedCompany.some(
      (employee) => employee.employeeId === selectedEmployee,
    );
    if (!stillVisible) setSelectedEmployee("all");
  }, [employeesForSelectedCompany, selectedEmployee]);

  const fetchData = useCallback(
    async ({ manual = false }: { manual?: boolean } = {}) => {
      if (manual) setRefreshing(true);
      try {
        if (usecase === "attendance") {
          const data = await getAttendanceLogs({ limit: FETCH_LIMIT });
          if (!activeRef.current) return;
          setAttendanceItems(data.items);
        } else {
          const data = await getSnapshotLogs({ limit: FETCH_LIMIT });
          if (!activeRef.current) return;
          setSnapshotItems(data.items);
        }
        setError(null);
      } catch (err) {
        if (!activeRef.current) return;
        setError(err instanceof Error ? err.message : "Failed to load records");
      } finally {
        if (activeRef.current) {
          setLoading(false);
          if (manual) setRefreshing(false);
        }
      }
    },
    [usecase],
  );

  useEffect(() => {
    activeRef.current = true;
    setLoading(true);
    setSnapshotItems([]);
    setAttendanceItems([]);
    fetchData();
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => fetchData(), POLL_INTERVAL_MS);
    return () => {
      activeRef.current = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchData]);

  const handleManualRefresh = useCallback(async () => {
    if (refreshing) return;
    await fetchData({ manual: true });
  }, [fetchData, refreshing]);

  const selectedEmployeeObj = useMemo(
    () => employees.find((employee) => employee.employeeId === selectedEmployee) ?? null,
    [employees, selectedEmployee],
  );

  // Row-level filter shared by both usecases: employee, company (via employee lookup),
  // and selected date. `rowName` and `rowDateKey` come from each row's raw fields.
  const rowPasses = useCallback(
    (rowName: string, rowDateKey: string) => {
      if (selectedDate && rowDateKey !== selectedDate) return false;

      const matchedEmployee = findEmployeeForName(employees, rowName);

      if (selectedEmployee !== "all") {
        if (!selectedEmployeeObj) return false;
        return matchedEmployee?.employeeId === selectedEmployee;
      }

      if (selectedCompany !== "all") {
        return matchedEmployee?.company === selectedCompany;
      }

      return true;
    },
    [employees, selectedDate, selectedEmployee, selectedEmployeeObj, selectedCompany],
  );

  const filteredAttendance = useMemo(() => {
    return attendanceItems.filter((item) => rowPasses(item.name, item.date));
  }, [attendanceItems, rowPasses]);

  const filteredSnapshots = useMemo(() => {
    return snapshotItems.filter((item) =>
      rowPasses(item.name, snapshotLocalDateKey(item.timestamp)),
    );
  }, [snapshotItems, rowPasses]);

  const handleExport = useCallback(() => {
    if (usecase === "attendance") {
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
      const rows = filteredAttendance.map((item) => {
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
      downloadCsv(
        [header, ...rows],
        `live-captures-attendance-${selectedDate || "all"}.csv`,
      );
    } else {
      const header = ["Employee Name", "Company", "Date", "Time"];
      const rows = filteredSnapshots.map((item) => {
        const emp = findEmployeeForName(employees, item.name);
        return [
          item.name,
          item.company ?? emp?.company ?? "—",
          formatDateDash(item.timestamp),
          formatTime12(item.timestamp),
        ];
      });
      downloadCsv(
        [header, ...rows],
        `live-captures-snapshot-${selectedDate || "all"}.csv`,
      );
    }
  }, [employees, filteredAttendance, filteredSnapshots, selectedDate, usecase]);

  const usecaseLabel = USECASE_LABEL[usecase];
  const itemCount =
    usecase === "attendance" ? filteredAttendance.length : filteredSnapshots.length;

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <SectionShell
        title="Live Captures"
        icon={<Users className="h-5 w-5 text-primary" />}
        className="animate-fade-in-up"
        actions={
          <div className="flex w-full flex-wrap items-center gap-2 md:w-auto md:gap-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>
                {itemCount} {usecaseLabel} record{itemCount === 1 ? "" : "s"}
              </span>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-10 w-full gap-1.5 px-4 md:w-auto"
              onClick={handleManualRefresh}
              disabled={refreshing}
              title="Refresh captures data"
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
            {/* Filter row */}
            <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 pb-3">
              <Filter className="h-4 w-4 text-muted-foreground" />

              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap text-xs font-medium text-slate-600">
                  Choose Usecase:
                </span>
                <Select value={usecase} onValueChange={(value) => setUsecase(value as Usecase)}>
                  <SelectTrigger className="h-9 w-[160px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="snapshot">Live Snapshot</SelectItem>
                    <SelectItem value="attendance">Attendance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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
                  Choose Date:
                </span>
                <DatePicker
                  value={selectedDate}
                  onChange={setSelectedDate}
                  className="w-[280px]"
                />
              </div>

            </div>

            {error && (
              <div className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="w-full overflow-x-auto">
              {usecase === "attendance" ? (
                <AttendanceTable
                  items={filteredAttendance}
                  employees={employees}
                  loading={loading}
                />
              ) : (
                <SnapshotTable
                  items={filteredSnapshots}
                  employees={employees}
                  loading={loading}
                />
              )}
            </div>
          </CardContent>
        </Card>
      </SectionShell>
    </div>
  );
}

function SnapshotTable({
  items,
  employees,
  loading,
}: {
  items: SnapshotLogItem[];
  employees: Employee[];
  loading: boolean;
}) {
  return (
    <Table className="table-fixed">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[260px] font-semibold text-slate-700">Employee Name</TableHead>
          <TableHead className="w-[200px] font-semibold text-slate-700">Company</TableHead>
          <TableHead className="w-[120px] font-semibold text-slate-700">Image</TableHead>
          <TableHead className="w-[160px] font-semibold text-slate-700">Date</TableHead>
          <TableHead className="font-semibold text-slate-700">Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
              {loading ? "Loading snapshot…" : "No snapshot records match the current filters."}
            </TableCell>
          </TableRow>
        ) : (
          items.map((item) => {
            const emp = findEmployeeForName(employees, item.name);
            const company = item.company ?? emp?.company ?? "—";
            return (
              <TableRow key={item.id}>
                <TableCell className="py-2 align-middle">
                  <span className="font-medium text-foreground">{item.name}</span>
                </TableCell>
                <TableCell className="py-2 align-middle text-muted-foreground">
                  {company}
                </TableCell>
                <TableCell className="py-2 align-middle">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="h-14 w-14 shrink-0 rounded-md border border-border object-cover"
                    loading="lazy"
                  />
                </TableCell>
                <TableCell className="py-2 align-middle text-muted-foreground">
                  {formatDateDash(item.timestamp)}
                </TableCell>
                <TableCell className="py-2 align-middle text-muted-foreground">
                  {formatTime12(item.timestamp)}
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}

function AttendanceTable({
  items,
  employees,
  loading,
}: {
  items: AttendanceSummaryItem[];
  employees: Employee[];
  loading: boolean;
}) {
  return (
    <Table className="table-fixed">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[160px] font-semibold text-slate-700">Employee Name</TableHead>
          <TableHead className="w-[90px] font-semibold text-slate-700">Image</TableHead>
          <TableHead className="w-[130px] font-semibold text-slate-700">Company</TableHead>
          <TableHead className="w-[110px] font-semibold text-slate-700">Date</TableHead>
          <TableHead className="w-[110px] font-semibold text-slate-700">Entry Time</TableHead>
          <TableHead className="w-[130px] font-semibold text-slate-700">Late Entry Time</TableHead>
          <TableHead className="w-[110px] font-semibold text-slate-700">Exit Time</TableHead>
          <TableHead className="w-[130px] font-semibold text-slate-700">Early Exit Time</TableHead>
          <TableHead className="w-[110px] font-semibold text-slate-700">Total Hours</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length === 0 ? (
          <TableRow>
            <TableCell colSpan={9} className="py-10 text-center text-muted-foreground">
              {loading ? "Loading attendance…" : "No attendance records match the current filters."}
            </TableCell>
          </TableRow>
        ) : (
          items.map((item) => {
            const emp = findEmployeeForName(employees, item.name);
            const company = item.company ?? emp?.company ?? "—";
            return (
              <TableRow key={item.id}>
                <TableCell className="py-2 align-middle">
                  <span className="font-medium text-foreground">{item.name}</span>
                </TableCell>
                <TableCell className="py-2 align-middle">
                  {item.entry_image_url ? (
                    <img
                      src={item.entry_image_url}
                      alt={item.name}
                      className="h-14 w-14 shrink-0 rounded-md border border-border object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-14 w-14 rounded-md border border-dashed border-slate-300 bg-slate-50" />
                  )}
                </TableCell>
                <TableCell className="py-2 align-middle text-muted-foreground">
                  {company}
                </TableCell>
                <TableCell className="py-2 align-middle text-muted-foreground">
                  {formatDateKeyDash(item.date)}
                </TableCell>
                <TableCell className="py-2 align-middle text-muted-foreground">
                  {formatClock12(item.entry_time)}
                </TableCell>
                <TableCell className="py-2 align-middle text-muted-foreground">
                  {lateEntryCell(item)}
                </TableCell>
                <TableCell className="py-2 align-middle text-muted-foreground">
                  {formatClock12(item.exit_time)}
                </TableCell>
                <TableCell className="py-2 align-middle text-muted-foreground">
                  {earlyExitCell(item)}
                </TableCell>
                <TableCell className="py-2 align-middle text-muted-foreground">
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
