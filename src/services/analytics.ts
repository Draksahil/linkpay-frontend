import { USE_MOCKS, apiFetch } from "@/lib/api-client";
import { mockAnalytics } from "@/lib/mock-data";
import { sleep } from "@/lib/utils";
import { AnalyticsSummary } from "@/types";

export type AnalyticsRange = "today" | "7d" | "30d" | "3m" | "1y";

export const analyticsService = {
  async summary(range: AnalyticsRange = "30d") {
    if (USE_MOCKS) {
      await sleep(450);
      return { success: true as const, data: mockAnalytics };
    }
    return apiFetch<AnalyticsSummary>(`/analytics/summary?range=${range}`);
  }
};
