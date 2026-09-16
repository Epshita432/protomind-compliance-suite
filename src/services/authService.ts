import { demoUsers } from "@/data/demoData";
import type { User, UserRole } from "@/types";
import { mockDelay } from "./api";

const STORAGE_KEY = "protomind.user";

export async function login(role: UserRole = "procurement_officer"): Promise<User> {
  const user = demoUsers[role]!;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }
  return mockDelay(user, 250);
}

export function logout(): void {
  if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
}

export function getCurrentUser(): User {
  if (typeof window === "undefined") return demoUsers["procurement_officer"]!;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return demoUsers["procurement_officer"]!;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return demoUsers["procurement_officer"]!;
  }
}
