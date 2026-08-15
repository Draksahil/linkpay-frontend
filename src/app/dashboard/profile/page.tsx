"use client";

import { useState } from "react";
import { Topbar } from "@/components/layout/topbar";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { mockCreator } from "@/lib/mock-data";
import { useToast } from "@/context/toast-context";
import { creatorsService } from "@/services/creators";

export default function ProfilePage() {
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState(mockCreator.displayName);
  const [username, setUsername] = useState(mockCreator.username);
  const [bio, setBio] = useState(mockCreator.bio);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    await creatorsService.updateProfile({ displayName, username, bio });
    setSaving(false);
    toast("Profile updated", { variant: "success" });
  };

  return (
    <div>
      <Topbar title="Profile" />
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <Card className="mx-auto max-w-xl">
          <CardHeader><p className="font-display text-base font-semibold text-ink-900 dark:text-paper-50">Profile details</p></CardHeader>
          <CardBody className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <Avatar src={mockCreator.avatarUrl} name={displayName} size={64} />
              <Button variant="outline" size="sm">Change photo</Button>
            </div>
            <Input label="Display name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            <Input label="Username" leftAdornment={<span className="text-xs">linkpay.com/</span>} value={username} onChange={(e) => setUsername(e.target.value)} />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-ink-800 dark:text-paper-100">Bio</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={160}
                className="rounded-xl2 border border-ink-900/10 bg-white px-3.5 py-3 text-sm text-ink-900 outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100 dark:border-white/10 dark:bg-ink-900 dark:text-paper-50"
              />
              <p className="text-right text-xs text-ink-400">{bio.length}/160</p>
            </div>
            <Button onClick={save} loading={saving} className="self-start">Save changes</Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
