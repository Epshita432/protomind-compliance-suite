import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Brand } from "@/components/Brand";
import { Progress } from "@/components/ui/progress";
import { AppLayout } from "@/layouts/AppLayout";
import { PIPELINE_STEPS, startAnalysis } from "@/services/analysisService";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/analyze")({
  validateSearch: (search: Record<string, unknown>) => ({
    tenderId: typeof search["tenderId"] === "string" ? search["tenderId"] : "gem-2026-001",
  }),
  head: () => ({
    meta: [
      { title: "Analyzing Bid — ProtoMind" },
      {
        name: "description",
        content:
          "Extraction, requirement matching, rule validation and risk assessment running on the submitted bid documents.",
      },
      { property: "og:title", content: "Analyzing Bid — ProtoMind" },
      {
        property: "og:description",
        content: "Compliance pipeline running on the submitted bid documents.",
      },
    ],
  }),
  component: AnalyzePage,
});

function AnalyzePage() {
  const { tenderId } = Route.useSearch();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  useEffect(() => {
    void startAnalysis(tenderId);
  }, [tenderId]);

  useEffect(() => {
    if (step >= PIPELINE_STEPS.length) {
      const done = setTimeout(
        () => navigate({ to: "/analysis/$id", params: { id: "demo-analysis" } }),
        700,
      );
      return () => clearTimeout(done);
    }
    const timer = setTimeout(() => setStep((s) => s + 1), 520);
    return () => clearTimeout(timer);
  }, [step, navigate]);

  const percent = Math.round((Math.min(step, PIPELINE_STEPS.length) / PIPELINE_STEPS.length) * 100);

  return (
    <AppLayout>
      <div className="mx-auto max-w-2xl py-6">
        <div className="card-surface p-8">
          <Brand size="sm" />
          <h1 className="mt-6 text-2xl font-semibold text-foreground">Analyzing Bid</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            GEM-2026-001 · ABC Technologies Pvt. Ltd.
          </p>

          <div className="mt-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Pipeline progress</span>
              <span className="num font-medium text-foreground">{percent}%</span>
            </div>
            <Progress value={percent} className="mt-2 h-2" />
          </div>

          <ol className="mt-6 space-y-1">
            {PIPELINE_STEPS.map((label, index) => {
              const done = index < step;
              const active = index === step;
              return (
                <li
                  key={label}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    active && "bg-accent",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full border",
                      done
                        ? "border-success bg-success text-success-foreground"
                        : active
                          ? "border-primary text-primary"
                          : "border-border text-muted-foreground",
                    )}
                  >
                    {done ? (
                      <Check className="h-3 w-3" />
                    ) : active ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : null}
                  </span>
                  <span
                    className={cn(
                      done || active ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {label}
                  </span>
                </li>
              );
            })}
          </ol>

          <p className="mt-6 text-xs text-muted-foreground">
            Demo Mode — a simulated pipeline is shown. The FastAPI backend will stream real
            processing status once connected.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
