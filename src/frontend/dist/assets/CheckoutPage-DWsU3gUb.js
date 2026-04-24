import { c as createLucideIcon, a as useParams, u as useNavigate, r as reactExports, T as TransactionStatus, f as ue, j as jsxRuntimeExports, P as PageLoader, B as Button, e as Separator } from "./index-Dg45A33R.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-Chn20a5B.js";
import { S as StatusBadge, R as RefreshCw, C as Clock } from "./StatusBadge-pJV2C3ZR.js";
import { d as useTransaction } from "./use-backend-LwZ60sw8.js";
import { C as CircleCheck } from "./circle-check-Bp282HG-.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode);
const STEPS = ["Initiated", "Confirmed", "Processing", "Paid"];
function getStepIndex(status) {
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
function CheckoutPage() {
  const { txnId } = useParams({ from: "/checkout/$txnId" });
  const navigate = useNavigate();
  const txnIdBig = BigInt(txnId);
  const { data: txn, isLoading, refetch } = useTransaction(txnIdBig);
  const [copiedAddress, setCopiedAddress] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if ((txn == null ? void 0 : txn.status) === TransactionStatus.paid) {
      ue.success("Payment confirmed! Transaction complete.");
    }
  }, [txn == null ? void 0 : txn.status]);
  async function copyAddress() {
    if (!(txn == null ? void 0 : txn.cryptoAddress)) return;
    await navigator.clipboard.writeText(txn.cryptoAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2e3);
    ue.success("Address copied to clipboard");
  }
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, { message: "Loading checkout…" });
  if (!txn) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container mx-auto px-4 py-16 text-center",
        "data-ocid": "checkout.not_found.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Transaction not found." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => navigate({ to: "/" }),
              className: "mt-4",
              children: "Back to browse"
            }
          )
        ]
      }
    );
  }
  const stepIndex = getStepIndex(txn.status);
  const isPaid = txn.status === TransactionStatus.paid;
  const isFailed = txn.status === TransactionStatus.failed;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "container mx-auto px-4 py-8 max-w-lg",
      "data-ocid": "checkout.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: isPaid ? "Payment Complete!" : isFailed ? "Payment Failed" : "Awaiting Payment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground font-mono", children: [
            "Transaction #",
            txn.id.toString()
          ] })
        ] }),
        !isFailed && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex items-center gap-1",
            "data-ocid": "checkout.progress.panel",
            children: STEPS.map((step, i) => {
              const completed = stepIndex > i;
              const active = stepIndex === i + 1;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center flex-1 last:flex-none",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1 flex-shrink-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-smooth ${completed || isPaid ? "bg-accent border-accent text-accent-foreground" : active ? "bg-primary border-primary text-primary-foreground" : "bg-card border-border text-muted-foreground"}`,
                          children: completed || isPaid ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }) : i + 1
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground whitespace-nowrap", children: step })
                    ] }),
                    i < STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `flex-1 h-0.5 mx-1 mb-4 transition-smooth ${completed ? "bg-accent" : "bg-border"}`
                      }
                    )
                  ]
                },
                step
              );
            })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Payment Details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: txn.status })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center py-2 px-3 bg-muted/30 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Total amount" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-lg text-foreground", children: [
                "$",
                txn.amountUsd.toFixed(2)
              ] })
            ] }),
            txn.cryptoCurrency && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
              txn.cryptoAddress && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-muted-foreground", children: [
                  "Send ",
                  txn.cryptoCurrency,
                  " to:"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "flex-1 font-mono text-xs bg-muted px-3 py-2 rounded-md truncate text-foreground", children: txn.cryptoAddress }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      size: "icon",
                      onClick: copyAddress,
                      "data-ocid": "checkout.copy_address.button",
                      "aria-label": "Copy payment address",
                      className: "flex-shrink-0",
                      children: copiedAddress ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-accent" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" })
                    }
                  )
                ] })
              ] })
            ] }),
            txn.cryptoTxnHash && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Transaction hash" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "block font-mono text-xs text-muted-foreground truncate", children: txn.cryptoTxnHash })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Platform fee" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-foreground", children: [
                  "$",
                  txn.platformFeeUsd.toFixed(2)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Seller receives" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-accent font-semibold", children: [
                  "$",
                  txn.sellerAmountUsd.toFixed(2)
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          !isPaid && !isFailed && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              onClick: () => refetch(),
              className: "flex-1",
              "data-ocid": "checkout.refresh.button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 mr-2" }),
                "Check status"
              ]
            }
          ),
          (isPaid || isFailed) && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => navigate({ to: "/buyer/transactions" }),
              className: "flex-1",
              "data-ocid": "checkout.view_transactions.button",
              children: "View My Purchases"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => navigate({ to: "/" }),
              "data-ocid": "checkout.browse.link",
              children: "Browse More"
            }
          )
        ] }),
        !isPaid && !isFailed && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground flex items-center justify-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
          "Checking for payment automatically every 5 seconds"
        ] })
      ] })
    }
  );
}
export {
  CheckoutPage as default
};
