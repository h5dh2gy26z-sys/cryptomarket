import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  label?: string;
}

const SIZE_CLASSES = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-12 h-12",
};

export function LoadingSpinner({
  size = "md",
  className,
  label,
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn("flex items-center justify-center gap-2", className)}
      aria-live="polite"
      aria-busy="true"
    >
      <Loader2
        className={cn("animate-spin text-muted-foreground", SIZE_CLASSES[size])}
        aria-hidden="true"
      />
      {label && <span className="text-sm text-muted-foreground">{label}</span>}
      <span className="sr-only">{label ?? "Loading"}</span>
    </div>
  );
}

// Full-page loading state
export function PageLoader({ message = "Loading…" }: { message?: string }) {
  return (
    <div
      className="flex-1 flex items-center justify-center min-h-[60vh]"
      data-ocid="page.loading_state"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-muted flex items-center justify-center">
          <Loader2
            className="w-6 h-6 animate-spin text-primary"
            aria-hidden="true"
          />
        </div>
        <p className="text-sm text-muted-foreground">{message}</p>
        <span className="sr-only">{message}</span>
      </div>
    </div>
  );
}

const SKELETON_KEYS = ["sk-1", "sk-2", "sk-3", "sk-4", "sk-5", "sk-6"];

// Section-level loading (inline)
export function SectionLoader({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3 py-4" data-ocid="section.loading_state">
      {SKELETON_KEYS.slice(0, rows).map((key, i) => (
        <div
          key={key}
          className="h-12 rounded-lg bg-muted/50 animate-pulse"
          style={{ animationDelay: `${i * 100}ms` }}
        />
      ))}
    </div>
  );
}
