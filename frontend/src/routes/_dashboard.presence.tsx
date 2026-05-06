import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { Calendar, Search, ChevronLeft, ChevronRight, Image as ImageIcon, RefreshCw } from "lucide-react";
import { SectionShell } from "@/components/dashboard/SectionShell";
import { mockPresenceHistory, type PresenceRecord } from "@/data/mockPresence";
import { mockHolidayCalendar } from "@/data/mockHolidayCalendar";
import { useEmployees } from "@/contexts/EmployeesContext";
import { getAttendanceLogs, type AttendanceSummaryItem } from "@/api/dashboardApi";
import { companyMatches } from "@/lib/auth";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/dashboard/DatePicker";
import { cn } from "@/lib/utils";
import { matchesEmployeeName } from "@/lib/nameMatch";
import { formatClock12, formatDateKey as formatDisplayDate, formatDurationMinutes } from "@/lib/dateFormat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/_dashboard/presence")({
  component: PresencePage,
});

type CalendarCellStatus = "Present" | "Absent" | "Holiday" | "Sunday" | null;

const calendarDayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Status palette is paired with the neumorphic base in the tile JSX —
// `cellClassName` paints the saturated background, text classes flip to
// white for contrast, and the raised dual-shadow shape comes from the
// `.neu-surface` utility class.
const calendarStatusStyles: Record<Exclude<CalendarCellStatus, null>, {
  code: "P" | "A" | "H" | "S";
  label: string;
  cellClassName: string;
  numberClass: string;
  labelClass: string;
  dotClass: string;
  bubbleClassName: string;
}> = {
  Present: {
    code: "P",
    label: "Present",
    cellClassName: "border border-emerald-400",
    numberClass: "text-emerald-600",
    labelClass: "text-emerald-600",
    dotClass: "bg-emerald-500 shadow-sm",
    bubbleClassName: "border-emerald-300 bg-emerald-100 text-emerald-700",
  },
  Absent: {
    code: "A",
    label: "Absent",
    cellClassName: "border border-red-400",
    numberClass: "text-red-600",
    labelClass: "text-red-600",
    dotClass: "bg-red-600 shadow-sm",
    bubbleClassName: "border-red-300 bg-red-100 text-red-700",
  },
  // "Holiday" now represents weekday leaves (public/company holidays falling
  // on Mon–Sat). Sundays are split out below so they get their own color.
  Holiday: {
    code: "H",
    label: "Leave",
    cellClassName: "border border-blue-400",
    numberClass: "text-blue-600",
    labelClass: "text-blue-600",
    dotClass: "bg-blue-500 shadow-sm",
    bubbleClassName: "border-blue-300 bg-blue-100 text-blue-700",
  },
  Sunday: {
    code: "S",
    label: "Sunday",
    cellClassName: "border border-orange-400",
    numberClass: "text-orange-600",
    labelClass: "text-orange-600",
    dotClass: "bg-orange-500 shadow-sm",
    bubbleClassName: "border-orange-300 bg-orange-100 text-orange-700",
  },
};

function formatDateKey(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}


function toCalendarStatus(status: PresenceRecord["status"]): Exclude<CalendarCellStatus, null> {
  if (status === "Absent") {
    return "Absent";
  }
  return "Present";
}

function summarizeDailyStatus(statuses: PresenceRecord["status"][]): Exclude<CalendarCellStatus, null> {
  const normalizedStatuses = statuses.map(toCalendarStatus);

  if (normalizedStatuses.includes("Absent")) {
    return "Absent";
  }
  return "Present";
}

function formatCalendarTime(time: string | null | undefined) {
  const raw = String(time ?? "").trim();
  if (!raw || raw === "-" || raw === "—" || raw === "â€”") {
    return "--";
  }
  return formatClock12(raw);
}

function deriveRecordsFromSummaries(
  summaries: AttendanceSummaryItem[],
  employee: { name: string; employeeId: string }
): PresenceRecord[] {
  return summaries
    .filter((s) => matchesEmployeeName(s.name, employee.name))
    .map((s) => ({
      id: `api-${employee.employeeId}-${s.date}`,
      employeeName: employee.name,
      employeeId: employee.employeeId,
      entryTime: s.entry_time ?? "",
      exitTime: s.exit_time,
      totalHours: s.total_hours,
      status: s.status,
      date: s.date,
      entryImage: s.entry_image_url ?? undefined,
      exitImage: s.exit_image_url ?? undefined,
      lateEntryMinutes: s.late_entry_minutes,
      lateEntrySeconds: s.late_entry_seconds,
      earlyExitMinutes: s.early_exit_minutes,
      earlyExitSeconds: s.early_exit_seconds,
    }));
}

function formatDurationSeconds(totalSeconds: number): string {
  if (totalSeconds <= 0) return "On Time";
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

function lateEntryLabel(record: PresenceRecord | null): string {
  if (!record || !record.entryTime) return "—";
  const seconds = record.lateEntrySeconds ?? ((record.lateEntryMinutes ?? 0) * 60);
  return formatDurationSeconds(seconds);
}

function earlyExitLabel(record: PresenceRecord | null): string {
  if (!record || !record.exitTime) return "—";
  const seconds = record.earlyExitSeconds ?? ((record.earlyExitMinutes ?? 0) * 60);
  return formatDurationSeconds(seconds);
}

const statusPillClassName: Record<"Present" | "Late" | "Early Exit" | "Absent" | "Holiday" | "Sunday", string> = {
  Present: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Late: "border-orange-200 bg-orange-50 text-orange-700",
  "Early Exit": "border-orange-200 bg-orange-50 text-orange-700",
  Absent: "border-rose-200 bg-rose-50 text-rose-700",
  Holiday: "border-blue-200 bg-blue-50 text-blue-700",
  Sunday: "border-orange-200 bg-orange-50 text-orange-700",
};

type DetailTone =
  | "neutral"
  | "emerald"
  | "sky"
  | "amber"
  | "rose"
  | "violet"
  | "indigo"
  | "orange"
  | "blue";

const detailToneStyles: Record<DetailTone, { container: string; label: string; value: string }> = {
  neutral: {
    container: "border-slate-200 bg-white",
    label: "text-slate-500",
    value: "text-slate-900",
  },
  emerald: {
    container: "border-emerald-200 bg-emerald-50/70",
    label: "text-emerald-700",
    value: "text-emerald-900",
  },
  sky: {
    container: "border-sky-200 bg-sky-50/70",
    label: "text-sky-700",
    value: "text-sky-900",
  },
  amber: {
    container: "border-amber-200 bg-amber-50/70",
    label: "text-amber-700",
    value: "text-amber-900",
  },
  rose: {
    container: "border-rose-200 bg-rose-50/70",
    label: "text-rose-700",
    value: "text-rose-900",
  },
  violet: {
    container: "border-violet-200 bg-violet-50/70",
    label: "text-violet-700",
    value: "text-violet-900",
  },
  indigo: {
    container: "border-indigo-200 bg-indigo-50/70",
    label: "text-indigo-700",
    value: "text-indigo-900",
  },
  orange: {
    container: "border-orange-200 bg-orange-50/70",
    label: "text-orange-700",
    value: "text-orange-900",
  },
  blue: {
    container: "border-blue-200 bg-blue-50/70",
    label: "text-blue-700",
    value: "text-blue-900",
  },
};

function DetailField({
  label,
  value,
  imageUrl,
  pill,
  onImageClick,
  tone = "neutral",
}: {
  label: string;
  value: string;
  imageUrl?: string;
  pill?: { label: string; className: string } | null;
  onImageClick?: (url: string, label: string) => void;
  tone?: DetailTone;
}) {
  const hasImage = imageUrl !== undefined;
  const t = detailToneStyles[tone];
  return (
    <div
      className={cn(
        "flex h-full min-h-0 flex-col justify-center rounded-xl border px-3.5 py-3 transition-colors",
        t.container,
      )}
    >
      {hasImage ? (
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className={cn("text-[11px] font-medium uppercase tracking-[0.14em]", t.label)}>
              {label}
            </p>
            <p className={cn("mt-1 text-sm font-semibold break-words", t.value)}>{value}</p>
          </div>
          {imageUrl ? (
            <button
              type="button"
              onClick={() => onImageClick?.(imageUrl, label)}
              className="group relative block h-12 w-14 shrink-0 overflow-visible rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              title={`Preview ${label.toLowerCase()} capture`}
            >
              <img
                src={imageUrl}
                alt={`${label} capture`}
                className="h-full w-full rounded-lg object-cover"
                loading="lazy"
              />
              <div
                className="pointer-events-none invisible absolute right-full top-1/2 z-50 mr-3 w-max -translate-y-1/2 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100"
                role="presentation"
              >
                <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
                  <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
                    {label}
                  </p>
                  <div className="mt-2 flex h-40 w-56 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
                    <img
                      src={imageUrl}
                      alt=""
                      className="block max-h-full max-w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </button>
          ) : (
            <div className="flex h-12 w-14 shrink-0 flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-slate-400">
              <ImageIcon className="h-4 w-4" />
              <span className="mt-0.5 text-[8px] font-medium uppercase tracking-[0.12em]">Image</span>
            </div>
          )}
        </div>
      ) : pill ? (
        <div className="flex items-center justify-between gap-3">
          <p className={cn("text-[11px] font-medium uppercase tracking-[0.14em]", t.label)}>
            {label}
          </p>
          <span
            className={cn(
              "inline-flex shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold",
              pill.className,
            )}
          >
            {pill.label}
          </span>
        </div>
      ) : (
        <>
          <p className={cn("text-[11px] font-medium uppercase tracking-[0.14em]", t.label)}>
            {label}
          </p>
          <p className={cn("mt-1 text-sm font-semibold break-words", t.value)}>{value}</p>
        </>
      )}
    </div>
  );
}

const ATTENDANCE_REFRESH_MS = 5_000;

function SummaryStat({
  label,
  value,
  numberClass,
}: {
  label: string;
  value: number;
  numberClass: string;
}) {
  return (
    <span className="inline-flex items-baseline gap-1">
      <span className="font-semibold text-slate-900">{label}:</span>
      <span className={cn("font-bold", numberClass)}>{value}</span>
    </span>
  );
}

function SummaryDivider() {
  return <span aria-hidden="true" className="text-slate-300">|</span>;
}

function PresencePage() {
  const { employees, scopedCompany } = useEmployees();
  const isCompanyScoped = scopedCompany !== null;
  const [selectedCompany, setSelectedCompany] = useState<string>(
    isCompanyScoped ? (scopedCompany as string) : "all",
  );
  const [selectedEmployee, setSelectedEmployee] = useState<string>("none");
  const [imagePreview, setImagePreview] = useState<{ url: string; label: string } | null>(null);
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date("2026-01-01"));
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [attendanceSummaries, setAttendanceSummaries] = useState<AttendanceSummaryItem[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const activeRef = useRef(true);

  const loadAttendance = useCallback(
    async ({ manual = false }: { manual?: boolean } = {}) => {
      if (manual) setRefreshing(true);
      try {
        const data = await getAttendanceLogs();
        if (!activeRef.current) return;
        // HR users only see attendance for their own company. Filter at the
        // source so downstream calendar/list views can't leak other companies.
        const items = scopedCompany
          ? data.items.filter((item) => companyMatches(item.company, scopedCompany))
          : data.items;
        setAttendanceSummaries(items);
      } catch (error) {
        console.error("Failed to load attendance summaries", error);
      } finally {
        if (manual && activeRef.current) setRefreshing(false);
      }
    },
    [scopedCompany],
  );

  useEffect(() => {
    activeRef.current = true;
    loadAttendance();
    const id = window.setInterval(() => loadAttendance(), ATTENDANCE_REFRESH_MS);
    return () => {
      activeRef.current = false;
      window.clearInterval(id);
    };
  }, [loadAttendance]);

  const companyOptions = useMemo(
    () => Array.from(new Set(employees.map((employee) => employee.company))),
    [employees]
  );

  const employeesForSelectedCompany = useMemo(
    () => (selectedCompany === "all"
      ? employees
      : employees.filter((employee) => employee.company === selectedCompany)),
    [employees, selectedCompany]
  );

  useEffect(() => {
    if (selectedEmployee === "none") {
      return;
    }

    const existsInCompanyList = employeesForSelectedCompany.some((employee) => employee.employeeId === selectedEmployee);
    if (!existsInCompanyList) {
      setSelectedEmployee("none");
    }
  }, [employeesForSelectedCompany, selectedEmployee]);

  useEffect(() => {
    if (selectedEmployee === "none") {
      setSelectedDate("");
    }
  }, [selectedEmployee]);

  const apiRecordsForSelected = useMemo(() => {
    if (selectedEmployee === "none") return [];
    const employee = employees.find((e) => e.employeeId === selectedEmployee);
    if (!employee) return [];
    return deriveRecordsFromSummaries(attendanceSummaries, {
      name: employee.name,
      employeeId: employee.employeeId,
    });
  }, [selectedEmployee, employees, attendanceSummaries]);

  useEffect(() => {
    if (apiRecordsForSelected.length === 0) return;
    const inCurrentMonth = apiRecordsForSelected.some((r) => {
      const d = new Date(r.date);
      return (
        d.getFullYear() === calendarMonth.getFullYear() &&
        d.getMonth() === calendarMonth.getMonth()
      );
    });
    if (inCurrentMonth) return;
    const latest = apiRecordsForSelected
      .map((r) => new Date(r.date))
      .sort((a, b) => b.getTime() - a.getTime())[0];
    if (latest) {
      setCalendarMonth(new Date(latest.getFullYear(), latest.getMonth(), 1));
      setSelectedDate(formatDateKey(latest));
    }
  }, [apiRecordsForSelected, calendarMonth]);

  const historyRecords = useMemo(() => {
    if (selectedEmployee === "none") return [];

    const employee = employees.find((e) => e.employeeId === selectedEmployee);
    const apiRecords = employee
      ? deriveRecordsFromSummaries(attendanceSummaries, {
          name: employee.name,
          employeeId: employee.employeeId,
        })
      : [];
    const apiDates = new Set(apiRecords.map((r) => r.date));

    const mockRecords = mockPresenceHistory.filter(
      (r) => r.employeeId === selectedEmployee && !apiDates.has(r.date)
    );

    const merged = [...apiRecords, ...mockRecords];
    return merged.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [selectedEmployee, employees, attendanceSummaries]);

  const dailyStatusMap = useMemo(() => {
    const groupedByDate = new Map<string, PresenceRecord["status"][]>();

    historyRecords.forEach((record) => {
      const statuses = groupedByDate.get(record.date) ?? [];
      statuses.push(record.status);
      groupedByDate.set(record.date, statuses);
    });

    const dailyMap = new Map<string, Exclude<CalendarCellStatus, null>>();
    groupedByDate.forEach((statuses, date) => {
      dailyMap.set(date, summarizeDailyStatus(statuses));
    });

    return dailyMap;
  }, [historyRecords]);

  const dailyRecordCountMap = useMemo(() => {
    const dailyCountMap = new Map<string, number>();
    historyRecords.forEach((record) => {
      dailyCountMap.set(record.date, (dailyCountMap.get(record.date) ?? 0) + 1);
    });
    return dailyCountMap;
  }, [historyRecords]);

  const recordByDateMap = useMemo(() => {
    const map = new Map<string, PresenceRecord>();
    historyRecords.forEach((record) => {
      if (!map.has(record.date)) {
        map.set(record.date, record);
      }
    });
    return map;
  }, [historyRecords]);

  const holidayNameByDate = useMemo(() => {
    const holidayMap = new Map<string, string>();
    mockHolidayCalendar.forEach((holiday) => {
      holidayMap.set(holiday.date, holiday.name);
    });
    return holidayMap;
  }, []);

  const calendarCells = useMemo(() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const monthStart = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstWeekday = monthStart.getDay();
    const previousMonthDays = new Date(year, month, 0).getDate();

    const cells: {
      dateKey: string;
      dayNumber: number;
      inCurrentMonth: boolean;
      status: CalendarCellStatus;
      holidayName: string | null;
    }[] = [];

    for (let offset = firstWeekday - 1; offset >= 0; offset -= 1) {
      const dayNumber = previousMonthDays - offset;
      const date = new Date(year, month - 1, dayNumber);
      cells.push({
        dateKey: formatDateKey(date),
        dayNumber,
        inCurrentMonth: false,
        status: null,
        holidayName: null,
      });
    }

    const todayKey = formatDateKey(new Date());
    const employeeSelected = selectedEmployee !== "none";

    for (let dayNumber = 1; dayNumber <= daysInMonth; dayNumber += 1) {
      const date = new Date(year, month, dayNumber);
      const dateKey = formatDateKey(date);
      const isSunday = date.getDay() === 0;
      let status: CalendarCellStatus = dailyStatusMap.get(dateKey) ?? null;
      const holidayName = holidayNameByDate.get(dateKey) ?? null;

      // Sundays always show in the Sunday color, regardless of whether the
      // holiday calendar happens to also list them as a "Weekly Off".
      if (isSunday && !status) {
        status = "Sunday";
      } else if (!status && holidayName) {
        // Weekday leaves (public / company holidays on Mon–Sat).
        status = "Holiday";
      }

      // Absent = an employee is selected, the day is on or before today,
      // no attendance record exists, and it isn't a Sunday or holiday.
      if (!status && employeeSelected && dateKey <= todayKey) {
        status = "Absent";
      }

      cells.push({
        dateKey,
        dayNumber,
        inCurrentMonth: true,
        status,
        holidayName,
      });
    }

    const totalCells = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;
    const trailingCells = totalCells - cells.length;
    for (let dayNumber = 1; dayNumber <= trailingCells; dayNumber += 1) {
      const date = new Date(year, month + 1, dayNumber);
      cells.push({
        dateKey: formatDateKey(date),
        dayNumber,
        inCurrentMonth: false,
        status: null,
        holidayName: null,
      });
    }

    return cells;
  }, [calendarMonth, dailyStatusMap, holidayNameByDate, selectedEmployee]);

  const monthLabel = useMemo(
    () => new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(calendarMonth),
    [calendarMonth]
  );

  const selectedEmployeeData = useMemo(
    () => employees.find((employee) => employee.employeeId === selectedEmployee) ?? null,
    [employees, selectedEmployee]
  );

  const selectedEmployeeLabel =
    selectedEmployee === "none"
      ? "Employee not selected"
      : selectedEmployeeData?.name ?? "Selected Employee";

  useEffect(() => {
    if (!selectedEmployeeData) {
      return;
    }

    if (selectedDate) {
      return;
    }

    const recordForCurrentMonth = historyRecords.find((record) => {
      const recordDate = new Date(record.date);
      return (
        recordDate.getFullYear() === calendarMonth.getFullYear()
        && recordDate.getMonth() === calendarMonth.getMonth()
      );
    });

    if (recordForCurrentMonth) {
      setSelectedDate(recordForCurrentMonth.date);
      return;
    }

    setSelectedDate(formatDateKey(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1)));
  }, [calendarMonth, historyRecords, selectedDate, selectedEmployeeData]);

  const hasSelectedEmployee = selectedEmployee !== "none";
  const selectedDayRecord = selectedDate ? recordByDateMap.get(selectedDate) ?? null : null;
  const selectedDayIsSunday = selectedDate
    ? (() => {
        const [y, m, d] = selectedDate.split("-").map(Number);
        return new Date(y, (m ?? 1) - 1, d).getDay() === 0;
      })()
    : false;
  const rawSelectedDayHoliday = selectedDate ? holidayNameByDate.get(selectedDate) ?? null : null;
  // Weekday leave names only — Sundays get their own treatment below.
  const selectedDayHoliday = selectedDayIsSunday ? null : rawSelectedDayHoliday;
  const selectedDayStatus: PresenceRecord["status"] | null = (() => {
    if (selectedDayRecord?.status) return selectedDayRecord.status;
    // Past/today with no record, not a Sunday, not a holiday → Absent.
    if (!selectedDate || !hasSelectedEmployee || selectedDayHoliday || selectedDayIsSunday) return null;
    const todayKey = formatDateKey(new Date());
    return selectedDate <= todayKey ? "Absent" : null;
  })();
  const selectedDayLabel = selectedDate ? formatDisplayDate(selectedDate) : "No date selected";

  const monthlySummary = useMemo(() => {
    const summary = { present: 0, absent: 0, wfh: 0, paidLeave: 0, sundays: 0, companyLeaves: 0 };
    calendarCells.forEach((cell) => {
      if (!cell.inCurrentMonth) {
        return;
      }

      const [y, m, d] = cell.dateKey.split("-").map(Number);
      if (new Date(y, (m ?? 1) - 1, d).getDay() === 0) summary.sundays += 1;
      if (!cell.status) return;
      if (cell.status === "Present") summary.present += 1;
      if (cell.status === "Absent") summary.absent += 1;
      if (cell.status === "Holiday") summary.companyLeaves += 1;
    });
    return summary;
  }, [calendarCells]);
  const weekdaysInMonth = useMemo(
    () =>
      calendarCells.filter((cell) => {
        if (!cell.inCurrentMonth) return false;
        const [y, m, d] = cell.dateKey.split("-").map(Number);
        return new Date(y, (m ?? 1) - 1, d).getDay() !== 0;
      }).length,
    [calendarCells]
  );
  const lopCount = 0;
  const totalWorkingDays = Math.max(weekdaysInMonth - monthlySummary.companyLeaves, 0);

  return (
    <div className="flex min-h-0 flex-col md:h-full md:overflow-hidden">
      <SectionShell
        title="Attendance History"
        icon={<Calendar className="h-5 w-5 text-primary" />}
        // Flat treatment: kill the neumorphic shadow + outer border so the
        // card blends into the now-white page instead of looking like a
        // raised box on a tinted background.
        // More pronounced curve and a wider inset so the card visibly
        // shrinks away from the page edges.
        className="animate-fade-in-up mx-2 my-2 !rounded-3xl !border !border-slate-200 !shadow-sm"
        contentClassName="flex min-h-0 flex-1 flex-col gap-2.5 p-3"
        inlineActions
        actions={
          <div className="ml-[5rem] flex flex-1 flex-wrap items-center gap-3 sm:ml-[6rem]">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-primary" />
              <span className="whitespace-nowrap text-sm font-semibold text-sky-900">
                Employees
              </span>
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger className="h-9 w-[155px] border-sky-200 focus:ring-sky-300 sm:w-[170px] md:w-[180px]">
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Select Employee</SelectItem>
                  {employeesForSelectedCompany.map((emp) => (
                    <SelectItem key={emp.employeeId} value={emp.employeeId}>
                      {emp.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap text-sm font-semibold text-emerald-900">
                Choose Date
              </span>
              <DatePicker
                value={selectedDate}
                onChange={(next) => {
                  setSelectedDate(next);
                  if (next) {
                    const [year, month] = next.split("-").map(Number);
                    setCalendarMonth(new Date(year, month - 1, 1));
                  }
                }}
                className="w-[230px]"
              />
            </div>

            <Button
              size="sm"
              variant="outline"
              className="ml-auto h-9 gap-1.5 px-4"
              onClick={() => loadAttendance({ manual: true })}
              disabled={refreshing}
              title="Refresh attendance data"
            >
              <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
              {refreshing ? "Refreshing…" : "Refresh"}
            </Button>
          </div>
        }
      >
          {/* The only thing left in this row is the admin-only Company
              picker. HR users skip the row entirely because their company
              is already implied by their session. */}
          {!isCompanyScoped ? (
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap text-xs font-semibold text-[#393E2E]">
                  Company
                </span>
                <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                  <SelectTrigger className="h-10 w-[130px] border-indigo-200 focus:ring-indigo-300 sm:w-[140px] md:w-[150px]">
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
            </div>
          ) : null}

          {(
            <div className="grid min-h-0 flex-1 items-stretch gap-3 2xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
              <section className="flex h-full min-h-0 flex-col rounded-xl border border-slate-200 bg-slate-50/70 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-700">Employee Details</p>
                  <p className="text-sm font-medium text-slate-500">
                    {hasSelectedEmployee ? selectedDayLabel : ""}
                  </p>
                </div>
                {/* Inner scroll keeps the Employee Details panel within the
                    card's height while letting the operator reach every field
                    (avatar + 3 left-column fields + 8 right-column fields) on
                    smaller viewports. */}
                <div className="mt-2 grid min-h-0 flex-1 gap-2 overflow-y-auto pr-1 xl:grid-cols-[minmax(260px,0.95fr)_minmax(0,1fr)]">
                  <div className="grid min-h-0 grid-rows-[auto_repeat(3,auto)] gap-1.5 xl:grid-rows-[1.7fr_repeat(3,minmax(0,1fr))]">
                    <div className="flex min-h-0 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2.5">
                      <Avatar className="h-32 w-32 border border-slate-200 bg-slate-100">
                        {selectedEmployeeData?.imageUrl ? (
                          <AvatarImage
                            src={selectedEmployeeData.imageUrl}
                            alt={selectedEmployeeData.name}
                            className="object-cover"
                          />
                        ) : null}
                        <AvatarFallback className="text-2xl font-semibold text-slate-600">
                          {selectedEmployeeData
                            ? selectedEmployeeData.name
                                .split(/\s+/)
                                .filter(Boolean)
                                .slice(0, 2)
                                .map((part) => part[0]?.toUpperCase() ?? "")
                                .join("")
                            : ""}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <DetailField tone="sky" label="Employee Name" value={selectedEmployeeData?.name ?? ""} />
                    <DetailField tone="indigo" label="Company Name" value={selectedEmployeeData?.company ?? ""} />
                    <DetailField tone="violet" label="Employee ID" value={selectedEmployeeData?.employeeId ?? ""} />
                  </div>

                  <div className="grid min-h-0 grid-rows-[repeat(8,auto)] gap-1.5 xl:grid-rows-[repeat(8,minmax(0,1fr))]">
                    <DetailField
                      tone={
                        selectedDayIsSunday
                          ? "orange"
                          : selectedDayHoliday
                            ? "blue"
                            : selectedDayStatus === "Absent"
                              ? "rose"
                              : selectedDayStatus === "Late" || selectedDayStatus === "Early Exit"
                                ? "amber"
                                : selectedDayStatus === "Present"
                                  ? "emerald"
                                  : "neutral"
                      }
                      label="Status"
                      value={
                        hasSelectedEmployee
                          ? selectedDayIsSunday
                            ? "Sunday"
                            : selectedDayHoliday ?? selectedDayStatus ?? "No attendance record"
                          : ""
                      }
                      pill={
                        hasSelectedEmployee
                          ? (selectedDayIsSunday
                              ? { label: "Sunday", className: statusPillClassName.Sunday }
                              : selectedDayHoliday
                                ? { label: selectedDayHoliday, className: statusPillClassName.Holiday }
                                : selectedDayStatus
                                  ? { label: selectedDayStatus, className: statusPillClassName[selectedDayStatus] }
                                  : null)
                          : null
                      }
                    />
                    <DetailField
                      tone="sky"
                      label="Arrival Time"
                      value={hasSelectedEmployee ? formatCalendarTime(selectedDayRecord?.entryTime) : ""}
                      imageUrl={hasSelectedEmployee ? selectedDayRecord?.entryImage ?? undefined : undefined}
                      onImageClick={(url, lbl) => setImagePreview({ url, label: lbl })}
                    />
                    <DetailField
                      tone={
                        hasSelectedEmployee && (selectedDayRecord?.lateEntryMinutes ?? 0) > 0
                          ? "amber"
                          : "emerald"
                      }
                      label="Late Entry"
                      value={hasSelectedEmployee ? lateEntryLabel(selectedDayRecord) : ""}
                    />
                    <DetailField
                      tone="sky"
                      label="Exit Time"
                      value={hasSelectedEmployee ? formatCalendarTime(selectedDayRecord?.exitTime ?? null) : ""}
                      imageUrl={hasSelectedEmployee ? selectedDayRecord?.exitImage ?? undefined : undefined}
                      onImageClick={(url, lbl) => setImagePreview({ url, label: lbl })}
                    />
                    <DetailField
                      tone={
                        hasSelectedEmployee && (selectedDayRecord?.earlyExitMinutes ?? 0) > 0
                          ? "amber"
                          : "emerald"
                      }
                      label="Early Exit"
                      value={hasSelectedEmployee ? earlyExitLabel(selectedDayRecord) : ""}
                    />
                    <DetailField
                      tone="indigo"
                      label="Total Hours"
                      value={hasSelectedEmployee ? selectedDayRecord?.totalHours ?? "—" : ""}
                    />
                    {/* Placeholder fields — wiring to break-tracking data is
                        a future task. For now they render the same "no value"
                        treatment as the other fields when no employee/day
                        is selected. */}
                    <DetailField
                      tone="orange"
                      label="Break Time"
                      value={hasSelectedEmployee ? "—" : ""}
                    />
                    <DetailField
                      tone="orange"
                      label="Total Break Time"
                      value={hasSelectedEmployee ? "—" : ""}
                    />
                  </div>
                </div>
              </section>

              <section className="flex h-full min-h-0 min-w-0 w-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100/70 p-3 shadow-sm">
                <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
                  <div className="justify-self-start">
                    <h3 className="text-2xl font-semibold leading-none tracking-tight text-slate-900">{monthLabel}</h3>
                  </div>
                  <div className="flex items-center justify-self-end gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-white"
                      onClick={() => {
                        setCalendarMonth((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1));
                        setSelectedDate("");
                      }}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="px-1 text-sm font-medium text-slate-600">Month View</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-white"
                      onClick={() => {
                        setCalendarMonth((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1));
                        setSelectedDate("");
                      }}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="mb-2 min-w-0 border-b border-slate-200">
                  <div className="grid grid-cols-[repeat(7,minmax(0,1fr))] gap-2 pb-2">
                    {calendarDayLabels.map((day) => (
                      <div key={day} className="min-w-0 text-center text-xs font-medium text-slate-500">
                        {day}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="min-h-0 flex-1 min-w-0">
                  <div className="grid h-full min-h-0 grid-cols-[repeat(7,minmax(0,1fr))] grid-rows-6 gap-2 sm:gap-2.5">
                    {calendarCells.map((cell) => {
                      const statusStyle = cell.status ? calendarStatusStyles[cell.status] : null;
                      const isSelected = cell.dateKey === selectedDate;
                      const holidayTooltip =
                        cell.holidayName ?? (statusStyle ? statusStyle.label : undefined);

                      return (
                        <button
                          type="button"
                          key={cell.dateKey}
                          title={holidayTooltip}
                          onClick={() => {
                            if (cell.inCurrentMonth) {
                              setSelectedDate(cell.dateKey);
                            }
                          }}
                          className={cn(
                            "relative flex h-full min-w-0 flex-col overflow-hidden rounded-lg px-2 py-1 text-left",
                            cell.inCurrentMonth
                              ? "neu-surface neu-surface-hover"
                              : "neu-inset opacity-60",
                            statusStyle?.cellClassName ?? "",
                            isSelected
                              ? "ring-2 ring-primary/60 ring-offset-2 ring-offset-[var(--color-background)]"
                              : "",
                          )}
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span
                              className={cn(
                                "text-base font-medium leading-none tracking-tight sm:text-lg",
                                cell.inCurrentMonth
                                  ? statusStyle?.numberClass ?? "text-slate-800"
                                  : "text-slate-400",
                              )}
                            >
                              {cell.dayNumber}
                            </span>
                            {statusStyle && cell.inCurrentMonth ? (
                              <span
                                className={cn(
                                  "h-1.5 w-1.5 shrink-0 rounded-full shadow-sm",
                                  statusStyle.dotClass,
                                )}
                              />
                            ) : null}
                          </div>
                          {statusStyle && cell.inCurrentMonth ? (
                            <span
                              className={cn(
                                "mt-auto truncate text-[10px] font-normal leading-tight",
                                statusStyle.labelClass,
                              )}
                            >
                              {cell.status === "Holiday" && cell.holidayName
                                ? cell.holidayName
                                : cell.status === "Sunday"
                                  ? "Sun"
                                  : statusStyle.label}
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Per-stat labels are bolder + dark slate; the numbers pick
                    up the same color palette as the calendar status legend
                    (Present=emerald, Absent=red, Sundays=orange, Leaves=blue)
                    so the eye can scan the row and the calendar with the
                    same color cues. */}
                {/* Two centered rows: 4 stats each. Bottom-aligned via the
                    parent layout, and each row uses justify-center so the
                    pairs sit symmetrically under the calendar. */}
                <div className="mt-3 flex flex-col items-center gap-1 text-xs text-slate-900">
                  <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 whitespace-nowrap">
                    <SummaryStat label="Total Working Days" value={totalWorkingDays} numberClass="text-slate-700" />
                    <SummaryDivider />
                    <SummaryStat label="Present" value={monthlySummary.present} numberClass="text-emerald-600" />
                    <SummaryDivider />
                    <SummaryStat label="Absent" value={monthlySummary.absent} numberClass="text-red-600" />
                    <SummaryDivider />
                    <SummaryStat label="WFH" value={monthlySummary.wfh} numberClass="text-violet-600" />
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 whitespace-nowrap">
                    <SummaryStat label="Paid Leave" value={monthlySummary.paidLeave} numberClass="text-blue-600" />
                    <SummaryDivider />
                    <SummaryStat label="Sundays" value={monthlySummary.sundays} numberClass="text-orange-600" />
                    <SummaryDivider />
                    <SummaryStat label="Company Leaves" value={monthlySummary.companyLeaves} numberClass="text-blue-600" />
                    <SummaryDivider />
                    <SummaryStat label="LOP" value={lopCount} numberClass="text-rose-600" />
                  </div>
                </div>
              </section>
            </div>
          )}
      </SectionShell>

      <Dialog
        open={imagePreview !== null}
        onOpenChange={(open) => {
          if (!open) setImagePreview(null);
        }}
      >
        <DialogContent className="w-auto max-w-none gap-2 p-3 sm:rounded-xl">
          <DialogHeader className="space-y-0">
            <DialogTitle className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
              {imagePreview?.label ?? "Capture"}
            </DialogTitle>
          </DialogHeader>
          {imagePreview ? (
            <div className="flex h-40 w-56 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
              <img
                src={imagePreview.url}
                alt={`${imagePreview.label} capture`}
                className="block max-h-full max-w-full object-contain"
              />
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
