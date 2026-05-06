import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export type SearchableSelectOption = {
  value: string;
  label: string;
};

type SearchableSelectProps = {
  value: string;
  options: readonly SearchableSelectOption[];
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  dropdownClassName?: string;
  emptyText?: string;
  clearValue?: string;
  showClear?: boolean;
  disabled?: boolean;
};

export function SearchableSelect({
  value,
  options,
  onValueChange,
  placeholder = "Search...",
  className,
  dropdownClassName,
  emptyText = "No matches found",
  clearValue = "",
  showClear = true,
  disabled = false,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement | null>(null);

  const selectedOption = useMemo(
    () => options.find((opt) => opt.value === value) ?? null,
    [options, value],
  );

  useEffect(() => {
    if (!isEditing) {
      setQuery(selectedOption?.label ?? "");
    }
  }, [isEditing, selectedOption]);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (rootRef.current && target && !rootRef.current.contains(target)) {
        commitByLabel(query);
        closeEditor();
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open, query, options, value]);

  const filteredOptions = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return options;
    return options.filter((opt) => {
      const label = opt.label.toLowerCase();
      const v = opt.value.toLowerCase();
      return label.includes(needle) || v.includes(needle);
    });
  }, [options, query]);

  const commitByLabel = (typed: string) => {
    const needle = typed.trim().toLowerCase();
    if (!needle) return;
    const exact = options.find((opt) => opt.label.toLowerCase() === needle);
    if (exact && exact.value !== value) {
      onValueChange(exact.value);
    }
  };

  const closeEditor = () => {
    setOpen(false);
    setIsEditing(false);
    setQuery(selectedOption?.label ?? "");
  };

  const choose = (nextValue: string) => {
    const next = options.find((opt) => opt.value === nextValue) ?? null;
    onValueChange(nextValue);
    setQuery(next?.label ?? "");
    setOpen(true);
    setIsEditing(true);
  };

  return (
    <div ref={rootRef} className="relative">
      <Input
        value={isEditing ? query : (selectedOption?.label ?? "")}
        placeholder={placeholder}
        disabled={disabled}
        className={cn("pr-7 text-sm", className)}
        onFocus={() => {
          if (disabled) return;
          setIsEditing(true);
          setOpen(true);
          // Open with full options list; filtering begins only when user types.
          setQuery("");
        }}
        onDoubleClick={() => {
          if (disabled) return;
          setIsEditing(true);
          setOpen(true);
          setQuery("");
        }}
        onChange={(e) => {
          setIsEditing(true);
          setQuery(e.target.value);
          setOpen(true);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            setOpen(true);
            return;
          }
          if (e.key === "Escape") {
            e.preventDefault();
            closeEditor();
            return;
          }
          if (e.key === "Enter") {
            e.preventDefault();
            if (filteredOptions.length > 0) {
              choose(filteredOptions[0].value);
            } else {
              closeEditor();
            }
          }
        }}
      />

      {!disabled && showClear && (isEditing ? query.length > 0 : Boolean(value)) ? (
        <button
          type="button"
          aria-label="Clear"
          className="absolute top-1/2 right-2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            onValueChange(clearValue);
            setQuery("");
            setOpen(true);
            setIsEditing(true);
          }}
        >
          ×
        </button>
      ) : null}

      {open ? (
        <div
          className={cn(
            "search-dropdown-scrollbar-hidden absolute z-50 mt-1 max-h-56 w-full overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
            dropdownClassName,
          )}
        >
          {filteredOptions.length === 0 ? (
            <div className="px-2 py-1.5 text-sm text-muted-foreground">{emptyText}</div>
          ) : (
            filteredOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={cn(
                  "block w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground",
                  value === opt.value ? "bg-accent/60" : "",
                )}
                onMouseDown={(e) => {
                  e.preventDefault();
                  choose(opt.value);
                }}
              >
                {opt.label}
              </button>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}
