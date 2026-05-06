import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SHIFT_TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d-([01]\d|2[0-3]):[0-5]\d$/;

export type ShiftTimingPickerProps = {
  /** Stored as `HH:mm-HH:mm` (24-hour). */
  value: string;
  onChange: (next: string) => void;
  startLabel?: string;
  endLabel?: string;
};

export function isValidShift(value: string) {
  if (!SHIFT_TIME_PATTERN.test(value)) return false;
  const [start, end] = value.split("-");
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  return sh * 60 + sm < eh * 60 + em;
}

export function normalizeShift(value: string) {
  return (value || "").replace(/\s+/g, "");
}

function to12Hour(time24: string) {
  if (!/^\d{2}:\d{2}$/.test(time24)) return "--:--";
  const [hourString, minute] = time24.split(":");
  const hour = Number(hourString);
  const suffix = hour >= 12 ? "pm" : "am";
  const hour12 = hour % 12 || 12;
  return `${String(hour12).padStart(2, "0")}:${minute} ${suffix}`;
}

export function formatShiftTo12Hour(value: string) {
  const normalized = normalizeShift(value);
  if (!SHIFT_TIME_PATTERN.test(normalized)) return "";
  const [start, end] = normalized.split("-");
  return `${to12Hour(start)} - ${to12Hour(end)}`;
}

export function ShiftTimingPicker({ value, onChange, startLabel = "Start Time", endLabel = "End Time" }: ShiftTimingPickerProps) {
  const normalized = normalizeShift(value);
  const [startRaw, endRaw] = normalized.includes("-") ? normalized.split("-") : ["", ""];
  const start = /^\d{2}:\d{2}$/.test(startRaw) ? startRaw : "";
  const end = /^\d{2}:\d{2}$/.test(endRaw) ? endRaw : "";

  const updateShift = (nextStart: string, nextEnd: string) => {
    onChange(`${nextStart || "00:00"}-${nextEnd || "00:00"}`);
  };

  const valid = isValidShift(`${start}-${end}`);
  const showInvalid = Boolean(start && end) && !valid;

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-slate-600">{startLabel}</Label>
          <Input
            type="time"
            value={start}
            onChange={(event) => updateShift(event.target.value, end)}
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-slate-600">{endLabel}</Label>
          <Input
            type="time"
            value={end}
            onChange={(event) => updateShift(start, event.target.value)}
          />
        </div>
      </div>
      {showInvalid ? (
        <p className="text-xs text-destructive">End time must be after start time.</p>
      ) : null}
    </div>
  );
}
