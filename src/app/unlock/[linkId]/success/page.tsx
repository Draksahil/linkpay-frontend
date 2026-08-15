"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { linksService } from "@/services/links";
import { CreatorLink } from "@/types";
import { mockCreator } from "@/lib/mock-data";
import { LinkIcon } from "@/components/profile/link-icon";

export default function PaymentSuccessPage() {
  const params = useParams<{ linkId: string }>();
  const [link, setLink] = useState<CreatorLink | null>(null);

  useEffect(() => {
    linksService.getById(params.linkId).then((res) => res.success && setLink(res.data ?? null));
  }, [params.linkId]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper-50 px-4 dark:bg-ink-950">
      <div className="w-full max-w-sm text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-ok/10 text-ok"
        >
          <CheckCircle2 className="h-10 w-10" />
        </motion.div>
        <h1 className="mt-6 font-display text-2xl font-bold text-ink-950 dark:text-paper-50">Payment Successful!</h1>
        <p className="mt-2 text-sm text-ink-500 dark:text-paper-100/50">You have unlocked this link successfully.</p>

        {!link ? (
          <Skeleton className="mx-auto mt-6 h-16 w-full" />
        ) : (
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-ink-900/[0.06] bg-white p-3.5 text-left dark:border-white/[0.06] dark:bg-ink-800">
            <LinkIcon icon={link.icon} color={link.color} />
            <div>
              <p className="text-sm font-semibold text-ink-900 dark:text-paper-50">{link.title}</p>
              <p className="text-xs text-ink-500 dark:text-paper-100/50">You can now access the content.</p>
            </div>
          </div>
        )}

        <a href={link?.url ?? "#"} target="_blank" rel="noreferrer">
          <Button className="mt-6 w-full" size="lg">Open Content</Button>
        </a>
        <Link href={`/${mockCreator.username}`} className="mt-3 block text-sm font-medium text-ink-500 hover:text-brand-600">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
