import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { type Employee } from "@/api/dashboardApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const match = trimmed.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/);
  if (!match) return trimmed;
  const [, dd, mm, yyyy] = match;
  return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
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
  const [dobDisplay, setDobDisplay] = useState<string>(formatDobForDisplay(employee.dob));
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setDraft({
      ...employee,
      dob: normalizeDob(employee.dob),
      shift: normalizeShift(employee.shift),
    });
    setDobDisplay(formatDobForDisplay(employee.dob));
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
    const parsedDob = parseDobFromDisplay(dobDisplay);
    if (!isValidDob(parsedDob)) {
      window.alert("Date of Birth must be a valid date in DD-MM-YYYY format.");
      return;
    }
    if (!isValidShift(draft.shift)) {
      window.alert("Shift Timing is invalid — pick a start and end time, with end after start.");
      return;
    }
    onSave({ ...draft, dob: parsedDob, shift: normalizeShift(draft.shift) });
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
      setDraft((prev) => ({ ...prev, imageUrl: value }));
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
          <Input
            placeholder="Image URL (optional)"
            value={draft.imageUrl ?? ""}
            onChange={(e) => setDraft((prev) => ({ ...prev, imageUrl: e.target.value }))}
          />
          <div className="flex flex-wrap items-center gap-3">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageFileChange(e.target.files?.[0] ?? null)}
            />
            {draft.imageUrl ? (
              <>
                <img
                  src={draft.imageUrl}
                  alt={`${draft.name || "Employee"} profile`}
                  className="h-14 w-14 rounded-md border border-slate-300 object-cover"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setDraft((prev) => ({ ...prev, imageUrl: "" }))}
                >
                  Remove
                </Button>
              </>
            ) : (
              <div className="h-14 w-14 rounded-md border border-dashed border-slate-300 bg-slate-50" />
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
          <Input
            inputMode="numeric"
            placeholder="DD-MM-YYYY"
            value={dobDisplay}
            onChange={(e) => setDobDisplay(e.target.value)}
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
    </div>
  );
}
