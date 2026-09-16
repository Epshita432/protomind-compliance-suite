import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Building2, Upload } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { RequirementTable } from "@/components/RequirementTable";
import { TenderStatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/layouts/AppLayout";
import { getRequirements, getTender } from "@/services/tenderService";

export const Route = createFileRoute("/tenders/$id/")({
  head: () => ({
    meta: [
      { title: "Tender Details & Requirements — ProtoMind" },
      {
        name: "description",
        content:
          "Review tender details, submission date and the full mandatory requirement schedule used for bid compliance validation.",
      },
      { property: "og:title", content: "Tender Details & Requirements — ProtoMind" },
      {
        property: "og:description",
        content: "Tender details and the mandatory requirement schedule.",
      },
    ],
  }),
  component: TenderDetailPage,
});

function TenderDetailPage() {
  const { id } = Route.useParams();
  const { data: tender, isLoading } = useQuery({
    queryKey: ["tender", id],
    queryFn: () => getTender(id),
  });
  const { data: requirements = [] } = useQuery({
    queryKey: ["requirements", id],
    queryFn: () => getRequirements(id),
  });

  if (isLoading) {
    return (
      <AppLayout>
        <p className="text-sm text-muted-foreground">Loading tender…</p>
      </AppLayout>
    );
  }

  if (!tender) {
    return (
      <AppLayout>
        <PageHeader title="Tender not found" subtitle="This tender does not exist." />
        <Button asChild variant="outline">
          <Link to="/tenders">Back to tenders</Link>
        </Button>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Link
        to="/tenders"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Tenders
      </Link>

      <PageHeader
        eyebrow={tender.tenderNumber}
        title={tender.title}
        subtitle={tender.organization}
        actions={
          <>
            <Button variant="outline" asChild>
              <Link to="/requirements/$id" params={{ id: tender.id }}>
                Requirement schedule
              </Link>
            </Button>
            <Button asChild>
              <Link to="/tenders/$id/upload" params={{ id: tender.id }}>
                <Upload className="h-4 w-4" />
                Upload Bid
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="card-surface p-5">
          <h2 className="text-sm font-semibold text-foreground">Description</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {tender.description}
          </p>
          <dl className="mt-5 grid gap-4 sm:grid-cols-3">
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                Tender Number
              </dt>
              <dd className="num mt-1 text-sm font-medium text-foreground">
                {tender.tenderNumber}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                Estimated Value
              </dt>
              <dd className="mt-1 text-sm font-medium text-foreground">
                {tender.estimatedValue}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                Bids Received
              </dt>
              <dd className="num mt-1 text-sm font-medium text-foreground">
                {tender.bidsCount}
              </dd>
            </div>
          </dl>
        </div>

        <div className="card-surface space-y-4 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Status</span>
            <TenderStatusBadge status={tender.status} />
          </div>
          <div className="flex items-start gap-3 border-t border-border pt-4">
            <CalendarDays className="mt-0.5 h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Submission Date
              </p>
              <p className="text-sm font-medium text-foreground">
                {tender.submissionDate}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 border-t border-border pt-4">
            <Building2 className="mt-0.5 h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Organization
              </p>
              <p className="text-sm font-medium text-foreground">{tender.organization}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="mb-3 text-sm font-semibold text-foreground">Tender Requirements</h2>
        <RequirementTable requirements={requirements} />
      </div>
    </AppLayout>
  );
}
