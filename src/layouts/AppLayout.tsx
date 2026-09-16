import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut, Search } from "lucide-react";
import type { ReactNode } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { logout } from "@/services/authService";

export function AppLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between gap-4 border-b border-border bg-card px-6">
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search tenders, bidders, documents"
                className="h-9 w-80 rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-info/25 bg-info-soft px-2.5 py-0.5 text-xs font-medium text-info">
              <span className="h-1.5 w-1.5 rounded-full bg-info" />
              Demo Mode
            </span>
            <span className="hidden text-xs text-muted-foreground lg:inline">
              AI assists. Rules validate. Human decides.
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                logout();
                navigate({ to: "/login" });
              }}
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden px-6 py-6">{children}</main>
        <footer className="border-t border-border bg-card px-6 py-3 text-xs text-muted-foreground">
          ProtoMind prototype · Demo tender GEM-2026-001 ·{" "}
          <Link to="/audit-log" className="text-primary hover:underline">
            View audit trail
          </Link>
        </footer>
      </div>
    </div>
  );
}
