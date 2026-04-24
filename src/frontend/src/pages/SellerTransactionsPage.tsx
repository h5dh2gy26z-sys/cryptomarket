import { BarChart3 } from "lucide-react";
import { toast } from "sonner";
import {
  TransactionRow,
  TransactionRowSkeleton,
} from "../components/ui/TransactionRow";
import { useRequestPayout, useSellerTransactions } from "../hooks/use-backend";

const SKELETON_KEYS = ["t1", "t2", "t3", "t4"];

export default function SellerTransactionsPage() {
  const { data: transactions, isLoading } = useSellerTransactions();
  const requestPayout = useRequestPayout();

  async function handlePayout(txnId: bigint) {
    try {
      await requestPayout.mutateAsync(txnId);
      toast.success("Payout requested!");
    } catch {
      toast.error("Failed to request payout.");
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-foreground">
          Sales History
        </h1>
        <p className="text-muted-foreground mt-1">
          {transactions
            ? `${transactions.length} transaction${transactions.length !== 1 ? "s" : ""}`
            : "All your sales as a seller"}
        </p>
      </div>

      <div className="space-y-2" data-ocid="seller_transactions.list">
        {isLoading ? (
          SKELETON_KEYS.map((k) => <TransactionRowSkeleton key={k} />)
        ) : !transactions || transactions.length === 0 ? (
          <div
            className="py-20 text-center border border-dashed border-border rounded-xl"
            data-ocid="seller_transactions.empty_state"
          >
            <BarChart3 className="w-12 h-12 mx-auto mb-4 text-muted-foreground/40" />
            <h3 className="font-display font-semibold text-lg text-foreground">
              No sales yet
            </h3>
            <p className="text-muted-foreground text-sm mt-1">
              Sales will appear here once buyers complete purchases.
            </p>
          </div>
        ) : (
          transactions.map((txn, i) => (
            <TransactionRow
              key={txn.id.toString()}
              transaction={txn}
              index={i}
              showPayoutButton
              onRequestPayout={handlePayout}
            />
          ))
        )}
      </div>
    </div>
  );
}
