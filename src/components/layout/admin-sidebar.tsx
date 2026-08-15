"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, Receipt, FileBarChart, LogOut } from "lucide-react";
import { Logo } from "./logo";

const NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Payments", href: "/admin/payments", icon: Receipt },
  { label: "Reports", href: "/admin/reports", icon: FileBarChart }
];

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-ink-900/[0.06] bg-ink-950 px-4 py-6 dark:border-white/[0.06] lg:flex">
      <div className="px-2">
        <Logo className="text-white" />
        <span className="ml-10 mt-0.5 block text-[10px] font-semibold uppercase tracking-widest text-brand-300">Admin</span>
      </div>
      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={cn("flex items-center gap-3 rounded-xl2 px-3 py-2.5 text-sm font-medium transition-colors", active ? "bg-brand-500/20 text-brand-200" : "text-white/60 hover:bg-white/5 hover:text-white")}>
              <item.icon className="h-4.5 w-4.5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <Link href="/login" className="flex items-center gap-3 rounded-xl2 px-3 py-2.5 text-sm font-medium text-white/40 hover:bg-danger/10 hover:text-danger">
        <LogOut className="h-4.5 w-4.5" /> Log Out
      </Link>
    </aside>
  );
}
