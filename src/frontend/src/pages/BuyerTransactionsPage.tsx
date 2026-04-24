import { Receipt } from "lucide-react";
import {
  TransactionRow,
  TransactionRowSkeleton,
} from "../components/ui/TransactionRow";
import { useBuyerTransactions } from "../hooks/use-backend";

const SKELETON_KEYS = ["t1", "t2", "t3", "t4"];

export default function BuyerTransactionsPage() {
  const { data: transactions, isLoading } = useBuyerTransactions();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-foreground">
          My Purchases
        </h1>
        <p className="text-muted-foreground mt-1">
          {transactions
            ? `${transactions.length} transaction${transactions.length !== 1 ? "s" : ""}`
            : "All your crypto payment history"}
        </p>
      </div>

      <div className="space-y-2" data-ocid="buyer_transactions.list">
        {isLoading ? (
          SKELETON_KEYS.map((k) => <TransactionRowSkeleton key={k} />)
        ) : !transactions || transactions.length === 0 ? (
          <div
            className="py-20 text-center border border-dashed border-border rounded-xl"
            data-ocid="buyer_transactions.empty_state"
          >
            <Receipt className="w-12 h-12 mx-auto mb-4 text-muted-foreground/40" />
            <h3 className="font-display font-semibold text-lg text-foreground">
              No purchases yet
            </h3>
            <p className="text-muted-foreground text-sm mt-1">
              Browse the marketplace and make your first crypto purchase.
            </p>
          </div>
        ) : (
          transactions.map((txn, i) => (
            <TransactionRow
              key={txn.id.toString()}
              transaction={txn}
              index={i}
            />
          ))
        )}
      </div>
    </div>
  );
}
