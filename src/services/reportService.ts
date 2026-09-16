import { demoReport } from "@/data/demoData";
import type { Report } from "@/types";
import { DEMO_MODE, api, mockDelay } from "./api";

export async function getReport(analysisId: string): Promise<Report> {
  if (DEMO_MODE) return mockDelay({ ...demoReport, analysisId });
  const { data } = await api.get<Report>(`/reports/${analysisId}`);
  return data;
}

/**
 * In demo mode this generates the report client-side and downloads it.
 * With a backend, this hits the FastAPI/ReportLab endpoint and saves the PDF.
 */
export async function downloadReport(analysisId: string): Promise<void> {
  if (DEMO_MODE) {
    const report = await getReport(analysisId);
    const lines: string[] = [
      "PROTOMIND",
      "Tender Compliance Assessment Report",
      "",
      `Report ID:       ${report.id}`,
      `Tender:          ${report.tenderNumber} — ${report.tenderTitle}`,
      `Bidder:          ${report.bidder}`,
      `Analysis Date:   ${report.analysisDate}`,
      `Overall Status:  ${report.overallStatus.replace("_", " ")}`,
      `Risk Score:      ${report.riskScore}/100`,
      "",
    ];
    report.sections.forEach((section) => {
      lines.push(section.title.toUpperCase());
      lines.push("-".repeat(section.title.length));
      section.body.forEach((p) => lines.push(p));
      lines.push("");
    });
    lines.push("AI assists. Rules validate. Human decides.");

    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ProtoMind_Compliance_Report_${report.tenderNumber}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    return;
  }

  const response = await api.get(`/reports/${analysisId}/pdf`, { responseType: "blob" });
  const url = URL.createObjectURL(response.data as Blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `ProtoMind_Compliance_Report_${analysisId}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
