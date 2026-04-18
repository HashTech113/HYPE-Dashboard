import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { RefreshCw, Users } from "lucide-react";
import { getFaceHistory, type FaceHistoryItem } from "@/api/dashboardApi";
import { SectionShell } from "@/components/dashboard/SectionShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export const Route = createFileRoute("/_dashboard/requests")({
  component: LiveCapturesPage,
});

const POLL_INTERVAL_MS = 5_000;
const FETCH_LIMIT = 500;

function formatTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function LiveCapturesPage() {
  const [items, setItems] = useState<FaceHistoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const activeRef = useRef(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchData = useCallback(async ({ manual = false }: { manual?: boolean } = {}) => {
    if (manual) setRefreshing(true);
    try {
      const data = await getFaceHistory({ latest: FETCH_LIMIT });
      if (!activeRef.current) return;
      setItems(data.items);
      setError(null);
    } catch (err) {
      if (!activeRef.current) return;
      setError(err instanceof Error ? err.message : "Failed to load captures");
    } finally {
      if (activeRef.current) {
        setLoading(false);
        if (manual) setRefreshing(false);
      }
    }
  }, []);

  const startPolling = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      fetchData();
    }, POLL_INTERVAL_MS);
  }, [fetchData]);

  useEffect(() => {
    activeRef.current = true;
    fetchData();
    startPolling();
    return () => {
      activeRef.current = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchData, startPolling]);

  const handleManualRefresh = useCallback(async () => {
    if (refreshing) return;
    await fetchData({ manual: true });
    startPolling();
  }, [fetchData, refreshing, startPolling]);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <SectionShell
        title="Live Captures"
        icon={<Users className="h-5 w-5 text-primary" />}
        className="animate-fade-in-up"
        actions={
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>
                {items.length} captures · auto-refresh every {POLL_INTERVAL_MS / 1000}s
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
            <Table className="table-fixed">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[240px] font-semibold text-slate-700">
                    Person Name
                  </TableHead>
                  <TableHead className="w-[120px] font-semibold text-slate-700">
                    Image
                  </TableHead>
                  <TableHead className="w-[220px] font-semibold text-slate-700">
                    Entry Time
                  </TableHead>
                  <TableHead className="w-[220px] font-semibold text-slate-700">
                    Exit Time
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="py-10 text-center text-muted-foreground"
                    >
                      {loading
                        ? "Loading captures…"
                        : "No captures yet. Waiting for the camera."}
                    </TableCell>
                  </TableRow>
                ) : (
                  items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="py-2 align-middle">
                        <span className="font-medium text-foreground">
                          {item.name}
                        </span>
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
                        {formatTime(item.entry)}
                      </TableCell>
                      <TableCell className="py-2 align-middle text-muted-foreground">
                        {formatTime(item.exit)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </SectionShell>
    </div>
  );
}
