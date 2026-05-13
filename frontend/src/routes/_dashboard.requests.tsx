import { createFileRoute, redirect } from "@tanstack/react-router";
import { getCurrentRole } from "@/lib/auth";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Download, Search, Users } from "lucide-react";
import {
  getIngestLastSeen,
  getSnapshotLogs,
  listCameras,
  type Employee,
  type IngestLastSeen,
  type SnapshotLogItem,
} from "@/api/dashboardApi";
import { useEmployees } from "@/contexts/EmployeesContext";
import { matchesEmployeeName } from "@/lib/nameMatch";
import { SectionShell } from "@/components/dashboard/SectionShell";
import { DatePicker } from "@/components/dashboard/DatePicker";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { cn } from "@/lib/utils";
import { formatDateDash, formatTime12, parseTimestamp } from "@/lib/dateFormat";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/_dashboard/requests")({
  beforeLoad: () => {
    if (getCurrentRole() !== "admin") {
      throw redirect({ to: "/home" });
    }
  },
  component: LiveCapturesPage,
});

const POLL_INTERVAL_MS = 5_000;

function snapshotLocalDateKey(isoTimestamp: string): string {
  const d = parseTimestamp(isoTimestamp);
  if (!d) return "";
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
  // ``refreshing`` (formerly tied to the manual-refresh button) is no
  // longer needed — the page auto-polls every POLL_INTERVAL_MS and a
  // background spinner would just create flicker every 5 s. Removed.
  const [ingestHealth, setIngestHealth] = useState<IngestLastSeen | null>(null);
  // Lookup map cam-id → friendly name (e.g. "Work Place") so the table
  // can show what the operator typed in Add Camera instead of the
  // opaque generated cam-id.
  const [cameraNamesById, setCameraNamesById] = useState<Record<string, string>>({});
  const activeRef = useRef(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load camera names once — cameras are admin-CRUD only, so we don't
  // need to keep this in sync minute-by-minute. A page reload picks up
  // any rename, which is the same UX the cameras list itself has.
  useEffect(() => {
    let cancelled = false;
    void listCameras()
      .then((cameras) => {
        if (cancelled) return;
        const map: Record<string, string> = {};
        for (const c of cameras) map[c.id] = c.name;
        setCameraNamesById(map);
      })
      .catch(() => {
        // Non-fatal: the column simply falls back to showing the raw
        // camera_id, which is at least useful enough for an admin
        // debugging a routing problem.
      });
    return () => {
      cancelled = true;
    };
  }, []);

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
  const employeeFilterOptions = useMemo(
    () => [
      { value: "all", label: "All Employees" },
      ...[...employeesForSelectedCompany]
        .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }))
        .map((employee) => ({
        value: employee.employeeId,
        label: employee.name,
      })),
    ],
    [employeesForSelectedCompany],
  );
  const companyFilterOptions = useMemo(
    () => [
      { value: "all", label: "All Companies" },
      ...companyOptions.map((company) => ({ value: company, label: company })),
    ],
    [companyOptions],
  );

  useEffect(() => {
    if (selectedEmployee === "all") return;
    const stillVisible = employeesForSelectedCompany.some(
      (employee) => employee.employeeId === selectedEmployee,
    );
    if (!stillVisible) setSelectedEmployee("all");
  }, [employeesForSelectedCompany, selectedEmployee]);

  const fetchData = useCallback(
    async () => {
      try {
        // Fan out the snapshot fetch and the ingest-health probe; both feed
        // the page and either can fail independently without blocking the
        // other (a 404 on /ingest/last-seen during a backend restart
        // shouldn't blank the snapshot table).
        const [snapsResult, healthResult] = await Promise.allSettled([
          getSnapshotLogs(),
          getIngestLastSeen(),
        ]);
        if (!activeRef.current) return;
        if (snapsResult.status === "fulfilled") {
          setSnapshotItems(snapsResult.value.items);
          setError(null);
        } else {
          setError(
            snapsResult.reason instanceof Error
              ? snapsResult.reason.message
              : "Failed to load records",
          );
        }
        if (healthResult.status === "fulfilled") {
          setIngestHealth(healthResult.value);
        }
      } finally {
        if (activeRef.current) {
          setLoading(false);
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

  // Manual refresh handler removed — page auto-polls via setInterval.

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
      const captureDate = parseTimestamp(item.timestamp);
      return [
        String(index + 1),
        item.name,
        item.company ?? emp?.company ?? "—",
        formatDateDash(captureDate),
        formatTime12(captureDate),
      ];
    });
    downloadCsv(
      [header, ...rows],
      `live-captures-snapshot-${selectedDate || "all"}.csv`,
    );
  }, [employees, filteredSnapshots, selectedDate]);

  const itemCount = filteredSnapshots.length;

  // Re-render the badge every second so the "last seen Xs ago" counter
  // ticks smoothly between the 5 s polling cycles. Without this the
  // number visibly jumps once every 5 s and looks frozen in between.
  const [_nowTick, setNowTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setNowTick((t) => (t + 1) % 86400), 1000);
    return () => clearInterval(id);
  }, []);

  // Derive a 3-state health summary for the header badge: live (green) when
  // captures are arriving within the backend's stale threshold, idle (amber)
  // when nothing has come in for a while, none (slate) before the first
  // capture is ever seen. The user reads this as "is my camera connected
  // and feeding right now?".
  const cameraStatus: { tone: "live" | "idle" | "none"; label: string } = (() => {
    if (!ingestHealth || ingestHealth.last_seen === null) {
      return { tone: "none", label: "No captures yet" };
    }
    // Compute seconds-ago locally on every render so the badge ticks
    // every second instead of jumping every 5 s when the poll lands.
    // Falls back to the backend-computed value if last_seen parses oddly.
    const lastSeenMs = Date.parse(ingestHealth.last_seen);
    const ago = Number.isFinite(lastSeenMs)
      ? Math.max(0, Math.floor((Date.now() - lastSeenMs) / 1000))
      : (ingestHealth.seconds_ago ?? 0);
    const human =
      ago < 60
        ? `${ago}s ago`
        : ago < 3600
          ? `${Math.floor(ago / 60)}m ${ago % 60}s ago`
          : `${Math.floor(ago / 3600)}h ${Math.floor((ago % 3600) / 60)}m ago`;
    if (ingestHealth.stale) {
      return { tone: "idle", label: `Camera idle · last seen ${human}` };
    }
    return { tone: "live", label: `Camera live · last seen ${human}` };
  })();

  const statusToneClasses: Record<typeof cameraStatus.tone, string> = {
    live: "bg-emerald-50 text-emerald-700 border-emerald-200",
    idle: "bg-amber-50 text-amber-800 border-amber-200",
    none: "bg-slate-50 text-slate-600 border-slate-200",
  };
  const statusDotClasses: Record<typeof cameraStatus.tone, string> = {
    live: "bg-emerald-500",
    idle: "bg-amber-500",
    none: "bg-slate-400",
  };

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <SectionShell
        title="Live Captures"
        icon={<Users className="h-5 w-5 text-primary" />}
        className="animate-fade-in-up"
        actions={
          <div className="flex w-full flex-wrap items-center gap-2 md:w-auto md:gap-3">
            <div
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-medium",
                statusToneClasses[cameraStatus.tone],
              )}
              title="Camera ingest health (from /api/ingest/last-seen)"
            >
              <span className="relative flex h-2 w-2">
                {cameraStatus.tone === "live" ? (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                ) : null}
                <span
                  className={cn(
                    "relative inline-flex h-2 w-2 rounded-full",
                    statusDotClasses[cameraStatus.tone],
                  )}
                />
              </span>
              <span>{cameraStatus.label}</span>
            </div>
            {/* No manual Refresh button — the page auto-polls every
                POLL_INTERVAL_MS (5 s). The Camera idle / live badge to
                the left already shows the freshness state in real time. */}
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
              <Search className="h-5 w-5 text-primary" />

              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap text-sm font-semibold text-sky-900">
                  Employees
                </span>
                <SearchableSelect
                  value={selectedEmployee}
                  onValueChange={setSelectedEmployee}
                  options={employeeFilterOptions}
                  clearValue="all"
                  placeholder="All Employees"
                  className="h-9 w-[140px] border-sky-200 focus-visible:ring-sky-300 sm:w-[150px] md:w-[160px]"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap text-sm font-semibold text-[#393E2E]">
                  Companies
                </span>
                <SearchableSelect
                  value={selectedCompany}
                  onValueChange={setSelectedCompany}
                  options={companyFilterOptions}
                  clearValue="all"
                  placeholder="All Companies"
                  className="h-9 w-[125px] border-indigo-200 focus-visible:ring-indigo-300 sm:w-[135px] md:w-[145px]"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap text-sm font-semibold text-emerald-900">
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
                cameraNamesById={cameraNamesById}
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
  cameraNamesById,
  loading,
}: {
  items: SnapshotLogItem[];
  employees: Employee[];
  cameraNamesById: Record<string, string>;
  loading: boolean;
}) {
  return (
    <Table className="min-w-[1010px] table-fixed">
      <TableHeader>
        <TableRow className="bg-slate-50/60 hover:bg-slate-50/80">
          <TableHead className="w-14 whitespace-nowrap border-r border-slate-200 font-bold uppercase tracking-wide text-slate-700 last:border-r-0">S/N</TableHead>
          <TableHead className="w-[260px] whitespace-nowrap border-r border-slate-200 font-bold uppercase tracking-wide text-sky-700 last:border-r-0">Employee Name</TableHead>
          <TableHead className="w-[180px] whitespace-nowrap border-r border-slate-200 font-bold uppercase tracking-wide text-indigo-700 last:border-r-0">Company</TableHead>
          <TableHead className="w-[120px] whitespace-nowrap border-r border-slate-200 font-bold uppercase tracking-wide text-sky-700 last:border-r-0">Image</TableHead>
          <TableHead className="w-[140px] whitespace-nowrap border-r border-slate-200 font-bold uppercase tracking-wide text-purple-700 last:border-r-0">Camera Name</TableHead>
          <TableHead className="w-[140px] whitespace-nowrap border-r border-slate-200 font-bold uppercase tracking-wide text-emerald-700 last:border-r-0">Date</TableHead>
          <TableHead className="w-[130px] whitespace-nowrap border-r border-slate-200 font-bold uppercase tracking-wide text-sky-700 last:border-r-0">Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
              {loading ? "Loading snapshot…" : "No snapshot records match the current filters."}
            </TableCell>
          </TableRow>
        ) : (
          items.map((item, index) => {
            const emp = findEmployeeForName(employees, item.name);
            const company = item.company ?? emp?.company ?? "—";
            const captureDate = parseTimestamp(item.timestamp);
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
                <TableCell className="whitespace-nowrap border-r border-slate-200 py-2 align-middle text-purple-700 last:border-r-0">
                  {item.camera_id ? (
                    (() => {
                      const friendlyName = cameraNamesById[item.camera_id];
                      const display = friendlyName ?? item.camera_id;
                      return (
                        <span
                          className="inline-flex items-center rounded-full bg-purple-50 px-2 py-0.5 text-xs font-medium"
                          title={`Camera id: ${item.camera_id}`}
                        >
                          {display.length > 22 ? `${display.slice(0, 20)}…` : display}
                        </span>
                      );
                    })()
                  ) : (
                    <span className="text-xs italic text-slate-400">API ingest</span>
                  )}
                </TableCell>
                <TableCell className="whitespace-nowrap border-r border-slate-200 py-2 align-middle font-medium text-emerald-700 last:border-r-0">
                  {formatDateDash(captureDate)}
                </TableCell>
                <TableCell className="whitespace-nowrap border-r border-slate-200 py-2 align-middle text-sky-700 last:border-r-0">
                  {formatTime12(captureDate)}
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}
