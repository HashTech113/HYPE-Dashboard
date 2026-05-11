import { createFileRoute, redirect } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { RefreshCw, UserX } from "lucide-react";
import { getSnapshotLogs, type SnapshotLogItem } from "@/api/dashboardApi";
import { SectionShell } from "@/components/dashboard/SectionShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatDateDash, formatTime12, parseTimestamp } from "@/lib/dateFormat";
import { getCurrentRole } from "@/lib/auth";

export const Route = createFileRoute("/_dashboard/unknown-faces")({
  beforeLoad: () => {
    if (getCurrentRole() !== "admin") {
      throw redirect({ to: "/home" });
    }
  },
  component: UnknownFacesPage,
});

const POLL_INTERVAL_MS = 5_000;

function UnknownFacesPage() {
  const [items, setItems] = useState<SnapshotLogItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const activeRef = useRef(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchData = useCallback(
    async ({ manual = false }: { manual?: boolean } = {}) => {
      if (manual) setRefreshing(true);
      try {
        // The /api/snapshots `name` filter is a case-insensitive prefix
        // match, so "unknown" pulls back every row the recognizer couldn't
        // resolve to a roster employee.
        const data = await getSnapshotLogs({ name: "unknown" });
        if (!activeRef.current) return;
        setItems(data.items);
        setError(null);
      } catch (err) {
        if (!activeRef.current) return;
        setError(err instanceof Error ? err.message : "Failed to load unknown faces");
      } finally {
        if (activeRef.current) {
          setLoading(false);
          if (manual) setRefreshing(false);
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

  const handleManualRefresh = useCallback(async () => {
    if (refreshing) return;
    await fetchData({ manual: true });
  }, [fetchData, refreshing]);

  const itemCount = items.length;

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <SectionShell
        title="Unknown Faces"
        icon={<UserX className="h-5 w-5 text-primary" />}
        className="animate-fade-in-up"
        actions={
          <div className="flex w-full flex-wrap items-center gap-2 md:w-auto md:gap-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
              </span>
              <span>
                {itemCount} unrecognized{itemCount === 1 ? "" : ""}
              </span>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-10 w-full gap-1.5 px-4 md:w-auto"
              onClick={handleManualRefresh}
              disabled={refreshing}
              title="Refresh unknown captures"
            >
              <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
              {refreshing ? "Refreshing…" : "Refresh"}
            </Button>
          </div>
        }
      >
        <Card className="flex min-h-0 flex-1 flex-col">
          <CardContent className="flex min-h-0 flex-1 flex-col gap-3 pt-4">
            {error && (
              <div className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="show-scrollbar min-h-0 flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <p className="py-16 text-center text-sm text-muted-foreground">
                  {loading
                    ? "Loading unknown captures…"
                    : "No unrecognized faces yet — every recent capture matched a known employee."}
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                  {items.map((item) => (
                    <UnknownFaceTile key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </SectionShell>
    </div>
  );
}

function UnknownFaceTile({ item }: { item: SnapshotLogItem }) {
  const captured = parseTimestamp(item.timestamp);
  return (
    <div className="group overflow-hidden rounded-xl border border-rose-200 bg-slate-900 shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-square w-full overflow-hidden bg-slate-800">
        <img
          src={item.image_url}
          alt="Unknown face"
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-rose-500/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white shadow">
          <UserX className="h-3 w-3" />
          Unknown
        </span>
      </div>
      <div className="flex items-end justify-between gap-2 px-2 py-1.5 text-[11px] font-medium tabular-nums text-rose-100/90">
        <span className="text-rose-50">{captured ? formatDateDash(captured) : "—"}</span>
        <span className="text-rose-200">{captured ? formatTime12(captured) : ""}</span>
      </div>
    </div>
  );
}
