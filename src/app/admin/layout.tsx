import { AdminSidebar } from "@/components/layout/admin-sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-paper-100/60 dark:bg-ink-950">
      <AdminSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
