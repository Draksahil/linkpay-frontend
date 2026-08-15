import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-paper-100/60 dark:bg-ink-950">
      <Sidebar />
      <div className="flex-1 pb-20 lg:pb-0">{children}</div>
      <MobileNav />
    </div>
  );
}
