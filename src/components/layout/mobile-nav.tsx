"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Link2, BarChart3, Wallet, UserRound } from "lucide-react";

const NAV = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Links", href: "/dashboard/links", icon: Link2 },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Payments", href: "/dashboard/payments", icon: Wallet },
  { label: "Profile", href: "/dashboard/profile", icon: UserRound }
];

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 flex border-t border-ink-900/[0.06] bg-white/95 px-2 py-2 backdrop-blur dark:border-white/[0.06] dark:bg-ink-900/95 lg:hidden">
      {NAV.map((item) => {
        const active = pathname === item.href;
        return (
          <Link key={item.href} href={item.href} className="flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5">
            <item.icon className={cn("h-5 w-5", active ? "text-brand-600" : "text-ink-400 dark:text-paper-100/40")} />
            <span className={cn("text-[10px] font-medium", active ? "text-brand-600" : "text-ink-400 dark:text-paper-100/40")}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
