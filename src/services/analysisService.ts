import { DEMO_ANALYSIS_ID, auditEvents, demoAnalysis } from "@/data/demoData";
import type { Analysis, AuditEvent, ComplianceResult } from "@/types";
import { DEMO_MODE, api, mockDelay } from "./api";

export const PIPELINE_STEPS = [
  "Documents uploaded",
  "Text extracted",
  "OCR completed",
  "Documents classified",
  "Tender requirements identified",
  "Bidder evidence extracted",
  "Requirements matched",
  "Compliance rules evaluated",
  "AI analysis completed",
  "Risk assessment completed",
] as const;

export async function startAnalysis(tenderId: string): Promise<{ analysisId: string }> {
  if (DEMO_MODE) return mockDelay({ analysisId: DEMO_ANALYSIS_ID }, 200);
  const { data } = await api.post<{ analysisId: string }>("/analysis", { tenderId });
  return data;
}

export async function getAnalysis(id: string): Promise<Analysis | undefined> {
  if (DEMO_MODE) return mockDelay(id ? demoAnalysis : undefined);
  const { data } = await api.get<Analysis>(`/analysis/${id}`);
  return data;
}

export async function getRequirementResult(
  analysisId: string,
  requirementCode: string,
): Promise<ComplianceResult | undefined> {
  if (DEMO_MODE) {
    return mockDelay(
      demoAnalysis.results.find(
        (r) => r.requirementCode.toLowerCase() === requirementCode.toLowerCase(),
      ),
    );
  }
  const { data } = await api.get<ComplianceResult>(
    `/analysis/${analysisId}/requirements/${requirementCode}`,
  );
  return data;
}

export async function getAuditLog(): Promise<AuditEvent[]> {
  if (DEMO_MODE) return mockDelay(auditEvents);
  const { data } = await api.get<AuditEvent[]>("/audit-log");
  return data;
}
