"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Topbar } from "@/components/layout/topbar";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart } from "@/components/ui/chart";
import { DollarSign, MousePointerClick, Eye, TrendingUp, Plus, Palette, ArrowUpRight } from "lucide-react";
import { analyticsService } from "@/services/analytics";
import { paymentsService } from "@/services/payments";
import { AnalyticsSummary, Transaction } from "@/types";
import { formatCurrency, formatDate, formatNumber } from "@/lib/utils";

export default function DashboardOverviewPage() {
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);

  useEffect(() => {
    analyticsService.summary().then((res) => res.success && setAnalytics(res.data ?? null));
    paymentsService.listTransactions().then((res) => res.success && setTransactions(res.data ?? null));
  }, []);

  return (
    <div>
      <Topbar title="Overview" />
      <div className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {analytics ? (
            <>
              <StatCard label="Total Earnings" value={formatCurrency(analytics.revenue)} delta="24.5%" icon={DollarSign} />
              <StatCard label="Profile Views" value={formatNumber(analytics.views)} delta="12.1%" icon={Eye} />
              <StatCard label="Link Clicks" value={formatNumber(analytics.clicks)} delta="8.4%" icon={MousePointerClick} />
              <StatCard label="Conversion Rate" value={`${analytics.conversionRate}%`} delta="1.2%" icon={TrendingUp} />
            </>
          ) : (
            Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-[104px] rounded-2xl" />)
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div>
                <p className="font-display text-base font-semibold text-ink-900 dark:text-paper-50">Revenue</p>
                <p className="text-xs text-ink-500 dark:text-paper-100/50">Last 10 days</p>
              </div>
              <Link href="/dashboard/analytics" className="text-xs font-semibold text-brand-600">View full analytics</Link>
            </CardHeader>
            <CardBody>
              {analytics ? (
                <LineChart data={analytics.series.map((p) => ({ label: p.date, value: p.revenue }))} formatValue={(v) => formatCurrency(v)} />
              ) : (
                <Skeleton className="h-[220px]" />
              )}
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <p className="font-display text-base font-semibold text-ink-900 dark:text-paper-50">Quick actions</p>
            </CardHeader>
            <CardBody className="flex flex-col gap-2.5">
              <Link href="/dashboard/links/new">
                <Button variant="outline" className="w-full justify-start" icon={<Plus className="h-4 w-4" />}>Add a new link</Button>
              </Link>
              <Link href="/dashboard/appearance">
                <Button variant="outline" className="w-full justify-start" icon={<Palette className="h-4 w-4" />}>Customize appearance</Button>
              </Link>
              <Link href="/dashboard/withdrawals">
                <Button variant="outline" className="w-full justify-start" icon={<DollarSign className="h-4 w-4" />}>Request a payout</Button>
              </Link>
              <a href="/alexsmith" target="_blank" rel="noreferrer">
                <Button className="w-full justify-start" icon={<ArrowUpRight className="h-4 w-4" />}>View my public page</Button>
              </a>
            </CardBody>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <p className="font-display text-base font-semibold text-ink-900 dark:text-paper-50">Recent transactions</p>
            <Link href="/dashboard/payments" className="text-xs font-semibold text-brand-600">View all</Link>
          </CardHeader>
          <CardBody className="pt-4">
            {transactions ? (
              <div className="divide-y divide-ink-900/[0.06] dark:divide-white/[0.06]">
                {transactions.slice(0, 5).map((t) => (
                  <div key={t.id} className="flex items-center justify-between gap-4 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-ink-900 dark:text-paper-50">{t.buyerEmail}</p>
                      <p className="text-xs text-ink-500 dark:text-paper-100/50">Unlocked {t.linkTitle} · {formatDate(t.createdAt)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge tone={t.status === "success" ? "success" : t.status === "pending" ? "warn" : t.status === "failed" ? "danger" : "neutral"}>{t.status}</Badge>
                      <span className="font-mono text-sm font-semibold tabular-nums text-ink-900 dark:text-paper-50">{formatCurrency(t.amount, t.currency)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-10" />)}
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
