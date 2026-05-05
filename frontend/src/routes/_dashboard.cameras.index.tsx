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
]);

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

type FormState = {
  name: string;
  location: string;
  ip: string;
  port: string;
  username: string;
  password: string;
  rtsp_path: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  location: "",
  ip: "",
  port: String(DEFAULT_PORT),
  username: "",
  password: "",
  rtsp_path: DEFAULT_RTSP_PATH,
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
                  <TableHead>Status</TableHead>
                  <TableHead>Last Checked</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading && cameras.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-10 text-center text-sm text-slate-500">
                      Loading cameras…
                    </TableCell>
                  </TableRow>
                ) : cameras.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-10 text-center text-sm text-slate-500">
                      No cameras yet. Click <span className="font-medium">Add Camera</span> to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  cameras.map((cam) => (
                    <TableRow key={cam.id}>
                      <TableCell className="font-medium text-slate-900">{cam.name}</TableCell>
                      <TableCell className="text-slate-600">{cam.location || "—"}</TableCell>
                      <TableCell className="text-slate-600">
                        {cam.ip}:{cam.port}
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
            }
          : EMPTY_FORM,
      );
      setError(null);
      setCheck(null);
      setShowPassword(false);
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

  const validate = (): { ok: true; payload: CameraCreatePayload } | { ok: false; reason: string } => {
    const port = Number.parseInt(form.port, 10);
    if (!form.name.trim()) return { ok: false, reason: "Name is required." };
    if (!form.ip.trim()) return { ok: false, reason: "IP is required." };
    if (!Number.isFinite(port) || port < 1 || port > 65535) {
      return { ok: false, reason: "Port must be between 1 and 65535." };
    }
    if (!form.username.trim()) return { ok: false, reason: "Username is required." };
    if (!isEdit && !form.password) return { ok: false, reason: "Password is required." };
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
    if (isEdit && !form.password) {
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

  // Edit mode + no new password = metadata-only update; safe to save without
  // a re-test. Otherwise (add mode, or edit with password change) we require
  // a passing connection check before enabling Save.
  const isMetadataOnlyEdit = isEdit && form.password === "";
  const saveAllowed = isMetadataOnlyEdit || check?.ok === true;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit camera" : "Add camera"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            <Field
              label={isEdit ? "Password (leave blank to keep)" : "Password"}
              required={!isEdit}
            >
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

          {testing ? (
            <div
              role="status"
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-medium text-slate-600"
            >
              <RefreshCw className="h-4 w-4 animate-spin" />
              Verifying camera connection…
            </div>
          ) : check ? (
            <div
              role="status"
              className={cn(
                "rounded-xl border px-3 py-2.5 text-xs font-medium",
                check.ok
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-rose-200 bg-rose-50 text-rose-700",
              )}
            >
              <div className="flex items-center gap-2">
                {check.ok ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                {check.message}
              </div>
              <div className="mt-1 text-[11px] opacity-70">{check.latency_ms} ms</div>
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
                disabled={!saveAllowed || submitting || testing}
                className="h-10 rounded-xl bg-gradient-to-r from-[#4aa590] to-[#2f8f7b] px-5 text-white hover:from-[#3f9382] hover:to-[#256f60] disabled:opacity-60"
              >
                {submitting ? "Saving…" : isEdit ? "Save changes" : "Add camera"}
              </Button>
            </div>
            {!saveAllowed && !submitting && !testing ? (
              <p className="text-right text-[11px] text-slate-500">
                Test the connection successfully before saving.
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
