import { Link, useRouterState } from "@tanstack/react-router";
import {
  FileSearch,
  FileStack,
  FileText,
  Gauge,
  History,
  ListChecks,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { Brand } from "@/components/Brand";
import { cn } from "@/lib/utils";
import { getCurrentUser } from "@/services/authService";

const items = [
  { title: "Dashboard", to: "/dashboard", icon: Gauge },
  { title: "Tenders", to: "/tenders", icon: FileStack },
  { title: "Bids", to: "/analysis/demo-analysis", icon: FileSearch },
  { title: "Documents", to: "/documents", icon: FileText },
  { title: "Compliance", to: "/requirements/gem-2026-001", icon: ListChecks },
  { title: "Reports", to: "/reports", icon: ShieldCheck },
  { title: "Audit Trail", to: "/audit-log", icon: History },
  { title: "Settings", to: "/settings", icon: Settings },
] as const;

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const user = getCurrentUser();

  const isActive = (to: string) => pathname === to || pathname.startsWith(`${to}/`);

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex h-16 items-center border-b border-sidebar-border px-4">
        <Brand size="sm" />
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
        {items.map((item) => {
          const active = isActive(item.to);
          return (
            <Link
              key={item.title}
              to={item.to}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
              )}
            >
              <item.icon className="h-4 w-4" strokeWidth={2} />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 rounded-md px-2 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
            DU
          </div>
          <div className="min-w-0 leading-tight">
            <div className="truncate text-sm font-medium text-foreground">
              {user.roleLabel}
            </div>
            <div className="truncate text-xs text-muted-foreground">{user.name}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
