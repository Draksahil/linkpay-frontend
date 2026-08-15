"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockCreator } from "@/lib/mock-data";

export default function PaymentFailedPage() {
  const params = useParams<{ linkId: string }>();
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper-50 px-4 dark:bg-ink-950">
      <div className="w-full max-w-sm text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-danger/10 text-danger">
          <XCircle className="h-10 w-10" />
        </div>
        <h1 className="mt-6 font-display text-2xl font-bold text-ink-950 dark:text-paper-50">Payment Failed</h1>
        <p className="mt-2 text-sm text-ink-500 dark:text-paper-100/50">
          Something went wrong processing your payment. You have not been charged.
        </p>
        <Button className="mt-6 w-full" size="lg" onClick={() => router.push(`/unlock/${params.linkId}`)}>
          Try Again
        </Button>
        <Link href={`/${mockCreator.username}`} className="mt-3 block text-sm font-medium text-ink-500 hover:text-brand-600">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
