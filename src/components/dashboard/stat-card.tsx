import { LucideIcon } from "lucide-react";
import { Card, CardBody } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  delta?: string;
  deltaPositive?: boolean;
  icon: LucideIcon;
}

export function StatCard({ label, value, delta, deltaPositive = true, icon: Icon }: StatCardProps) {
  return (
    <Card>
      <CardBody className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-ink-500 dark:text-paper-100/50">{label}</p>
          <p className="mt-1.5 font-mono text-2xl font-bold tabular-nums text-ink-900 dark:text-paper-50">{value}</p>
          {delta && (
            <p className={cn("mt-1.5 text-xs font-semibold", deltaPositive ? "text-ok" : "text-danger")}>
              {deltaPositive ? "↑" : "↓"} {delta}
            </p>
          )}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl2 bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
          <Icon className="h-5 w-5" />
        </div>
      </CardBody>
    </Card>
  );
}
