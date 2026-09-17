import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Bot, Cpu, UserRound } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { AppLayout } from "@/layouts/AppLayout";
import { getAuditLog } from "@/services/analysisService";

export const Route = createFileRoute("/audit-log")({
  head: () => ({
    meta: [
      { title: "Audit Trail — ProtoMind" },
      {
        name: "description",
        content:
          "Chronological, tamper-evident record of every upload, extraction, rule evaluation and report generation event.",
      },
      { property: "og:title", content: "Audit Trail — ProtoMind" },
      {
        property: "og:description",
        content: "Chronological record of every compliance action in the workspace.",
      },
    ],
  }),
  component: AuditLogPage,
});

function actorIcon(actor: string) {
  if (actor === "AI Engine") return Bot;
  if (actor === "System") return Cpu;
  return UserRound;
}

function AuditLogPage() {
  const { data: events = [] } = useQuery({ queryKey: ["audit-log"], queryFn: getAuditLog });

  return (
    <AppLayout>
      <PageHeader
        eyebrow="Accountability"
        title="Audit Trail"
        subtitle="Every action on tender GEM-2026-001 recorded in sequence."
      />

      <div className="card-surface p-6">
        <ol className="relative space-y-6 border-l border-border pl-6">
          {events.map((event) => {
            const Icon = actorIcon(event.actor);
            return (
              <li key={event.id} className="relative">
                <span className="absolute -left-[34px] flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card">
                  <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                </span>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="num text-sm font-medium text-foreground">
                    {event.timestamp}
                  </span>
                  <span className="rounded-full border border-border bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
                    {event.actor}
                  </span>
                  <span className="text-xs text-muted-foreground">{event.entity}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-foreground">{event.action}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{event.details}</p>
              </li>
            );
          })}
        </ol>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Audit entries are append-only. In the connected deployment they are persisted by
        the backend with user identity and request context.
      </p>
    </AppLayout>
  );
}
