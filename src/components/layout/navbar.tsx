"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";

const NAV = [
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" }
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-900/[0.06] bg-paper-50/80 backdrop-blur-lg dark:border-white/[0.06] dark:bg-ink-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-ink-600 transition hover:text-ink-950 dark:text-paper-100/70 dark:hover:text-paper-50">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login" className="text-sm font-semibold text-ink-700 hover:text-ink-950 dark:text-paper-100/80 dark:hover:text-paper-50">
            Log In
          </Link>
          <Link href="/register">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
        <button aria-label="Toggle menu" className="p-2 text-ink-700 dark:text-paper-100 md:hidden" onClick={() => setOpen((o) => !o)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-ink-900/[0.06] bg-paper-50 dark:border-white/[0.06] dark:bg-ink-950 md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {NAV.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-ink-900/5 dark:text-paper-100 dark:hover:bg-white/5">
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 flex flex-col gap-2 border-t border-ink-900/[0.06] pt-3 dark:border-white/[0.06]">
                <Link href="/login" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full">Log In</Button>
                </Link>
                <Link href="/register" onClick={() => setOpen(false)}>
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
