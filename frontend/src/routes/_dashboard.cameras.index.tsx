import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  Camera as CameraIcon,
  CheckCircle2,
  Eye,
  EyeOff,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
  XCircle,
} from "lucide-react";
import { SectionShell } from "@/components/dashboard/SectionShell";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  createCamera,
  deleteCamera,
  listCameras,
  recheckCamera,
  testCameraConnection,
  updateCamera,
  type Camera,
  type CameraCheckResponse,
  type CameraConnectionStatus,
  type CameraCreatePayload,
} from "@/api/dashboardApi";

// Admin-only guard lives on the parent layout (_dashboard.cameras.tsx).
export const Route = createFileRoute("/_dashboard/cameras/")({
  component: CamerasPage,
});

const DEFAULT_RTSP_PATH = "/Streaming/Channels/101";
const DEFAULT_PORT = 554;

// Editing any of these fields invalidates a prior connection-test result —
// name and location don't affect connectivity, so they don't reset it.
const CONNECTION_FIELDS = new Set<keyof FormState>([
  "ip",
  "port",
  "username",
  "password",
  "rtsp_path",
  "rtsp_url_custom",
]);

type CameraBrand = "hikvision" | "cp_plus" | "dahua" | "axis" | "generic";

// Default RTSP path each vendor ships with. Selecting a brand seeds the path
// for the operator; they can still override it before saving. CP Plus IP
// cameras run a Dahua-derived firmware, so they share the same default path.
const BRAND_PRESETS: Record<CameraBrand, { label: string; rtsp_path: string }> = {
  hikvision: { label: "Hikvision", rtsp_path: "/Streaming/Channels/101" },
  cp_plus: { label: "CP Plus", rtsp_path: "/cam/realmonitor?channel=1&subtype=0" },
  dahua: { label: "Dahua", rtsp_path: "/cam/realmonitor?channel=1&subtype=0" },
  axis: { label: "Axis", rtsp_path: "/axis-media/media.amp" },
  generic: { label: "Generic / Other", rtsp_path: "/Streaming/Channels/101" },
};

/** Infer the camera brand from its persisted RTSP path. The DB has no
 * brand column, so on Edit we look at the path the user (or a previous
 * Smart Connect save) wrote and reverse-map it to the dropdown. Falls
 * back to ``hikvision`` for unknown paths — same as the Add-mode default. */
function inferBrandFromRtspPath(rtspPath: string): CameraBrand {
  const p = (rtspPath || "").toLowerCase();
  if (p.includes("realmonitor")) return "cp_plus"; // CP Plus + Dahua share; CP Plus is the common India case
  if (p.includes("streaming/channels")) return "hikvision";
  if (p.includes("axis-media")) return "axis";
  return "hikvision";
}

type ConnectMode = "smart" | "custom";

/** Mask the password and assemble the full RTSP URL preview shown to the
 * operator. Falls back to placeholders for empty fields so the URL is
 * always well-formed. */
function buildRtspUrlDisplay(form: FormState): string {
  const path = form.rtsp_path.startsWith("/") ? form.rtsp_path : `/${form.rtsp_path}`;
  const port = form.port || String(DEFAULT_PORT);
  const username = form.username || "user";
  const host = form.ip || "ip";
  return `rtsp://${username}:****@${host}:${port}${path}`;
}

type ParsedRtsp = {
  username: string;
  password: string;
  ip: string;
  port: number;
  rtsp_path: string;
};

/** Parse a user-supplied RTSP URL into the parts the backend stores.
 * The backend requires both username and password, so a URL without
 * `user:password@` is rejected here.
 *
 * Hand-rolled (no regex) because RTSP credentials commonly contain ``@``
 * or ``:`` (e.g. ``Admin@123``), and a greedy or naive regex split would
 * pick the wrong delimiter and produce a corrupted host/IP. We split on
 * the LAST ``@`` (credentials/host boundary) and the FIRST ``:`` in the
 * credential part (username/password boundary). */
function parseRtspUrl(raw: string): { ok: true; parts: ParsedRtsp } | { ok: false; reason: string } {
  const trimmed = raw.trim();
  if (!trimmed) return { ok: false, reason: "RTSP URL is required." };
  const SCHEME = "rtsp://";
  if (!trimmed.toLowerCase().startsWith(SCHEME)) {
    return { ok: false, reason: "URL must start with rtsp://" };
  }
  const afterScheme = trimmed.slice(SCHEME.length);
  // Split credentials from host on the LAST '@' — that's the credential
  // boundary, even if the password itself contains '@'.
  const atIdx = afterScheme.lastIndexOf("@");
  if (atIdx === -1) {
    return { ok: false, reason: "RTSP URL must include user:password@ before the host." };
  }
  const credPart = afterScheme.slice(0, atIdx);
  const hostPart = afterScheme.slice(atIdx + 1);

  // Username = everything before the FIRST ':' in credPart; password = the rest.
  // Lets passwords contain ':' freely (handful of cameras ship with such defaults).
  const colonIdx = credPart.indexOf(":");
  if (colonIdx === -1) {
    return { ok: false, reason: "Credentials must look like user:password before '@'." };
  }
  // Decode in case the user pasted a pre-encoded URL (e.g. %40 for '@').
  // Wrap in try/catch — malformed sequences should yield a clear error,
  // not an opaque URIError.
  let username: string;
  let password: string;
  try {
    username = decodeURIComponent(credPart.slice(0, colonIdx));
    password = decodeURIComponent(credPart.slice(colonIdx + 1));
  } catch {
    return { ok: false, reason: "Could not decode credentials — check for stray %XX sequences." };
  }
  if (!username || !password) {
    return { ok: false, reason: "Both username and password are required before '@'." };
  }

  // hostPart looks like ip[:port][/path]. Split path off first.
  let hostPortPart = hostPart;
  let path = "/";
  const slashIdx = hostPart.indexOf("/");
  if (slashIdx !== -1) {
    hostPortPart = hostPart.slice(0, slashIdx);
    path = hostPart.slice(slashIdx);
  }
  let ip = hostPortPart;
  let port: number = DEFAULT_PORT;
  const colonInHost = hostPortPart.lastIndexOf(":");
  if (colonInHost !== -1) {
    ip = hostPortPart.slice(0, colonInHost);
    const portStr = hostPortPart.slice(colonInHost + 1);
    const parsedPort = Number.parseInt(portStr, 10);
    if (!Number.isFinite(parsedPort) || parsedPort < 1 || parsedPort > 65535) {
      return { ok: false, reason: "Port must be between 1 and 65535." };
    }
    port = parsedPort;
  }
  if (!ip) {
    return { ok: false, reason: "Host / IP is missing in the URL." };
  }
  return {
    ok: true,
    parts: { username, password, ip, port, rtsp_path: path },
  };
}

type FormState = {
  name: string;
  location: string;
  ip: string;
  port: string;
  username: string;
  password: string;
  rtsp_path: string;
  brand: CameraBrand;
  // Used only in Custom Connect mode — the operator types the full RTSP URL
  // (including credentials) and we parse it into ip/port/username/etc on
  // submit.
  rtsp_url_custom: string;
  // Per-camera operating flags, surfaced as toggles in the form. When the
  // user opens Add Camera fresh, defaults are mode-aware (see switchMode):
  // Custom Connect = both ON (Uniview / Eye Camera flow), Smart Connect =
  // both OFF (CP Plus / Hikvision / Dahua = live-view only by default).
  enable_face_ingest: boolean;
  auto_discovery_enabled: boolean;
  // Direction the camera covers. Drives the attendance state machine:
  // ENTRY → IN / BREAK_IN, EXIT → BREAK_OUT (relabelled to OUT at day-close).
  // Defaults to ENTRY so a freshly added camera behaves like the legacy
  // "every detection is an entry" pipeline.
  type: "ENTRY" | "EXIT";
};

const EMPTY_FORM: FormState = {
  name: "",
  location: "",
  ip: "",
  port: String(DEFAULT_PORT),
  username: "",
  password: "",
  rtsp_path: DEFAULT_RTSP_PATH,
  brand: "hikvision",
  rtsp_url_custom: "",
  enable_face_ingest: false,
  auto_discovery_enabled: false,
  type: "ENTRY",
};

function CamerasPage() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Camera | null>(null);
  const [viewing, setViewing] = useState<Camera | null>(null);
  const [toDelete, setToDelete] = useState<Camera | null>(null);
  const [recheckingId, setRecheckingId] = useState<string | null>(null);

  const refresh = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const items = await listCameras();
      setCameras(items);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Failed to load cameras.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const handleAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const handleEdit = (cam: Camera) => {
    setEditing(cam);
    setFormOpen(true);
  };

  const handleDelete = async () => {
    if (!toDelete) return;
    try {
      await deleteCamera(toDelete.id);
      await refresh();
    } finally {
      setToDelete(null);
    }
  };

  const handleRecheck = async (cam: Camera) => {
    setRecheckingId(cam.id);
    try {
      await recheckCamera(cam.id);
      await refresh();
    } catch {
      // surfaced via the row badge after refresh; nothing else to do
    } finally {
      setRecheckingId(null);
    }
  };

  const handleSaved = async () => {
    setFormOpen(false);
    setEditing(null);
    await refresh();
  };

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <SectionShell
        title="Add Camera"
        icon={<CameraIcon className="h-5 w-5 text-primary" />}
        className="animate-fade-in-up"
        actions={
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => void refresh()}
              className="h-9 gap-2 rounded-xl"
              disabled={loading}
            >
              <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
              Refresh
            </Button>
            <Button
              type="button"
              onClick={handleAdd}
              className="h-9 gap-2 rounded-xl bg-gradient-to-r from-[#4aa590] to-[#2f8f7b] text-white hover:from-[#3f9382] hover:to-[#256f60]"
            >
              <Plus className="h-4 w-4" />
              Add Camera
            </Button>
          </div>
        }
      >
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-6">
          {loadError ? (
            <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {loadError}
            </div>
          ) : null}

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>IP / Port</TableHead>
                  <TableHead>Use Case</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Checked</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading && cameras.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-10 text-center text-sm text-slate-500">
                      Loading cameras…
                    </TableCell>
                  </TableRow>
                ) : cameras.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-10 text-center text-sm text-slate-500">
                      No cameras yet. Click <span className="font-medium">Add Camera</span> to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  cameras.map((cam) => (
                    <TableRow key={cam.id}>
                      <TableCell className="font-medium text-slate-900">
                        <span className="inline-flex flex-wrap items-center gap-1.5">
                          {cam.name}
                          {cam.auto_discovery_enabled ? (
                            <span
                              className="inline-flex items-center rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-sky-700"
                              title={
                                cam.last_discovered_at
                                  ? `Auto-discovery on. Last sweep: ${new Date(
                                      cam.last_discovered_at,
                                    ).toLocaleString()}`
                                  : "Auto-discovery on. No sweep recorded yet."
                              }
                            >
                              Auto-discover
                            </span>
                          ) : null}
                        </span>
                      </TableCell>
                      <TableCell className="text-slate-600">{cam.location || "—"}</TableCell>
                      <TableCell className="text-slate-600">
                        <div>{cam.ip}:{cam.port}</div>
                        {cam.last_known_ip && cam.last_known_ip !== cam.ip ? (
                          <div className="text-[10px] text-slate-400">
                            was {cam.last_known_ip}
                          </div>
                        ) : null}
                      </TableCell>
                      <TableCell>
                        <UseCaseBadge enableFaceIngest={cam.enable_face_ingest} />
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={cam.connection_status} />
                      </TableCell>
                      <TableCell className="text-xs text-slate-500">
                        {cam.last_checked_at ? new Date(cam.last_checked_at).toLocaleString() : "—"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewing(cam)}
                            title="View details"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => void handleRecheck(cam)}
                            title="Re-check connection"
                            disabled={recheckingId === cam.id}
                          >
                            <RefreshCw className={cn("h-4 w-4", recheckingId === cam.id && "animate-spin")} />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(cam)}
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setToDelete(cam)}
                            title="Delete"
                            className="text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </SectionShell>

      <CameraFormDialog
        open={formOpen}
        camera={editing}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditing(null);
        }}
        onSaved={handleSaved}
      />

      <CameraDetailsDialog
        camera={viewing}
        onOpenChange={(open) => !open && setViewing(null)}
      />

      <AlertDialog open={!!toDelete} onOpenChange={(open) => !open && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this camera?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes <span className="font-medium">{toDelete?.name}</span> from the
              dashboard. The camera itself isn't affected.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-rose-600 text-white hover:bg-rose-700"
              onClick={() => void handleDelete()}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function ConnectionStatusBanner({
  testing,
  check,
}: {
  testing: boolean;
  check: CameraCheckResponse | null;
}) {
  // Four discrete states, in priority order:
  //   testing  → ongoing probe (blue, spinner)
  //   ok=true  → camera responded to the RTSP frame read (green, check)
  //   ok=false → camera unreachable / wrong creds / wrong path (red, X)
  //   else     → nothing tried yet (grey, neutral)
  if (testing) {
    return (
      <div className="-mt-1 mb-1 flex items-center gap-2 rounded-xl border border-sky-200 bg-sky-50 px-3 py-2 text-xs font-medium text-sky-700">
        <RefreshCw className="h-3.5 w-3.5 animate-spin" />
        Testing connection…
      </div>
    );
  }
  if (check?.ok === true) {
    return (
      <div className="-mt-1 mb-1 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Connected — ready to save
      </div>
    );
  }
  if (check?.ok === false) {
    return (
      <div className="-mt-1 mb-1 flex flex-col gap-1 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">
        <div className="flex items-center gap-2">
          <XCircle className="h-3.5 w-3.5" />
          Not connected — fix the issue before saving
        </div>
        <div className="pl-5 text-[11px] font-normal text-rose-600/90">
          {check.message}
        </div>
      </div>
    );
  }
  return (
    <div className="-mt-1 mb-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">
      <span className="inline-block h-2 w-2 rounded-full bg-slate-400" />
      Connection not tested — click "Test connection" to verify the camera is reachable
    </div>
  );
}

function UseCaseBadge({ enableFaceIngest }: { enableFaceIngest: boolean }) {
  if (enableFaceIngest) {
    return (
      <span
        className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700"
        title="Used for face-detection / attendance capture."
      >
        Attendance
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
      title="Live RTSP/MJPEG view only — no face events ingested."
    >
      Live View
    </span>
  );
}

function StatusBadge({ status }: { status: CameraConnectionStatus }) {
  if (status === "connected") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Connected
      </span>
    );
  }
  if (status === "failed") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700">
        <XCircle className="h-3.5 w-3.5" />
        Failed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
      Unknown
    </span>
  );
}

type CameraDetailsDialogProps = {
  camera: Camera | null;
  onOpenChange: (open: boolean) => void;
};

function CameraDetailsDialog({ camera, onOpenChange }: CameraDetailsDialogProps) {
  return (
    <Dialog open={!!camera} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>Camera details</DialogTitle>
        </DialogHeader>
        {camera ? (
          <dl className="grid grid-cols-[7rem_1fr] gap-x-3 gap-y-2 text-sm">
            <dt className="text-slate-500">Name</dt>
            <dd className="font-medium text-slate-900">{camera.name}</dd>
            <dt className="text-slate-500">Location</dt>
            <dd className="text-slate-900">{camera.location || "—"}</dd>
            <dt className="text-slate-500">IP</dt>
            <dd className="text-slate-900">{camera.ip}</dd>
            <dt className="text-slate-500">Port</dt>
            <dd className="text-slate-900">{camera.port}</dd>
            <dt className="text-slate-500">Username</dt>
            <dd className="text-slate-900">{camera.username || "—"}</dd>
            <dt className="text-slate-500">Password</dt>
            <dd className="text-slate-400">••••••••</dd>
            <dt className="text-slate-500">RTSP path</dt>
            <dd className="break-all font-mono text-xs text-slate-700">{camera.rtsp_path}</dd>
            <dt className="text-slate-500">RTSP URL</dt>
            <dd className="break-all font-mono text-xs text-slate-700">{camera.rtsp_url_preview}</dd>
            <dt className="text-slate-500">Status</dt>
            <dd>
              <StatusBadge status={camera.connection_status} />
            </dd>
            {camera.last_check_message ? (
              <>
                <dt className="text-slate-500">Last check</dt>
                <dd className="text-xs text-slate-600">{camera.last_check_message}</dd>
              </>
            ) : null}
            <dt className="text-slate-500">Face ingest</dt>
            <dd className="text-xs text-slate-700">
              {camera.enable_face_ingest ? "Enabled" : "Disabled (live view only)"}
            </dd>
            <dt className="text-slate-500">Auto-discovery</dt>
            <dd className="text-xs text-slate-700">
              {camera.auto_discovery_enabled
                ? "On — IP changes are detected automatically"
                : "Off — IP is fixed"}
            </dd>
            {camera.auto_discovery_enabled ? (
              <>
                <dt className="text-slate-500">Last discovered</dt>
                <dd className="text-xs text-slate-600">
                  {camera.last_discovered_at
                    ? new Date(camera.last_discovered_at).toLocaleString()
                    : "—"}
                </dd>
                {camera.last_known_ip && camera.last_known_ip !== camera.ip ? (
                  <>
                    <dt className="text-slate-500">Previous IP</dt>
                    <dd className="text-xs text-slate-600">{camera.last_known_ip}</dd>
                  </>
                ) : null}
              </>
            ) : null}
          </dl>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

type CameraFormDialogProps = {
  open: boolean;
  camera: Camera | null;
  onOpenChange: (open: boolean) => void;
  onSaved: () => void | Promise<void>;
};

function CameraFormDialog({ open, camera, onOpenChange, onSaved }: CameraFormDialogProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [check, setCheck] = useState<CameraCheckResponse | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [testing, setTesting] = useState(false);
  const [mode, setMode] = useState<ConnectMode>("smart");
  const isEdit = camera !== null;

  useEffect(() => {
    if (open) {
      setForm(
        camera
          ? {
              name: camera.name,
              location: camera.location,
              ip: camera.ip,
              port: String(camera.port),
              username: camera.username,
              password: "",
              rtsp_path: camera.rtsp_path,
              // Brand isn't stored in the DB; derive it from the saved
              // RTSP path so the dropdown shows the right vendor on Edit
              // (CP Plus / Dahua → /cam/realmonitor, Hikvision →
              // /Streaming/Channels, etc.).
              brand: inferBrandFromRtspPath(camera.rtsp_path),
              rtsp_url_custom: "",
              // Edit mode preserves the camera's existing flags so a
              // re-open doesn't silently flip face_ingest / auto_discovery.
              enable_face_ingest: camera.enable_face_ingest,
              auto_discovery_enabled: camera.auto_discovery_enabled,
              type: camera.type === "EXIT" ? "EXIT" : "ENTRY",
            }
          : EMPTY_FORM,
      );
      setError(null);
      setCheck(null);
      setShowPassword(false);
      // Edit always lands on Smart Connect — it carries every field
      // already; the operator can switch tabs to re-enter as a URL.
      setMode("smart");
    }
  }, [open, camera]);

  // Any change to the connection-relevant fields invalidates the prior
  // test result. Save stays disabled until the operator runs a fresh
  // "Test connection" against the updated values.
  const updateField = (field: keyof FormState) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (CONNECTION_FIELDS.has(field)) {
      setCheck(null);
    }
  };

  // Brand picker seeds the RTSP path so the operator doesn't have to remember
  // each vendor's URL shape. Switching brand also invalidates the prior test.
  const updateBrand = (brand: CameraBrand) => {
    setForm((prev) => ({
      ...prev,
      brand,
      rtsp_path: BRAND_PRESETS[brand].rtsp_path,
    }));
    setCheck(null);
  };

  const switchMode = (next: ConnectMode) => {
    if (next === mode) return;
    setMode(next);
    setError(null);
    setCheck(null);
    // Mode-aware defaults for NEW cameras only — edits preserve whatever
    // the camera already has. Custom Connect is typically used for Uniview
    // cameras like Eye Camera (face ingest + WiFi/DHCP rediscovery), so
    // both default ON. Smart Connect's brands (CP Plus / Hikvision / Dahua)
    // don't speak the Uniview face-detection API, so both default OFF.
    if (!isEdit) {
      setForm((prev) => ({
        ...prev,
        enable_face_ingest: next === "custom",
        auto_discovery_enabled: next === "custom",
      }));
    }
  };

  const validate = (): { ok: true; payload: CameraCreatePayload } | { ok: false; reason: string } => {
    if (!form.name.trim()) return { ok: false, reason: "Name is required." };
    if (!form.location.trim()) return { ok: false, reason: "Location is required." };

    if (mode === "custom") {
      const parsed = parseRtspUrl(form.rtsp_url_custom);
      if (!parsed.ok) return { ok: false, reason: parsed.reason };
      return {
        ok: true,
        payload: {
          name: form.name.trim(),
          location: form.location.trim(),
          ip: parsed.parts.ip,
          port: parsed.parts.port,
          username: parsed.parts.username,
          password: parsed.parts.password,
          rtsp_path: parsed.parts.rtsp_path,
          enable_face_ingest: form.enable_face_ingest,
          auto_discovery_enabled: form.auto_discovery_enabled,
          type: form.type,
        },
      };
    }

    const port = Number.parseInt(form.port, 10);
    if (!form.ip.trim()) return { ok: false, reason: "IP is required." };
    if (!Number.isFinite(port) || port < 1 || port > 65535) {
      return { ok: false, reason: "Port must be between 1 and 65535." };
    }
    if (!form.username.trim()) return { ok: false, reason: "Username is required." };
    if (!form.password) return { ok: false, reason: "Password is required." };
    if (!form.rtsp_path.trim()) return { ok: false, reason: "RTSP path is required." };
    return {
      ok: true,
      payload: {
        name: form.name.trim(),
        location: form.location.trim(),
        ip: form.ip.trim(),
        port,
        username: form.username.trim(),
        password: form.password,
        rtsp_path: form.rtsp_path.trim(),
        enable_face_ingest: form.enable_face_ingest,
        auto_discovery_enabled: form.auto_discovery_enabled,
      },
    };
  };

  const handleTest = async () => {
    setError(null);
    setCheck(null);
    const validated = validate();
    if (!validated.ok) {
      setError(validated.reason);
      return;
    }
    // In Smart Connect, edit-mode keeps the saved password on the server —
    // we need a freshly-typed one to actually run a check. Custom Connect
    // always carries the password inside the typed URL, so no extra guard.
    if (mode === "smart" && isEdit && !form.password) {
      setError("To test the connection, re-enter the password (it isn't stored on the client).");
      return;
    }
    setTesting(true);
    try {
      const result = await testCameraConnection({
        ip: validated.payload.ip,
        port: validated.payload.port,
        username: validated.payload.username,
        password: validated.payload.password,
        rtsp_path: validated.payload.rtsp_path,
      });
      setCheck(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Connection test failed.");
    } finally {
      setTesting(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const validated = validate();
    if (!validated.ok) {
      setError(validated.reason);
      return;
    }
    setSubmitting(true);
    try {
      if (isEdit && camera) {
        // Empty password = leave existing one untouched (backend semantics).
        const patch: Partial<CameraCreatePayload> = { ...validated.payload };
        if (!form.password) delete patch.password;
        await updateCamera(camera.id, patch);
      } else {
        await createCamera(validated.payload);
      }
      await onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save camera.");
    } finally {
      setSubmitting(false);
    }
  };

  // Save is allowed in any connection state — the backend probes again on
  // create/update and persists ``connection_status`` accordingly. So a
  // not-yet-reachable camera can be added and will simply appear in the list
  // with status "Not Connected", ready for a manual re-check once the
  // network issue is fixed. We still block while a save / test is in
  // flight, and surface a small non-blocking hint if the user is saving
  // without a successful probe.
  const saveBlockedInFlight = submitting || testing;
  const savingWithoutConfirmedProbe = check?.ok !== true;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit camera" : "Add camera"}</DialogTitle>
        </DialogHeader>

        {/* Always-visible connection status. Shows "Not tested" until the
            operator clicks Test connection, then flips to Connected /
            Not connected based on the probe result. Makes it obvious why
            the Add camera button below is enabled or greyed out. */}
        <ConnectionStatusBanner testing={testing} check={check} />

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Two-tab connect mode: Smart wires up host/port/creds and
              auto-builds the RTSP URL; Custom takes a hand-typed RTSP URL
              and parses it into the same backend fields on submit. */}
          <div
            role="tablist"
            aria-label="Connection method"
            className="inline-flex w-full rounded-xl border border-slate-200 bg-slate-50 p-1 text-sm font-medium"
          >
            {(["smart", "custom"] as const).map((m) => (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={mode === m}
                onClick={() => switchMode(m)}
                className={cn(
                  "flex-1 rounded-lg px-3 py-1.5 transition-colors",
                  mode === m
                    ? "bg-white text-[#2f8f7b] shadow-sm"
                    : "text-slate-600 hover:text-slate-900",
                )}
              >
                {m === "smart" ? "Smart Connect" : "Custom Connect"}
              </button>
            ))}
          </div>

          {mode === "smart" ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Camera brand" required className="sm:col-span-2">
                <Select
                  value={form.brand}
                  onValueChange={(value) => updateBrand(value as CameraBrand)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(BRAND_PRESETS).map(([key, { label }]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Camera name" required>
                <Input
                  value={form.name}
                  onChange={(e) => updateField("name")(e.target.value)}
                  placeholder="Reception"
                />
              </Field>
              <Field label="Location" required>
                <Input
                  value={form.location}
                  onChange={(e) => updateField("location")(e.target.value)}
                  placeholder="Floor 1 - Lobby"
                />
              </Field>
              <Field label="Direction" required>
                <Select
                  value={form.type}
                  onValueChange={(v) =>
                    setForm((prev) => ({ ...prev, type: v === "EXIT" ? "EXIT" : "ENTRY" }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Entry / Exit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ENTRY">Entry — IN / Break In</SelectItem>
                    <SelectItem value="EXIT">Exit — Break Out / OUT</SelectItem>
                  </SelectContent>
                </Select>
                <p className="mt-1 text-[11px] text-slate-500">
                  Drives the attendance state machine. Entry cameras start the day; Exit cameras start the break / close it at day-end.
                </p>
              </Field>
              <Field label="Camera IP" required>
                <Input
                  value={form.ip}
                  onChange={(e) => updateField("ip")(e.target.value)}
                  placeholder="172.18.10.12"
                />
              </Field>
              <Field label="Port" required>
                <Input
                  type="number"
                  inputMode="numeric"
                  value={form.port}
                  onChange={(e) => updateField("port")(e.target.value)}
                  placeholder="554"
                />
              </Field>
              <Field label="Username" required>
                <Input
                  value={form.username}
                  onChange={(e) => updateField("username")(e.target.value)}
                  autoComplete="off"
                />
              </Field>
              <Field label="Password" required>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => updateField("password")(e.target.value)}
                    autoComplete="new-password"
                    className="pr-9"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:text-slate-600"
                    onClick={() => setShowPassword((p) => !p)}
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </Field>
              <Field label="RTSP URL" required className="sm:col-span-2">
                <Input
                  value={buildRtspUrlDisplay(form)}
                  readOnly
                  aria-readonly="true"
                  tabIndex={-1}
                  className="cursor-default bg-slate-50 font-mono text-xs"
                />
                <p className="mt-1 text-[11px] text-slate-500">
                  Auto-generated from IP, port, and credentials.
                </p>
              </Field>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Camera name" required>
                <Input
                  value={form.name}
                  onChange={(e) => updateField("name")(e.target.value)}
                  placeholder="Reception"
                />
              </Field>
              <Field label="Location" required>
                <Input
                  value={form.location}
                  onChange={(e) => updateField("location")(e.target.value)}
                  placeholder="Floor 1 - Lobby"
                />
              </Field>
              <Field label="Direction" required className="sm:col-span-2">
                <Select
                  value={form.type}
                  onValueChange={(v) =>
                    setForm((prev) => ({ ...prev, type: v === "EXIT" ? "EXIT" : "ENTRY" }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Entry / Exit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ENTRY">Entry — IN / Break In</SelectItem>
                    <SelectItem value="EXIT">Exit — Break Out / OUT</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="RTSP URL" required className="sm:col-span-2">
                <Input
                  value={form.rtsp_url_custom}
                  onChange={(e) => updateField("rtsp_url_custom")(e.target.value)}
                  placeholder="rtsp://user:password@172.18.10.12:554/Streaming/Channels/101"
                  className="font-mono text-xs"
                  autoComplete="off"
                  spellCheck={false}
                />
                <p className="mt-1 text-[11px] text-slate-500">
                  Paste the full URL including credentials; we'll parse the
                  host, port, and path on save.
                </p>
              </Field>
            </div>
          )}

          {/* The top-level <ConnectionStatusBanner /> already shows
              Testing / Connected / Not connected; here we only show the
              ms latency on a successful probe (useful diagnostic) and any
              transient validation errors from the form. */}
          {check?.ok ? (
            <div className="text-right text-[11px] text-slate-500">
              Probe completed in {check.latency_ms} ms
            </div>
          ) : null}

          {error ? (
            <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-xs font-medium text-rose-700">
              {error}
            </div>
          ) : null}

          {/* Save is gated on a successful Test connection. Edit-mode
              metadata-only changes (no new password typed) bypass the gate
              since they don't touch credentials and re-testing would
              require the operator to re-enter the password unnecessarily. */}
          <DialogFooter className="flex-col items-stretch gap-2 pt-2 sm:flex-col sm:gap-2">
            <div className="flex flex-wrap justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleTest}
                disabled={testing || submitting}
                className="h-10 rounded-xl"
              >
                {testing ? "Testing…" : "Test connection"}
              </Button>
              <Button
                type="submit"
                disabled={saveBlockedInFlight}
                title={
                  savingWithoutConfirmedProbe && !saveBlockedInFlight
                    ? "Camera will be added with 'Not Connected' status; re-check from the cameras list once the connection is fixed."
                    : undefined
                }
                className="h-10 rounded-xl bg-gradient-to-r from-[#4aa590] to-[#2f8f7b] px-5 text-white hover:from-[#3f9382] hover:to-[#256f60] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? "Saving…" : isEdit ? "Save changes" : "Add camera"}
              </Button>
            </div>
            {savingWithoutConfirmedProbe && !saveBlockedInFlight ? (
              <p className="text-right text-[11px] text-slate-500">
                {check?.ok === false
                  ? "You can still add the camera — it will appear in the list with 'Not Connected' status until you re-check it."
                  : "Tip: click 'Test connection' first to verify reachability — or add it now and re-check later."}
              </p>
            ) : null}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

type FieldProps = {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
};

function Field({ label, required, className, children }: FieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label className="text-slate-700">
        {label}
        {required ? <span className="ml-0.5 text-rose-500">*</span> : null}
      </Label>
      {children}
    </div>
  );
}
