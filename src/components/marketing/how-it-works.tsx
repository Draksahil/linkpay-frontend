import { Lock, Link2, DollarSign } from "lucide-react";

const STEPS = [
  { icon: Lock, step: "Step 1", title: "Create Your Page", desc: "Create your LinkPay profile and add your links." },
  { icon: Link2, step: "Step 2", title: "Add Paid Links", desc: "Choose which links should be free and which should require payment." },
  { icon: DollarSign, step: "Step 3", title: "Get Paid", desc: "Visitors pay to unlock premium links and you earn money." }
];

export function HowItWorks() {
  return (
    <section className="bg-white py-20 dark:bg-ink-900/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-300">How It Works</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-950 dark:text-paper-50 sm:text-4xl">Start earning in 3 simple steps</h2>
        </div>
        <div className="relative mt-14 grid gap-8 sm:grid-cols-3">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-ink-900/10 to-transparent sm:block dark:via-white/10" />
          {STEPS.map((s) => (
            <div key={s.step} className="relative flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-soft">
                <s.icon className="h-7 w-7" />
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-brand-500">{s.step}</p>
              <p className="mt-1 font-display text-lg font-semibold text-ink-950 dark:text-paper-50">{s.title}</p>
              <p className="mt-1.5 max-w-[220px] text-sm text-ink-500 dark:text-paper-100/50">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
