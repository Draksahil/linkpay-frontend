"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Link2, Palette, BarChart3, Wallet, Banknote, UserRound, Settings, LogOut
} from "lucide-react";
import { Logo } from "./logo";

const NAV = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Links", href: "/dashboard/links", icon: Link2 },
  { label: "Appearance", href: "/dashboard/appearance", icon: Palette },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Payments", href: "/dashboard/payments", icon: Wallet },
  { label: "Withdrawals", href: "/dashboard/withdrawals", icon: Banknote },
  { label: "Profile", href: "/dashboard/profile", icon: UserRound },
  { label: "Settings", href: "/dashboard/settings", icon: Settings }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-ink-900/[0.06] bg-white px-4 py-6 dark:border-white/[0.06] dark:bg-ink-900 lg:flex">
      <Logo className="px-2" />
      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl2 px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-200" : "text-ink-600 hover:bg-ink-900/5 dark:text-paper-100/70 dark:hover:bg-white/5"
              )}
            >
              <item.icon className="h-4.5 w-4.5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <Link href="/login" className="flex items-center gap-3 rounded-xl2 px-3 py-2.5 text-sm font-medium text-ink-500 hover:bg-danger/5 hover:text-danger dark:text-paper-100/50">
        <LogOut className="h-4.5 w-4.5" />
        Log Out
      </Link>
    </aside>
  );
}
