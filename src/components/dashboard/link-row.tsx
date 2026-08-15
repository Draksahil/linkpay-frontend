"use client";

import { CreatorLink } from "@/types";
import { LinkIcon } from "@/components/profile/link-icon";
import { Badge } from "@/components/ui/badge";
import { Toggle } from "@/components/ui/toggle";
import { Dropdown, DropdownItem } from "@/components/ui/dropdown";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { GripVertical, MoreVertical, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

interface LinkRowProps {
  link: CreatorLink;
  onToggle: (id: string, active: boolean) => void;
  onDelete: (id: string) => void;
}

export function LinkRow({ link, onToggle, onDelete }: LinkRowProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-ink-900/[0.06] bg-white p-3.5 dark:border-white/[0.06] dark:bg-ink-800">
      <GripVertical className="h-4 w-4 shrink-0 cursor-grab text-ink-300" />
      <LinkIcon icon={link.icon} color={link.color} className="h-10 w-10" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-semibold text-ink-900 dark:text-paper-50">{link.title}</p>
          <Badge tone={link.type === "paid" ? "brand" : link.type === "password" ? "warn" : "neutral"}>
            {link.type === "paid" ? formatCurrency(link.price ?? 0, link.currency) : link.type}
          </Badge>
        </div>
        <p className="truncate text-xs text-ink-500 dark:text-paper-100/50">{formatNumber(link.clicks)} clicks · {link.url}</p>
      </div>
      <Toggle checked={link.isActive} onChange={(checked) => onToggle(link.id, checked)} />
      <Dropdown
        trigger={
          <button className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-900/5 dark:hover:bg-white/10" aria-label="More options">
            <MoreVertical className="h-4 w-4" />
          </button>
        }
      >
        {(close) => (
          <>
            <Link href={`/dashboard/links/${link.id}/edit`} onClick={close}>
              <DropdownItem>
                <Pencil className="h-4 w-4" /> Edit
              </DropdownItem>
            </Link>
            <DropdownItem
              danger
              onClick={() => { onDelete(link.id); close(); }}
            >
              <Trash2 className="h-4 w-4" /> Delete
            </DropdownItem>
          </>
        )}
      </Dropdown>
    </div>
  );
}
