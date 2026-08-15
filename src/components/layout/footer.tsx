import Link from "next/link";
import { Logo } from "./logo";
import { Instagram, Twitter, Youtube } from "lucide-react";

const COLUMNS = [
  { title: "Product", links: [{ label: "Features", href: "/#features" }, { label: "Pricing", href: "/pricing" }, { label: "How It Works", href: "/how-it-works" }] },
  { title: "Company", links: [{ label: "Blog", href: "/blog" }, { label: "Contact", href: "/contact" }, { label: "FAQ", href: "/faq" }] },
  { title: "Legal", links: [{ label: "Privacy Policy", href: "/privacy" }, { label: "Terms & Conditions", href: "/terms" }] }
];

export function Footer() {
  return (
    <footer className="border-t border-ink-900/[0.06] bg-paper-50 dark:border-white/[0.06] dark:bg-ink-950">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <Logo />
            <p className="mt-3 max-w-xs text-sm text-ink-500 dark:text-paper-100/50">
              The link-in-bio page that pays you back. Share what you make, charge for what matters.
            </p>
            <div className="mt-5 flex gap-3">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-900/5 text-ink-600 hover:bg-brand-500 hover:text-white dark:bg-white/5 dark:text-paper-100">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-ink-900 dark:text-paper-50">{col.title}</p>
              <ul className="mt-3 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-ink-500 hover:text-ink-900 dark:text-paper-100/50 dark:hover:text-paper-50">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-ink-900/[0.06] pt-6 text-xs text-ink-400 dark:border-white/[0.06]">
          © {new Date().getFullYear()} LinkPay. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
