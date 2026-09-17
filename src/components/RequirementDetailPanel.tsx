import { FileText, Info } from "lucide-react";
import { ComplianceBadge, RiskBadge } from "@/components/StatusBadge";
import type { ComplianceResult } from "@/types";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

export function RequirementDetailPanel({ result }: { result: ComplianceResult }) {
  return (
    <div className="space-y-5">
      <div>
        <p className="num text-xs uppercase tracking-[0.12em] text-muted-foreground">
          Requirement {result.requirementCode}
        </p>
        <h3 className="mt-1 text-lg font-semibold text-foreground">
          {result.requirementLabel}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{result.requirementText}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <ComplianceBadge status={result.result} />
        <RiskBadge risk={result.risk} />
        <span className="num inline-flex items-center rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
          Confidence {result.confidence}%
        </span>
      </div>

      <div className="rounded-lg border border-border bg-muted/40 p-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Extracted Value" value={result.evidence.extractedValue} />
          {result.evidence.requiredValue && (
            <Field label="Required" value={result.evidence.requiredValue} />
          )}
          <Field label="Source" value={result.evidence.source} />
          <Field label="Page" value={String(result.evidence.page)} />
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Rule Applied
        </p>
        <p className="num mt-1 rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground">
          {result.ruleApplied}
        </p>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Explanation
        </p>
        <p className="mt-1 text-sm leading-relaxed text-foreground">{result.explanation}</p>
      </div>

      {result.recommendedAction && (
        <div className="flex gap-3 rounded-lg border border-warning/30 bg-warning-soft p-4">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
          <div>
            <p className="text-sm font-medium text-warning-foreground">
              Recommended action
            </p>
            <p className="mt-1 text-sm text-warning-foreground/90">
              {result.recommendedAction}
            </p>
          </div>
        </div>
      )}

      <div className="rounded-lg border border-border p-4">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">
            {result.evidence.source} — page {result.evidence.page}
          </p>
        </div>
        <p className="mt-3 border-l-2 border-primary/40 pl-3 text-sm italic text-muted-foreground">
          “{result.evidence.snippet}”
        </p>
      </div>

      <p className="text-xs text-muted-foreground">
        AI-assisted assessment. Human review required before final procurement action.
      </p>
    </div>
  );
}
