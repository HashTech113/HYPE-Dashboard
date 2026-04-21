import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { Calendar, Filter, ChevronLeft, ChevronRight, Download, Image as ImageIcon, RefreshCw } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { SectionShell } from "@/components/dashboard/SectionShell";
import { mockPresenceHistory, type PresenceRecord } from "@/data/mockPresence";
import { mockHolidayCalendar } from "@/data/mockHolidayCalendar";
import { useEmployees } from "@/contexts/EmployeesContext";
import { getAttendanceLogs, type AttendanceSummaryItem } from "@/api/dashboardApi";
import { Card, CardContent } from "@/components/ui/card";
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

type CalendarCellStatus = "Present" | "Absent" | "Holiday" | null;

const calendarDayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const calendarStatusStyles: Record<Exclude<CalendarCellStatus, null>, {
  code: "P" | "A" | "H";
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
    cellClassName: "border-emerald-200 bg-emerald-100/80",
    numberClass: "text-emerald-800",
    labelClass: "text-emerald-700",
    dotClass: "bg-emerald-500",
    bubbleClassName: "border-emerald-300 bg-emerald-100 text-emerald-700",
  },
  Absent: {
    code: "A",
    label: "Absent",
    cellClassName: "border-rose-200 bg-rose-100/75",
    numberClass: "text-rose-800",
    labelClass: "text-rose-700",
    dotClass: "bg-rose-500",
    bubbleClassName: "border-rose-300 bg-rose-100 text-rose-700",
  },
  Holiday: {
    code: "H",
    label: "Holiday",
    cellClassName: "border-violet-200 bg-violet-100/75",
    numberClass: "text-violet-800",
    labelClass: "text-violet-700",
    dotClass: "bg-violet-500",
    bubbleClassName: "border-violet-300 bg-violet-100 text-violet-700",
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

function csvEscape(value: string | number | null | undefined) {
  const text = String(value ?? "");
  if (text.includes(",") || text.includes("\"") || text.includes("\n")) {
    return `"${text.replace(/"/g, "\"\"")}"`;
  }
  return text;
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

const statusPillClassName: Record<"Present" | "Late" | "Early Exit" | "Absent" | "Holiday", string> = {
  Present: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Late: "border-orange-200 bg-orange-50 text-orange-700",
  "Early Exit": "border-orange-200 bg-orange-50 text-orange-700",
  Absent: "border-rose-200 bg-rose-50 text-rose-700",
  Holiday: "border-violet-200 bg-violet-50 text-violet-700",
};

function DetailField({
  label,
  value,
  imageUrl,
  pill,
  onImageClick,
}: {
  label: string;
  value: string;
  imageUrl?: string;
  pill?: { label: string; className: string } | null;
  onImageClick?: (url: string, label: string) => void;
}) {
  const hasImage = imageUrl !== undefined;
  return (
    <div className="flex h-full min-h-0 flex-col justify-center rounded-xl border border-slate-200 bg-white px-3.5 py-3">
      {hasImage ? (
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">{label}</p>
            <p className="mt-1 text-sm font-semibold text-slate-900 break-words">{value}</p>
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
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">{label}</p>
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
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">{label}</p>
          <p className="mt-1 text-sm font-semibold text-slate-900 break-words">{value}</p>
        </>
      )}
    </div>
  );
}

const ATTENDANCE_REFRESH_MS = 5_000;

function PresencePage() {
  const { employees } = useEmployees();
  const [selectedCompany, setSelectedCompany] = useState<string>("all");
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
        const data = await getAttendanceLogs({ limit: 500 });
        if (!activeRef.current) return;
        setAttendanceSummaries(data.items);
      } catch (error) {
        console.error("Failed to load attendance summaries", error);
      } finally {
        if (manual && activeRef.current) setRefreshing(false);
      }
    },
    [],
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

    for (let dayNumber = 1; dayNumber <= daysInMonth; dayNumber += 1) {
      const date = new Date(year, month, dayNumber);
      const dateKey = formatDateKey(date);
      let status: CalendarCellStatus = dailyStatusMap.get(dateKey) ?? null;
      const holidayName = holidayNameByDate.get(dateKey) ?? null;

      if (!status && holidayName) {
        status = "Holiday";
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
  }, [calendarMonth, dailyStatusMap, holidayNameByDate]);

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

  const monthRecordCount = useMemo(
    () =>
      historyRecords.filter((record) => {
        const recordDate = new Date(record.date);
        return (
          recordDate.getFullYear() === calendarMonth.getFullYear()
          && recordDate.getMonth() === calendarMonth.getMonth()
        );
      }).length,
    [historyRecords, calendarMonth]
  );

  const hasSelectedEmployee = selectedEmployee !== "none";
  const selectedDayRecord = selectedDate ? recordByDateMap.get(selectedDate) ?? null : null;
  const selectedDayStatus = selectedDayRecord?.status ?? null;
  const selectedDayHoliday = selectedDate ? holidayNameByDate.get(selectedDate) ?? null : null;
  const selectedDayLabel = selectedDate ? formatDisplayDate(selectedDate) : "No date selected";

  const monthlySummary = useMemo(() => {
    const summary = { present: 0, late: 0, absent: 0, holiday: 0 };
    calendarCells.forEach((cell) => {
      if (!cell.inCurrentMonth || !cell.status) {
        return;
      }

      if (cell.status === "Present") summary.present += 1;
      if (cell.status === "Absent") summary.absent += 1;
      if (cell.status === "Holiday") summary.holiday += 1;
    });
    return summary;
  }, [calendarCells]);

  const handleExportReport = () => {
    if (!hasSelectedEmployee) {
      return;
    }

    const currentMonthCells = calendarCells.filter((cell) => cell.inCurrentMonth);
    const selectedEmployeeName =
      employees.find((emp) => emp.employeeId === selectedEmployee)?.name ?? "Selected Employee";

    const headers = [
      "Date",
      "Day",
      "Employee",
      "Status",
      "Holiday",
      "Attendance Entries",
      "Entry Time",
      "Exit Time",
      "Total Hours",
    ];

    const rows = currentMonthCells.map((cell) => {
      const date = new Date(cell.dateKey);
      const weekday = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);
      const record = recordByDateMap.get(cell.dateKey);

      return [
        formatDisplayDate(cell.dateKey),
        weekday,
        selectedEmployeeName,
        cell.status ?? "",
        cell.holidayName ?? "",
        dailyRecordCountMap.get(cell.dateKey) ?? 0,
        record?.entryTime ? formatClock12(record.entryTime) : "",
        record?.exitTime ? formatClock12(record.exitTime) : "",
        record?.totalHours ?? "",
      ];
    });

    const csvContent = [headers, ...rows]
      .map((row) => row.map((value) => csvEscape(value)).join(","))
      .join("\n");

    const monthTag = `${calendarMonth.getFullYear()}-${String(calendarMonth.getMonth() + 1).padStart(2, "0")}`;
    const employeeTag = selectedEmployee.toLowerCase();
    const fileName = `attendance-report-${employeeTag}-${monthTag}.csv`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <SectionShell
        title="Attendance History"
        icon={<Calendar className="h-5 w-5 text-primary" />}
        className="animate-fade-in-up"
        contentClassName="flex min-h-0 flex-1 flex-col gap-2.5 p-3"
      >
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
                <span className="whitespace-nowrap text-sm font-medium leading-none text-slate-600">Choose Date:</span>
                <DatePicker
                  value={selectedDate}
                  onChange={(next) => {
                    setSelectedDate(next);
                    if (next) {
                      const [year, month] = next.split("-").map(Number);
                      setCalendarMonth(new Date(year, month - 1, 1));
                    }
                  }}
                  className="w-[280px]"
                />
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 self-start xl:self-auto">
              <Button
                size="sm"
                variant="outline"
                className="h-10 gap-1.5 px-4"
                onClick={() => loadAttendance({ manual: true })}
                disabled={refreshing}
                title="Refresh attendance data"
              >
                <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
                {refreshing ? "Refreshing…" : "Refresh"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-10 gap-1.5 px-4"
                onClick={handleExportReport}
                disabled={!hasSelectedEmployee}
              >
                <Download className="h-4 w-4" />
                Export Report
              </Button>
            </div>
          </div>

          {(
            <div className="grid min-h-0 flex-1 items-stretch gap-3 2xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
              <section className="flex h-full min-h-0 flex-col rounded-xl border border-slate-200 bg-slate-50/70 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-700">Employee Details</p>
                  <p className="text-sm font-medium text-slate-500">
                    {hasSelectedEmployee ? selectedDayLabel : ""}
                  </p>
                </div>
                <div className="mt-2 grid min-h-0 flex-1 gap-2 xl:grid-cols-[minmax(260px,0.95fr)_minmax(0,1fr)]">
                  <div className="grid min-h-0 grid-rows-[1.7fr_repeat(3,minmax(0,1fr))] gap-1.5">
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
                    <DetailField label="Employee Name" value={selectedEmployeeData?.name ?? ""} />
                    <DetailField label="Company Name" value={selectedEmployeeData?.company ?? ""} />
                    <DetailField label="Employee ID" value={selectedEmployeeData?.employeeId ?? ""} />
                  </div>

                  <div className="grid min-h-0 grid-rows-[repeat(6,minmax(0,1fr))] gap-1.5">
                    <DetailField
                      label="Status"
                      value={
                        hasSelectedEmployee
                          ? selectedDayHoliday ?? selectedDayStatus ?? "No attendance record"
                          : ""
                      }
                      pill={
                        hasSelectedEmployee
                          ? (selectedDayHoliday
                              ? { label: selectedDayHoliday, className: statusPillClassName.Holiday }
                              : selectedDayStatus
                                ? { label: selectedDayStatus, className: statusPillClassName[selectedDayStatus] }
                                : null)
                          : null
                      }
                    />
                    <DetailField
                      label="Arrival Time"
                      value={hasSelectedEmployee ? formatCalendarTime(selectedDayRecord?.entryTime) : ""}
                      imageUrl={hasSelectedEmployee ? selectedDayRecord?.entryImage ?? undefined : undefined}
                      onImageClick={(url, lbl) => setImagePreview({ url, label: lbl })}
                    />
                    <DetailField
                      label="Late Entry"
                      value={hasSelectedEmployee ? lateEntryLabel(selectedDayRecord) : ""}
                    />
                    <DetailField
                      label="Exit Time"
                      value={hasSelectedEmployee ? formatCalendarTime(selectedDayRecord?.exitTime ?? null) : ""}
                      imageUrl={hasSelectedEmployee ? selectedDayRecord?.exitImage ?? undefined : undefined}
                      onImageClick={(url, lbl) => setImagePreview({ url, label: lbl })}
                    />
                    <DetailField
                      label="Early Exit"
                      value={hasSelectedEmployee ? earlyExitLabel(selectedDayRecord) : ""}
                    />
                    <DetailField
                      label="Total Hours"
                      value={hasSelectedEmployee ? selectedDayRecord?.totalHours ?? "—" : ""}
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
                  <div className="grid h-full min-h-0 grid-cols-[repeat(7,minmax(0,1fr))] grid-rows-6 gap-1.5">
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
                            "relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border px-1.5 py-1 text-left transition-shadow",
                            cell.inCurrentMonth
                              ? "shadow-sm hover:shadow-md"
                              : "opacity-40",
                            statusStyle?.cellClassName ?? "border-slate-200 bg-white",
                            isSelected ? "ring-2 ring-primary/60" : "",
                          )}
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span
                              className={cn(
                                "text-base font-bold leading-none",
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
                                  "h-1.5 w-1.5 shrink-0 rounded-full",
                                  statusStyle.dotClass,
                                )}
                              />
                            ) : null}
                          </div>
                          {statusStyle && cell.inCurrentMonth ? (
                            <span
                              className={cn(
                                "mt-1 truncate text-[10px] font-medium",
                                statusStyle.labelClass,
                              )}
                            >
                              {cell.status === "Holiday" && cell.holidayName
                                ? cell.holidayName
                                : statusStyle.code}
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-1 shrink-0 text-right text-[10px] text-slate-500">{monthRecordCount} attendance records</div>
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
