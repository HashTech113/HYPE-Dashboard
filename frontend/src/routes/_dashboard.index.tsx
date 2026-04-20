import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { MoreHorizontal, Percent, Users, CalendarDays, Clock3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEmployees } from "@/contexts/EmployeesContext";
import { getAttendanceLogs, type AttendanceSummaryItem } from "@/api/dashboardApi";
import { matchesEmployeeName } from "@/lib/nameMatch";

export const Route = createFileRoute("/_dashboard/")({
  component: OverviewPage,
});

const attendanceSegments = [
  { label: "Present", color: "#0f9f7f" },
  { label: "Leave", color: "#e74c3c" },
  { label: "Late", color: "#f4c542" },
] as const;

const OVERVIEW_POLL_MS = 30_000;
const WORKDAY_MINUTES = 9 * 60; // 09:30 → 18:30

function todayIsoDate(): string {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

function parseHoursToMinutes(totalHours: string): number {
  const m = totalHours.match(/(\d+)\s*h(?:\s*(\d+)\s*m)?/i);
  if (!m) return 0;
  return Number(m[1]) * 60 + (m[2] ? Number(m[2]) : 0);
}

const pendingRequests = [
  { title: "Recent Request", time: "Last 3 hours ago" },
  { title: "Pending Request", time: "Last 3 hours ago" },
  { title: "Pending Request", time: "Last 3 hours ago" },
] as const;

const softCardClass =
  "rounded-[22px] border border-slate-200/80 bg-white text-foreground shadow-[0_2px_12px_rgba(0,0,0,0.07)]";

const glowAmberClass =
  "rounded-[22px] border border-slate-200/80 bg-white text-foreground shadow-[0_2px_12px_rgba(0,0,0,0.07)]";

const glowEmeraldClass =
  "rounded-[22px] border border-slate-200/80 bg-white text-foreground shadow-[0_2px_12px_rgba(0,0,0,0.07)]";

function EmployeeMovementChart({ metrics }: { metrics: GaugeMetrics }) {
  return (
    <div className="grid h-full grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <GaugeCard title="Employees Spent In" value={metrics.spentInPct} />
      <GaugeCard title="Employees Spent Out" value={metrics.spentOutPct} color="#60a5fa" />
      <GaugeCard title="Average Present" value={metrics.presentPct} color="#34d399" />
      <GaugeCard title="Average Absent" value={metrics.absentPct} color="#f87171" />
    </div>
  );
}

type AttendanceRingProps = {
  presentRatio: number;
  leaveRatio: number;
  lateRatio: number;
};

function AttendanceRing({ presentRatio, leaveRatio, lateRatio }: AttendanceRingProps) {
  const size = 160;
  const center = size / 2;
  const outerRadius = 62;
  const middleRadius = 48;
  const innerRadius = 34;
  const outerCircumference = 2 * Math.PI * outerRadius;
  const middleCircumference = 2 * Math.PI * middleRadius;
  const innerCircumference = 2 * Math.PI * innerRadius;
  const clamp = (n: number) => Math.max(0, Math.min(1, n));
  const presentProgress = clamp(presentRatio);
  const leaveProgress = clamp(leaveRatio);
  const lateProgress = clamp(lateRatio);
  const ringStroke = 8;

  return (
    <div className="relative grid h-[160px] w-[160px] place-items-center">
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full">
        <circle
          cx={center}
          cy={center}
          r={outerRadius}
          fill="none"
          stroke="rgba(148,163,184,0.35)"
          strokeWidth={ringStroke}
        />
        <circle
          cx={center}
          cy={center}
          r={middleRadius}
          fill="none"
          stroke="rgba(148,163,184,0.28)"
          strokeWidth={ringStroke}
        />
        <circle
          cx={center}
          cy={center}
          r={innerRadius}
          fill="none"
          stroke="rgba(148,163,184,0.24)"
          strokeWidth={ringStroke}
        />

        <circle
          cx={center}
          cy={center}
          r={outerRadius}
          fill="none"
          stroke="#0f9f7f"
          strokeWidth={ringStroke}
          strokeLinecap="round"
          strokeDasharray={`${outerCircumference * presentProgress} ${outerCircumference}`}
          strokeDashoffset={outerCircumference * 0.17}
          transform={`rotate(-90 ${center} ${center})`}
        />
        <circle
          cx={center}
          cy={center}
          r={middleRadius}
          fill="none"
          stroke="#e74c3c"
          strokeWidth={ringStroke}
          strokeLinecap="round"
          strokeDasharray={`${middleCircumference * leaveProgress} ${middleCircumference}`}
          strokeDashoffset={middleCircumference * 0.22}
          transform={`rotate(-90 ${center} ${center})`}
        />
        <circle
          cx={center}
          cy={center}
          r={innerRadius}
          fill="none"
          stroke="#f4c542"
          strokeWidth={ringStroke}
          strokeLinecap="round"
          strokeDasharray={`${innerCircumference * lateProgress} ${innerCircumference}`}
          strokeDashoffset={innerCircumference * 0.14}
          transform={`rotate(-90 ${center} ${center})`}
        />
      </svg>

      <div className="absolute inset-[32%] grid place-items-center rounded-full bg-white">
        <svg viewBox="0 0 120 120" className="h-11 w-11" aria-hidden="true">
          <defs>
            <linearGradient id="cursor-beam" x1="0.5" y1="0.18" x2="0.5" y2="1">
              <stop offset="0%" stopColor="rgba(15,100,82,0.35)" />
              <stop offset="100%" stopColor="rgba(15,100,82,0)" />
            </linearGradient>
          </defs>
          <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(148,163,184,0.34)" strokeWidth={5} />
          <circle
            cx="60"
            cy="60"
            r="36"
            fill="none"
            stroke="rgba(148,163,184,0.26)"
            strokeWidth={3}
            strokeDasharray="5 5"
          />
          <g className="attendance-cursor-float">
            <path d="M60 42 L40 80 L80 80 Z" fill="url(#cursor-beam)" />
            <path
              d="M60 26 L74 52 L63.5 49.4 L60 59 L56.5 49.4 L46 52 Z"
              fill="#ffffff"
              stroke="#0f172a"
              strokeWidth={1.6}
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Dot({ color }: { color: string }) {
  return <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />;
}

function formatPercent(value: number): string {
  if (!Number.isFinite(value)) return "0%";
  return `${Math.round(value * 100)}%`;
}

function useTodayMetrics() {
  const { employees } = useEmployees();
  const [summaries, setSummaries] = useState<AttendanceSummaryItem[]>([]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      const today = todayIsoDate();
      try {
        const data = await getAttendanceLogs({
          start: today,
          end: today,
          limit: 500,
        });
        if (!active) return;
        setSummaries(data.items);
      } catch (err) {
        console.error("Failed to load today's attendance", err);
      }
    };
    load();
    const id = window.setInterval(load, OVERVIEW_POLL_MS);
    return () => {
      active = false;
      window.clearInterval(id);
    };
  }, []);

  return useMemo(() => {
    const totalEmployees = employees.length;

    // One summary row per (name, date); name may be a capture name not identical
    // to the employee's full name, so match via the shared matcher.
    const todayDate = todayIsoDate();
    const rowsToday = summaries.filter((s) => s.date === todayDate);

    const matchedEmployeeIds = new Set<string>();
    let lateCount = 0;
    let totalMinutes = 0;
    let minuteSampleCount = 0;
    for (const row of rowsToday) {
      const match = employees.find((e) => matchesEmployeeName(row.name, e.name));
      if (match) matchedEmployeeIds.add(match.employeeId);
      if (row.status === "Late") lateCount += 1;
      const mins = parseHoursToMinutes(row.total_hours);
      if (mins > 0) {
        totalMinutes += mins;
        minuteSampleCount += 1;
      }
    }
    const presentCount = matchedEmployeeIds.size;
    const leaveCount = Math.max(0, totalEmployees - presentCount);

    const ratio = (n: number) =>
      totalEmployees > 0 ? n / totalEmployees : 0;

    const avgMinutesOnSite = minuteSampleCount > 0 ? totalMinutes / minuteSampleCount : 0;
    const spentInPct = Math.max(0, Math.min(100, (avgMinutesOnSite / WORKDAY_MINUTES) * 100));
    const spentOutPct = Math.max(0, 100 - spentInPct);

    return {
      totalEmployees,
      presentCount,
      lateCount,
      leaveCount,
      presentRatio: ratio(presentCount),
      leaveRatio: ratio(leaveCount),
      lateRatio: ratio(lateCount),
      spentInPct,
      spentOutPct,
      presentPct: ratio(presentCount) * 100,
      absentPct: ratio(leaveCount) * 100,
    };
  }, [employees, summaries]);
}

type GaugeMetrics = {
  spentInPct: number;
  spentOutPct: number;
  presentPct: number;
  absentPct: number;
};

function GaugeCard({
  title,
  value,
  color = "#10b981",
}: {
  title: string;
  value: number;
  color?: string;
}) {
  const viewW = 200;
  const viewH = 130;
  const cx = viewW / 2;
  const cy = viewH - 10;
  const rOuter = 92;
  const rInner = 70;
  const tickCount = 56;
  const startAngle = -210;
  const endAngle = 30;
  const sweep = endAngle - startAngle;
  const clamped = Math.max(0, Math.min(100, value));
  const activeTicks = Math.round((clamped / 100) * tickCount);
  const gradientId = `gauge-grad-${title.replace(/\s+/g, "-")}`;

  const ticks = Array.from({ length: tickCount }, (_, i) => {
    const angleDeg = startAngle + (sweep * i) / (tickCount - 1);
    const angleRad = (angleDeg * Math.PI) / 180;
    const x1 = cx + rInner * Math.cos(angleRad);
    const y1 = cy + rInner * Math.sin(angleRad);
    const x2 = cx + rOuter * Math.cos(angleRad);
    const y2 = cy + rOuter * Math.sin(angleRad);
    const isActive = i < activeTicks;
    return { x1, y1, x2, y2, isActive, key: i };
  });

  return (
    <div className="flex h-full min-h-0 flex-col rounded-[22px] border border-slate-200/80 bg-white p-4 text-slate-900 shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
      <div className="mb-1 flex items-start justify-between">
        <p className="text-base font-medium tracking-tight text-slate-800">{title}</p>
        <MoreHorizontal className="h-4 w-4 text-slate-500" />
      </div>
      <div className="relative grid flex-1 w-full place-items-center py-2">
        <svg
          viewBox={`0 0 ${viewW} ${viewH}`}
          preserveAspectRatio="xMidYMid meet"
          className="block h-full max-h-[220px] w-full max-w-[260px]"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor={color} stopOpacity="0.55" />
              <stop offset="100%" stopColor={color} stopOpacity="1" />
            </linearGradient>
          </defs>
          {ticks.map((t) => (
            <line
              key={t.key}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke={t.isActive ? `url(#${gradientId})` : "rgba(148,163,184,0.28)"}
              strokeWidth={3}
              strokeLinecap="round"
            />
          ))}
        </svg>
        <div className="absolute bottom-2 flex items-baseline gap-0.5">
          <span className="text-4xl font-bold leading-none tracking-tight text-slate-900">
            {Math.round(value)}
          </span>
          <span className="text-sm font-medium text-slate-500">%</span>
        </div>
      </div>
    </div>
  );
}

function OverviewPage() {
  const metrics = useTodayMetrics();

  return (
    <div className="flex h-full min-h-0 flex-col">
      <section className="mx-auto flex h-full min-h-0 w-full max-w-[1380px] flex-col gap-3">
        <div className="grid flex-none grid-cols-1 gap-3 xl:grid-cols-[1.2fr_1.05fr_1.15fr]">
          <div className="grid gap-2">
            <div className="grid gap-2 md:grid-cols-2">
              <Card className={softCardClass}>
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-0">
                  <CardTitle className="text-base font-medium tracking-tight text-slate-800">Total Employees</CardTitle>
                  <MoreHorizontal className="h-4 w-4 text-slate-500" />
                </CardHeader>
                <CardContent className="flex items-center justify-between pt-0">
                  <div>
                    <p className="text-3xl font-bold tracking-tight text-slate-900">
                      {metrics.totalEmployees.toLocaleString()}
                    </p>
                  </div>
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#e8f5f2]">
                    <Users className="h-4 w-4 text-[#4aa590]" />
                  </div>
                </CardContent>
              </Card>

              <Card className={glowEmeraldClass}>
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-0">
                  <CardTitle className="text-base font-medium tracking-tight text-slate-800">Present Today</CardTitle>
                  <MoreHorizontal className="h-4 w-4 text-slate-500" />
                </CardHeader>
                <CardContent className="flex items-center justify-between pt-0">
                  <div>
                    <p className="text-3xl font-bold tracking-tight text-slate-900">
                      {metrics.presentCount.toLocaleString()}
                    </p>
                    <p className="mt-0.5 text-xs font-semibold text-[#0b936f]">
                      {formatPercent(metrics.presentRatio)}
                    </p>
                  </div>
                  <div className="grid h-9 w-9 place-items-center rounded-full border border-[#c4e8e0] bg-[#e8f5f2]">
                    <Percent className="h-4 w-4 text-[#4aa590]" />
                  </div>
                </CardContent>
              </Card>

              <Card className={softCardClass}>
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-0">
                  <CardTitle className="text-base font-medium tracking-tight text-slate-800">Leave Today</CardTitle>
                  <MoreHorizontal className="h-4 w-4 text-slate-500" />
                </CardHeader>
                <CardContent className="flex items-center justify-between pt-0">
                  <div>
                    <p className="text-3xl font-bold tracking-tight text-slate-900">
                      {metrics.leaveCount.toLocaleString()}
                    </p>
                    <p className="mt-0.5 text-xs font-semibold text-slate-500">
                      {formatPercent(metrics.leaveRatio)}
                    </p>
                  </div>
                  <div className="grid h-9 w-9 place-items-center rounded-full border border-[#c4e8e0] bg-[#e8f5f2]">
                    <CalendarDays className="h-4 w-4 text-[#4aa590]" />
                  </div>
                </CardContent>
              </Card>

              <Card className={softCardClass}>
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-0">
                  <CardTitle className="text-base font-medium tracking-tight text-slate-800">Late Today</CardTitle>
                  <MoreHorizontal className="h-4 w-4 text-slate-500" />
                </CardHeader>
                <CardContent className="flex items-center justify-between pt-0">
                  <div>
                    <p className="text-3xl font-bold tracking-tight text-slate-900">
                      {metrics.lateCount.toLocaleString()}
                    </p>
                    <p className="mt-0.5 text-xs font-semibold text-amber-600">
                      {formatPercent(metrics.lateRatio)}
                    </p>
                  </div>
                  <div className="grid h-9 w-9 place-items-center rounded-full border border-[#c4e8e0] bg-[#e8f5f2]">
                    <Clock3 className="h-4 w-4 text-[#4aa590]" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className={glowAmberClass}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium tracking-tight text-slate-800">Attendance Stats</CardTitle>
              <MoreHorizontal className="h-4 w-4 text-slate-500" />
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex flex-col items-center gap-2 md:flex-row md:items-start md:justify-between">
                <AttendanceRing
                  presentRatio={metrics.presentRatio}
                  leaveRatio={metrics.leaveRatio}
                  lateRatio={metrics.lateRatio}
                />
                <div className="space-y-1.5 pt-0.5 md:pt-1.5">
                  {attendanceSegments.map((item) => {
                    const ratio =
                      item.label === "Present"
                        ? metrics.presentRatio
                        : item.label === "Leave"
                          ? metrics.leaveRatio
                          : metrics.lateRatio;
                    return (
                      <div
                        key={item.label}
                        className="flex items-center gap-2 text-xs font-medium text-slate-700"
                      >
                        <Dot color={item.color} />
                        <span>
                          {item.label} · {formatPercent(ratio)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={softCardClass}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-1.5">
              <CardTitle className="text-base font-medium tracking-tight text-slate-800">Pending Requests</CardTitle>
              <MoreHorizontal className="h-4 w-4 text-slate-500" />
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-3xl font-bold leading-none text-slate-900">3</p>

              <div className="space-y-1.5">
                {pendingRequests.map((request, index) => (
                  <div
                    key={`${request.title}-${index}`}
                    className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-2 py-1.5"
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-800">{request.title}</p>
                      <p className="text-[11px] text-slate-500">{request.time}</p>
                    </div>
                    <span className="rounded-full bg-[#10926f] px-2 py-0.5 text-[11px] font-semibold text-white">
                      Status
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <EmployeeMovementChart metrics={metrics} />
        </div>
      </section>
    </div>
  );
}
