"use client";

import { Bell, Moon, Sun, Monitor } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Dropdown, DropdownItem } from "@/components/ui/dropdown";
import { useTheme } from "@/context/theme-context";
import { mockCreator, mockNotifications } from "@/lib/mock-data";

export function Topbar({ title }: { title: string }) {
  const { theme, setTheme } = useTheme();
  const unread = mockNotifications.filter((n) => !n.read).length;

  return (
    <div className="flex items-center justify-between gap-4 border-b border-ink-900/[0.06] bg-paper-50/80 px-4 py-4 backdrop-blur dark:border-white/[0.06] dark:bg-ink-950/80 sm:px-6 lg:px-8">
      <h1 className="font-display text-xl font-bold text-ink-900 dark:text-paper-50">{title}</h1>
      <div className="flex items-center gap-3">
        <Dropdown
          align="right"
          trigger={
            <button className="relative flex h-9 w-9 items-center justify-center rounded-full text-ink-500 hover:bg-ink-900/5 dark:text-paper-100/60 dark:hover:bg-white/10" aria-label="Notifications">
              <Bell className="h-4.5 w-4.5" />
              {unread > 0 && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger" />}
            </button>
          }
        >
          {() => (
            <div className="w-72 p-1">
              <p className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink-400">Notifications</p>
              {mockNotifications.map((n) => (
                <div key={n.id} className="rounded-xl px-2.5 py-2 hover:bg-ink-900/5 dark:hover:bg-white/5">
                  <p className="text-sm font-medium text-ink-900 dark:text-paper-50">{n.title}</p>
                  <p className="text-xs text-ink-500 dark:text-paper-100/50">{n.body}</p>
                </div>
              ))}
            </div>
          )}
        </Dropdown>
        <Dropdown
          align="right"
          trigger={
            <button className="flex h-9 w-9 items-center justify-center rounded-full text-ink-500 hover:bg-ink-900/5 dark:text-paper-100/60 dark:hover:bg-white/10" aria-label="Change theme">
              {theme === "dark" ? <Moon className="h-4.5 w-4.5" /> : theme === "light" ? <Sun className="h-4.5 w-4.5" /> : <Monitor className="h-4.5 w-4.5" />}
            </button>
          }
        >
          {(close) => (
            <>
              <DropdownItem onClick={() => { setTheme("light"); close(); }}>Light</DropdownItem>
              <DropdownItem onClick={() => { setTheme("dark"); close(); }}>Dark</DropdownItem>
              <DropdownItem onClick={() => { setTheme("system"); close(); }}>System</DropdownItem>
            </>
          )}
        </Dropdown>
        <Avatar src={mockCreator.avatarUrl} name={mockCreator.displayName} size={36} />
      </div>
    </div>
  );
}
