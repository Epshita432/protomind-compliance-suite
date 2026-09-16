import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { TenderStatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppLayout } from "@/layouts/AppLayout";
import { getTenders } from "@/services/tenderService";
import type { TenderStatus } from "@/types";

export const Route = createFileRoute("/tenders/")({
  head: () => ({
    meta: [
      { title: "Tenders — ProtoMind Compliance Workspace" },
      {
        name: "description",
        content:
          "Search, filter and open government tenders, review bids received and start a compliance analysis.",
      },
      { property: "og:title", content: "Tenders — ProtoMind Compliance Workspace" },
      {
        property: "og:description",
        content: "Search government tenders and start a bid compliance analysis.",
      },
    ],
  }),
  component: TendersPage,
});

function TendersPage() {
  const { data: tenders = [], isLoading } = useQuery({
    queryKey: ["tenders"],
    queryFn: getTenders,
  });
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<TenderStatus | "all">("all");

  const filtered = useMemo(
    () =>
      tenders.filter((t) => {
        const matchesQuery =
          `${t.tenderNumber} ${t.title} ${t.organization}`
            .toLowerCase()
            .indexOf(query.toLowerCase()) !== -1;
        const matchesStatus = status === "all" || t.status === status;
        return matchesQuery && matchesStatus;
      }),
    [tenders, query, status],
  );

  return (
    <AppLayout>
      <PageHeader
        eyebrow="Procurement"
        title="Tenders"
        subtitle="All tenders available for bid compliance analysis."
        actions={
          <Button onClick={() => toast.info("Tender creation is disabled in Demo Mode.")}>
            <Plus className="h-4 w-4" />
            Create Tender
          </Button>
        }
      />

      <div className="card-surface">
        <div className="flex flex-wrap items-center gap-3 border-b border-border px-5 py-4">
          <div className="relative min-w-64 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tender number, title or organization"
              className="h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
            />
          </div>
          <Select
            value={status}
            onValueChange={(v) => setStatus(v as TenderStatus | "all")}
          >
            <SelectTrigger className="w-52">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="under_evaluation">Under Evaluation</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-3 font-medium">Tender Number</th>
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Organization</th>
                <th className="px-5 py-3 font-medium">Submission Date</th>
                <th className="px-5 py-3 font-medium">Bids</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-muted-foreground">
                    Loading tenders…
                  </td>
                </tr>
              )}
              {!isLoading &&
                filtered.map((tender) => (
                  <tr
                    key={tender.id}
                    className="border-b border-border last:border-0 hover:bg-muted/50"
                  >
                    <td className="num whitespace-nowrap px-5 py-3 font-medium text-foreground">
                      {tender.tenderNumber}
                    </td>
                    <td className="px-5 py-3">
                      <Link
                        to="/tenders/$id"
                        params={{ id: tender.id }}
                        className="font-medium text-primary hover:underline"
                      >
                        {tender.title}
                      </Link>
                      <p className="text-xs text-muted-foreground">{tender.category}</p>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">
                      {tender.organization}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-muted-foreground">
                      {tender.submissionDate}
                    </td>
                    <td className="num px-5 py-3 text-foreground">{tender.bidsCount}</td>
                    <td className="px-5 py-3">
                      <TenderStatusBadge status={tender.status} />
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to="/tenders/$id" params={{ id: tender.id }}>
                          View
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to="/analysis/$id" params={{ id: "demo-analysis" }}>
                          Analyze
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild className="ml-1">
                        <Link to="/tenders/$id/upload" params={{ id: tender.id }}>
                          Upload Bid
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              {!isLoading && filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-muted-foreground">
                    No tenders match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
