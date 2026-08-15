"use client";

import { useState } from "react";
import { Topbar } from "@/components/layout/topbar";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { ConfirmDialog } from "@/components/ui/modal";
import { useToast } from "@/context/toast-context";
import { mockCreator } from "@/lib/mock-data";

export default function SettingsPage() {
  const { toast } = useToast();
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [payoutNotifs, setPayoutNotifs] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div>
      <Topbar title="Settings" />
      <div className="mx-auto max-w-2xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <Card>
          <CardHeader><p className="font-display text-base font-semibold text-ink-900 dark:text-paper-50">Account</p></CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="Email" defaultValue={mockCreator.username + "@example.com"} type="email" />
            <Button variant="outline" className="self-start" onClick={() => toast("Password change link sent", { variant: "success" })}>Change password</Button>
          </CardBody>
        </Card>

        <Card>
          <CardHeader><p className="font-display text-base font-semibold text-ink-900 dark:text-paper-50">Notifications</p></CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Toggle checked={emailNotifs} onChange={setEmailNotifs} label="Email notifications" description="Get notified when someone unlocks a paid link" />
            <Toggle checked={payoutNotifs} onChange={setPayoutNotifs} label="Payout notifications" description="Get notified when a payout completes" />
            <Toggle checked={marketingEmails} onChange={setMarketingEmails} label="Product updates" description="Occasional emails about new LinkPay features" />
          </CardBody>
        </Card>

        <Card>
          <CardHeader><p className="font-display text-base font-semibold text-ink-900 dark:text-paper-50">Payment settings</p></CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="Default currency" defaultValue="USD" disabled />
            <p className="text-xs text-ink-500 dark:text-paper-100/50">Manage payout methods from the Withdrawals page.</p>
          </CardBody>
        </Card>

        <Card className="border-danger/20">
          <CardHeader><p className="font-display text-base font-semibold text-danger">Danger zone</p></CardHeader>
          <CardBody>
            <p className="text-sm text-ink-500 dark:text-paper-100/50">Deleting your account removes your public page and all links permanently.</p>
            <Button variant="danger" className="mt-4" onClick={() => setConfirmOpen(true)}>Delete account</Button>
          </CardBody>
        </Card>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => toast("This is a mock action — no account was deleted.", { variant: "info" })}
        title="Delete your account?"
        description="This action is permanent and cannot be undone. All your links, analytics, and earnings history will be lost."
        confirmLabel="Delete account"
        danger
      />
    </div>
  );
}
