"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useRef, useState } from "react";

interface DropdownProps { trigger: ReactNode; children: (close: () => void) => ReactNode; align?: "left" | "right"; }

export function Dropdown({ trigger, children, align = "right" }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setOpen((o) => !o)}>{trigger}</div>
      {open && (
        <div className={cn("absolute z-40 mt-2 min-w-[200px] rounded-2xl border border-ink-900/[0.06] bg-white p-1.5 shadow-card dark:border-white/10 dark:bg-ink-800", align === "right" ? "right-0" : "left-0")}>
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  );
}

export function DropdownItem({ children, onClick, danger }: { children: ReactNode; onClick?: () => void; danger?: boolean; }) {
  return (
    <button onClick={onClick} className={cn("flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors", danger ? "text-danger hover:bg-danger/10" : "text-ink-700 hover:bg-ink-900/5 dark:text-paper-100 dark:hover:bg-white/10")}>
      {children}
    </button>
  );
}
