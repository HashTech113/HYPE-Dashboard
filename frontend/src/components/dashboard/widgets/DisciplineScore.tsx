import { useMemo } from "react";
import { Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardData } from "@/contexts/DashboardDataContext";
import { buildDisciplineByTeam, type DisciplineStatus } from "@/lib/dashboardData";
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

  return (
    <Card className="flex h-full flex-col">
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
