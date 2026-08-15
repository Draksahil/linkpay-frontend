"use client";

import { Topbar } from "@/components/layout/topbar";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { LineChart } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { Users, DollarSign, Link2, ShieldAlert } from "lucide-react";
import { mockAnalytics, mockTransactions } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function AdminDashboardPage() {
  return (
    <div>
      <Topbar title="Admin Dashboard" />
      <div className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total creators" value="10,482" delta="6.2%" icon={Users} />
          <StatCard label="Platform revenue" value={formatCurrency(184230)} delta="18.9%" icon={DollarSign} />
          <StatCard label="Active links" value="58,210" delta="4.1%" icon={Link2} />
          <StatCard label="Flagged content" value="12" deltaPositive={false} delta="3 new" icon={ShieldAlert} />
        </div>

        <Card>
          <CardHeader>
            <p className="font-display text-base font-semibold text-ink-900 dark:text-paper-50">Platform-wide revenue</p>
          </CardHeader>
          <CardBody>
            <LineChart data={mockAnalytics.series.map((p) => ({ label: p.date, value: p.revenue * 42 }))} formatValue={(v) => formatCurrency(v)} color="#5A2FDB" />
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <p className="font-display text-base font-semibold text-ink-900 dark:text-paper-50">Recent platform transactions</p>
          </CardHeader>
          <CardBody className="pt-4">
            <div className="divide-y divide-ink-900/[0.06] dark:divide-white/[0.06]">
              {mockTransactions.map((t) => (
                <div key={t.id} className="flex items-center justify-between gap-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-ink-900 dark:text-paper-50">{t.buyerEmail}</p>
                    <p className="text-xs text-ink-500 dark:text-paper-100/50">{t.linkTitle} · {formatDate(t.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge tone={t.status === "success" ? "success" : t.status === "pending" ? "warn" : t.status === "failed" ? "danger" : "neutral"}>{t.status}</Badge>
                    <span className="font-mono text-sm font-semibold tabular-nums text-ink-900 dark:text-paper-50">{formatCurrency(t.amount, t.currency)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
