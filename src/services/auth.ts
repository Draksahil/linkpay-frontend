import { USE_MOCKS, apiFetch } from "@/lib/api-client";
import { sleep } from "@/lib/utils";
import { User } from "@/types";

export interface LoginPayload { email: string; password: string; }
export interface RegisterPayload extends LoginPayload { username: string; }

const MOCK_USER: User = { id: "user_1", email: "alex@example.com", role: "creator", createdAt: "2025-11-02T00:00:00Z" };

export const authService = {
  async login(payload: LoginPayload) {
    if (USE_MOCKS) {
      await sleep(600);
      if (!payload.email || payload.password.length < 6) {
        return { success: false as const, error: "Invalid email or password." };
      }
      return { success: true as const, data: { user: MOCK_USER, accessToken: "mock-access-token" } };
    }
    return apiFetch<{ user: User; accessToken: string }>("/auth/login", { method: "POST", body: JSON.stringify(payload) });
  },
  async register(payload: RegisterPayload) {
    if (USE_MOCKS) {
      await sleep(700);
      return { success: true as const, data: { user: { ...MOCK_USER, email: payload.email }, accessToken: "mock-access-token" } };
    }
    return apiFetch<{ user: User; accessToken: string }>("/auth/register", { method: "POST", body: JSON.stringify(payload) });
  },
  async requestPasswordReset(email: string) {
    if (USE_MOCKS) {
      await sleep(500);
      return { success: true as const, data: { email } };
    }
    return apiFetch("/auth/forgot-password", { method: "POST", body: JSON.stringify({ email }) });
  },
  async me() {
    if (USE_MOCKS) {
      await sleep(300);
      return { success: true as const, data: MOCK_USER };
    }
    return apiFetch<User>("/auth/me");
  }
};
