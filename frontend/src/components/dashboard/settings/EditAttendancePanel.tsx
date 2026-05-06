import { useCallback, useEffect, useMemo, useState } from "react";
import { CalendarCheck, ChevronLeft, ChevronRight, Loader2, RefreshCw, Save, Trash2 } from "lucide-react";

import {
  type AttendanceCorrection,
  type AttendanceStatusFull,
  type AttendanceSummaryItem,
  deleteAttendanceCorrection,
  getAttendanceLogs,
  listAttendanceCorrections,
  upsertAttendanceCorrection,
} from "@/api/dashboardApi";
import { useEmployees } from "@/contexts/EmployeesContext";
import { Button } from "@/components/ui/button";
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

const STATUS_CHOICES: AttendanceStatusFull[] = [
  "Present",
  "Late",
  "Early Exit",
  "Absent",
  "WFH",
  "Paid Leave",
  "LOP",
  "Holiday",
];

// User-facing label override for the dropdown. The wire/API value stays
// "Holiday" so the backend's status_override whitelist keeps working.
const STATUS_DROPDOWN_LABEL: Partial<Record<AttendanceStatusFull, string>> = {
  Holiday: "Company Leave",
};

const STATUS_PILL_CLASS: Record<AttendanceStatusFull, string> = {
  Present: "border-emerald-300 bg-emerald-50 text-emerald-700",
  Late: "border-amber-300 bg-amber-50 text-amber-700",
  "Early Exit": "border-orange-300 bg-orange-50 text-orange-700",
  Absent: "border-rose-300 bg-rose-50 text-rose-700",
  WFH: "border-violet-300 bg-violet-50 text-violet-700",
  "Paid Leave": "border-blue-300 bg-blue-50 text-blue-700",
  LOP: "border-rose-400 bg-rose-100 text-rose-800",
  Holiday: "border-sky-300 bg-sky-50 text-sky-700",
};

type DayRow = {
  date: string;
  dayLabel: string;
  weekday: string;
  isFuture: boolean;
  effective: AttendanceSummaryItem | null;
  // Local edit buffer; null when the day has no pending edits.
  draft: DayDraft | null;
};

// Drafts now only carry the override status. Paid Leave / LOP / WFH flags
// are derived from the override on save (see `flagsFromStatus`) — there's
// no separate UI control for them anymore since "Override Status" already
// expresses the same intent.
type DayDraft = {
  status_override: AttendanceStatusFull | null;
};

function flagsFromStatus(status: AttendanceStatusFull | null): {
  paid_leave: boolean;
  lop: boolean;
  wfh: boolean;
} {
  return {
    paid_leave: status === "Paid Leave",
    lop: status === "LOP",
    wfh: status === "WFH",
  };
}

function monthStartEnd(monthKey: string): { start: string; end: string; days: string[] } {
  const [year, month] = monthKey.split("-").map(Number);
  const endDate = new Date(year, month, 0);
  const days: string[] = [];
  for (let d = 1; d <= endDate.getDate(); d += 1) {
    const iso = `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    days.push(iso);
  }
  return {
    start: days[0],
    end: days[days.length - 1],
    days,
  };
}

function todayKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function thisMonthKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function shiftMonth(monthKey: string, delta: number): string {
  const [year, month] = monthKey.split("-").map(Number);
  const next = new Date(year, month - 1 + delta, 1);
  return `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, "0")}`;
}

function formatMonthLabel(monthKey: string): string {
  const [year, month] = monthKey.split("-").map(Number);
  const date = new Date(year, month - 1, 1);
  return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(date);
}

function weekdayLabel(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { weekday: "short" });
}

function correctionToDraft(correction: AttendanceCorrection | undefined): DayDraft | null {
  if (!correction) return null;
  if (!correction.status_override) return null;
  return { status_override: correction.status_override };
}

export function EditAttendancePanel() {
  const { employees } = useEmployees();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("");
  const [monthKey, setMonthKey] = useState<string>(thisMonthKey());

  const selectedEmployee = useMemo(
    () => employees.find((e) => e.employeeId === selectedEmployeeId) ?? null,
    [employees, selectedEmployeeId],
  );

  const [summaries, setSummaries] = useState<AttendanceSummaryItem[]>([]);
  const [corrections, setCorrections] = useState<AttendanceCorrection[]>([]);
  const [loading, setLoading] = useState(false);
  const [savingDate, setSavingDate] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, DayDraft | null>>({});

  const { start, end, days } = useMemo(() => monthStartEnd(monthKey), [monthKey]);

  const refresh = useCallback(async () => {
    if (!selectedEmployee) {
      setSummaries([]);
      setCorrections([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const [logsResp, corrList] = await Promise.all([
        getAttendanceLogs({ name: selectedEmployee.name, start, end }),
        listAttendanceCorrections({ name: selectedEmployee.name, start, end }),
      ]);
      setSummaries(logsResp.items);
      setCorrections(corrList);
      const seed: Record<string, DayDraft | null> = {};
      for (const corr of corrList) {
        seed[corr.date] = correctionToDraft(corr);
      }
      setDrafts(seed);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load attendance data");
    } finally {
      setLoading(false);
    }
  }, [selectedEmployee, start, end]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  // Per-day rows for the current month, joined with API summaries + drafts.
  const today = todayKey();
  const rows: DayRow[] = useMemo(() => {
    const summaryByDate = new Map<string, AttendanceSummaryItem>();
    for (const item of summaries) summaryByDate.set(item.date, item);
    return days.map((date) => ({
      date,
      dayLabel: date.slice(8),
      weekday: weekdayLabel(date),
      isFuture: date > today,
      effective: summaryByDate.get(date) ?? null,
      draft: drafts[date] ?? null,
    }));
  }, [days, summaries, drafts, today]);

  // Monthly summary, computed off the merged effective values so HR sees
  // the impact of saved edits without an extra refresh.
  const monthly = useMemo(() => {
    let present = 0;
    let absent = 0;
    let late = 0;
    let earlyExit = 0;
    let paid = 0;
    let lop = 0;
    let wfh = 0;
    let holiday = 0;
    for (const r of rows) {
      if (r.isFuture || !r.effective) continue;
      const status = r.effective.status;
      if (status === "Present") present += 1;
      else if (status === "Late") {
        present += 1;
        late += 1;
      } else if (status === "Early Exit") {
        present += 1;
        earlyExit += 1;
      } else if (status === "Absent") absent += 1;
      else if (status === "Paid Leave") paid += 1;
      else if (status === "LOP") lop += 1;
      else if (status === "WFH") wfh += 1;
      else if (status === "Holiday") holiday += 1;
    }
    return { present, absent, late, earlyExit, paid, lop, wfh, holiday };
  }, [rows]);

  const updateDraft = (date: string, status: AttendanceStatusFull | null) => {
    setDrafts((prev) => ({ ...prev, [date]: status ? { status_override: status } : null }));
  };

  const saveRow = async (date: string) => {
    if (!selectedEmployee) return;
    const draft = drafts[date];
    if (!draft) return;
    setSavingDate(date);
    setError(null);
    setFeedback(null);
    try {
      const flags = flagsFromStatus(draft.status_override);
      await upsertAttendanceCorrection({
        name: selectedEmployee.name,
        date,
        status_override: draft.status_override,
        ...flags,
      });
      setFeedback(`Saved ${date}`);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save correction");
    } finally {
      setSavingDate(null);
    }
  };

  const clearRow = async (date: string) => {
    if (!selectedEmployee) return;
    setSavingDate(date);
    setError(null);
    setFeedback(null);
    try {
      await deleteAttendanceCorrection(selectedEmployee.name, date);
      setFeedback(`Cleared correction for ${date}`);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to clear correction");
    } finally {
      setSavingDate(null);
    }
  };

  const hasCorrection = (date: string): boolean =>
    corrections.some((c) => c.date === date);

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Sticky top bar: heading + filters + summary stay pinned while the
          table below scrolls. The parent (Settings tab content) is the
          scroll container, so position:sticky anchors against it. */}
      <div className="sticky top-0 z-10 flex flex-col gap-3 bg-white pb-3">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
          <CalendarCheck className="h-5 w-5 text-primary" />
          Attendance Corrections
        </h2>

        <div className="flex flex-wrap items-end gap-4 rounded-2xl border border-slate-200 bg-slate-50/50 p-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Employee
            </label>
            <Select value={selectedEmployeeId} onValueChange={setSelectedEmployeeId}>
              <SelectTrigger className="h-9 w-[220px] border-sky-200 focus:ring-sky-300">
                <SelectValue placeholder="Select employee" />
              </SelectTrigger>
              <SelectContent>
                {employees.map((emp) => (
                  <SelectItem key={emp.employeeId} value={emp.employeeId}>
                    {emp.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Month
            </label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={() => setMonthKey((m) => shiftMonth(m, -1))}
                aria-label="Previous month"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="min-w-[160px] rounded-md border border-slate-200 bg-white px-3 py-1.5 text-center text-sm font-semibold text-slate-700">
                {formatMonthLabel(monthKey)}
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={() => setMonthKey((m) => shiftMonth(m, 1))}
                aria-label="Next month"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => void refresh()}
              disabled={loading || !selectedEmployee}
              className="h-9 gap-1.5"
            >
              <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
              Refresh
            </Button>
          </div>
        </div>

        {selectedEmployee ? (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-700">
            <SummaryStat label="Present" value={monthly.present} className="text-emerald-700" />
            <Divider />
            <SummaryStat label="Absent" value={monthly.absent} className="text-rose-700" />
            <Divider />
            <SummaryStat label="Late" value={monthly.late} className="text-amber-700" />
            <Divider />
            <SummaryStat label="Early Exit" value={monthly.earlyExit} className="text-orange-700" />
            <Divider />
            <SummaryStat label="Paid Leave" value={monthly.paid} className="text-blue-700" />
            <Divider />
            <SummaryStat label="LOP" value={monthly.lop} className="text-rose-800" />
            <Divider />
            <SummaryStat label="WFH" value={monthly.wfh} className="text-violet-700" />
            <Divider />
            <SummaryStat label="Holiday" value={monthly.holiday} className="text-sky-700" />
          </div>
        ) : null}

        {error ? (
          <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {error}
          </div>
        ) : null}
        {feedback ? (
          <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            {feedback}
          </div>
        ) : null}
      </div>

      {/* Scroll body: the table sits below the sticky header and is the
          only element that scrolls when content overflows. */}
      <div className="mt-3 min-h-0 flex-1">
        {!selectedEmployee ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/40 px-6 py-12 text-center text-sm text-slate-500">
            Select an employee to view and edit their attendance for the month.
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white">
            <Table className="min-w-[680px]">
              <TableHeader>
                <TableRow className="bg-slate-50/60">
                  <TableHead className="w-20">Date</TableHead>
                  <TableHead className="w-20">Day</TableHead>
                  <TableHead className="w-[160px]">Current Status</TableHead>
                  <TableHead className="w-[200px]">Override Status</TableHead>
                  <TableHead className="w-[160px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => {
                  const draft = row.draft;
                  const effectiveStatus = row.effective?.status ?? null;
                  const isCorrected = hasCorrection(row.date);
                  const draftDirty = Boolean(draft);
                  const isSaving = savingDate === row.date;
                  return (
                    <TableRow
                      key={row.date}
                      className={cn(
                        "transition-colors",
                        row.isFuture && "opacity-50",
                        isCorrected && "bg-amber-50/40",
                      )}
                    >
                      <TableCell className="font-mono text-slate-700">{row.dayLabel}</TableCell>
                      <TableCell className="text-slate-500">{row.weekday}</TableCell>
                      <TableCell>
                        {effectiveStatus ? (
                          <span
                            className={cn(
                              "inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide",
                              STATUS_PILL_CLASS[effectiveStatus] ??
                                "border-slate-200 bg-slate-50 text-slate-700",
                            )}
                          >
                            {effectiveStatus}
                          </span>
                        ) : (
                          <span className="text-xs italic text-slate-400">No record</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={draft?.status_override ?? "__keep__"}
                          onValueChange={(value) =>
                            updateDraft(
                              row.date,
                              value === "__keep__" ? null : (value as AttendanceStatusFull),
                            )
                          }
                          disabled={row.isFuture}
                        >
                          <SelectTrigger className="h-8 w-full border-slate-200">
                            <SelectValue placeholder="Keep current" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="__keep__">Keep current</SelectItem>
                            {STATUS_CHOICES.map((s) => (
                              <SelectItem key={s} value={s}>
                                {STATUS_DROPDOWN_LABEL[s] ?? s}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-8 gap-1 px-2"
                            disabled={!draftDirty || isSaving || row.isFuture}
                            onClick={() => void saveRow(row.date)}
                          >
                            {isSaving ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <Save className="h-3.5 w-3.5" />
                            )}
                            Save
                          </Button>
                          {isCorrected ? (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-8 gap-1 px-2 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                              disabled={isSaving}
                              onClick={() => void clearRow(row.date)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Clear
                            </Button>
                          ) : null}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryStat({
  label,
  value,
  className,
}: {
  label: string;
  value: number;
  className: string;
}) {
  return (
    <span className="inline-flex items-baseline gap-1">
      <span className="font-semibold text-slate-900">{label}:</span>
      <span className={cn("font-bold", className)}>{value}</span>
    </span>
  );
}

function Divider() {
  return <span aria-hidden="true" className="text-slate-300">|</span>;
}
