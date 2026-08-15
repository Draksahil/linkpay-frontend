import { Globe, ShoppingBag, Star, Gift, Lock, FileText, Youtube, Instagram, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ElementType> = {
  globe: Globe, "shopping-bag": ShoppingBag, star: Star, gift: Gift, lock: Lock,
  file: FileText, youtube: Youtube, instagram: Instagram, twitter: Twitter
};

const COLORS: Record<string, string> = {
  brand: "bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-200",
  emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
  rose: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300",
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
  slate: "bg-slate-200 text-slate-700 dark:bg-slate-500/20 dark:text-slate-300"
};

export function LinkIcon({ icon, color, className }: { icon: string; color: string; className?: string }) {
  const Icon = ICONS[icon] ?? Globe;
  return (
    <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl2", COLORS[color] ?? COLORS.brand, className)}>
      <Icon className="h-5 w-5" strokeWidth={2} />
    </div>
  );
}
