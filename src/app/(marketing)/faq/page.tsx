"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  { q: "How does LinkPay make money?", a: "LinkPay takes a small platform fee on every paid unlock. Free links stay completely free to add and share." },
  { q: "Which payment methods are supported?", a: "Visitors can pay with cards and popular local payment methods through our payment partners. Creators can withdraw via bank transfer, UPI, or PayPal." },
  { q: "How fast do I get paid?", a: "Successful payments land in your available balance immediately. Payouts to your bank or UPI typically complete within 2 business days." },
  { q: "Can I password-protect a link instead of charging for it?", a: "Yes. Links can be free, paid, or password-protected — you choose per link." },
  { q: "Is there a limit to how many links I can add?", a: "Free plans include up to 5 links. Pro and Business plans support unlimited links." }
];

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
        <h1 className="text-center font-display text-4xl font-bold tracking-tight text-ink-950 dark:text-paper-50">Frequently asked questions</h1>
        <div className="mt-10 flex flex-col divide-y divide-ink-900/[0.06] rounded-2xl border border-ink-900/[0.06] bg-white dark:divide-white/[0.06] dark:border-white/[0.06] dark:bg-ink-800">
          {FAQS.map((f, i) => (
            <div key={f.q}>
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
                <span className="text-sm font-semibold text-ink-900 dark:text-paper-50">{f.q}</span>
                <ChevronDown className={cn("h-4 w-4 shrink-0 text-ink-400 transition-transform", open === i && "rotate-180")} />
              </button>
              {open === i && <p className="px-5 pb-4 text-sm text-ink-500 dark:text-paper-100/50">{f.a}</p>}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
