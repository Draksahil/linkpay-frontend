"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/layout/auth-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/context/toast-context";
import { Lock } from "lucide-react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    if (password !== confirm) return setError("Passwords do not match.");
    setError(null);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    toast("Password updated", { variant: "success" });
    router.push("/login");
  };

  return (
    <AuthShell title="Set a new password" subtitle="Choose a strong password you haven't used before.">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <Input label="New password" type="password" leftAdornment={<Lock className="h-4 w-4" />} value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Input label="Confirm password" type="password" leftAdornment={<Lock className="h-4 w-4" />} value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
        {error && <p role="alert" className="text-sm font-medium text-danger">{error}</p>}
        <Button type="submit" loading={loading} className="mt-2">Update password</Button>
      </form>
    </AuthShell>
  );
}
