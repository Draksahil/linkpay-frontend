import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

const PLANS = [
  {
    name: "Starter",
    price: "Free",
    desc: "For creators just getting started.",
    features: ["Up to 5 links", "1 paid link", "Basic analytics", "LinkPay branding"],
    cta: "Start for Free"
  },
  {
    name: "Pro",
    price: "$9/mo",
    desc: "For creators building real income.",
    features: ["Unlimited links", "Unlimited paid links", "Advanced analytics", "Custom branding", "Priority payouts"],
    cta: "Go Pro",
    highlighted: true
  },
  {
    name: "Business",
    price: "$29/mo",
    desc: "For teams and growing brands.",
    features: ["Everything in Pro", "Team accounts", "API access", "Dedicated support"],
    cta: "Contact Sales"
  }
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-ink-950 dark:text-paper-50">Simple pricing that scales with you</h1>
          <p className="mt-3 text-ink-500 dark:text-paper-100/50">LinkPay only takes a small fee on paid unlocks — no hidden costs.</p>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-[1.75rem] border p-7 ${plan.highlighted ? "border-brand-400 bg-gradient-to-b from-brand-50 to-white shadow-card dark:from-brand-500/10 dark:to-ink-800 dark:border-brand-500/40" : "border-ink-900/[0.06] bg-white dark:border-white/[0.06] dark:bg-ink-800"}`}
            >
              <p className="font-display text-lg font-semibold text-ink-950 dark:text-paper-50">{plan.name}</p>
              <p className="mt-2 font-mono text-4xl font-bold tabular-nums text-ink-950 dark:text-paper-50">{plan.price}</p>
              <p className="mt-1.5 text-sm text-ink-500 dark:text-paper-100/50">{plan.desc}</p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-ink-700 dark:text-paper-100/70">
                    <Check className="h-4 w-4 shrink-0 text-brand-500" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/register">
                <Button className="mt-7 w-full" variant={plan.highlighted ? "primary" : "outline"}>{plan.cta}</Button>
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
