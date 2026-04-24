import { Badge } from "@/components/ui/badge";
import type { TransactionStatus } from "../../types";

interface StatusBadgeProps {
  status: TransactionStatus;
  className?: string;
}

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  pending: {
    label: "Pending",
    className: "bg-primary/10 text-primary border-primary/20 font-medium",
  },
  paid: {
    label: "Paid",
    className: "bg-accent/10 text-accent border-accent/30 font-medium",
  },
  failed: {
    label: "Failed",
    className:
      "bg-destructive/10 text-destructive border-destructive/20 font-medium",
  },
  refunded: {
    label: "Refunded",
    className: "bg-muted text-muted-foreground border-border font-medium",
  },
};

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  return (
    <Badge
      variant="outline"
      className={`text-xs ${config.className} ${className}`}
      data-ocid={`status.${status}.badge`}
    >
      {config.label}
    </Badge>
  );
}
