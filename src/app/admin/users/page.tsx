"use client";

import { useState } from "react";
import { Topbar } from "@/components/layout/topbar";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Dropdown, DropdownItem } from "@/components/ui/dropdown";
import { MoreVertical, Search } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const USERS = [
  { name: "Alex Smith", email: "alex@example.com", status: "active", earnings: 24580, links: 5 },
  { name: "Olivia Wilson", email: "olivia@example.com", status: "active", earnings: 8420, links: 3 },
  { name: "David Lee", email: "david@example.com", status: "suspended", earnings: 1290, links: 8 },
  { name: "Emma Johnson", email: "emma@example.com", status: "active", earnings: 15200, links: 6 },
  { name: "James Carter", email: "james@example.com", status: "pending", earnings: 0, links: 1 }
];

export default function AdminUsersPage() {
  const [query, setQuery] = useState("");
  const filtered = USERS.filter((u) => u.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <Topbar title="Users" />
      <div className="space-y-4 px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-sm">
          <Input placeholder="Search creators..." leftAdornment={<Search className="h-4 w-4" />} value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <Card>
          <CardBody className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-ink-900/[0.06] text-left text-xs font-semibold uppercase tracking-wide text-ink-400 dark:border-white/[0.06]">
                    <th className="px-5 py-3 font-medium">Creator</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">Links</th>
                    <th className="px-5 py-3 text-right font-medium">Earnings</th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-900/[0.06] dark:divide-white/[0.06]">
                  {filtered.map((u) => (
                    <tr key={u.email}>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar name={u.name} size={32} />
                          <div>
                            <p className="font-medium text-ink-900 dark:text-paper-50">{u.name}</p>
                            <p className="text-xs text-ink-500 dark:text-paper-100/50">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <Badge tone={u.status === "active" ? "success" : u.status === "suspended" ? "danger" : "warn"}>{u.status}</Badge>
                      </td>
                      <td className="px-5 py-3 text-ink-600 dark:text-paper-100/60">{u.links}</td>
                      <td className="px-5 py-3 text-right font-mono font-semibold tabular-nums text-ink-900 dark:text-paper-50">{formatCurrency(u.earnings)}</td>
                      <td className="px-5 py-3 text-right">
                        <Dropdown trigger={<button className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-900/5 dark:hover:bg-white/10"><MoreVertical className="h-4 w-4" /></button>}>
                          {() => (
                            <>
                              <DropdownItem>View profile</DropdownItem>
                              <DropdownItem>View transactions</DropdownItem>
                              <DropdownItem danger>Suspend account</DropdownItem>
                            </>
                          )}
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
