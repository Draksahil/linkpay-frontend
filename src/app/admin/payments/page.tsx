"use client";

import { Topbar } from "@/components/layout/topbar";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockTransactions } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

const STATUS_TONE = { success: "success", pending: "warn", failed: "danger", refunded: "neutral" } as const;

export default function AdminPaymentsPage() {
  return (
    <div>
      <Topbar title="Payments" />
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <Card>
          <CardBody className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-sm">
                <thead>
                  <tr className="border-b border-ink-900/[0.06] text-left text-xs font-semibold uppercase tracking-wide text-ink-400 dark:border-white/[0.06]">
                    <th className="px-5 py-3 font-medium">Transaction ID</th>
                    <th className="px-5 py-3 font-medium">Link</th>
                    <th className="px-5 py-3 font-medium">Buyer</th>
                    <th className="px-5 py-3 font-medium">Date</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 text-right font-medium">Amount</th>
                    <th className="px-5 py-3 text-right font-medium">Platform fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-900/[0.06] dark:divide-white/[0.06]">
                  {mockTransactions.map((t) => (
                    <tr key={t.id}>
                      <td className="px-5 py-3 font-mono text-xs text-ink-500 dark:text-paper-100/50">{t.id}</td>
                      <td className="px-5 py-3 text-ink-900 dark:text-paper-50">{t.linkTitle}</td>
                      <td className="px-5 py-3 text-ink-600 dark:text-paper-100/60">{t.buyerEmail}</td>
                      <td className="px-5 py-3 text-ink-600 dark:text-paper-100/60">{formatDate(t.createdAt)}</td>
                      <td className="px-5 py-3"><Badge tone={STATUS_TONE[t.status]}>{t.status}</Badge></td>
                      <td className="px-5 py-3 text-right font-mono font-semibold tabular-nums text-ink-900 dark:text-paper-50">{formatCurrency(t.amount, t.currency)}</td>
                      <td className="px-5 py-3 text-right font-mono text-ink-500 dark:text-paper-100/50">{formatCurrency(t.platformFee, t.currency)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
