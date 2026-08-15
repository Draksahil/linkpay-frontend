"use client";

import { useEffect, useState } from "react";
import { Topbar } from "@/components/layout/topbar";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { paymentsService } from "@/services/payments";
import { Transaction } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Receipt, Wallet, Clock } from "lucide-react";

const STATUS_TONE = { success: "success", pending: "warn", failed: "danger", refunded: "neutral" } as const;

export default function PaymentsPage() {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);

  useEffect(() => {
    paymentsService.listTransactions().then((res) => res.success && setTransactions(res.data ?? []));
  }, []);

  const totalRevenue = transactions?.filter((t) => t.status === "success").reduce((s, t) => s + t.amount, 0) ?? 0;
  const available = totalRevenue * 0.85;
  const pending = transactions?.filter((t) => t.status === "pending").reduce((s, t) => s + t.amount, 0) ?? 0;

  return (
    <div>
      <Topbar title="Payments" />
      <div className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card><CardBody className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl2 bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300"><Receipt className="h-5 w-5" /></div>
            <div><p className="text-xs font-medium text-ink-500 dark:text-paper-100/50">Total revenue</p><p className="font-mono text-lg font-bold tabular-nums text-ink-900 dark:text-paper-50">{formatCurrency(totalRevenue)}</p></div>
          </CardBody></Card>
          <Card><CardBody className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl2 bg-ok/10 text-ok"><Wallet className="h-5 w-5" /></div>
            <div><p className="text-xs font-medium text-ink-500 dark:text-paper-100/50">Available balance</p><p className="font-mono text-lg font-bold tabular-nums text-ink-900 dark:text-paper-50">{formatCurrency(available)}</p></div>
          </CardBody></Card>
          <Card><CardBody className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl2 bg-warn/10 text-warn"><Clock className="h-5 w-5" /></div>
            <div><p className="text-xs font-medium text-ink-500 dark:text-paper-100/50">Pending balance</p><p className="font-mono text-lg font-bold tabular-nums text-ink-900 dark:text-paper-50">{formatCurrency(pending)}</p></div>
          </CardBody></Card>
        </div>

        <Card>
          <CardHeader><p className="font-display text-base font-semibold text-ink-900 dark:text-paper-50">Transaction history</p></CardHeader>
          <CardBody className="pt-4">
            {!transactions && <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12" />)}</div>}
            {transactions && transactions.length === 0 && <EmptyState icon={Receipt} title="No transactions yet" description="Once someone unlocks a paid link, it'll show up here." />}
            {transactions && transactions.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] text-sm">
                  <thead>
                    <tr className="border-b border-ink-900/[0.06] text-left text-xs font-semibold uppercase tracking-wide text-ink-400 dark:border-white/[0.06]">
                      <th className="pb-3 font-medium">Link purchased</th>
                      <th className="pb-3 font-medium">Buyer</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 text-right font-medium">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-900/[0.06] dark:divide-white/[0.06]">
                    {transactions.map((t) => (
                      <tr key={t.id}>
                        <td className="py-3 font-medium text-ink-900 dark:text-paper-50">{t.linkTitle}</td>
                        <td className="py-3 text-ink-500 dark:text-paper-100/60">{t.buyerEmail}</td>
                        <td className="py-3 text-ink-500 dark:text-paper-100/60">{formatDate(t.createdAt)}</td>
                        <td className="py-3"><Badge tone={STATUS_TONE[t.status]}>{t.status}</Badge></td>
                        <td className="py-3 text-right font-mono font-semibold tabular-nums text-ink-900 dark:text-paper-50">{formatCurrency(t.amount, t.currency)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
