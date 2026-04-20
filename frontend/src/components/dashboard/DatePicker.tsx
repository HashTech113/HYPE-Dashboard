import { useEffect, useMemo, useState } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type DatePickerProps = {
  /** ISO date string (YYYY-MM-DD) or empty for no selection. */
  value: string;
  /** Called with a new ISO date string or empty string on clear. */
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

function isoFromDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function dateFromIso(iso: string): Date | undefined {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return undefined;
  const date = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function displayFromIso(iso: string): string {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return "";
  return `${m[3]}-${m[2]}-${m[1]}`;
}

const MIN_YEAR = 1900;
const MAX_YEAR = 2100;

export function DatePicker({
  value,
  onChange,
  placeholder = "DD-MM-YYYY",
  className,
  disabled,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const selectedDate = useMemo(() => dateFromIso(value), [value]);
  const [displayMonth, setDisplayMonth] = useState<Date>(() => selectedDate ?? new Date());
  const [yearText, setYearText] = useState<string>(String(displayMonth.getFullYear()));
  const display = displayFromIso(value);

  useEffect(() => {
    if (selectedDate) setDisplayMonth(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    setYearText(String(displayMonth.getFullYear()));
  }, [displayMonth]);

  const commitYear = () => {
    const y = Number(yearText.trim());
    if (Number.isFinite(y) && y >= MIN_YEAR && y <= MAX_YEAR) {
      setDisplayMonth(new Date(y, displayMonth.getMonth(), 1));
    } else {
      setYearText(String(displayMonth.getFullYear()));
    }
  };

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "inline-flex h-10 items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 text-sm shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
        >
          <span className={cn(display ? "text-foreground" : "text-muted-foreground")}>
            {display || placeholder}
          </span>
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={6}
          className="z-50 rounded-xl border border-slate-200 bg-white p-2 shadow-xl"
        >
          <div className="mb-2 flex items-center justify-end gap-2">
            <label className="text-xs font-medium text-slate-600" htmlFor="date-picker-year">
              Year
            </label>
            <input
              id="date-picker-year"
              type="number"
              inputMode="numeric"
              min={MIN_YEAR}
              max={MAX_YEAR}
              value={yearText}
              onChange={(e) => setYearText(e.target.value)}
              onBlur={commitYear}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  commitYear();
                }
              }}
              className="h-8 w-20 rounded-md border border-input bg-transparent px-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          <DayPicker
            mode="single"
            selected={selectedDate}
            month={displayMonth}
            onMonthChange={setDisplayMonth}
            onSelect={(next) => {
              if (next) {
                onChange(isoFromDate(next));
                setOpen(false);
              } else {
                onChange("");
              }
            }}
            style={
              {
                "--rdp-day-width": "32px",
                "--rdp-day-height": "32px",
                "--rdp-day_button-width": "30px",
                "--rdp-day_button-height": "30px",
                "--rdp-nav-height": "2rem",
                "--rdp-nav_button-width": "1.75rem",
                "--rdp-nav_button-height": "1.75rem",
                fontSize: "0.8rem",
              } as React.CSSProperties
            }
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
