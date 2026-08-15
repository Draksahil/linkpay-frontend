import { Link2, LayoutTemplate, ShieldCheck, BarChart3, Paintbrush, QrCode, Smartphone, LayoutDashboard } from "lucide-react";

const FEATURES = [
  { icon: Link2, title: "Monetize Your Links", desc: "Turn any link into a paid experience." },
  { icon: LayoutTemplate, title: "One Beautiful Profile", desc: "Share everything from one customizable page." },
  { icon: ShieldCheck, title: "Instant Payments", desc: "Let visitors securely pay to unlock premium links." },
  { icon: BarChart3, title: "Analytics", desc: "Understand views, clicks and revenue." },
  { icon: Paintbrush, title: "Customization", desc: "Change colors, fonts, layouts and themes." },
  { icon: QrCode, title: "QR Codes", desc: "Share your LinkPay page anywhere." },
  { icon: Smartphone, title: "Mobile Optimized", desc: "Beautiful experience on every device." },
  { icon: LayoutDashboard, title: "Creator Dashboard", desc: "Manage links, earnings and analytics from one place." }
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-300">Powerful Features</p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-950 dark:text-paper-50 sm:text-4xl">
          Everything you need to get paid for what you make
        </h2>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f) => (
          <div key={f.title} className="group rounded-2xl border border-ink-900/[0.06] bg-white p-5 transition hover:-translate-y-1 hover:shadow-card dark:border-white/[0.06] dark:bg-ink-800">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl2 bg-brand-50 text-brand-600 transition group-hover:bg-brand-500 group-hover:text-white dark:bg-brand-500/15 dark:text-brand-300">
              <f.icon className="h-5 w-5" />
            </div>
            <p className="mt-4 font-display text-base font-semibold text-ink-950 dark:text-paper-50">{f.title}</p>
            <p className="mt-1.5 text-sm text-ink-500 dark:text-paper-100/50">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
