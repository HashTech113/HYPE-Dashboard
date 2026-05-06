import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Settings as SettingsIcon,
  Users,
  CalendarCheck,
  UserCog,
} from "lucide-react";

import { SectionShell } from "@/components/dashboard/SectionShell";
import { cn } from "@/lib/utils";

import { EditEmployeesPanel } from "@/components/dashboard/settings/EditEmployeesPanel";
import { EditAttendancePanel } from "@/components/dashboard/settings/EditAttendancePanel";
import { EditProfilePanel } from "@/components/dashboard/settings/EditProfilePanel";

export const Route = createFileRoute("/_dashboard/settings")({
  component: SettingsPage,
});

type TabId = "employees" | "attendance" | "profile";

const TABS: { id: TabId; label: string; icon: typeof Users }[] = [
  { id: "employees", label: "Edit Employee Management", icon: Users },
  { id: "attendance", label: "Edit Attendance Report", icon: CalendarCheck },
  { id: "profile", label: "Edit Profile", icon: UserCog },
];

function SettingsPage() {
  const [active, setActive] = useState<TabId>("employees");

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <SectionShell
        title="Settings"
        icon={<SettingsIcon className="h-5 w-5 text-primary" />}
        className="animate-fade-in-up"
        contentClassName="flex min-h-0 flex-1 flex-col gap-4 p-4"
      >
        <div
          role="tablist"
          aria-label="Settings sections"
          className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2"
        >
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(tab.id)}
                className={cn(
                  "flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-colors",
                  selected
                    ? "border-[#3f9382] bg-[#eef7f4] text-[#2f8f7b]"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-800",
                )}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {active === "employees" ? <EditEmployeesPanel /> : null}
          {active === "attendance" ? <EditAttendancePanel /> : null}
          {active === "profile" ? <EditProfilePanel /> : null}
        </div>
      </SectionShell>
    </div>
  );
}
