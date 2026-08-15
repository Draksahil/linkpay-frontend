"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { ReactNode, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ModalProps { open: boolean; onClose: () => void; title?: string; children: ReactNode; size?: "sm" | "md" | "lg"; }
const sizeClasses = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl" };

export function Modal({ open, onClose, title, children, size = "md" }: ModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn("relative z-10 max-h-[90vh] w-full overflow-y-auto rounded-t-2xl bg-white p-6 shadow-card dark:bg-ink-800 sm:rounded-2xl", sizeClasses[size])}
          >
            {title && (
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-paper-50">{title}</h2>
                <button onClick={onClose} aria-label="Close dialog" className="rounded-full p-1.5 text-ink-400 hover:bg-ink-900/5 hover:text-ink-700 dark:hover:bg-white/10">
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function ConfirmDialog({
  open, onClose, onConfirm, title, description, confirmLabel = "Confirm", danger
}: {
  open: boolean; onClose: () => void; onConfirm: () => void; title: string; description: string; confirmLabel?: string; danger?: boolean;
}) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      <p className="text-sm text-ink-600 dark:text-paper-100/60">{description}</p>
      <div className="mt-6 flex justify-end gap-2">
        <button onClick={onClose} className="inline-flex h-10 items-center rounded-xl2 px-4 text-sm font-semibold text-ink-700 hover:bg-ink-900/5 dark:text-paper-100 dark:hover:bg-white/10">
          Cancel
        </button>
        <button
          onClick={() => { onConfirm(); onClose(); }}
          className={cn("inline-flex h-10 items-center rounded-xl2 px-4 text-sm font-semibold text-white", danger ? "bg-danger hover:bg-danger/90" : "bg-brand-500 hover:bg-brand-600")}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
