"use client";

import { useEffect, useState } from "react";
import { Topbar } from "@/components/layout/topbar";
import { Card, CardBody } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { notificationsService } from "@/services/notifications";
import { Notification } from "@/types";
import { formatDate } from "@/lib/utils";
import { Bell, BellOff } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NotificationsPage() {
  const [items, setItems] = useState<Notification[] | null>(null);

  useEffect(() => {
    notificationsService.list().then((res) => res.success && setItems(res.data ?? []));
  }, []);

  return (
    <div>
      <Topbar title="Notifications" />
      <div className="mx-auto max-w-2xl space-y-3 px-4 py-6 sm:px-6 lg:px-8">
        {!items && Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-16" />)}
        {items && items.length === 0 && <EmptyState icon={BellOff} title="You're all caught up" description="New notifications about payments and payouts will show up here." />}
        {items?.map((n) => (
          <Card key={n.id} className={cn(!n.read && "border-brand-200 dark:border-brand-500/30")}>
            <CardBody className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300"><Bell className="h-4 w-4" /></div>
              <div>
                <p className="text-sm font-semibold text-ink-900 dark:text-paper-50">{n.title}</p>
                <p className="text-sm text-ink-500 dark:text-paper-100/50">{n.body}</p>
                <p className="mt-1 text-xs text-ink-400">{formatDate(n.createdAt)}</p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
