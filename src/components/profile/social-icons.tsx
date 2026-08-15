import { Instagram, Twitter, Youtube, Globe } from "lucide-react";
import { SocialPlatform } from "@/types";

const ICONS: Record<SocialPlatform, React.ElementType> = {
  instagram: Instagram, twitter: Twitter, youtube: Youtube, tiktok: Globe, website: Globe
};

export function SocialIcons({ socials }: { socials: { platform: SocialPlatform; url: string }[] }) {
  return (
    <div className="flex items-center justify-center gap-3">
      {socials.map((s) => {
        const Icon = ICONS[s.platform];
        return (
          <a key={s.platform} href={s.url} target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-900/5 text-ink-600 transition hover:bg-brand-500 hover:text-white dark:bg-white/10 dark:text-paper-100">
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
}
