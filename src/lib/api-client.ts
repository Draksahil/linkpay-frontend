/**
 * Central place every service module goes through.
 *
 * Today: NEXT_PUBLIC_USE_MOCKS=true means every service resolves against
 * in-memory mock data (see /lib/mock-data.ts) with a simulated network
 * delay, so the whole UI already works against "real" async data.
 *
 * Later: flip NEXT_PUBLIC_USE_MOCKS=false and each service's live branch
 * (already stubbed below) starts hitting NEXT_PUBLIC_API_BASE_URL instead.
 * No UI component needs to change — they only ever import from /services/*.
 */
export const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS !== "false";
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api/v1";

export interface ApiResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<ApiResult<T>> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) }
    });
    const json = await res.json();
    if (!res.ok) return { success: false, error: json?.error ?? "Request failed" };
    return { success: true, data: json?.data ?? json };
  } catch {
    return { success: false, error: "Network error — is the backend running?" };
  }
}
