import { useMemo } from "react";
import { Award, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardData } from "@/contexts/DashboardDataContext";
import {
  buildDisciplineByTeam,
  buildTopEmployeesByScore,
  type DisciplineStatus,
} from "@/lib/dashboardData";
import { getCurrentCompany, getCurrentRole } from "@/lib/auth";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<DisciplineStatus, { badge: string; bar: string; label: string }> = {
  Outstanding: { badge: "bg-green-50 text-green-700", bar: "bg-green-500", label: "Outstanding" },
  Excellent: { badge: "bg-blue-50 text-blue-700", bar: "bg-blue-500", label: "Excellent" },
  "Very Good": { badge: "bg-orange-50 text-orange-700", bar: "bg-orange-500", label: "Very Good" },
  Good: { badge: "bg-yellow-50 text-yellow-700", bar: "bg-yellow-500", label: "Good" },
  Average: { badge: "bg-slate-100 text-slate-600", bar: "bg-slate-400", label: "Average" },
};

export function DisciplineScore() {
  const { attendance } = useDashboardData();
  const rows = useMemo(() => buildDisciplineByTeam(attendance), [attendance]);
  const isHr = getCurrentRole() === "hr";
  const hrCompany = isHr ? getCurrentCompany() : null;
  const topEmployees = useMemo(
    () => (isHr ? buildTopEmployeesByScore(attendance, 5) : []),
    [attendance, isHr],
  );
  const companyLabel = hrCompany ? hrCompany.toUpperCase() : null;

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex flex-row items-center gap-2 pb-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Award className="h-5 w-5" />
        </div>
        <CardTitle className="text-base font-semibold">
          Discipline Score by Team
          {companyLabel && (
            <span
              className="ml-1.5 font-bold tracking-[0.18em] drop-shadow-[0_1px_0_rgba(80,55,0,0.35)]"
              style={{ color: "#B8860B" }}
            >
              {companyLabel}
            </span>
          )}
        </CardTitle>
        <p className="ml-auto text-xs text-muted-foreground">Last 30 days</p>
      </CardHeader>

      <CardContent className="flex min-h-0 flex-1 flex-col">
        {rows.length === 0 && topEmployees.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">No team data yet.</p>
        ) : (
          <div className="scrollbar-hidden flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pr-1">
            {/* Admin-only: per-team rollup. HR sees only their own company,
                so the team-by-team list is redundant — the team name is
                already in the card title. */}
            {!isHr &&
              rows.map((row) => {
                const style = STATUS_STYLES[row.status];
                return (
                  <div key={row.company} className="space-y-1.5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="truncate text-sm font-medium text-foreground">
                          {row.company}
                        </span>
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide transition-colors",
                            style.badge,
                          )}
                        >
                          {style.label}
                        </span>
                      </div>
                      <span className="text-sm font-semibold tabular-nums text-foreground">
                        {row.score}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={cn("h-full rounded-full transition-all duration-1000", style.bar)}
                        style={{ width: `${Math.max(0, Math.min(100, row.score))}%` }}
                      />
                    </div>
                  </div>
                );
              })}

            {isHr && topEmployees.length > 0 && (
              <div>
                <div className="mb-2 flex items-center gap-1.5">
                  <Trophy className="h-3.5 w-3.5 text-amber-500" />
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Top 5 Employees
                  </p>
                </div>
                <ol className="space-y-4">
                  {topEmployees.map((emp, idx) => {
                    const style = STATUS_STYLES[emp.status];
                    return (
                      <li
                        key={`${emp.company}::${emp.name}`}
                        className="space-y-1.5"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-2">
                            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-slate-100 text-[11px] font-semibold text-slate-700">
                              {idx + 1}
                            </span>
                            <span className="truncate text-sm font-medium text-foreground">
                              {emp.name}
                            </span>
                            <span
                              className={cn(
                                "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide transition-colors",
                                style.badge,
                              )}
                            >
                              {style.label}
                            </span>
                          </div>
                          <span className="text-sm font-semibold tabular-nums text-foreground">
                            {emp.score}
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={cn("h-full rounded-full transition-all duration-1000", style.bar)}
                            style={{ width: `${Math.max(0, Math.min(100, emp.score))}%` }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
