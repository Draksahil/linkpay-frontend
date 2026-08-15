import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-shimmer rounded-lg bg-[linear-gradient(110deg,theme(colors.ink.900/6%)_8%,theme(colors.ink.900/12%)_18%,theme(colors.ink.900/6%)_33%)] bg-[length:200%_100%] dark:bg-[linear-gradient(110deg,theme(colors.white/6%)_8%,theme(colors.white/14%)_18%,theme(colors.white/6%)_33%)]",
        className
      )}
    />
  );
}
