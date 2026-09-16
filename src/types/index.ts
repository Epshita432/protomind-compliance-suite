export type UserRole = "procurement_officer" | "bidder";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleLabel: string;
  organization: string;
}

export type TenderStatus = "open" | "under_evaluation" | "closed" | "draft";

export interface Tender {
  id: string;
  tenderNumber: string;
  title: string;
  organization: string;
  submissionDate: string;
  description: string;
  status: TenderStatus;
  bidsCount: number;
  estimatedValue: string;
  category: string;
}

export type RequirementCategory =
  | "Registration"
  | "Financial"
  | "Experience"
  | "Technical"
  | "Documentation";

export type ValidationType = "Boolean" | "Numeric" | "Count" | "Semantic" | "Date";

export type ComplianceStatus = "COMPLIANT" | "NON_COMPLIANT" | "REVIEW_REQUIRED" | "PENDING";

export type RiskLevel = "Low" | "Medium" | "High";

export interface Requirement {
  id: string;
  tenderId: string;
  code: string;
  text: string;
  shortLabel: string;
  category: RequirementCategory;
  validationType: ValidationType;
  mandatory: boolean;
  status: ComplianceStatus;
}

export type DocumentStatus =
  | "Uploaded"
  | "Processing"
  | "Extracting"
  | "Completed"
  | "Failed";

export interface BidDocument {
  id: string;
  fileName: string;
  documentType: string;
  tenderNumber: string;
  sizeLabel: string;
  status: DocumentStatus;
  uploadedAt: string;
  confidence: number;
  pages: number;
  extractedFields: { label: string; value: string; confidence: number }[];
}

export interface Evidence {
  extractedValue: string;
  requiredValue?: string;
  source: string;
  page: number;
  snippet: string;
}

export interface ComplianceResult {
  id: string;
  analysisId: string;
  requirementCode: string;
  requirementLabel: string;
  requirementText: string;
  result: ComplianceStatus;
  risk: RiskLevel;
  confidence: number;
  ruleApplied: string;
  explanation: string;
  recommendedAction?: string;
  evidence: Evidence;
}

export interface RiskAssessment {
  score: number;
  level: RiskLevel;
  breakdown: { label: string; value: number }[];
}

export interface Analysis {
  id: string;
  tenderId: string;
  tenderNumber: string;
  tenderTitle: string;
  bidder: string;
  analyzedAt: string;
  overallStatus: ComplianceStatus;
  requirementsChecked: number;
  compliant: number;
  nonCompliant: number;
  reviewRequired: number;
  risk: RiskAssessment;
  results: ComplianceResult[];
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  entity: string;
  details: string;
}

export interface ReportSection {
  title: string;
  body: string[];
}

export interface Report {
  id: string;
  analysisId: string;
  tenderNumber: string;
  tenderTitle: string;
  bidder: string;
  analysisDate: string;
  overallStatus: ComplianceStatus;
  riskScore: number;
  sections: ReportSection[];
}

export interface TenderAnalysisSummary {
  analysisId: string;
  tenderNumber: string;
  bidder: string;
  requirements: string;
  status: ComplianceStatus;
  risk: RiskLevel;
  lastAnalyzed: string;
}
