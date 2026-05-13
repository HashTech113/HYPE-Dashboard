import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, ImagePlus, ScanFace, Trash2, Video } from "lucide-react";

import {
  type Employee,
  type FaceImage,
  addFaceImage,
  captureFaceFromCamera,
  deleteFaceImage,
  enrollFaceImages,
  getFaceImages,
  getRecognitionWorkersHealth,
  type RecognitionWorkersHealthResponse,
} from "@/api/dashboardApi";
import { useEmployees } from "@/contexts/EmployeesContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SearchableSelect } from "@/components/ui/searchable-select";
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

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const value = typeof reader.result === "string" ? reader.result : "";
      if (!value) {
        reject(new Error("Could not read file"));
        return;
      }
      resolve(value);
    };
    reader.onerror = () => reject(new Error("Failed to read the selected image"));
    reader.readAsDataURL(file);
  });
}

export function FaceTrainingPanel() {
  const { employees } = useEmployees();
  const [selectedId, setSelectedId] = useState<string>("");
  const [label, setLabel] = useState<string>("");
  const [images, setImages] = useState<FaceImage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<FaceImage | null>(null);
  const [deletingBusy, setDeletingBusy] = useState<boolean>(false);
  const [trainingBusy, setTrainingBusy] = useState<boolean>(false);
  const [capturingBusy, setCapturingBusy] = useState<boolean>(false);
  const [workerStatus, setWorkerStatus] = useState<RecognitionWorkersHealthResponse | null>(null);
  const [workerError, setWorkerError] = useState<string | null>(null);
  const [selectedCameraId, setSelectedCameraId] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    if (successTimerRef.current) clearTimeout(successTimerRef.current);
    successTimerRef.current = setTimeout(() => setSuccessMessage(null), 3000);
  };
  useEffect(
    () => () => {
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
    },
    [],
  );

  const employeeOptions = useMemo(
    () =>
      employees
        .map((e: Employee) => ({
          value: e.id,
          label: `${e.name}${e.employeeId ? ` (${e.employeeId})` : ""}${
            e.company ? ` — ${e.company}` : ""
          }`,
        }))
        .sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: "base" })),
    [employees],
  );

  const selectedEmployee = useMemo(
    () => employees.find((e) => e.id === selectedId) ?? null,
    [employees, selectedId],
  );
  const cameraOptions = useMemo(
    () =>
      (workerStatus?.workers ?? [])
        .filter((w) => w.running)
        .map((w) => ({
          value: w.cameraId,
          label: `${w.name}${w.connected ? "" : " (disconnected)"}`,
        }))
        .sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: "base" })),
    [workerStatus],
  );

  const loadImages = useCallback(async (employeeId: string) => {
    setLoading(true);
    setLoadError(null);
    try {
      const list = await getFaceImages(employeeId);
      setImages(list);
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : "Failed to load face images");
      setImages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadWorkerStatus = useCallback(async () => {
    try {
      const status = await getRecognitionWorkersHealth();
      setWorkerStatus(status);
      setWorkerError(null);
    } catch (error) {
      setWorkerError(error instanceof Error ? error.message : "Failed to load camera worker status");
      setWorkerStatus(null);
    }
  }, []);

  useEffect(() => {
    if (selectedId) {
      void loadImages(selectedId);
    } else {
      setImages([]);
    }
  }, [selectedId, loadImages]);

  useEffect(() => {
    void loadWorkerStatus();
    const handle = window.setInterval(() => {
      void loadWorkerStatus();
    }, 10_000);
    return () => window.clearInterval(handle);
  }, [loadWorkerStatus]);

  useEffect(() => {
    if (!cameraOptions.some((opt) => opt.value === selectedCameraId)) {
      setSelectedCameraId(cameraOptions[0]?.value ?? "");
    }
  }, [cameraOptions, selectedCameraId]);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    if (!selectedId) {
      window.alert("Pick an employee first.");
      return;
    }
    setUploading(true);
    let added = 0;
    let failed = 0;
    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) {
          failed += 1;
          continue;
        }
        try {
          const dataUrl = await readFileAsDataUrl(file);
          const created = await addFaceImage(selectedId, dataUrl, label.trim());
          setImages((prev) => [created, ...prev]);
          added += 1;
        } catch (error) {
          failed += 1;
          console.error("face image upload failed", error);
        }
      }
      if (added > 0) {
        showSuccess(
          `Uploaded ${added} image${added === 1 ? "" : "s"}` +
            (failed > 0 ? ` (${failed} failed)` : ""),
        );
      } else if (failed > 0) {
        window.alert(`All ${failed} upload(s) failed.`);
      }
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleting) return;
    setDeletingBusy(true);
    try {
      await deleteFaceImage(deleting.id);
      const removed = deleting;
      setImages((prev) => prev.filter((img) => img.id !== removed.id));
      showSuccess("Image deleted.");
      setDeleting(null);
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Delete failed");
    } finally {
      setDeletingBusy(false);
    }
  };

  const handleTrain = async () => {
    if (!selectedId) return;
    setTrainingBusy(true);
    try {
      const summary = await enrollFaceImages(selectedId);
      setImages(summary.items);
      showSuccess(
        `Training finished: ${summary.accepted} accepted, ${summary.rejected} rejected.`,
      );
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Training failed");
    } finally {
      setTrainingBusy(false);
    }
  };

  const handleCaptureFromCamera = async () => {
    if (!selectedId || !selectedCameraId) return;
    setCapturingBusy(true);
    try {
      const created = await captureFaceFromCamera(selectedId, {
        cameraId: selectedCameraId,
        label: label.trim(),
      });
      setImages((prev) => [created, ...prev]);
      showSuccess("Captured from live camera and enrolled.");
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Camera capture failed");
    } finally {
      setCapturingBusy(false);
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      {successMessage ? (
        <div
          role="status"
          aria-live="polite"
          className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-sm font-medium text-emerald-700"
        >
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-3 md:grid-cols-[2fr_1fr_auto]">
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Employee
          </Label>
          <SearchableSelect
            value={selectedId}
            options={employeeOptions}
            onValueChange={setSelectedId}
            placeholder="Search by name, ID, or company…"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Label (optional)
          </Label>
          <Input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="front / left / right"
            maxLength={64}
            disabled={!selectedId}
          />
        </div>
        <div className="flex items-end">
          <Button
            type="button"
            disabled={!selectedId || uploading}
            onClick={() => fileInputRef.current?.click()}
            className="h-10 gap-1.5"
          >
            <ImagePlus className="h-4 w-4" />
            {uploading ? "Uploading…" : "Upload images"}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => void handleFiles(e.target.files)}
          />
        </div>
      </div>

      {selectedEmployee ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-600">
          Managing face training set for{" "}
          <span className="font-semibold text-slate-900">{selectedEmployee.name}</span>
          {selectedEmployee.company ? (
            <span> — {selectedEmployee.company}</span>
          ) : null}
          . Currently stored: <span className="font-semibold">{images.length}</span> image
          {images.length === 1 ? "" : "s"}.
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-3.5 py-6 text-center text-sm text-muted-foreground">
          Pick an employee above to view or add their face training images.
        </div>
      )}

      {loadError ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700">
          {loadError}
        </div>
      ) : null}

      <div className="min-h-0 flex-1 overflow-auto">
        {loading ? (
          <div className="py-8 text-center text-sm text-muted-foreground">Loading…</div>
        ) : images.length === 0 && selectedId ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No face images yet. Upload one or more to build a reference set.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {images.map((img) => (
              <div
                key={img.id}
                className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white"
              >
                <img
                  src={img.imageUrl}
                  alt={img.label || "Face training image"}
                  className="h-40 w-full object-cover"
                  loading="lazy"
                />
                <div className="flex items-center justify-between gap-2 px-2.5 py-2 text-xs">
                  <div className="min-w-0">
                    <div className="truncate font-medium text-slate-700">
                      {img.label || "(no label)"}
                    </div>
                    <div className="truncate text-muted-foreground">
                      {new Date(img.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive hover:bg-rose-50 hover:text-destructive"
                    onClick={() => setDeleting(img)}
                    title="Delete image"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-3 rounded-xl border border-slate-200 bg-white px-3.5 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <ScanFace className="h-4 w-4 text-primary" />
            <span>Train embeddings from uploaded images and live camera captures.</span>
          </div>
          <Button
            type="button"
            onClick={() => void handleTrain()}
            disabled={!selectedId || trainingBusy || images.length === 0}
            className="gap-1.5"
          >
            {trainingBusy ? "Training…" : "Train"}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-[2fr_auto]">
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Capture From Live Camera
            </Label>
            <SearchableSelect
              value={selectedCameraId}
              options={cameraOptions}
              onValueChange={setSelectedCameraId}
              placeholder={
                workerStatus?.enabled === false
                  ? "Recognition workers disabled"
                  : "Pick a running camera…"
              }
              disabled={workerStatus?.enabled === false || cameraOptions.length === 0}
            />
          </div>
          <div className="flex items-end">
            <Button
              type="button"
              variant="outline"
              className="h-10 gap-1.5"
              onClick={() => void handleCaptureFromCamera()}
              disabled={!selectedId || !selectedCameraId || capturingBusy}
            >
              <Video className="h-4 w-4" />
              {capturingBusy ? "Capturing…" : "Capture Face"}
            </Button>
          </div>
        </div>

        {workerError ? (
          <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
            {workerError}
          </div>
        ) : workerStatus?.enabled === false ? (
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">
            Recognition workers are disabled on this backend. Enable
            <code className="mx-1">RECOGNITION_WORKERS_ENABLED=1</code>
            to use live camera capture for training.
          </div>
        ) : null}
      </div>

      <AlertDialog
        open={deleting !== null}
        onOpenChange={(open) => {
          if (!open && !deletingBusy) setDeleting(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete face image?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes one image from this employee's face training set.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deletingBusy}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={deletingBusy}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deletingBusy ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
