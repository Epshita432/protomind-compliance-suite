import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  FileStack,
  ShieldAlert,
} from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader } from "@/components/PageHeader";
import { ComplianceBadge, RiskBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/layouts/AppLayout";
import { getTenders } from "@/services/tenderService";
import {
  complianceChartData,
  recentAnalyses,
  riskDistributionData,
} from "@/data/demoData";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Procurement Compliance Dashboard — ProtoMind" },
      {
        name: "description",
        content:
          "Monitor tender submissions, compliance findings and bid risk across active government tenders.",
      },
      { property: "og:title", content: "Procurement Compliance Dashboard — ProtoMind" },
      {
        property: "og:description",
        content: "Monitor tender submissions, compliance findings and risk.",
      },
    ],
  }),
  component: DashboardPage,
});

const kpis = [
  { label: "Active Tenders", value: 12, icon: FileStack, tone: "text-info" },
  { label: "Bids Analyzed", value: 48, icon: ClipboardList, tone: "text-info" },
  { label: "Compliant", value: 31, icon: CheckCircle2, tone: "text-success" },
  { label: "Review Required", value: 12, icon: AlertTriangle, tone: "text-warning" },
  { label: "High Risk", value: 5, icon: ShieldAlert, tone: "text-danger" },
];

const pieColors = ["var(--success)", "var(--warning)", "var(--danger)"];

function DashboardPage() {
  const { data: tenders = [] } = useQuery({ queryKey: ["tenders"], queryFn: getTenders });

  return (
    <AppLayout>
      <PageHeader
        eyebrow="Good Morning"
        title="Procurement Compliance Dashboard"
        subtitle="Monitor tender submissions, compliance findings and risk."
        actions={
          <Button asChild>
            <Link to="/tenders">View all tenders</Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="card-surface p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{kpi.label}</p>
              <kpi.icon className={`h-4 w-4 ${kpi.tone}`} />
            </div>
            <p className="num mt-3 text-3xl font-semibold text-foreground">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div className="card-surface p-5">
          <h2 className="text-sm font-semibold text-foreground">Compliance outcomes</h2>
          <p className="text-xs text-muted-foreground">
            Distribution of evaluated bid requirements
          </p>
          <div className="mt-4 h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={complianceChartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={54}
                  outerRadius={82}
                  paddingAngle={2}
                  stroke="var(--card)"
                >
                  {complianceChartData.map((entry, index) => (
                    <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid var(--border)",
                    fontSize: 12,
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-surface p-5">
          <h2 className="text-sm font-semibold text-foreground">
            Risk distribution by requirement category
          </h2>
          <p className="text-xs text-muted-foreground">
            Findings across all analyzed bids
          </p>
          <div className="mt-4 h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskDistributionData} barSize={16}>
                <XAxis
                  dataKey="category"
                  tickLine={false}
                  axisLine={{ stroke: "var(--border)" }}
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                />
                <YAxis
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
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="low" name="Low" stackId="a" fill="var(--success)" />
                <Bar dataKey="medium" name="Medium" stackId="a" fill="var(--warning)" />
                <Bar
                  dataKey="high"
                  name="High"
                  stackId="a"
                  fill="var(--danger)"
                  radius={[3, 3, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card-surface mt-6">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Recent Tender Analyses
            </h2>
            <p className="text-xs text-muted-foreground">
              {tenders.length} tenders tracked in this workspace
            </p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-3 font-medium">Tender</th>
                <th className="px-5 py-3 font-medium">Bidder</th>
                <th className="px-5 py-3 font-medium">Requirements</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Risk</th>
                <th className="px-5 py-3 font-medium">Last Analyzed</th>
                <th className="px-5 py-3 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentAnalyses.map((row) => (
                <tr
                  key={row.analysisId}
                  className="border-b border-border last:border-0 hover:bg-muted/50"
                >
                  <td className="num px-5 py-3 font-medium text-foreground">
                    {row.tenderNumber}
                  </td>
                  <td className="px-5 py-3 text-foreground">{row.bidder}</td>
                  <td className="px-5 py-3 text-muted-foreground">{row.requirements}</td>
                  <td className="px-5 py-3">
                    <ComplianceBadge status={row.status} />
                  </td>
                  <td className="px-5 py-3">
                    <RiskBadge risk={row.risk} />
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{row.lastAnalyzed}</td>
                  <td className="px-5 py-3 text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/analysis/$id" params={{ id: "demo-analysis" }}>
                        View analysis
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
