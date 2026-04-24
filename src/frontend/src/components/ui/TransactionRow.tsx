import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  RefreshCw,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import type { Transaction } from "../../types";
import { TransactionStatus } from "../../types";
import { StatusBadge } from "./StatusBadge";

interface TransactionRowProps {
  transaction: Transaction;
  index?: number;
  onRequestPayout?: (txnId: bigint) => void;
  showPayoutButton?: boolean;
}

const STATUS_ICONS = {
  [TransactionStatus.pending]: Clock,
  [TransactionStatus.paid]: CheckCircle2,
  [TransactionStatus.failed]: XCircle,
  [TransactionStatus.refunded]: RefreshCw,
};

export function TransactionRow({
  transaction: txn,
  index = 0,
  onRequestPayout,
  showPayoutButton = false,
}: TransactionRowProps) {
  const [expanded, setExpanded] = useState(false);
  const StatusIcon = STATUS_ICONS[txn.status] ?? Clock;

  const createdDate = new Date(Number(txn.createdAt) / 1_000_000);
  const timeAgo = formatDistanceToNow(createdDate, { addSuffix: true });

  return (
    <div
      className="border border-border rounded-lg bg-card overflow-hidden transition-fast hover:border-border/80"
      data-ocid={`transaction.item.${index + 1}`}
    >
      {/* Main row */}
      <button
        type="button"
        className="w-full flex items-center gap-3 px-4 py-3.5 cursor-pointer select-none text-left"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        {/* Status icon */}
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            txn.status === TransactionStatus.paid
              ? "bg-accent/10"
              : txn.status === TransactionStatus.failed
                ? "bg-destructive/10"
                : txn.status === TransactionStatus.refunded
                  ? "bg-muted"
                  : "bg-primary/10"
          }`}
        >
          <StatusIcon
            className={`w-4 h-4 ${
              txn.status === TransactionStatus.paid
                ? "text-accent"
                : txn.status === TransactionStatus.failed
                  ? "text-destructive"
                  : txn.status === TransactionStatus.refunded
                    ? "text-muted-foreground"
                    : "text-primary"
            }`}
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs text-muted-foreground">
              #{txn.id.toString()}
            </span>
            {txn.cryptoCurrency && (
              <Badge
                variant="outline"
                className="text-xs font-mono px-1.5 py-0"
              >
                {txn.cryptoCurrency}
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{timeAgo}</p>
        </div>

        {/* Amounts */}
        <div className="text-right flex-shrink-0">
          <p className="font-display font-semibold text-foreground">
            ${txn.amountUsd.toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground">
            Seller: ${txn.sellerAmountUsd.toFixed(2)}
          </p>
        </div>

        {/* Status badge */}
        <StatusBadge status={txn.status} />

        {/* Expand toggle */}
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        )}
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div className="border-t border-border bg-muted/30 px-4 py-4 space-y-3 animate-slide-in">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <DetailRow
              label="Platform fee"
              value={`$${txn.platformFeeUsd.toFixed(2)}`}
            />
            <DetailRow
              label="Seller receives"
              value={`$${txn.sellerAmountUsd.toFixed(2)}`}
              highlight
            />
            {txn.cryptoCurrency && (
              <DetailRow label="Paid with" value={txn.cryptoCurrency} mono />
            )}
            {txn.cryptoAddress && (
              <DetailRow
                label="Payment address"
                value={`${txn.cryptoAddress.slice(0, 16)}…`}
                mono
              />
            )}
            {txn.cryptoTxnHash && (
              <DetailRow
                label="Txn hash"
                value={`${txn.cryptoTxnHash.slice(0, 16)}…`}
                mono
              />
            )}
            {txn.stripeTransferId && (
              <DetailRow
                label="Stripe transfer"
                value={txn.stripeTransferId.slice(0, 16)}
                mono
              />
            )}
          </div>

          {showPayoutButton &&
            txn.status === TransactionStatus.paid &&
            !txn.stripeTransferId && (
              <>
                <Separator />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRequestPayout?.(txn.id);
                  }}
                  data-ocid={`transaction.payout_button.${index + 1}`}
                  className="border-accent text-accent hover:bg-accent/10"
                >
                  Request Payout
                </Button>
              </>
            )}
        </div>
      )}
    </div>
  );
}

function DetailRow({
  label,
  value,
  mono = false,
  highlight = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
  highlight?: boolean;
}) {
  return (
    <>
      <span className="text-muted-foreground text-xs">{label}</span>
      <span
        className={`text-xs truncate ${
          mono ? "font-mono text-foreground" : ""
        } ${highlight ? "font-semibold text-accent" : "text-foreground"}`}
      >
        {value}
      </span>
    </>
  );
}

export function TransactionRowSkeleton() {
  return (
    <div className="border border-border rounded-lg bg-card p-4 flex items-center gap-3">
      <Skeleton className="w-8 h-8 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-16" />
      </div>
      <div className="space-y-1 text-right">
        <Skeleton className="h-5 w-20 ml-auto" />
        <Skeleton className="h-3 w-16 ml-auto" />
      </div>
      <Skeleton className="h-6 w-16" />
    </div>
  );
}
