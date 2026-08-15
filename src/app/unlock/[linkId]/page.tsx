"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, RefreshCw, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { Avatar } from "@/components/ui/avatar";
import { linksService } from "@/services/links";
import { paymentsService } from "@/services/payments";
import { CreatorLink } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { mockCreator } from "@/lib/mock-data";
import { LinkIcon } from "@/components/profile/link-icon";

export default function UnlockPage() {
  const params = useParams<{ linkId: string }>();
  const router = useRouter();
  const [link, setLink] = useState<CreatorLink | null>(null);
  const [error, setError] = useState(false);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    linksService.getById(params.linkId).then((res) => (res.success ? setLink(res.data ?? null) : setError(true)));
  }, [params.linkId]);

  const pay = async (outcome: "success" | "failed") => {
    if (!link) return;
    setPaying(true);
    const order = await paymentsService.createOrder(link.id);
    if (!order.success || !order.data) {
      setPaying(false);
      return router.push(`/unlock/${link.id}/failed`);
    }
    await paymentsService.confirmMockPayment(order.data.orderId, outcome);
    setPaying(false);
    router.push(outcome === "success" ? `/unlock/${link.id}/success` : `/unlock/${link.id}/failed`);
  };

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <ErrorState message="This link doesn't exist or is no longer available." />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-paper-50 dark:bg-ink-950">
      <div className="flex items-center gap-3 px-4 py-4">
        <Link href={`/${mockCreator.username}`} className="rounded-full p-2 text-ink-500 hover:bg-ink-900/5 dark:text-paper-100/60 dark:hover:bg-white/10">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <span className="text-sm font-medium text-ink-500 dark:text-paper-100/50">Back to profile</span>
      </div>

      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 pb-16">
        {!link ? (
          <div className="space-y-4">
            <Skeleton className="mx-auto h-16 w-16 rounded-2xl" />
            <Skeleton className="mx-auto h-6 w-48" />
            <Skeleton className="h-32 rounded-2xl" />
          </div>
        ) : (
          <div className="rounded-[1.75rem] border border-ink-900/[0.06] bg-white p-6 shadow-card dark:border-white/[0.06] dark:bg-ink-800">
            <div className="flex flex-col items-center text-center">
              <LinkIcon icon={link.icon} color={link.color} className="h-16 w-16" />
              <p className="mt-4 font-display text-lg font-bold text-ink-950 dark:text-paper-50">{link.title}</p>
              <p className="mt-1 text-sm text-ink-500 dark:text-paper-100/50">{link.description}</p>

              <div className="mt-5 flex items-center gap-2">
                <Avatar src={mockCreator.avatarUrl} name={mockCreator.displayName} size={24} />
                <span className="text-xs font-medium text-ink-500 dark:text-paper-100/50">
                  by {mockCreator.displayName} <BadgeCheck className="inline h-3.5 w-3.5 text-brand-500" />
                </span>
              </div>

              <p className="mt-6 font-mono text-4xl font-bold tabular-nums text-ink-950 dark:text-paper-50">
                {formatCurrency(link.price ?? 0, link.currency)}
              </p>

              <ul className="mt-5 flex flex-col gap-2 self-stretch text-left text-sm text-ink-600 dark:text-paper-100/60">
                {["One-time payment", "Unlimited access", "Secure payment"].map((t) => (
                  <li key={t} className="flex items-center gap-2.5">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-ok" /> {t}
                  </li>
                ))}
              </ul>

              <Button onClick={() => pay("success")} loading={paying} className="mt-7 w-full" size="lg" icon={<Lock className="h-4.5 w-4.5" />}>
                Pay {formatCurrency(link.price ?? 0, link.currency)}
              </Button>
              <button onClick={() => pay("failed")} disabled={paying} className="mt-3 text-xs font-medium text-ink-400 hover:text-danger">
                Simulate failed payment (demo)
              </button>

              <p className="mt-5 flex items-center gap-1.5 text-xs text-ink-400">
                <ShieldCheck className="h-3.5 w-3.5" /> Secured by LinkPay Payments
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
