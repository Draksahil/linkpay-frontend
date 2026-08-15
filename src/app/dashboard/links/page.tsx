"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Topbar } from "@/components/layout/topbar";
import { LinkRow } from "@/components/dashboard/link-row";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { ConfirmDialog } from "@/components/ui/modal";
import { Plus, Link2 } from "lucide-react";
import { linksService } from "@/services/links";
import { CreatorLink } from "@/types";
import { useToast } from "@/context/toast-context";

export default function LinksPage() {
  const { toast } = useToast();
  const [links, setLinks] = useState<CreatorLink[] | null>(null);
  const [error, setError] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "free" | "paid">("all");

  const load = () => {
    setError(false);
    setLinks(null);
    linksService.list().then((res) => (res.success ? setLinks(res.data ?? []) : setError(true)));
  };

  useEffect(load, []);

  const handleToggle = async (id: string, active: boolean) => {
    setLinks((prev) => prev?.map((l) => (l.id === id ? { ...l, isActive: active } : l)) ?? null);
    await linksService.update(id, { isActive: active });
    toast(active ? "Link enabled" : "Link disabled", { variant: "success" });
  };

  const handleDelete = async (id: string) => {
    await linksService.remove(id);
    setLinks((prev) => prev?.filter((l) => l.id !== id) ?? null);
    toast("Link deleted", { variant: "success" });
  };

  const filtered = links?.filter((l) => (filter === "all" ? true : filter === "paid" ? l.type === "paid" : l.type === "free"));

  return (
    <div>
      <Topbar title="My Links" />
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-1.5 rounded-xl2 bg-ink-900/5 p-1 dark:bg-white/5">
            {(["all", "free", "paid"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-lg px-3.5 py-1.5 text-sm font-semibold capitalize transition ${filter === f ? "bg-white text-ink-900 shadow-soft dark:bg-ink-800 dark:text-paper-50" : "text-ink-500 dark:text-paper-100/50"}`}
              >
                {f}
              </button>
            ))}
          </div>
          <Link href="/dashboard/links/new">
            <Button icon={<Plus className="h-4 w-4" />} size="sm">Add New</Button>
          </Link>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          {error && <ErrorState message="Couldn't load your links." onRetry={load} />}
          {!error && !links && Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-[76px]" />)}
          {!error && filtered && filtered.length === 0 && (
            <EmptyState
              icon={Link2}
              title="No links yet"
              description="Add your first link to start building your LinkPay page."
              action={
                <Link href="/dashboard/links/new">
                  <Button size="sm" icon={<Plus className="h-4 w-4" />}>Add your first link</Button>
                </Link>
              }
            />
          )}
          {filtered?.map((link) => (
            <LinkRow key={link.id} link={link} onToggle={handleToggle} onDelete={(id) => setDeleteId(id)} />
          ))}
        </div>
      </div>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && handleDelete(deleteId)}
        title="Delete this link?"
        description="This can't be undone. Visitors will no longer see this link on your page."
        confirmLabel="Delete"
        danger
      />
    </div>
  );
}
