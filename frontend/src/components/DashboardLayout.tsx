import { Link, useLocation } from "@tanstack/react-router";
import { useState, type ComponentType } from "react";
import {
  LayoutDashboard,
  Clock,
  MessageSquare,
  Settings,
  User,
  Users,
  UserCog,
  Menu,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import hypeLogo from "@/images/HYPE_logo.png";

type NavChild = {
  label: string;
  to: string;
  icon: ComponentType<{ className?: string }>;
  search?: Record<string, string>;
};

type NavItem = {
  label: string;
  to: string;
  icon: ComponentType<{ className?: string }>;
  children?: NavChild[];
};

const navItems: NavItem[] = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "Attendance History", to: "/presence", icon: Clock },
  { label: "Requests & Notifications", to: "/requests", icon: MessageSquare },
  {
    label: "Settings",
    to: "/settings",
    icon: Settings,
    children: [
      { label: "Employee Management", to: "/employees", icon: Users },
      { label: "Admin Management", to: "/employees", icon: UserCog, search: { role: "Admin" } },
    ],
  },
];

function isParentActive(item: NavItem, pathname: string): boolean {
  if (pathname === item.to) return true;
  if (!item.children) return false;
  return item.children.some((child) => pathname === child.to);
}

function isChildActive(
  child: NavChild,
  pathname: string,
  searchRole: string | undefined,
): boolean {
  if (pathname !== child.to) return false;
  const expectedRole = child.search?.role;
  if (expectedRole === undefined) {
    return searchRole === undefined || searchRole === "all";
  }
  return searchRole === expectedRole;
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <div className="relative h-screen overflow-hidden bg-[#eef3f9]">
      <div className="mx-auto flex h-full max-w-[1680px] flex-col px-3 py-3 md:px-4 md:py-4">
        <header className="relative flex h-[62px] shrink-0 items-center border-b border-slate-200 bg-[#eef3f9] px-3 md:px-4">
          <button
            type="button"
            onClick={() => setSidebarExpanded((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-700 transition-colors hover:bg-slate-200/60 hover:text-slate-900"
            aria-label={sidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
            title={sidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            <Menu className="h-5 w-5" />
          </button>

          {sidebarExpanded ? (
            <img
              src={hypeLogo}
              alt="HYPE logo"
              className="ml-1 h-23 w-23 object-contain"
            />
          ) : null}

          <p className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-xl font-semibold tracking-wide text-slate-800 md:text-2xl">
            ᴍᴏᴠᴇᴍᴇɴᴛ ɪɴᴛᴇʟʟɪɢᴇɴᴄᴇ ᴘʟᴀᴛꜰᴏʀᴍ
          </p>

          <div className="ml-auto flex items-center gap-1.5 text-slate-700">
            <button
              type="button"
              className="ml-1 flex flex-col items-center px-2 py-1.5 text-slate-700 transition-colors hover:text-slate-900"
              aria-label="Admin menu"
            >
              <div className="grid h-10 w-10 place-items-center rounded-full bg-[#4aa590]">
                <User className="h-5 w-5 text-white" strokeWidth={2.2} />
              </div>
            </button>
          </div>
        </header>

        <div className="flex min-h-0 flex-1 gap-0 pt-3">
          <div
            className={cn(
              "relative z-10 flex h-full shrink-0 flex-col transition-[width] duration-300 ease-out",
              sidebarExpanded ? "w-[248px]" : "w-[92px]",
            )}
          >
            <aside
              className={cn(
                "relative flex min-h-0 w-full flex-1 flex-col rounded-r-[28px] bg-gradient-to-b from-[#69baa7] via-[#4aa590] to-[#2f8f7b] py-5 transition-all duration-300 ease-out",
                sidebarExpanded ? "items-start px-3" : "items-center",
              )}
            >
            <nav
              className={cn(
                "relative z-10 mt-2 flex flex-1 flex-col gap-3",
                sidebarExpanded ? "w-full items-stretch" : "items-center",
              )}
            >
              {navItems.map((item) => {
                const searchRole =
                  typeof (location.search as { role?: string }).role === "string"
                    ? ((location.search as { role?: string }).role as string)
                    : undefined;
                const parentActive = isParentActive(item, location.pathname);
                const selfActive = location.pathname === item.to;
                const showNotificationDot = item.to === "/requests";
                const showChildren = sidebarExpanded && item.children && item.children.length > 0;

                return (
                  <div key={item.to} className={cn(sidebarExpanded ? "w-full" : undefined)}>
                    <Link
                      to={item.to}
                      className={cn(
                        "relative transition-all duration-200",
                        sidebarExpanded
                          ? "flex h-10 w-full items-center gap-3 rounded-xl px-3"
                          : "grid h-9 w-9 place-items-center rounded-xl",
                        (selfActive || (!sidebarExpanded && parentActive))
                          ? "bg-white text-[#3f9382] shadow-[0_10px_20px_rgba(12,70,56,0.22)]"
                          : "text-white/90 hover:bg-white/18 hover:text-white"
                      )}
                      title={item.label}
                    >
                      <item.icon className="h-4 w-4" />
                      <span
                        className={cn(
                          "truncate text-sm font-medium transition-all duration-200",
                          sidebarExpanded
                            ? "max-w-[160px] opacity-100"
                            : "pointer-events-none max-w-0 opacity-0",
                        )}
                      >
                        {item.label}
                      </span>
                      {showNotificationDot && !selfActive ? (
                        <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-[#ffe37d]" />
                      ) : null}
                    </Link>

                    {showChildren ? (
                      <div className="mt-1 flex flex-col gap-1 pl-5">
                        {item.children!.map((child) => {
                          const childActive = isChildActive(child, location.pathname, searchRole);
                          return (
                            <Link
                              key={`${child.to}-${child.search?.role ?? "default"}`}
                              to={child.to}
                              search={child.search}
                              className={cn(
                                "flex h-9 w-full items-center gap-2 rounded-lg px-3 text-sm font-medium transition-colors",
                                childActive
                                  ? "bg-white/90 text-[#3f9382] shadow-sm"
                                  : "text-white/85 hover:bg-white/15 hover:text-white",
                              )}
                              title={child.label}
                            >
                              <child.icon className="h-3.5 w-3.5" />
                              <span className="truncate">{child.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </nav>

            <div className={cn("relative z-10 mt-4 w-full pb-1", sidebarExpanded ? "px-1" : "px-2")}>
              <button
                type="button"
                className={cn(
                  "flex w-full items-center px-2 py-1.5 text-white/95 transition-colors hover:text-white",
                  sidebarExpanded ? "justify-start gap-3" : "flex-col",
                )}
                aria-label="Admin menu"
              >
                <Avatar className="h-8 w-8 bg-slate-50">
                  <AvatarFallback className="bg-slate-50 text-slate-900">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <span
                  className={cn(
                    "truncate text-sm font-medium transition-all duration-200",
                    sidebarExpanded
                      ? "max-w-[130px] opacity-100"
                      : "pointer-events-none max-w-0 opacity-0",
                  )}
                >
                  Admin
                </span>
              </button>
            </div>
          </aside>
          </div>

          <div className="z-10 flex min-w-0 flex-1 flex-col gap-0 overflow-hidden">
          <main className="scrollbar-hidden min-h-0 flex-1 overflow-y-auto bg-[#eef3f9] p-4 md:p-5">
            {children}
          </main>
        </div>
        </div>
      </div>
    </div>
  );
}
