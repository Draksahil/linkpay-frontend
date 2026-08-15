"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthShell } from "@/components/layout/auth-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/auth";
import { Mail, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await authService.requestPasswordReset(email);
    setLoading(false);
    setSent(true);
  };

  return (
    <AuthShell
      title="Reset your password"
      subtitle="Enter the email linked to your account and we'll send a reset link."
      footer={<>Remembered it? <Link href="/login" className="font-semibold text-brand-600">Back to log in</Link></>}
    >
      {sent ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-ok/20 bg-ok/5 px-5 py-8 text-center">
          <CheckCircle2 className="h-8 w-8 text-ok" />
          <p className="text-sm font-medium text-ink-900 dark:text-paper-50">Check your inbox</p>
          <p className="text-sm text-ink-500 dark:text-paper-100/50">We sent a reset link to {email}</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <Input label="Email" type="email" leftAdornment={<Mail className="h-4 w-4" />} placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Button type="submit" loading={loading} className="mt-2">Send reset link</Button>
        </form>
      )}
    </AuthShell>
  );
}
