import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Clock,
  MessageSquare,
  Settings,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import hypeLogo from "@/images/HYPE_logo.png";

const navItems = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "Attendance History", to: "/presence", icon: Clock },
  { label: "Requests & Notifications", to: "/requests", icon: MessageSquare },
  { label: "Settings", to: "/settings", icon: Settings },
] as const;

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="relative h-screen overflow-hidden bg-[#eef3f9]">
      <div className="mx-auto flex h-full max-w-[1680px] flex-col px-3 py-3 md:px-4 md:py-4">
        <header className="relative flex h-[62px] shrink-0 items-center border-b border-slate-200 bg-[#eef3f9] px-3 md:px-4">
          <img
            src={hypeLogo}
            alt="HYPE logo"
            className="-ml-3 h-23 w-23 object-contain"
          />

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
          <div className="relative z-10 flex h-full w-[92px] shrink-0 flex-col items-center">
            <aside className="relative flex min-h-0 w-full flex-1 flex-col items-center rounded-r-[28px] bg-gradient-to-b from-[#69baa7] via-[#4aa590] to-[#2f8f7b] py-5">
            <nav className="relative z-10 mt-2 flex flex-1 flex-col items-center gap-3">
              {navItems.map((item) => {
                const active = location.pathname === item.to;
                const showNotificationDot = item.to === "/requests";

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      "relative grid h-9 w-9 place-items-center rounded-xl transition-all duration-200",
                      active
                        ? "bg-white text-[#3f9382] shadow-[0_10px_20px_rgba(12,70,56,0.22)]"
                        : "text-white/90 hover:bg-white/18 hover:text-white"
                    )}
                    title={item.label}
                  >
                    <item.icon className="h-4 w-4" />
                    {showNotificationDot && !active ? (
                      <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-[#ffe37d]" />
                    ) : null}
                  </Link>
                );
              })}
            </nav>

            <div className="relative z-10 mt-4 w-full px-2 pb-1">
              <button
                type="button"
                className="flex w-full flex-col items-center px-2 py-1.5 text-white/95 transition-colors hover:text-white"
                aria-label="Admin menu"
              >
                <Avatar className="h-8 w-8 bg-slate-50">
                  <AvatarFallback className="bg-slate-50 text-slate-900">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
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
