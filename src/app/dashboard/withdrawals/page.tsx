"use client";

import { useEffect, useState } from "react";
import { Topbar } from "@/components/layout/topbar";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Modal } from "@/components/ui/modal";
import { paymentsService } from "@/services/payments";
import { Payout } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useToast } from "@/context/toast-context";
import { Banknote, Landmark, Smartphone, CircleDollarSign } from "lucide-react";

const METHOD_ICON = { bank: Landmark, upi: Smartphone, paypal: CircleDollarSign };
const STATUS_TONE = { completed: "success", processing: "warn", pending: "neutral", failed: "danger" } as const;

export default function WithdrawalsPage() {
  const { toast } = useToast();
  const [payouts, setPayouts] = useState<Payout[] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<Payout["method"]>("bank");
  const [submitting, setSubmitting] = useState(false);
  const balance = 1246.5;

  useEffect(() => {
    paymentsService.listPayouts().then((res) => res.success && setPayouts(res.data ?? []));
  }, []);

  const requestPayout = async () => {
    setSubmitting(true);
    const res = await paymentsService.requestPayout(Number(amount) || 0, method);
    setSubmitting(false);
    if (res.success && res.data) {
      setPayouts((prev) => [res.data!, ...(prev ?? [])]);
      setModalOpen(false);
      setAmount("");
      toast("Payout requested", { description: "We'll process this within 2 business days.", variant: "success" });
    }
  };

  return (
    <div>
      <Topbar title="Withdrawals" />
      <div className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <Card className="bg-gradient-to-br from-brand-600 to-brand-800 text-white">
          <CardBody className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm text-white/70">Available for withdrawal</p>
              <p className="font-mono text-3xl font-bold tabular-nums">{formatCurrency(balance)}</p>
            </div>
            <Button variant="secondary" className="bg-white text-brand-700 hover:bg-paper-100" onClick={() => setModalOpen(true)}>Request payout</Button>
          </CardBody>
        </Card>

        <Card>
          <CardHeader><p className="font-display text-base font-semibold text-ink-900 dark:text-paper-50">Payout methods</p></CardHeader>
          <CardBody className="grid gap-3 sm:grid-cols-3">
            {(["bank", "upi", "paypal"] as const).map((m) => {
              const Icon = METHOD_ICON[m];
              return (
                <div key={m} className="flex items-center gap-3 rounded-2xl border border-ink-900/[0.06] p-3.5 dark:border-white/[0.06]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl2 bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300"><Icon className="h-5 w-5" /></div>
                  <div>
                    <p className="text-sm font-semibold capitalize text-ink-900 dark:text-paper-50">{m === "upi" ? "UPI" : m}</p>
                    <p className="text-xs text-ink-500 dark:text-paper-100/50">Withdraw to {m === "upi" ? "any UPI ID" : m === "bank" ? "bank account" : "PayPal account"}</p>
                  </div>
                </div>
              );
            })}
          </CardBody>
        </Card>

        <Card>
          <CardHeader><p className="font-display text-base font-semibold text-ink-900 dark:text-paper-50">Payout history</p></CardHeader>
          <CardBody className="pt-4">
            {!payouts && <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-14" />)}</div>}
            {payouts && (
              <div className="divide-y divide-ink-900/[0.06] dark:divide-white/[0.06]">
                {payouts.map((p) => (
                  <div key={p.id} className="flex items-center justify-between gap-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <Banknote className="h-4.5 w-4.5 text-ink-400" />
                      <div>
                        <p className="text-sm font-medium capitalize text-ink-900 dark:text-paper-50">{p.method} transfer</p>
                        <p className="text-xs text-ink-500 dark:text-paper-100/50">{formatDate(p.requestedAt)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge tone={STATUS_TONE[p.status]}>{p.status}</Badge>
                      <span className="font-mono text-sm font-semibold tabular-nums text-ink-900 dark:text-paper-50">{formatCurrency(p.amount, p.currency)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Request a payout" size="sm">
        <div className="flex flex-col gap-4">
          <Input label="Amount (USD)" type="number" min={1} max={balance} placeholder={`Up to ${formatCurrency(balance)}`} value={amount} onChange={(e) => setAmount(e.target.value)} />
          <Select label="Payout method" value={method} onChange={(e) => setMethod(e.target.value as Payout["method"])}>
            <option value="bank">Bank transfer</option>
            <option value="upi">UPI</option>
            <option value="paypal">PayPal</option>
          </Select>
          <Button loading={submitting} disabled={!amount || Number(amount) <= 0} onClick={requestPayout} className="mt-2">Confirm request</Button>
        </div>
      </Modal>
    </div>
  );
}
