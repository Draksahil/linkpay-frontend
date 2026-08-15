import { CreatorLink } from "@/types";
import { LinkIcon } from "./link-icon";
import { formatCurrency } from "@/lib/utils";
import { ArrowUpRight, Lock } from "lucide-react";

export function PublicLinkCard({ link, onClick }: { link: CreatorLink; onClick: () => void }) {
  const isPaid = link.type === "paid";
  const isLocked = link.type === "paid" || link.type === "password";

  return (
    <button
      onClick={onClick}
      className="group flex w-full items-center gap-3.5 rounded-2xl border border-ink-900/[0.06] bg-white/90 p-3.5 text-left shadow-soft backdrop-blur transition hover:-translate-y-0.5 hover:shadow-card dark:border-white/10 dark:bg-ink-800/80"
    >
      <LinkIcon icon={link.icon} color={link.color} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-ink-900 dark:text-paper-50">{link.title}</p>
        {link.description && <p className="truncate text-xs text-ink-500 dark:text-paper-100/50">{link.description}</p>}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {isPaid && link.price !== undefined && (
          <span className="font-mono text-sm font-semibold tabular-nums text-brand-600 dark:text-brand-300">
            {formatCurrency(link.price, link.currency)}
          </span>
        )}
        {isLocked ? (
          <Lock className="h-4 w-4 text-ink-400" />
        ) : (
          <ArrowUpRight className="h-4 w-4 text-ink-300 transition group-hover:text-brand-500" />
        )}
      </div>
    </button>
  );
}
