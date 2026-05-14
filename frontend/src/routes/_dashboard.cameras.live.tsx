import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Expand, MapPin, Minimize, RefreshCw, UserX, Video, VideoOff } from "lucide-react";
import { SectionShell } from "@/components/dashboard/SectionShell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  buildCameraStreamUrl,
  getCameraDetections,
  getCameraStreamToken,
  listCameras,
  type Camera,
  type LiveDetection,
} from "@/api/dashboardApi";

// Admin-only guard lives on the parent layout (_dashboard.cameras.tsx).
export const Route = createFileRoute("/_dashboard/cameras/live")({
  component: LiveCamerasPage,
});

function LiveCamerasPage() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // `silent=true` polls in the background (no spinner flicker), used by the
  // 10s auto-refresh so a freshly-added camera shows up without the operator
  // having to click anything.
  const refresh = async (silent = false) => {
    if (!silent) setLoading(true);
    setError(null);
    try {
      const items = await listCameras();
      setCameras(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load cameras.");
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
    const handle = window.setInterval(() => {
      void refresh(true);
    }, 10_000);
    return () => window.clearInterval(handle);
  }, []);

  const connected = useMemo(
    () => cameras.filter((c) => c.connection_status === "connected"),
    [cameras],
  );

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <SectionShell
        title="Live Cameras"
        icon={<Video className="h-5 w-5 text-primary" />}
        className="animate-fade-in-up"
        actions={
          <Button
            type="button"
            variant="outline"
            onClick={() => void refresh()}
            disabled={loading}
            className="h-9 gap-2 rounded-xl"
          >
            <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
            Refresh
          </Button>
        }
      >
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-6">
          {error ? (
            <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          ) : null}

          {loading && cameras.length === 0 ? (
            <div className="flex flex-1 items-center justify-center text-sm text-slate-500">
              Loading cameras…
            </div>
          ) : connected.length === 0 ? (
            <EmptyState totalCameras={cameras.length} />
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {connected.map((cam) => (
                <CameraTile key={cam.id} camera={cam} />
              ))}
            </div>
          )}
        </div>
      </SectionShell>
    </div>
  );
}

function EmptyState({ totalCameras }: { totalCameras: number }) {
  const noCameras = totalCameras === 0;
  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 px-6 py-14 text-center">
      <VideoOff className="h-10 w-10 text-slate-400" />
      <div className="text-sm font-medium text-slate-700">
        {noCameras ? "Add a camera to view the live feed" : "No connected cameras yet."}
      </div>
      {noCameras ? null : (
        <div className="max-w-md text-xs text-slate-500">
          Once at least one camera reports a successful connection, its live feed will appear
          here.
        </div>
      )}
      <Link
        to="/cameras"
        className="mt-2 inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#4aa590] to-[#2f8f7b] px-4 py-2 text-xs font-semibold text-white"
      >
        {noCameras ? "Add Camera" : "Manage cameras"}
      </Link>
    </div>
  );
}

const STREAM_TOKEN_REFRESH_MS = 4 * 60 * 1000; // refresh ~1 min before 5-min expiry
const DETECTIONS_POLL_MS = 1500;

function CameraTile({ camera }: { camera: Camera }) {
  // Each <img> reload triggers a fresh GET; we rotate the token periodically
  // so the MJPEG connection survives well past the 5-min token TTL even if
  // the browser drops and reconnects.
  const [streamUrl, setStreamUrl] = useState<string | null>(null);
  const [streamError, setStreamError] = useState<string | null>(null);
  const [imgFailed, setImgFailed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [detections, setDetections] = useState<LiveDetection[]>([]);
  const [detectionsStale, setDetectionsStale] = useState(false);
  const refreshRef = useRef<number | null>(null);
  const tileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchToken = async () => {
      try {
        const { token } = await getCameraStreamToken(camera.id);
        if (cancelled) return;
        setStreamUrl(buildCameraStreamUrl(camera.id, token));
        setStreamError(null);
        setImgFailed(false);
      } catch (err) {
        if (cancelled) return;
        setStreamError(err instanceof Error ? err.message : "Could not authorize stream.");
      }
    };

    void fetchToken();
    refreshRef.current = window.setInterval(() => void fetchToken(), STREAM_TOKEN_REFRESH_MS);

    return () => {
      cancelled = true;
      if (refreshRef.current !== null) {
        window.clearInterval(refreshRef.current);
        refreshRef.current = null;
      }
    };
  }, [camera.id]);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === tileRef.current);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  // Poll the structured detections endpoint so we can show
  // `name · 74%` chips below the MJPEG. The MJPEG itself already
  // paints the same data onto the frame; this strip surfaces the
  // most recent values as accessible text + a freshness indicator.
  useEffect(() => {
    let cancelled = false;
    const tick = async () => {
      try {
        const out = await getCameraDetections(camera.id);
        if (cancelled) return;
        setDetections(out.detections);
        setDetectionsStale(
          out.age_seconds !== null && out.age_seconds > 5,
        );
      } catch {
        if (cancelled) return;
        setDetections([]);
        setDetectionsStale(true);
      }
    };
    void tick();
    const handle = window.setInterval(() => void tick(), DETECTIONS_POLL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(handle);
    };
  }, [camera.id]);

  const toggleFullscreen = async () => {
    const tile = tileRef.current;
    if (!tile) return;
    try {
      if (document.fullscreenElement === tile) {
        await document.exitFullscreen();
      } else {
        await tile.requestFullscreen();
      }
    } catch {
      // Some browsers block fullscreen requests outside direct user gestures.
    }
  };

  return (
    <div
      ref={tileRef}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="relative aspect-video w-full bg-slate-900">
        {streamError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-xs text-rose-200">
            <VideoOff className="h-8 w-8" />
            {streamError}
          </div>
        ) : streamUrl && !imgFailed ? (
          // The browser opens the multipart MJPEG stream directly via <img>.
          // No password ever lives on the client — only the short-lived
          // stream token in the query string.
          <img
            src={streamUrl}
            alt={`${camera.name} live feed`}
            className="h-full w-full object-cover"
            onError={() => setImgFailed(true)}
          />
        ) : imgFailed ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-xs text-slate-300">
            <VideoOff className="h-8 w-8" />
            Stream unavailable
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-300">
            Connecting…
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-slate-900">{camera.name}</div>
          {camera.location ? (
            <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{camera.location}</span>
            </div>
          ) : null}
        </div>
        <div className="inline-flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            Live
          </span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => void toggleFullscreen()}
            className="h-6 w-6 rounded-full border-slate-200 text-slate-600"
            title={isFullscreen ? "Exit fullscreen" : "View fullscreen"}
            aria-label={isFullscreen ? "Exit fullscreen" : "View fullscreen"}
          >
            {isFullscreen ? <Minimize className="h-3.5 w-3.5" /> : <Expand className="h-3.5 w-3.5" />}
          </Button>
        </div>
      </div>
      <DetectionsStrip detections={detections} stale={detectionsStale} />
    </div>
  );
}

function DetectionsStrip({
  detections,
  stale,
}: {
  detections: LiveDetection[];
  stale: boolean;
}) {
  if (detections.length === 0) {
    return (
      <div className="border-t border-slate-100 px-4 py-2 text-[11px] text-slate-400">
        Waiting for first recognition…
      </div>
    );
  }
  return (
    <div className="flex flex-wrap items-center gap-1.5 border-t border-slate-100 px-4 py-2">
      {detections.slice(0, 6).map((d, i) => (
        <DetectionChip key={`${d.employee_id ?? "u"}-${i}`} detection={d} />
      ))}
      {stale ? (
        <span className="text-[10px] text-slate-400" title="Detection data older than 5s">
          stale
        </span>
      ) : null}
    </div>
  );
}

function DetectionChip({ detection }: { detection: LiveDetection }) {
  const pct = Math.round(Math.max(0, Math.min(1, detection.score)) * 100);
  if (detection.matched) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        {detection.name} · {pct}%
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-medium text-rose-700">
      <UserX className="h-3 w-3" />
      Unknown · {pct}%
    </span>
  );
}
