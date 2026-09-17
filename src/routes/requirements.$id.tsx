import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { RequirementTable } from "@/components/RequirementTable";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/layouts/AppLayout";
import { getRequirements, getTender } from "@/services/tenderService";

export const Route = createFileRoute("/requirements/$id")({
  head: () => ({
    meta: [
      { title: "Requirement Schedule — ProtoMind" },
      {
        name: "description",
        content:
          "Mandatory tender requirements with category, validation type and current compliance status.",
      },
      { property: "og:title", content: "Requirement Schedule — ProtoMind" },
      {
        property: "og:description",
        content: "Mandatory tender requirements and their validation rules.",
      },
    ],
  }),
  component: RequirementsPage,
});

function RequirementsPage() {
  const { id } = Route.useParams();
  const { data: tender } = useQuery({ queryKey: ["tender", id], queryFn: () => getTender(id) });
  const { data: requirements = [] } = useQuery({
    queryKey: ["requirements", id],
    queryFn: () => getRequirements(id),
  });

  const categories = Array.from(new Set(requirements.map((r) => r.category)));

  return (
    <AppLayout>
      <PageHeader
        eyebrow={tender?.tenderNumber ?? "Compliance"}
        title="Requirement Schedule"
        subtitle={
          tender
            ? `${requirements.length} mandatory requirements for ${tender.title}`
            : "Mandatory tender requirements"
        }
        actions={
          <Button variant="outline" asChild>
            <Link to="/analysis/$id" params={{ id: "demo-analysis" }}>
              View analysis results
            </Link>
          </Button>
        }
      />

      <div className="mb-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {categories.map((category) => {
          const items = requirements.filter((r) => r.category === category);
          return (
            <div key={category} className="card-surface p-4">
              <p className="text-sm text-muted-foreground">{category}</p>
              <p className="num mt-2 text-2xl font-semibold text-foreground">
                {items.length}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {items.filter((i) => i.status === "COMPLIANT").length} compliant
              </p>
            </div>
          );
        })}
      </div>

      <RequirementTable requirements={requirements} />

      <p className="mt-4 text-xs text-muted-foreground">
        Validation types determine how each requirement is checked: Boolean, Numeric,
        Count and Date requirements are evaluated by deterministic rules; Semantic
        requirements are AI-assisted and always surfaced for human review when confidence
        is low.
      </p>
    </AppLayout>
  );
}
