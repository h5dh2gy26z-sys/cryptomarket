import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  CheckCircle2,
  Clock,
  Copy,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PageLoader } from "../components/ui/LoadingSpinner";
import { StatusBadge } from "../components/ui/StatusBadge";
import { useTransaction } from "../hooks/use-backend";
import { TransactionStatus } from "../types";

const STEPS = ["Initiated", "Confirmed", "Processing", "Paid"] as const;

function getStepIndex(status: TransactionStatus): number {
  switch (status) {
    case TransactionStatus.pending:
      return 1;
    case TransactionStatus.paid:
      return 4;
    case TransactionStatus.failed:
      return -1;
    case TransactionStatus.refunded:
      return -1;
    default:
      return 0;
  }
}

export default function CheckoutPage() {
  const { txnId } = useParams({ from: "/checkout/$txnId" });
  const navigate = useNavigate();
  const txnIdBig = BigInt(txnId);

  const { data: txn, isLoading, refetch } = useTransaction(txnIdBig);
  const [copiedAddress, setCopiedAddress] = useState(false);

  useEffect(() => {
    if (txn?.status === TransactionStatus.paid) {
      toast.success("Payment confirmed! Transaction complete.");
    }
  }, [txn?.status]);

  async function copyAddress() {
    if (!txn?.cryptoAddress) return;
    await navigator.clipboard.writeText(txn.cryptoAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
    toast.success("Address copied to clipboard");
  }

  if (isLoading) return <PageLoader message="Loading checkout…" />;

  if (!txn) {
    return (
      <div
        className="container mx-auto px-4 py-16 text-center"
        data-ocid="checkout.not_found.error_state"
      >
        <p className="text-muted-foreground">Transaction not found.</p>
        <Button
          variant="outline"
          onClick={() => navigate({ to: "/" })}
          className="mt-4"
        >
          Back to browse
        </Button>
      </div>
    );
  }

  const stepIndex = getStepIndex(txn.status);
  const isPaid = txn.status === TransactionStatus.paid;
  const isFailed = txn.status === TransactionStatus.failed;

  return (
    <div
      className="container mx-auto px-4 py-8 max-w-lg"
      data-ocid="checkout.page"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="font-display font-bold text-2xl text-foreground">
            {isPaid
              ? "Payment Complete!"
              : isFailed
                ? "Payment Failed"
                : "Awaiting Payment"}
          </h1>
          <p className="text-sm text-muted-foreground font-mono">
            Transaction #{txn.id.toString()}
          </p>
        </div>

        {/* Progress */}
        {!isFailed && (
          <div
            className="flex items-center gap-1"
            data-ocid="checkout.progress.panel"
          >
            {STEPS.map((step, i) => {
              const completed = stepIndex > i;
              const active = stepIndex === i + 1;
              return (
                <div
                  key={step}
                  className="flex items-center flex-1 last:flex-none"
                >
                  <div className="flex flex-col items-center gap-1 flex-shrink-0">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-smooth ${
                        completed || isPaid
                          ? "bg-accent border-accent text-accent-foreground"
                          : active
                            ? "bg-primary border-primary text-primary-foreground"
                            : "bg-card border-border text-muted-foreground"
                      }`}
                    >
                      {completed || isPaid ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        i + 1
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {step}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-1 mb-4 transition-smooth ${
                        completed ? "bg-accent" : "bg-border"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Status card */}
        <Card className="border-border shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center justify-between">
              <span>Payment Details</span>
              <StatusBadge status={txn.status} />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Amount */}
            <div className="flex justify-between items-center py-2 px-3 bg-muted/30 rounded-lg">
              <span className="text-sm text-muted-foreground">
                Total amount
              </span>
              <span className="font-display font-bold text-lg text-foreground">
                ${txn.amountUsd.toFixed(2)}
              </span>
            </div>

            {txn.cryptoCurrency && (
              <div className="space-y-2">
                <Separator />
                {txn.cryptoAddress && (
                  <div className="space-y-1.5">
                    <p className="text-xs font-medium text-muted-foreground">
                      Send {txn.cryptoCurrency} to:
                    </p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 font-mono text-xs bg-muted px-3 py-2 rounded-md truncate text-foreground">
                        {txn.cryptoAddress}
                      </code>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={copyAddress}
                        data-ocid="checkout.copy_address.button"
                        aria-label="Copy payment address"
                        className="flex-shrink-0"
                      >
                        {copiedAddress ? (
                          <CheckCircle2 className="w-4 h-4 text-accent" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {txn.cryptoTxnHash && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">
                  Transaction hash
                </p>
                <code className="block font-mono text-xs text-muted-foreground truncate">
                  {txn.cryptoTxnHash}
                </code>
              </div>
            )}

            <Separator />
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-muted-foreground">Platform fee</p>
                <p className="font-mono text-foreground">
                  ${txn.platformFeeUsd.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Seller receives</p>
                <p className="font-mono text-accent font-semibold">
                  ${txn.sellerAmountUsd.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-3">
          {!isPaid && !isFailed && (
            <Button
              variant="outline"
              onClick={() => refetch()}
              className="flex-1"
              data-ocid="checkout.refresh.button"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Check status
            </Button>
          )}
          {(isPaid || isFailed) && (
            <Button
              onClick={() => navigate({ to: "/buyer/transactions" })}
              className="flex-1"
              data-ocid="checkout.view_transactions.button"
            >
              View My Purchases
            </Button>
          )}
          <Button
            variant="outline"
            onClick={() => navigate({ to: "/" })}
            data-ocid="checkout.browse.link"
          >
            Browse More
          </Button>
        </div>

        {!isPaid && !isFailed && (
          <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
            <Clock className="w-3 h-3" />
            Checking for payment automatically every 5 seconds
          </p>
        )}
      </div>
    </div>
  );
}
