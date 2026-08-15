import Link from "next/link";
import { Logo } from "./logo";

export function AuthShell({ title, subtitle, children, footer }: { title: string; subtitle: string; children: React.ReactNode; footer?: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-sm">
          <Logo />
          <h1 className="mt-8 font-display text-2xl font-bold tracking-tight text-ink-950 dark:text-paper-50">{title}</h1>
          <p className="mt-1.5 text-sm text-ink-500 dark:text-paper-100/50">{subtitle}</p>
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-6 text-center text-sm text-ink-500 dark:text-paper-100/50">{footer}</div>}
        </div>
      </div>
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-ink-950 lg:block">
        <div className="absolute inset-0 bg-grain opacity-40" />
        <div className="flex h-full flex-col items-center justify-center px-12 text-center text-white">
          <p className="font-display text-3xl font-bold leading-tight">Your links.<br />Your income.</p>
          <p className="mt-3 max-w-sm text-sm text-white/60">Join 10,000+ creators already earning from links they were giving away for free.</p>
        </div>
      </div>
    </div>
  );
}
