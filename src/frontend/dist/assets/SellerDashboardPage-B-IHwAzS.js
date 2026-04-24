import { c as createLucideIcon, j as jsxRuntimeExports, L as Link, B as Button, h as ChartColumn, f as ue } from "./index-Dg45A33R.js";
import { C as Card, a as CardContent } from "./card-Chn20a5B.js";
import { T as TransactionRowSkeleton, a as TransactionRow } from "./TransactionRow-CCkg8Ag3.js";
import { f as useSellerBalance, g as useSellerTransactions, h as useMyListings, i as useRequestPayout } from "./use-backend-LwZ60sw8.js";
import { P as Package } from "./package-B3MpjVjh.js";
import { A as ArrowRight } from "./arrow-right-Bl54Df8w.js";
import "./skeleton-Ca2vIRxf.js";
import "./StatusBadge-pJV2C3ZR.js";
import "./circle-check-Bp282HG-.js";
import "./chevron-up-DFtPZkDc.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
  ["path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", key: "1b0p4s" }]
];
const DollarSign = createLucideIcon("dollar-sign", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
const SKELETON_KEYS = ["t1", "t2", "t3"];
function SellerDashboardPage() {
  const { data: balance, isLoading: balanceLoading } = useSellerBalance();
  const { data: transactions, isLoading: txnLoading } = useSellerTransactions();
  const { data: listings, isLoading: listingsLoading } = useMyListings();
  const requestPayout = useRequestPayout();
  async function handlePayout(txnId) {
    try {
      await requestPayout.mutateAsync(txnId);
      ue.success("Payout requested successfully!");
    } catch {
      ue.error("Failed to request payout. Please try again.");
    }
  }
  const recentTransactions = (transactions == null ? void 0 : transactions.slice(0, 5)) ?? [];
  const activeListings = (listings == null ? void 0 : listings.filter((l) => l.isActive).length) ?? 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl text-foreground", children: "Seller Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Track your sales and manage payouts" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/sell", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { "data-ocid": "dashboard.create_listing.primary_button", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 mr-2" }),
        "New listing"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "shadow-card border-border",
          "data-ocid": "dashboard.balance.card",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: "Available" }),
              balanceLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-24 bg-muted rounded animate-pulse mt-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-2xl text-accent mt-1", children: [
                "$",
                (balance == null ? void 0 : balance.availableUsd.toFixed(2)) ?? "0.00"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-5 h-5 text-accent" }) })
          ] }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "shadow-card border-border",
          "data-ocid": "dashboard.pending.card",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: "Pending" }),
              balanceLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-24 bg-muted rounded animate-pulse mt-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-2xl text-primary mt-1", children: [
                "$",
                (balance == null ? void 0 : balance.pendingUsd.toFixed(2)) ?? "0.00"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-primary" }) })
          ] }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "shadow-card border-border",
          "data-ocid": "dashboard.listings.card",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: "Active Listings" }),
              listingsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-16 bg-muted rounded animate-pulse mt-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-2xl text-foreground mt-1", children: activeListings })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-5 h-5 text-muted-foreground" }) })
          ] }) })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground", children: "Recent Sales" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/seller/transactions",
              className: "text-sm text-primary hover:text-primary/80 transition-fast flex items-center gap-1",
              "data-ocid": "dashboard.all_transactions.link",
              children: [
                "View all",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "dashboard.transactions.list", children: txnLoading ? SKELETON_KEYS.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(TransactionRowSkeleton, {}, k)) : recentTransactions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "py-12 text-center text-muted-foreground border border-dashed border-border rounded-xl",
            "data-ocid": "dashboard.transactions.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-10 h-10 mx-auto mb-3 text-muted-foreground/40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: "No sales yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: "Sales will appear here once buyers complete purchases." })
            ]
          }
        ) : recentTransactions.map((txn, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          TransactionRow,
          {
            transaction: txn,
            index: i,
            showPayoutButton: true,
            onRequestPayout: handlePayout
          },
          txn.id.toString()
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground", children: "Quick Links" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [
          {
            to: "/seller/listings",
            label: "My Listings",
            icon: Package,
            ocid: "dashboard.my_listings.link"
          },
          {
            to: "/seller/transactions",
            label: "All Transactions",
            icon: ChartColumn,
            ocid: "dashboard.all_txns.link"
          },
          {
            to: "/settings",
            label: "Payout Settings",
            icon: DollarSign,
            ocid: "dashboard.settings.link"
          }
        ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: item.to, "data-ocid": item.ocid, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "hover:shadow-card transition-smooth cursor-pointer border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-5 h-5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: item.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 text-muted-foreground ml-auto" })
        ] }) }) }, item.to)) })
      ] })
    ] })
  ] });
}
export {
  SellerDashboardPage as default
};
