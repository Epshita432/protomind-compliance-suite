import { documents } from "@/data/demoData";
import type { BidDocument } from "@/types";
import { DEMO_MODE, api, mockDelay } from "./api";

export async function getDocuments(tenderId?: string): Promise<BidDocument[]> {
  if (DEMO_MODE) return mockDelay(documents);
  const { data } = await api.get<BidDocument[]>("/documents", { params: { tenderId } });
  return data;
}

export async function getDocument(id: string): Promise<BidDocument | undefined> {
  if (DEMO_MODE) return mockDelay(documents.find((d) => d.id === id));
  const { data } = await api.get<BidDocument>(`/documents/${id}`);
  return data;
}

export interface UploadPayload {
  tenderId: string;
  files: { name: string; size: number }[];
}

export async function uploadDocuments(payload: UploadPayload): Promise<BidDocument[]> {
  if (DEMO_MODE) {
    const uploaded: BidDocument[] = payload.files.map((file, index) => ({
      id: `upload-${Date.now()}-${index}`,
      fileName: file.name,
      documentType: inferDocumentType(file.name),
      tenderNumber: "GEM-2026-001",
      sizeLabel: formatSize(file.size),
      status: "Uploaded",
      uploadedAt: "Just now",
      confidence: 0,
      pages: 0,
      extractedFields: [],
    }));
    return mockDelay(uploaded, 400);
  }
  const form = new FormData();
  form.append("tenderId", payload.tenderId);
  const { data } = await api.post<BidDocument[]>("/documents/upload", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export function inferDocumentType(fileName: string): string {
  const name = fileName.toLowerCase();
  if (name.includes("gst")) return "Registration Certificate";
  if (name.includes("financial")) return "Audited Financials";
  if (name.includes("experience")) return "Experience Evidence";
  if (name.includes("contract")) return "Contract Evidence";
  if (name.includes("technical")) return "Technical Specification Sheet";
  if (name.includes("declaration")) return "Declaration";
  if (name.includes("registration")) return "Registration Certificate";
  return "Supporting Document";
}

export function formatSize(bytes: number): string {
  if (!bytes) return "—";
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
