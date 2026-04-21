import { useCallback, useEffect, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { Eye, EyeOff } from "lucide-react";
import { type Employee } from "@/api/dashboardApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/dashboard/DatePicker";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ShiftTimingPicker,
  isValidShift,
  normalizeShift,
} from "@/components/dashboard/ShiftTimingPicker";

export const COMPANY_OPTIONS = [
  "WAWU",
  "CAP",
  "Owlytics",
  "Grow",
  "Perform100x",
  "SIB",
  "career cafe co",
  "CEO2",
  "karu mitra",
  "Legal Quotient",
  "Startup TV",
] as const;

const ISO_DOB_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const DMY_DOB_PATTERN = /^(\d{2})-(\d{2})-(\d{4})$/;

export function normalizeDob(value: string) {
  const trimmed = (value || "").trim();
  if (ISO_DOB_PATTERN.test(trimmed)) return trimmed;
  const dmyMatch = trimmed.match(DMY_DOB_PATTERN);
  if (!dmyMatch) return trimmed;
  const [, dd, mm, yyyy] = dmyMatch;
  return `${yyyy}-${mm}-${dd}`;
}

export function isValidDob(value: string) {
  if (!ISO_DOB_PATTERN.test(value)) return false;
  const [yyyy, mm, dd] = value.split("-").map(Number);
  if (mm < 1 || mm > 12 || dd < 1 || dd > 31) return false;
  const date = new Date(Date.UTC(yyyy, mm - 1, dd));
  return (
    date.getUTCFullYear() === yyyy &&
    date.getUTCMonth() === mm - 1 &&
    date.getUTCDate() === dd
  );
}

/** Storage is `YYYY-MM-DD`. Display/input format is `DD-MM-YYYY`. */
export function formatDobForDisplay(value: string): string {
  const normalized = normalizeDob(value);
  if (!ISO_DOB_PATTERN.test(normalized)) return "";
  const [yyyy, mm, dd] = normalized.split("-");
  return `${dd}-${mm}-${yyyy}`;
}

function parseDobFromDisplay(display: string): string {
  const trimmed = (display || "").trim();
  const match = trimmed.match(DMY_DOB_PATTERN);
  if (!match) return trimmed;
  const [, dd, mm, yyyy] = match;
  return `${yyyy}-${mm}-${dd}`;
}

function formatDobInput(raw: string): string {
  const digitsOnly = (raw || "").replace(/\D/g, "").slice(0, 8);
  const dd = digitsOnly.slice(0, 2);
  const mm = digitsOnly.slice(2, 4);
  const yyyy = digitsOnly.slice(4, 8);
  if (digitsOnly.length <= 2) return dd;
  if (digitsOnly.length <= 4) return `${dd}-${mm}`;
  return `${dd}-${mm}-${yyyy}`;
}

async function getCroppedDataUrl(src: string, crop: Area): Promise<string> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image for cropping"));
    img.src = src;
  });
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(crop.width));
  canvas.height = Math.max(1, Math.round(crop.height));
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable");
  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    canvas.width,
    canvas.height,
  );
  return canvas.toDataURL("image/jpeg", 0.92);
}

type EmployeeFormProps = {
  employee: Employee;
  onSave: (employee: Employee) => void;
  onCancel?: () => void;
  saveLabel?: string;
  showCancel?: boolean;
};

export function EmployeeForm({
  employee,
  onSave,
  onCancel,
  saveLabel = "Save Changes",
  showCancel = false,
}: EmployeeFormProps) {
  const [draft, setDraft] = useState<Employee>({
    ...employee,
    dob: normalizeDob(employee.dob),
    shift: normalizeShift(employee.shift),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [cropSource, setCropSource] = useState<string | null>(null);
  const [cropPosition, setCropPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [cropZoom, setCropZoom] = useState<number>(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [cropSaving, setCropSaving] = useState<boolean>(false);

  const openCropper = useCallback((src: string) => {
    setCropSource(src);
    setCropPosition({ x: 0, y: 0 });
    setCropZoom(1);
    setCroppedArea(null);
  }, []);

  const closeCropper = useCallback(() => {
    setCropSource(null);
    setCroppedArea(null);
    setCropSaving(false);
  }, []);

  const onCropComplete = useCallback((_: Area, pixels: Area) => {
    setCroppedArea(pixels);
  }, []);

  const handleCropSave = useCallback(async () => {
    if (!cropSource || !croppedArea) return;
    try {
      setCropSaving(true);
      const dataUrl = await getCroppedDataUrl(cropSource, croppedArea);
      setDraft((prev) => ({ ...prev, imageUrl: dataUrl }));
      closeCropper();
    } catch (err) {
      window.alert(err instanceof Error ? err.message : "Failed to crop image");
      setCropSaving(false);
    }
  }, [cropSource, croppedArea, closeCropper]);

  useEffect(() => {
    setDraft({
      ...employee,
      dob: normalizeDob(employee.dob),
      shift: normalizeShift(employee.shift),
    });
  }, [employee]);

  const companyOptions = COMPANY_OPTIONS.includes(draft.company as (typeof COMPANY_OPTIONS)[number])
    ? COMPANY_OPTIONS
    : ([draft.company, ...COMPANY_OPTIONS] as readonly string[]);

  const handleSave = () => {
    if (!draft.name.trim()) {
      window.alert("Full Name is required.");
      return;
    }
    if (!draft.employeeId.trim()) {
      window.alert("Employee ID is required.");
      return;
    }
    if (!isValidDob(draft.dob)) {
      window.alert("Date of Birth must be a valid date in DD-MM-YYYY format.");
      return;
    }
    if (!isValidShift(draft.shift)) {
      window.alert("Shift Timing is invalid — pick a start and end time, with end after start.");
      return;
    }
    onSave({ ...draft, dob: normalizeDob(draft.dob), shift: normalizeShift(draft.shift) });
  };

  const handleImageFileChange = (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      window.alert("Please choose a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const value = typeof reader.result === "string" ? reader.result : "";
      if (value) openCropper(value);
    };
    reader.onerror = () => {
      window.alert("Failed to read the selected image.");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Full Name</Label>
          <Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Employee ID</Label>
          <Input value={draft.employeeId} onChange={(e) => setDraft({ ...draft, employeeId: e.target.value })} />
        </div>
        <div className="col-span-2 space-y-2">
          <Label>Employee Image</Label>
          <div className="flex items-center gap-3">
            <Input
              type="file"
              accept="image/*"
              className="min-w-0 flex-1"
              onChange={(e) => handleImageFileChange(e.target.files?.[0] ?? null)}
            />
            {draft.imageUrl ? (
              <>
                <button
                  type="button"
                  onClick={() => draft.imageUrl && openCropper(draft.imageUrl)}
                  className="h-14 w-14 shrink-0 overflow-hidden rounded-md border border-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  title="Crop image"
                >
                  <img
                    src={draft.imageUrl}
                    alt={`${draft.name || "Employee"} profile`}
                    className="h-full w-full object-cover"
                  />
                </button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                  onClick={() => setDraft((prev) => ({ ...prev, imageUrl: "" }))}
                >
                  Remove
                </Button>
              </>
            ) : (
              <div className="h-14 w-14 shrink-0 rounded-md border border-dashed border-slate-300 bg-slate-50" />
            )}
          </div>
        </div>
        <div className="col-span-2 space-y-2">
          <Label>Password</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={draft.password}
              onChange={(e) => setDraft({ ...draft, password: e.target.value })}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Company</Label>
          <Select value={draft.company} onValueChange={(value) => setDraft({ ...draft, company: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select company" />
            </SelectTrigger>
            <SelectContent>
              {companyOptions.map((company) => (
                <SelectItem key={company} value={company}>
                  {company}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Department</Label>
          <Input value={draft.department} onChange={(e) => setDraft({ ...draft, department: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Date of Birth</Label>
          <DatePicker
            value={normalizeDob(draft.dob)}
            onChange={(next) => setDraft({ ...draft, dob: normalizeDob(next) })}
            minYear={1900}
            maxYear={2100}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label>Role</Label>
          <Select
            value={draft.role}
            onValueChange={(value) => setDraft({ ...draft, role: value as Employee["role"] })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Employee">Employee</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-2 space-y-2">
          <Label>Shift Timing</Label>
          <ShiftTimingPicker
            value={draft.shift}
            onChange={(nextShift) => setDraft({ ...draft, shift: nextShift })}
          />
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        {showCancel && onCancel ? (
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
        <Button onClick={handleSave}>{saveLabel}</Button>
      </div>

      <Dialog
        open={cropSource !== null}
        onOpenChange={(open) => {
          if (!open) closeCropper();
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Crop Image</DialogTitle>
          </DialogHeader>
          {cropSource ? (
            <div className="space-y-3">
              <div className="relative h-64 w-full overflow-hidden rounded-lg bg-slate-900">
                <Cropper
                  image={cropSource}
                  crop={cropPosition}
                  zoom={cropZoom}
                  aspect={1}
                  cropShape="round"
                  showGrid={false}
                  onCropChange={setCropPosition}
                  onZoomChange={setCropZoom}
                  onCropComplete={onCropComplete}
                />
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-xs font-medium text-slate-600">Zoom</Label>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.01}
                  value={cropZoom}
                  onChange={(e) => setCropZoom(Number(e.target.value))}
                  className="flex-1 accent-primary"
                />
              </div>
            </div>
          ) : null}
          <DialogFooter>
            <Button variant="outline" onClick={closeCropper} disabled={cropSaving}>
              Cancel
            </Button>
            <Button onClick={handleCropSave} disabled={!croppedArea || cropSaving}>
              {cropSaving ? "Saving…" : "Save Crop"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
