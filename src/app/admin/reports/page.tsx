"use client";

import { Topbar } from "@/components/layout/topbar";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { LineChart, BarChart } from "@/components/ui/chart";
import { mockAnalytics } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function AdminReportsPage() {
  return (
    <div>
      <Topbar title="Reports" />
      <div className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader><p className="font-display text-base font-semibold text-ink-900 dark:text-paper-50">New creators (30 days)</p></CardHeader>
            <CardBody><LineChart data={mockAnalytics.series.map((p) => ({ label: p.date, value: Math.round(p.clicks / 6) }))} color="#6D3FEE" /></CardBody>
          </Card>
          <Card>
            <CardHeader><p className="font-display text-base font-semibold text-ink-900 dark:text-paper-50">Platform revenue</p></CardHeader>
            <CardBody><LineChart data={mockAnalytics.series.map((p) => ({ label: p.date, value: p.revenue * 42 }))} formatValue={(v) => formatCurrency(v)} color="#16A34A" /></CardBody>
          </Card>
        </div>
        <Card>
          <CardHeader><p className="font-display text-base font-semibold text-ink-900 dark:text-paper-50">Top categories by GMV</p></CardHeader>
          <CardBody><BarChart data={[{ label: "Tutorials", value: 820 }, { label: "Consulting", value: 640 }, { label: "Ebooks", value: 410 }, { label: "Templates", value: 300 }]} /></CardBody>
        </Card>
      </div>
    </div>
  );
}
