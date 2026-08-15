"use client";

import { useEffect, useState } from "react";
import { Topbar } from "@/components/layout/topbar";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LineChart, BarChart } from "@/components/ui/chart";
import { analyticsService, AnalyticsRange } from "@/services/analytics";
import { AnalyticsSummary } from "@/types";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { Eye, Users, MousePointerClick, Percent, DollarSign, TrendingUp } from "lucide-react";

const RANGES: { id: AnalyticsRange; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "7d", label: "7 Days" },
  { id: "30d", label: "30 Days" },
  { id: "3m", label: "3 Months" },
  { id: "1y", label: "1 Year" }
];

export default function AnalyticsPage() {
  const [range, setRange] = useState<AnalyticsRange>("30d");
  const [data, setData] = useState<AnalyticsSummary | null>(null);

  useEffect(() => {
    setData(null);
    analyticsService.summary(range).then((res) => res.success && setData(res.data ?? null));
  }, [range]);

  const metrics = data
    ? [
        { label: "Views", value: formatNumber(data.views), icon: Eye },
        { label: "Unique visitors", value: formatNumber(data.uniqueVisitors), icon: Users },
        { label: "Clicks", value: formatNumber(data.clicks), icon: MousePointerClick },
        { label: "CTR", value: `${data.ctr}%`, icon: Percent },
        { label: "Revenue", value: formatCurrency(data.revenue), icon: DollarSign },
        { label: "Conversion rate", value: `${data.conversionRate}%`, icon: TrendingUp }
      ]
    : [];

  return (
    <div>
      <Topbar title="Analytics" />
      <div className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-1.5 rounded-xl2 bg-ink-900/5 p-1 dark:bg-white/5 sm:w-fit">
          {RANGES.map((r) => (
            <button
              key={r.id}
              onClick={() => setRange(r.id)}
              className={`rounded-lg px-3.5 py-1.5 text-sm font-semibold transition ${range === r.id ? "bg-white text-ink-900 shadow-soft dark:bg-ink-800 dark:text-paper-50" : "text-ink-500 dark:text-paper-100/50"}`}
            >
              {r.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data
            ? metrics.map((m) => (
                <Card key={m.label}>
                  <CardBody className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl2 bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
                      <m.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-ink-500 dark:text-paper-100/50">{m.label}</p>
                      <p className="font-mono text-lg font-bold tabular-nums text-ink-900 dark:text-paper-50">{m.value}</p>
                    </div>
                  </CardBody>
                </Card>
              ))
            : Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-[76px]" />)}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader><p className="font-display text-base font-semibold text-ink-900 dark:text-paper-50">Views over time</p></CardHeader>
            <CardBody>{data ? <LineChart data={data.series.map((p) => ({ label: p.date, value: p.views }))} color="#6D3FEE" /> : <Skeleton className="h-[220px]" />}</CardBody>
          </Card>
          <Card>
            <CardHeader><p className="font-display text-base font-semibold text-ink-900 dark:text-paper-50">Clicks over time</p></CardHeader>
            <CardBody>{data ? <LineChart data={data.series.map((p) => ({ label: p.date, value: p.clicks }))} color="#16A34A" /> : <Skeleton className="h-[220px]" />}</CardBody>
          </Card>
        </div>

        <Card>
          <CardHeader><p className="font-display text-base font-semibold text-ink-900 dark:text-paper-50">Revenue over time</p></CardHeader>
          <CardBody>{data ? <LineChart data={data.series.map((p) => ({ label: p.date, value: p.revenue }))} formatValue={(v) => formatCurrency(v)} color="#D97706" /> : <Skeleton className="h-[220px]" />}</CardBody>
        </Card>

        <Card>
          <CardHeader><p className="font-display text-base font-semibold text-ink-900 dark:text-paper-50">Top performing links</p></CardHeader>
          <CardBody>{data ? <BarChart data={data.topLinks.map((l) => ({ label: l.title.split(" ")[0], value: l.clicks }))} /> : <Skeleton className="h-[180px]" />}</CardBody>
        </Card>
      </div>
    </div>
  );
}
