import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type Tone = "brand" | "success" | "warn" | "danger" | "neutral";
const toneClasses: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-200",
  success: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  warn: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  danger: "bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
  neutral: "bg-ink-900/5 text-ink-700 dark:bg-white/10 dark:text-paper-100"
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> { tone?: Tone; }

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold tracking-tight", toneClasses[tone], className)} {...props} />;
}
