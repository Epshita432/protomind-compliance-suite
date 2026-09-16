import axios from "axios";

/**
 * Single axios instance for the whole app.
 *
 * Today every service resolves local mock data (DEMO_MODE = true) so the
 * prototype runs with no backend. When the FastAPI backend exists, set
 * VITE_API_BASE_URL and flip DEMO_MODE to false — the service functions in
 * this folder are the only place that needs to change.
 */
export const API_BASE_URL =
  (import.meta.env["VITE_API_BASE_URL"] as string | undefined) ?? "/api";

export const DEMO_MODE =
  (import.meta.env["VITE_API_BASE_URL"] as string | undefined) === undefined;

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

/** Simulates network latency so loading states are demonstrable. */
export function mockDelay<T>(payload: T, ms = 320): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(payload), ms));
}
