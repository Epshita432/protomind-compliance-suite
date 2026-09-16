import { requirements, tenders } from "@/data/demoData";
import type { Requirement, Tender } from "@/types";
import { DEMO_MODE, api, mockDelay } from "./api";

export async function getTenders(): Promise<Tender[]> {
  if (DEMO_MODE) return mockDelay(tenders);
  const { data } = await api.get<Tender[]>("/tenders");
  return data;
}

export async function getTender(id: string): Promise<Tender | undefined> {
  if (DEMO_MODE) {
    return mockDelay(tenders.find((t) => t.id === id || t.tenderNumber === id));
  }
  const { data } = await api.get<Tender>(`/tenders/${id}`);
  return data;
}

export async function getRequirements(tenderId: string): Promise<Requirement[]> {
  if (DEMO_MODE) {
    const list = requirements.filter((r) => r.tenderId === tenderId);
    return mockDelay(list.length ? list : requirements);
  }
  const { data } = await api.get<Requirement[]>(`/tenders/${tenderId}/requirements`);
  return data;
}
