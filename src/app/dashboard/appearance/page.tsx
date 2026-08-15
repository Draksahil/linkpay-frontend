"use client";

import { useState } from "react";
import { Topbar } from "@/components/layout/topbar";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PublicLinkCard } from "@/components/profile/link-card";
import { SocialIcons } from "@/components/profile/social-icons";
import { Avatar } from "@/components/ui/avatar";
import { BadgeCheck } from "lucide-react";
import { mockCreator, mockLinks } from "@/lib/mock-data";
import { useToast } from "@/context/toast-context";
import { cn } from "@/lib/utils";

const BACKGROUNDS = [
  { id: "brand", label: "Brand gradient", swatch: "linear-gradient(135deg,#8B65F3,#F0A0C0)" },
  { id: "ocean", label: "Ocean", swatch: "linear-gradient(135deg,#2B6CB0,#63B3ED)" },
  { id: "sunset", label: "Sunset", swatch: "linear-gradient(135deg,#F6AD55,#E53E3E)" },
  { id: "mono", label: "Monochrome", swatch: "#12121C" }
];
const BUTTON_STYLES = ["filled", "outline", "soft"] as const;
const RADII = ["sharp", "rounded", "pill"] as const;
const FONTS = [
  { id: "inter", label: "Inter" },
  { id: "space-grotesk", label: "Space Grotesk" },
  { id: "manrope", label: "Manrope" }
];

export default function AppearancePage() {
  const { toast } = useToast();
  const [background, setBackground] = useState("brand");
  const [buttonStyle, setButtonStyle] = useState<typeof BUTTON_STYLES[number]>("soft");
  const [radius, setRadius] = useState<typeof RADII[number]>("rounded");
  const [font, setFont] = useState("space-grotesk");
  const [saving, setSaving] = useState(false);

  const radiusClass = { sharp: "rounded-md", rounded: "rounded-2xl", pill: "rounded-full" }[radius];
  const activeBg = BACKGROUNDS.find((b) => b.id === background)?.swatch;

  const save = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 700));
    setSaving(false);
    toast("Appearance saved", { description: "Your public page has been updated.", variant: "success" });
  };

  return (
    <div>
      <Topbar title="Appearance" />
      <div className="grid gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
        <div className="space-y-6">
          <Card>
            <CardHeader><p className="font-display text-base font-semibold text-ink-900 dark:text-paper-50">Background</p></CardHeader>
            <CardBody className="flex flex-wrap gap-3">
              {BACKGROUNDS.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => setBackground(bg.id)}
                  className={cn("h-16 w-16 rounded-2xl border-2 transition", background === bg.id ? "border-brand-500 shadow-soft" : "border-transparent")}
                  style={{ background: bg.swatch }}
                  aria-label={bg.label}
                />
              ))}
            </CardBody>
          </Card>

          <Card>
            <CardHeader><p className="font-display text-base font-semibold text-ink-900 dark:text-paper-50">Button style</p></CardHeader>
            <CardBody className="flex gap-3">
              {BUTTON_STYLES.map((s) => (
                <button
                  key={s}
                  onClick={() => setButtonStyle(s)}
                  className={cn("flex-1 rounded-xl2 border px-4 py-2.5 text-sm font-semibold capitalize transition", buttonStyle === s ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-200" : "border-ink-900/10 text-ink-500 dark:border-white/10")}
                >
                  {s}
                </button>
              ))}
            </CardBody>
          </Card>

          <Card>
            <CardHeader><p className="font-display text-base font-semibold text-ink-900 dark:text-paper-50">Button radius</p></CardHeader>
            <CardBody className="flex gap-3">
              {RADII.map((r) => (
                <button
                  key={r}
                  onClick={() => setRadius(r)}
                  className={cn("flex-1 border px-4 py-2.5 text-sm font-semibold capitalize transition", { sharp: "rounded-md", rounded: "rounded-2xl", pill: "rounded-full" }[r], radius === r ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-200" : "border-ink-900/10 text-ink-500 dark:border-white/10")}
                >
                  {r}
                </button>
              ))}
            </CardBody>
          </Card>

          <Card>
            <CardHeader><p className="font-display text-base font-semibold text-ink-900 dark:text-paper-50">Font</p></CardHeader>
            <CardBody className="flex flex-wrap gap-3">
              {FONTS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFont(f.id)}
                  className={cn("rounded-xl2 border px-4 py-2.5 text-sm font-semibold transition", font === f.id ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-200" : "border-ink-900/10 text-ink-500 dark:border-white/10")}
                >
                  {f.label}
                </button>
              ))}
            </CardBody>
          </Card>

          <Button onClick={save} loading={saving} className="w-full sm:w-auto">Save changes</Button>
        </div>

        <div className="lg:sticky lg:top-6 lg:self-start">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wide text-ink-400">Live preview</p>
          <div className="mx-auto w-full max-w-[320px] overflow-hidden rounded-[2rem] border-4 border-ink-900 shadow-card dark:border-white/20">
            <div className="h-full min-h-[560px] p-5" style={{ background: activeBg }}>
              <div className="flex flex-col items-center pt-4 text-center">
                <Avatar src={mockCreator.avatarUrl} name={mockCreator.displayName} size={64} className="ring-4 ring-white/80" />
                <p className="mt-3 flex items-center gap-1.5 text-base font-bold text-white drop-shadow">
                  {mockCreator.displayName} <BadgeCheck className="h-4 w-4" />
                </p>
                <p className="text-xs text-white/80">{mockCreator.bio.split(".")[0]}.</p>
                <div className="mt-3"><SocialIcons socials={mockCreator.socials} /></div>
              </div>
              <div className="mt-5 flex flex-col gap-2.5">
                {mockLinks.slice(0, 4).map((link) => (
                  <div key={link.id} className={cn(radiusClass)}>
                    <PublicLinkCard link={link} onClick={() => {}} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
