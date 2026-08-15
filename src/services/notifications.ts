import { USE_MOCKS, apiFetch } from "@/lib/api-client";
import { mockNotifications } from "@/lib/mock-data";
import { sleep } from "@/lib/utils";
import { Notification } from "@/types";

export const notificationsService = {
  async list() {
    if (USE_MOCKS) {
      await sleep(300);
      return { success: true as const, data: mockNotifications };
    }
    return apiFetch<Notification[]>("/notifications");
  }
};
