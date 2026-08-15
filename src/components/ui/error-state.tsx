import { AlertTriangle } from "lucide-react";
import { Button } from "./button";

export function ErrorState({ message = "Something went wrong.", onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-danger/20 bg-danger/5 px-6 py-14 text-center">
      <AlertTriangle className="h-8 w-8 text-danger" />
      <p className="text-sm font-medium text-ink-900 dark:text-paper-50">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
