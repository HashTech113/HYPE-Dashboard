import { createFileRoute } from "@tanstack/react-router";
import { RefreshCw } from "lucide-react";
import { SectionShell } from "@/components/dashboard/SectionShell";
import { Button } from "@/components/ui/button";
import { useDashboardData } from "@/contexts/DashboardDataContext";
import { PresenceTrend } from "@/components/dashboard/widgets/PresenceTrend";
import { DisciplineScore } from "@/components/dashboard/widgets/DisciplineScore";
import { TopAlerts } from "@/components/dashboard/widgets/TopAlerts";
import { RepeatPatterns } from "@/components/dashboard/widgets/RepeatPatterns";
import { WhereToAct } from "@/components/dashboard/widgets/WhereToAct";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_dashboard/")({
  component: DashboardPage,
});

function DashboardPage() {
  const { loading, error, lastUpdated, refresh } = useDashboardData();

  const stampLabel =
    lastUpdated !== null
      ? `Updated ${lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
      : loading
        ? "Loading…"
        : "";

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <SectionShell
        title="Dashboard"
        className="animate-fade-in-up"
        actions={
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {stampLabel && <span>{stampLabel}</span>}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="neu-pill h-9 gap-1.5 border-0 px-4 text-foreground"
              onClick={() => void refresh()}
              disabled={loading}
              title="Refresh dashboard data"
            >
              <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
              Refresh
            </Button>
          </div>
        }
      >
        {error && (
          <div className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Scrollable widget list — negative margins + padding keep the card's
            internal padding consistent while giving the scrollbar room. */}
        <div className="scrollbar-hidden -mx-4 flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 pb-4">
          {/* Row 1 */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <PresenceTrend />
            <DisciplineScore />
          </div>
          {/* Row 2 */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <TopAlerts />
            <RepeatPatterns />
          </div>
          {/* Row 3 */}
          <div className="grid grid-cols-1 gap-4">
            <WhereToAct />
          </div>
        </div>
      </SectionShell>
    </div>
  );
}
