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
import { Mail, Lock } from "lucide-react";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});
type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [formError, setFormError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setFormError(null);
    const res = await authService.login(values);
    if (!res.success) {
      setFormError(res.error ?? "Something went wrong.");
      return;
    }
    toast("Welcome back!", { variant: "success" });
    router.push("/dashboard");
  };

  return (
    <AuthShell
      title="Log in to LinkPay"
      subtitle="Welcome back — let's get you to your dashboard."
      footer={<>Don&apos;t have an account? <Link href="/register" className="font-semibold text-brand-600">Sign up</Link></>}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
        <Input label="Email" type="email" leftAdornment={<Mail className="h-4 w-4" />} placeholder="you@example.com" error={errors.email?.message} {...register("email")} />
        <div>
          <Input label="Password" type="password" leftAdornment={<Lock className="h-4 w-4" />} placeholder="••••••••" error={errors.password?.message} {...register("password")} />
          <Link href="/forgot-password" className="mt-1.5 inline-block text-xs font-semibold text-brand-600">Forgot password?</Link>
        </div>
        {formError && <p role="alert" className="text-sm font-medium text-danger">{formError}</p>}
        <Button type="submit" loading={isSubmitting} className="mt-2">Log In</Button>
      </form>
    </AuthShell>
  );
}
