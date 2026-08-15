import Link from "next/link";
import { Link2 } from "lucide-react";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 font-display text-xl font-bold tracking-tight text-ink-900 dark:text-paper-50 ${className ?? ""}`}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white">
        <Link2 className="h-4.5 w-4.5" strokeWidth={2.5} />
      </span>
      Link<span className="text-brand-500">Pay</span>
    </Link>
  );
}
