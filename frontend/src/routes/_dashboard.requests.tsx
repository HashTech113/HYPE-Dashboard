import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Download, Filter, RefreshCw, Users } from "lucide-react";
import {
  getSnapshotLogs,
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
import { formatDateDash, formatTime12 } from "@/lib/dateFormat";
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

const POLL_INTERVAL_MS = 5_000;

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

  const [selectedEmployee, setSelectedEmployee] = useState<string>("all");
  const [selectedCompany, setSelectedCompany] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<string>("");

  const [snapshotItems, setSnapshotItems] = useState<SnapshotLogItem[]>([]);
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
        const data = await getSnapshotLogs();
        if (!activeRef.current) return;
        setSnapshotItems(data.items);
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

  const handleManualRefresh = useCallback(async () => {
    if (refreshing) return;
    await fetchData({ manual: true });
  }, [fetchData, refreshing]);

  const selectedEmployeeObj = useMemo(
    () => employees.find((employee) => employee.employeeId === selectedEmployee) ?? null,
    [employees, selectedEmployee],
  );

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

  const filteredSnapshots = useMemo(() => {
    return snapshotItems.filter((item) =>
      rowPasses(item.name, snapshotLocalDateKey(item.timestamp)),
    );
  }, [snapshotItems, rowPasses]);

  const handleExport = useCallback(() => {
    const header = ["S/N", "Employee Name", "Company", "Date", "Time"];
    const rows = filteredSnapshots.map((item, index) => {
      const emp = findEmployeeForName(employees, item.name);
      return [
        String(index + 1),
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
  }, [employees, filteredSnapshots, selectedDate]);

  const itemCount = filteredSnapshots.length;

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
              <span>Live Snapshots</span>
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
              <Filter className="h-4 w-4 text-primary" />

              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap text-xs font-semibold text-sky-900">
                  Employees
                </span>
                <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                  <SelectTrigger className="h-9 w-[140px] border-sky-200 focus:ring-sky-300 sm:w-[150px] md:w-[160px]">
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
                <span className="whitespace-nowrap text-xs font-semibold text-[#393E2E]">
                  Companies
                </span>
                <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                  <SelectTrigger className="h-9 w-[125px] border-indigo-200 focus:ring-indigo-300 sm:w-[135px] md:w-[145px]">
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
                <span className="whitespace-nowrap text-xs font-semibold text-emerald-900">
                  Date
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

            <div className="show-scrollbar min-h-0 flex-1 overflow-hidden">
              <SnapshotTable
                items={filteredSnapshots}
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
    <Table className="min-w-[910px] table-fixed">
      <TableHeader>
        <TableRow className="bg-slate-50/60 hover:bg-slate-50/80">
          <TableHead className="w-14 whitespace-nowrap border-r border-slate-200 font-bold uppercase tracking-wide text-slate-700 last:border-r-0">S/N</TableHead>
          <TableHead className="w-[260px] whitespace-nowrap border-r border-slate-200 font-bold uppercase tracking-wide text-sky-700 last:border-r-0">Employee Name</TableHead>
          <TableHead className="w-[200px] whitespace-nowrap border-r border-slate-200 font-bold uppercase tracking-wide text-indigo-700 last:border-r-0">Company</TableHead>
          <TableHead className="w-[120px] whitespace-nowrap border-r border-slate-200 font-bold uppercase tracking-wide text-sky-700 last:border-r-0">Image</TableHead>
          <TableHead className="w-[160px] whitespace-nowrap border-r border-slate-200 font-bold uppercase tracking-wide text-emerald-700 last:border-r-0">Date</TableHead>
          <TableHead className="w-[130px] whitespace-nowrap border-r border-slate-200 font-bold uppercase tracking-wide text-sky-700 last:border-r-0">Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
              {loading ? "Loading snapshot…" : "No snapshot records match the current filters."}
            </TableCell>
          </TableRow>
        ) : (
          items.map((item, index) => {
            const emp = findEmployeeForName(employees, item.name);
            const company = item.company ?? emp?.company ?? "—";
            return (
              <TableRow key={item.id} className="transition-colors hover:bg-slate-50/60">
                <TableCell className="border-r border-slate-200 py-2 align-middle text-slate-500 last:border-r-0">
                  {index + 1}
                </TableCell>
                <TableCell className="border-r border-slate-200 py-2 align-middle last:border-r-0">
                  <span className="font-medium text-foreground">{item.name}</span>
                </TableCell>
                <TableCell className="whitespace-nowrap border-r border-slate-200 py-2 align-middle font-medium text-indigo-700 last:border-r-0">
                  {company}
                </TableCell>
                <TableCell className="border-r border-slate-200 py-2 align-middle last:border-r-0">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="h-14 w-14 shrink-0 rounded-md border border-sky-200 object-cover"
                    loading="lazy"
                  />
                </TableCell>
                <TableCell className="whitespace-nowrap border-r border-slate-200 py-2 align-middle font-medium text-emerald-700 last:border-r-0">
                  {formatDateDash(item.timestamp)}
                </TableCell>
                <TableCell className="whitespace-nowrap border-r border-slate-200 py-2 align-middle text-sky-700 last:border-r-0">
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
