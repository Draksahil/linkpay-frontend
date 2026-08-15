import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <div className="flex flex-col items-center justify-between gap-6 rounded-[2rem] bg-gradient-to-br from-ink-950 to-brand-900 px-6 py-10 text-center sm:flex-row sm:px-10 sm:text-left">
        <div className="flex items-center gap-4">
          <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white sm:flex">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="font-display text-xl font-bold text-white">Start your journey today!</p>
            <p className="text-sm text-white/60">Join thousands of creators who are earning with LinkPay.</p>
          </div>
        </div>
        <Link href="/register">
          <Button variant="secondary" size="lg" className="whitespace-nowrap bg-white text-ink-950 hover:bg-paper-100" icon={<ArrowRight className="h-4.5 w-4.5" />}>
            Create Your Page Now
          </Button>
        </Link>
      </div>
    </section>
  );
}
