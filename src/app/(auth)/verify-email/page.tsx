"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthShell } from "@/components/layout/auth-shell";
import { Button } from "@/components/ui/button";
import { MailCheck } from "lucide-react";
import { useToast } from "@/context/toast-context";

export default function VerifyEmailPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  return (
    <AuthShell
      title="Verify your email"
      subtitle="We sent a verification link to your inbox — click it to activate your account."
      footer={<>Wrong email? <Link href="/register" className="font-semibold text-brand-600">Start over</Link></>}
    >
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-brand-200 bg-brand-50 px-6 py-10 text-center dark:border-brand-500/20 dark:bg-brand-500/10">
        <MailCheck className="h-9 w-9 text-brand-600 dark:text-brand-300" />
        <p className="text-sm text-ink-600 dark:text-paper-100/60">Didn&apos;t get the email? Check your spam folder or resend it.</p>
        <Button
          variant="outline"
          loading={loading}
          onClick={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              toast("Verification email resent", { variant: "success" });
            }, 700);
          }}
        >
          Resend email
        </Button>
      </div>
    </AuthShell>
  );
}
