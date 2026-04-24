import { useMemo } from "react";
import { Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardData } from "@/contexts/DashboardDataContext";
import { buildDisciplineByTeam, type DisciplineStatus } from "@/lib/dashboardData";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<DisciplineStatus, { badge: string; bar: string; label: string }> = {
  Excellent: { badge: "bg-emerald-50 text-emerald-700", bar: "bg-emerald-500", label: "Excellent" },
  Good: { badge: "bg-sky-50 text-sky-700", bar: "bg-sky-500", label: "Good" },
  Average: { badge: "bg-amber-50 text-amber-700", bar: "bg-amber-500", label: "Average" },
  Poor: { badge: "bg-orange-50 text-orange-700", bar: "bg-orange-500", label: "Poor" },
  Critical: { badge: "bg-rose-50 text-rose-700", bar: "bg-rose-500", label: "Critical" },
};

export function DisciplineScore() {
  const { attendance } = useDashboardData();
  const rows = useMemo(() => buildDisciplineByTeam(attendance), [attendance]);

  return (
    <Card className="flex h-full flex-col border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Award className="h-5 w-5" />
        </div>
        <div>
          <CardTitle className="text-base font-semibold">Discipline Score by Team</CardTitle>
          <p className="text-xs text-muted-foreground">Last 30 days</p>
        </div>
      </CardHeader>

      <CardContent className="flex min-h-0 flex-1 flex-col">
        {rows.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">No team data yet.</p>
        ) : (
          <div className="scrollbar-hidden flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pr-1">
            {rows.map((row) => {
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
          </div>
        )}
      </CardContent>
    </Card>
  );
}
