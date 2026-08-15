import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-gradient-to-b from-brand-500 to-brand-600 text-white shadow-soft hover:from-brand-400 hover:to-brand-500 focus-visible:ring-brand-300",
  secondary: "bg-ink-900 text-white hover:bg-ink-800 focus-visible:ring-ink-400 dark:bg-paper-50 dark:text-ink-900",
  outline: "border border-ink-900/10 bg-white text-ink-900 hover:border-ink-900/20 hover:bg-ink-50 dark:border-white/10 dark:bg-transparent dark:text-paper-50 dark:hover:bg-white/5 focus-visible:ring-brand-300",
  ghost: "text-ink-700 hover:bg-ink-900/5 dark:text-paper-100 dark:hover:bg-white/5 focus-visible:ring-brand-300",
  danger: "bg-danger text-white hover:bg-danger/90 focus-visible:ring-danger/40"
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-13 px-7 text-base gap-2.5"
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, icon, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center rounded-xl2 font-semibold transition-all duration-150 ease-out active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-ink-900",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
