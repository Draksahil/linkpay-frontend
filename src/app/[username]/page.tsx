"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { SocialIcons } from "@/components/profile/social-icons";
import { PublicLinkCard } from "@/components/profile/link-card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { BadgeCheck, Link2 } from "lucide-react";
import { creatorsService } from "@/services/creators";
import { linksService } from "@/services/links";
import { CreatorLink, CreatorProfile } from "@/types";
import Link from "next/link";

export default function PublicCreatorPage() {
  const params = useParams<{ username: string }>();
  const router = useRouter();
  const [creator, setCreator] = useState<CreatorProfile | null>(null);
  const [links, setLinks] = useState<CreatorLink[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    creatorsService.getByUsername(params.username).then((res) => {
      if (!res.success) return setError(true);
      setCreator(res.data ?? null);
      linksService.list().then((r) => r.success && setLinks(r.data ?? []));
    });
  }, [params.username]);

  const handleLinkClick = (link: CreatorLink) => {
    if (link.type === "free") {
      window.open(link.url, "_blank");
      return;
    }
    router.push(`/unlock/${link.id}`);
  };

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <ErrorState message="This LinkPay page doesn't exist." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-100 via-paper-50 to-paper-50 dark:from-brand-900/40 dark:via-ink-950 dark:to-ink-950">
      <div className="mx-auto max-w-md px-4 py-12 sm:py-16">
        <div className="flex flex-col items-center text-center">
          {creator ? (
            <>
              <Avatar src={creator.avatarUrl} name={creator.displayName} size={88} className="ring-4 ring-white dark:ring-ink-900" />
              <p className="mt-4 flex items-center gap-1.5 font-display text-xl font-bold text-ink-950 dark:text-paper-50">
                {creator.displayName} {creator.verified && <BadgeCheck className="h-5 w-5 text-brand-500" />}
              </p>
              <p className="mt-1 max-w-xs text-sm text-ink-600 dark:text-paper-100/60">{creator.bio}</p>
              <div className="mt-4"><SocialIcons socials={creator.socials} /></div>
            </>
          ) : (
            <>
              <Skeleton className="h-[88px] w-[88px] rounded-full" />
              <Skeleton className="mt-4 h-5 w-40" />
              <Skeleton className="mt-2 h-4 w-56" />
            </>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-3">
          {links
            ? links.filter((l) => l.isActive).map((link) => <PublicLinkCard key={link.id} link={link} onClick={() => handleLinkClick(link)} />)
            : Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-[68px]" />)}
        </div>

        <Link href="/" className="mt-10 flex items-center justify-center gap-1.5 text-xs font-medium text-ink-400 hover:text-brand-600">
          <Link2 className="h-3.5 w-3.5" /> Create your own LinkPay
        </Link>
      </div>
    </div>
  );
}
