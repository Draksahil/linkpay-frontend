"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/layout/auth-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/auth";
import { useToast } from "@/context/toast-context";
import { Mail, Lock, AtSign } from "lucide-react";

const schema = z.object({
  username: z.string().min(3, "At least 3 characters").regex(/^[a-z0-9_]+$/i, "Letters, numbers and underscores only"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});
type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [formError, setFormError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setFormError(null);
    const res = await authService.register(values);
    if (!res.success) {
      setFormError(res.error ?? "Something went wrong.");
      return;
    }
    toast("Account created", { description: "Check your email to verify your address.", variant: "success" });
    router.push("/dashboard");
  };

  return (
    <AuthShell
      title="Create your LinkPay page"
      subtitle="Free to start — no credit card required."
      footer={<>Already have an account? <Link href="/login" className="font-semibold text-brand-600">Log in</Link></>}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
        <Input label="Username" leftAdornment={<AtSign className="h-4 w-4" />} placeholder="alexsmith" hint="linkpay.com/yourname" error={errors.username?.message} {...register("username")} />
        <Input label="Email" type="email" leftAdornment={<Mail className="h-4 w-4" />} placeholder="you@example.com" error={errors.email?.message} {...register("email")} />
        <Input label="Password" type="password" leftAdornment={<Lock className="h-4 w-4" />} placeholder="At least 6 characters" error={errors.password?.message} {...register("password")} />
        {formError && <p role="alert" className="text-sm font-medium text-danger">{formError}</p>}
        <Button type="submit" loading={isSubmitting} className="mt-2">Create Account</Button>
        <p className="text-center text-xs text-ink-400">By signing up you agree to our <Link href="/terms" className="underline">Terms</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>.</p>
      </form>
    </AuthShell>
  );
}
