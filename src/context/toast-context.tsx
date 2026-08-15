"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";
import { ToastMessage, ToastVariant } from "@/types";

interface ToastContextValue {
  toast: (title: string, opts?: { description?: string; variant?: ToastVariant }) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const ICONS: Record<ToastVariant, React.ElementType> = { success: CheckCircle2, error: XCircle, info: Info };
const STYLES: Record<ToastVariant, string> = {
  success: "border-ok/30 text-ok",
  error: "border-danger/30 text-danger",
  info: "border-brand-400/30 text-brand-500"
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const toast = useCallback((title: string, opts?: { description?: string; variant?: ToastVariant }) => {
    const id = `${Date.now()}-${Math.random()}`;
    setMessages((prev) => [...prev, { id, title, description: opts?.description, variant: opts?.variant ?? "info" }]);
    setTimeout(() => setMessages((prev) => prev.filter((m) => m.id !== id)), 4200);
  }, []);

  const dismiss = (id: string) => setMessages((prev) => prev.filter((m) => m.id !== id));

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2">
        <AnimatePresence>
          {messages.map((m) => {
            const Icon = ICONS[m.variant];
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40 }}
                className={`flex items-start gap-3 rounded-2xl border bg-white/95 dark:bg-ink-800/95 backdrop-blur px-4 py-3 shadow-card ${STYLES[m.variant]}`}
              >
                <Icon className="mt-0.5 h-5 w-5 shrink-0" />
                <div className="flex-1 text-sm">
                  <p className="font-semibold text-ink-900 dark:text-paper-50">{m.title}</p>
                  {m.description && <p className="mt-0.5 text-ink-700/70 dark:text-paper-100/60">{m.description}</p>}
                </div>
                <button onClick={() => dismiss(m.id)} className="text-ink-700/40 hover:text-ink-700">
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
