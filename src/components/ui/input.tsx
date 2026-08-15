import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftAdornment?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, leftAdornment, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-ink-800 dark:text-paper-100">
            {label}
          </label>
        )}
        <div className="relative">
          {leftAdornment && (
            <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-ink-400">{leftAdornment}</div>
          )}
          <input
            id={inputId}
            ref={ref}
            aria-invalid={!!error}
            className={cn(
              "h-11 w-full rounded-xl2 border bg-white px-3.5 text-sm text-ink-900 placeholder:text-ink-400 outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100 dark:bg-ink-900 dark:text-paper-50 dark:placeholder:text-paper-100/30 dark:focus:ring-brand-500/20",
              error ? "border-danger focus:border-danger focus:ring-danger/10" : "border-ink-900/10 dark:border-white/10",
              leftAdornment && "pl-10",
              className
            )}
            {...props}
          />
        </div>
        {error ? <p className="text-xs font-medium text-danger">{error}</p> : hint ? <p className="text-xs text-ink-400">{hint}</p> : null}
      </div>
    );
  }
);
Input.displayName = "Input";
