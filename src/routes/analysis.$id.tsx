import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ChevronRight, FileText, ShieldAlert } from "lucide-react";
import { useState } from "react";
import {
  Cell,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Bar,
  BarChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader } from "@/components/PageHeader";
import { RequirementDetailPanel } from "@/components/RequirementDetailPanel";
import { ComplianceBadge, RiskBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AppLayout } from "@/layouts/AppLayout";
import { getAnalysis } from "@/services/analysisService";
import type { ComplianceResult } from "@/types";

export const Route = createFileRoute("/analysis/$id")({
  head: () => ({
    meta: [
      { title: "Compliance Analysis — ProtoMind" },
      {
        name: "description",
        content:
          "Explainable, evidence-backed compliance findings and risk assessment for a submitted government tender bid.",
      },
      { property: "og:title", content: "Compliance Analysis — ProtoMind" },
      {
        property: "og:description",
        content: "Evidence-backed compliance findings and risk assessment for a bid.",
      },
    ],
  }),
  component: AnalysisPage,
});

function AnalysisPage() {
  const { id } = Route.useParams();
  const { data: analysis, isLoading } = useQuery({
    queryKey: ["analysis", id],
    queryFn: () => getAnalysis(id),
  });
  const [selected, setSelected] = useState<ComplianceResult | null>(null);

  if (isLoading || !analysis) {
    return (
      <AppLayout>
        <p className="text-sm text-muted-foreground">Loading analysis…</p>
      </AppLayout>
    );
  }

  const cards = [
    { label: "Requirements Checked", value: analysis.requirementsChecked, tone: "text-foreground" },
    { label: "Compliant", value: analysis.compliant, tone: "text-success" },
    { label: "Non-Compliant", value: analysis.nonCompliant, tone: "text-danger" },
    { label: "Review Required", value: analysis.reviewRequired, tone: "text-warning" },
  ];

  const gauge = [{ name: "risk", value: analysis.risk.score, fill: "var(--warning)" }];

  return (
    <AppLayout>
      <PageHeader
        eyebrow={`${analysis.tenderNumber} · ${analysis.bidder}`}
        title="Compliance Analysis"
        subtitle={`Analyzed ${analysis.analyzedAt} · ${analysis.tenderTitle}`}
        actions={
          <>
            <Button variant="outline" asChild>
              <Link to="/requirements/$id" params={{ id: analysis.tenderId }}>
                Requirement schedule
              </Link>
            </Button>
            <Button asChild>
              <Link to="/reports">View compliance report</Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((c) => (
              <div key={c.label} className="card-surface p-4">
                <p className="text-sm text-muted-foreground">{c.label}</p>
                <p className={`num mt-2 text-3xl font-semibold ${c.tone}`}>{c.value}</p>
              </div>
            ))}
          </div>

          <div className="card-surface flex flex-wrap items-center justify-between gap-3 border-l-4 border-l-warning p-5">
            <div className="flex items-start gap-3">
              <ShieldAlert className="mt-0.5 h-5 w-5 text-warning" />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Overall status: REVIEW REQUIRED
                </p>
                <p className="text-sm text-muted-foreground">
                  AI-assisted assessment. Human review required before final procurement
                  action.
                </p>
              </div>
            </div>
            <ComplianceBadge status={analysis.overallStatus} />
          </div>
        </div>

        <div className="card-surface p-5">
          <h2 className="text-sm font-semibold text-foreground">Risk score</h2>
          <div className="relative h-44">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                innerRadius="72%"
                outerRadius="100%"
                data={gauge}
                startAngle={210}
                endAngle={-30}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar background dataKey="value" cornerRadius={8} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="num text-3xl font-semibold text-foreground">
                {analysis.risk.score}
                <span className="text-base text-muted-foreground">/100</span>
              </span>
              <RiskBadge risk={analysis.risk.level} className="mt-1" />
            </div>
          </div>
          <div className="mt-2 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={analysis.risk.breakdown}
                layout="vertical"
                margin={{ left: 8, right: 12 }}
                barSize={12}
              >
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis
                  type="category"
                  dataKey="label"
                  width={92}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                />
                <Tooltip
                  cursor={{ fill: "var(--muted)" }}
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid var(--border)",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {analysis.risk.breakdown.map((item) => (
                    <Cell
                      key={item.label}
                      fill={
                        item.value >= 55
                          ? "var(--danger)"
                          : item.value >= 30
                            ? "var(--warning)"
                            : "var(--success)"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card-surface mt-6">
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-sm font-semibold text-foreground">Requirement results</h2>
          <p className="text-xs text-muted-foreground">
            Select a row to inspect the extracted evidence, rule applied and explanation.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-3 font-medium">Requirement</th>
                <th className="px-5 py-3 font-medium">Result</th>
                <th className="px-5 py-3 font-medium">Risk</th>
                <th className="px-5 py-3 font-medium">Confidence</th>
                <th className="px-5 py-3 font-medium">Evidence</th>
                <th className="px-5 py-3 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {analysis.results.map((result) => (
                <tr
                  key={result.id}
                  onClick={() => setSelected(result)}
                  className="cursor-pointer border-b border-border last:border-0 hover:bg-muted/50"
                >
                  <td className="px-5 py-3">
                    <span className="num mr-2 font-medium text-muted-foreground">
                      {result.requirementCode}
                    </span>
                    <span className="font-medium text-foreground">
                      {result.requirementLabel}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <ComplianceBadge status={result.result} />
                  </td>
                  <td className="px-5 py-3">
                    <RiskBadge risk={result.risk} />
                  </td>
                  <td className="num px-5 py-3 text-foreground">{result.confidence}%</td>
                  <td className="px-5 py-3 text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5" />
                      {result.evidence.source} · p.{result.evidence.page}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected(result);
                      }}
                    >
                      View evidence
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Sheet open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Evidence &amp; explanation</SheetTitle>
            <SheetDescription>
              Traceable finding for {analysis.tenderNumber} — {analysis.bidder}
            </SheetDescription>
          </SheetHeader>
          <div className="px-4 pb-8">
            {selected && <RequirementDetailPanel result={selected} />}
          </div>
        </SheetContent>
      </Sheet>
    </AppLayout>
  );
}
