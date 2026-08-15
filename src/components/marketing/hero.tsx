"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, PlayCircle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicLinkCard } from "@/components/profile/link-card";
import { SocialIcons } from "@/components/profile/social-icons";
import { Avatar } from "@/components/ui/avatar";
import { BadgeCheck } from "lucide-react";
import { mockCreator, mockLinks } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-grain">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand-200/60 via-brand-100/30 to-transparent blur-3xl dark:from-brand-500/20 dark:via-brand-500/5" />
      <div className="mx-auto grid max-w-6xl gap-14 px-4 pb-20 pt-14 sm:px-6 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-28 lg:pt-24">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-xs font-semibold text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-200">
            <TrendingUp className="h-3.5 w-3.5" /> Share Links. Get Paid.
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink-950 dark:text-paper-50 sm:text-5xl lg:text-6xl">
            One Link.
            <br />
            Endless Possibilities.
            <br />
            <span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">Get Paid.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base text-ink-600 dark:text-paper-100/60 sm:text-lg">
            Share your content, products and premium links from one beautiful page — and let your audience pay to unlock what matters.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/register">
              <Button size="lg" icon={<ArrowRight className="h-4.5 w-4.5" />} className="w-full sm:w-auto flex-row-reverse">
                Start for Free
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button size="lg" variant="outline" icon={<PlayCircle className="h-4.5 w-4.5" />} className="w-full sm:w-auto">
                See How It Works
              </Button>
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            {[
              ["10K+", "Creators"],
              ["50K+", "Paid Links"],
              ["$2M+", "Earned"]
            ].map(([value, label]) => (
              <div key={label}>
                <p className="font-mono text-2xl font-bold tabular-nums text-ink-950 dark:text-paper-50">{value}</p>
                <p className="text-xs font-medium text-ink-500 dark:text-paper-100/50">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand-300/40 to-transparent blur-2xl" />
          <div className="relative rounded-[2rem] border border-white/60 bg-white/90 p-5 shadow-card backdrop-blur dark:border-white/10 dark:bg-ink-800/90">
            <div className="flex flex-col items-center pb-5 text-center">
              <Avatar src={mockCreator.avatarUrl} name={mockCreator.displayName} size={72} className="ring-4 ring-white dark:ring-ink-800" />
              <p className="mt-3 flex items-center gap-1.5 font-display text-lg font-bold text-ink-950 dark:text-paper-50">
                {mockCreator.displayName} <BadgeCheck className="h-4.5 w-4.5 text-brand-500" />
              </p>
              <p className="text-sm text-ink-500 dark:text-paper-100/50">{mockCreator.bio.split(".")[0]}.</p>
              <div className="mt-3">
                <SocialIcons socials={mockCreator.socials} />
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              {mockLinks.slice(0, 4).map((link) => (
                <PublicLinkCard key={link.id} link={link} onClick={() => {}} />
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-ok/10 px-4 py-2.5 text-xs font-semibold text-ok">
              <span>This month&apos;s earnings</span>
              <span className="font-mono tabular-nums">{formatCurrency(1246.5)}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
