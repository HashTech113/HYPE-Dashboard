import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { RefreshCw, Users } from "lucide-react";
import {
  getAttendanceLogs,
  getSnapshotLogs,
  type AttendanceSummaryItem,
  type SnapshotLogItem,
} from "@/api/dashboardApi";
import { SectionShell } from "@/components/dashboard/SectionShell";
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
import { formatClock12, formatDate, formatDateKey, formatTime12 } from "@/lib/dateFormat";
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

function statusClasses(status: AttendanceSummaryItem["status"]): string {
  switch (status) {
    case "Present":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    case "Late":
      return "border-amber-200 bg-amber-50 text-amber-700";
    case "Early Exit":
      return "border-orange-200 bg-orange-50 text-orange-700";
    case "Absent":
      return "border-rose-200 bg-rose-50 text-rose-700";
  }
}

function LiveCapturesPage() {
  const [usecase, setUsecase] = useState<Usecase>("snapshot");
  const [snapshotItems, setSnapshotItems] = useState<SnapshotLogItem[]>([]);
  const [attendanceItems, setAttendanceItems] = useState<AttendanceSummaryItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const activeRef = useRef(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  const usecaseLabel = USECASE_LABEL[usecase];
  const itemCount = usecase === "attendance" ? attendanceItems.length : snapshotItems.length;

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <SectionShell
        title="Live Captures"
        icon={<Users className="h-5 w-5 text-primary" />}
        className="animate-fade-in-up"
        actions={
          <div className="flex flex-wrap items-center gap-3">
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
              onClick={handleManualRefresh}
              disabled={refreshing}
              title="Refresh now"
            >
              <RefreshCw className={cn("mr-1.5 h-4 w-4", refreshing && "animate-spin")} />
              {refreshing
                ? "Refreshing…"
                : `Auto refresh every ${POLL_INTERVAL_MS / 1000}s`}
            </Button>
          </div>
        }
      >
        <Card className="flex min-h-0 flex-1 flex-col">
          <CardContent className="flex min-h-0 flex-1 flex-col gap-3 pt-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-700">
                {usecaseLabel} Records
              </h3>
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap text-xs font-medium text-slate-600">
                  Choose Usecase:
                </span>
                <Select value={usecase} onValueChange={(value) => setUsecase(value as Usecase)}>
                  <SelectTrigger className="h-9 w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="snapshot">Live Snapshot</SelectItem>
                    <SelectItem value="attendance">Attendance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {error && (
              <div className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            )}

            {usecase === "attendance" ? (
              <AttendanceTable
                items={attendanceItems}
                loading={loading}
              />
            ) : (
              <SnapshotTable items={snapshotItems} loading={loading} />
            )}
          </CardContent>
        </Card>
      </SectionShell>
    </div>
  );
}

function SnapshotTable({ items, loading }: { items: SnapshotLogItem[]; loading: boolean }) {
  return (
    <Table className="table-fixed">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[280px] font-semibold text-slate-700">Person Name</TableHead>
          <TableHead className="w-[140px] font-semibold text-slate-700">Image</TableHead>
          <TableHead className="w-[180px] font-semibold text-slate-700">Date</TableHead>
          <TableHead className="font-semibold text-slate-700">Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="py-10 text-center text-muted-foreground">
              {loading ? "Loading snapshot…" : "No snapshot records yet."}
            </TableCell>
          </TableRow>
        ) : (
          items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="py-2 align-middle">
                <span className="font-medium text-foreground">{item.name}</span>
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
                {formatDate(item.timestamp)}
              </TableCell>
              <TableCell className="py-2 align-middle text-muted-foreground">
                {formatTime12(item.timestamp)}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

function AttendanceTable({
  items,
  loading,
}: {
  items: AttendanceSummaryItem[];
  loading: boolean;
}) {
  return (
    <Table className="table-fixed">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[220px] font-semibold text-slate-700">Person Name</TableHead>
          <TableHead className="w-[110px] font-semibold text-slate-700">Image</TableHead>
          <TableHead className="w-[140px] font-semibold text-slate-700">Date</TableHead>
          <TableHead className="w-[140px] font-semibold text-slate-700">Entry Time</TableHead>
          <TableHead className="w-[140px] font-semibold text-slate-700">Late Entry Time</TableHead>
          <TableHead className="w-[140px] font-semibold text-slate-700">Exit Time</TableHead>
          <TableHead className="w-[140px] font-semibold text-slate-700">Early Exit Time</TableHead>
          <TableHead className="font-semibold text-slate-700">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="py-10 text-center text-muted-foreground">
              {loading ? "Loading attendance…" : "No attendance records yet."}
            </TableCell>
          </TableRow>
        ) : (
          items.map((item) => (
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
                {formatDateKey(item.date)}
              </TableCell>
              <TableCell className="py-2 align-middle text-muted-foreground">
                {formatClock12(item.entry_time)}
              </TableCell>
              <TableCell className="py-2 align-middle text-muted-foreground">
                {formatMinutes(item.late_entry_minutes)}
              </TableCell>
              <TableCell className="py-2 align-middle text-muted-foreground">
                {formatClock12(item.exit_time)}
              </TableCell>
              <TableCell className="py-2 align-middle text-muted-foreground">
                {formatMinutes(item.early_exit_minutes)}
              </TableCell>
              <TableCell className="py-2 align-middle">
                <span
                  className={cn(
                    "inline-flex rounded-full border px-2.5 py-1 text-xs font-medium",
                    statusClasses(item.status),
                  )}
                >
                  {item.status}
                </span>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
