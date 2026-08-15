import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
        <Compass className="h-8 w-8" />
      </div>
      <h1 className="mt-5 font-display text-2xl font-bold text-ink-950 dark:text-paper-50">Page not found</h1>
      <p className="mt-2 max-w-sm text-sm text-ink-500 dark:text-paper-100/50">The page you're looking for doesn't exist or has moved.</p>
      <Link href="/"><Button className="mt-6">Back to Home</Button></Link>
    </div>
  );
}
