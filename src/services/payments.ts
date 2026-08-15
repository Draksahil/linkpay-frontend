import { apiFetch } from "@/lib/api-client";
import { mockLinks, mockTransactions, mockPayouts } from "@/lib/mock-data";
import { sleep } from "@/lib/utils";
import { Payout, Transaction } from "@/types";
import { USE_MOCKS } from "@/lib/api-client";

/**
 * IMPORTANT: this file only ever talks to the payment PROVIDER through the
 * backend. The frontend never sees a secret key and never marks a payment
 * as "successful" on its own — in production this resolves once the backend
 * confirms a signed webhook from Razorpay/Stripe, not on the client redirect.
 */
export const paymentsService = {
  async createOrder(linkId: string) {
    if (USE_MOCKS) {
      await sleep(500);
      const link = mockLinks.find((l) => l.id === linkId);
      if (!link) return { success: false as const, error: "Link not found." };
      return { success: true as const, data: { orderId: `order_${Date.now()}`, amount: link.price ?? 0, currency: link.currency ?? "USD" } };
    }
    return apiFetch<{ orderId: string; amount: number; currency: string }>(`/links/${linkId}/create-order`, { method: "POST" });
  },
  async confirmMockPayment(orderId: string, outcome: "success" | "failed") {
    await sleep(900);
    return { success: true as const, data: { orderId, status: outcome } };
  },
  async listTransactions() {
    if (USE_MOCKS) {
      await sleep(400);
      return { success: true as const, data: mockTransactions };
    }
    return apiFetch<Transaction[]>("/transactions");
  },
  async listPayouts() {
    if (USE_MOCKS) {
      await sleep(400);
      return { success: true as const, data: mockPayouts };
    }
    return apiFetch<Payout[]>("/payouts");
  },
  async requestPayout(amount: number, method: Payout["method"]) {
    if (USE_MOCKS) {
      await sleep(600);
      const payout: Payout = { id: `po_${Date.now()}`, amount, currency: "USD", method, status: "pending", requestedAt: new Date().toISOString() };
      return { success: true as const, data: payout };
    }
    return apiFetch<Payout>("/payouts", { method: "POST", body: JSON.stringify({ amount, method }) });
  }
};
