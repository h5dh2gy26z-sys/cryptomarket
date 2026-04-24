import { j as jsxRuntimeExports, y as Receipt } from "./index-Dg45A33R.js";
import { T as TransactionRowSkeleton, a as TransactionRow } from "./TransactionRow-CCkg8Ag3.js";
import { l as useBuyerTransactions } from "./use-backend-LwZ60sw8.js";
import "./skeleton-Ca2vIRxf.js";
import "./StatusBadge-pJV2C3ZR.js";
import "./circle-check-Bp282HG-.js";
import "./chevron-up-DFtPZkDc.js";
const SKELETON_KEYS = ["t1", "t2", "t3", "t4"];
function BuyerTransactionsPage() {
  const { data: transactions, isLoading } = useBuyerTransactions();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl text-foreground", children: "My Purchases" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: transactions ? `${transactions.length} transaction${transactions.length !== 1 ? "s" : ""}` : "All your crypto payment history" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "buyer_transactions.list", children: isLoading ? SKELETON_KEYS.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(TransactionRowSkeleton, {}, k)) : !transactions || transactions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "py-20 text-center border border-dashed border-border rounded-xl",
        "data-ocid": "buyer_transactions.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "w-12 h-12 mx-auto mb-4 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-lg text-foreground", children: "No purchases yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Browse the marketplace and make your first crypto purchase." })
        ]
      }
    ) : transactions.map((txn, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      TransactionRow,
      {
        transaction: txn,
        index: i
      },
      txn.id.toString()
    )) })
  ] });
}
export {
  BuyerTransactionsPage as default
};
