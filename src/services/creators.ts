import { USE_MOCKS, apiFetch } from "@/lib/api-client";
import { mockCreator } from "@/lib/mock-data";
import { sleep } from "@/lib/utils";
import { CreatorProfile } from "@/types";

export const creatorsService = {
  async getByUsername(username: string) {
    if (USE_MOCKS) {
      await sleep(400);
      if (username !== mockCreator.username) return { success: false as const, error: "Creator not found." };
      return { success: true as const, data: mockCreator };
    }
    return apiFetch<CreatorProfile>(`/creators/${username}`);
  },
  async updateProfile(patch: Partial<CreatorProfile>) {
    if (USE_MOCKS) {
      await sleep(500);
      return { success: true as const, data: { ...mockCreator, ...patch } };
    }
    return apiFetch<CreatorProfile>("/creators/me", { method: "PATCH", body: JSON.stringify(patch) });
  }
};
