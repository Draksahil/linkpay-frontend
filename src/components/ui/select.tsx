import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { forwardRef, SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> { label?: string; }

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ className, label, id, children, ...props }, ref) => {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-ink-800 dark:text-paper-100">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          ref={ref}
          className={cn(
            "h-11 w-full appearance-none rounded-xl2 border border-ink-900/10 bg-white px-3.5 pr-9 text-sm text-ink-900 outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100 dark:border-white/10 dark:bg-ink-900 dark:text-paper-50",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
      </div>
    </div>
  );
});
Select.displayName = "Select";
