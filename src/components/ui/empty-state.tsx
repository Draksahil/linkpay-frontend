import { LucideIcon } from "lucide-react";

interface EmptyStateProps { icon: LucideIcon; title: string; description: string; action?: React.ReactNode; }

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-ink-900/10 px-6 py-14 text-center dark:border-white/10">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="font-display text-base font-semibold text-ink-900 dark:text-paper-50">{title}</p>
        <p className="mx-auto mt-1 max-w-sm text-sm text-ink-500 dark:text-paper-100/50">{description}</p>
      </div>
      {action}
    </div>
  );
}
