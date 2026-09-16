import { cn } from "@/lib/utils";
import type { ComplianceStatus, DocumentStatus, RiskLevel, TenderStatus } from "@/types";

const base =
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap";

const dot = "h-1.5 w-1.5 rounded-full";

export function ComplianceBadge({
  status,
  className,
}: {
  status: ComplianceStatus;
  className?: string;
}) {
  const map: Record<ComplianceStatus, { label: string; cls: string; dotCls: string }> = {
    COMPLIANT: {
      label: "Compliant",
      cls: "border-success/25 bg-success-soft text-success",
      dotCls: "bg-success",
    },
    NON_COMPLIANT: {
      label: "Non-Compliant",
      cls: "border-danger/25 bg-danger-soft text-danger",
      dotCls: "bg-danger",
    },
    REVIEW_REQUIRED: {
      label: "Review Required",
      cls: "border-warning/30 bg-warning-soft text-warning-foreground",
      dotCls: "bg-warning",
    },
    PENDING: {
      label: "Pending",
      cls: "border-border bg-muted text-muted-foreground",
      dotCls: "bg-muted-foreground",
    },
  };
  const item = map[status];
  return (
    <span className={cn(base, item.cls, className)}>
      <span className={cn(dot, item.dotCls)} />
      {item.label}
    </span>
  );
}

export function RiskBadge({ risk, className }: { risk: RiskLevel; className?: string }) {
  const map: Record<RiskLevel, string> = {
    Low: "border-success/25 bg-success-soft text-success",
    Medium: "border-warning/30 bg-warning-soft text-warning-foreground",
    High: "border-danger/25 bg-danger-soft text-danger",
  };
  return <span className={cn(base, map[risk], className)}>{risk} risk</span>;
}

export function TenderStatusBadge({ status }: { status: TenderStatus }) {
  const map: Record<TenderStatus, { label: string; cls: string }> = {
    open: { label: "Open", cls: "border-info/25 bg-info-soft text-info" },
    under_evaluation: {
      label: "Under Evaluation",
      cls: "border-warning/30 bg-warning-soft text-warning-foreground",
    },
    closed: { label: "Closed", cls: "border-border bg-muted text-muted-foreground" },
    draft: { label: "Draft", cls: "border-border bg-secondary text-secondary-foreground" },
  };
  return <span className={cn(base, map[status].cls)}>{map[status].label}</span>;
}

export function DocumentStatusBadge({ status }: { status: DocumentStatus }) {
  const map: Record<DocumentStatus, string> = {
    Uploaded: "border-border bg-secondary text-secondary-foreground",
    Processing: "border-info/25 bg-info-soft text-info",
    Extracting: "border-info/25 bg-info-soft text-info",
    Completed: "border-success/25 bg-success-soft text-success",
    Failed: "border-danger/25 bg-danger-soft text-danger",
  };
  return <span className={cn(base, map[status])}>{status}</span>;
}
