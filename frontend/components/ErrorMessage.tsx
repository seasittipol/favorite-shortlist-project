import { X, AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

export default function ErrorMessage({
  message,
  onDismiss,
}: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div className="p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded-lg flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <span>{message}</span>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="ml-4 text-red-700 dark:text-red-200 hover:text-red-900 dark:hover:text-red-100 flex-shrink-0"
          aria-label="Dismiss error"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
