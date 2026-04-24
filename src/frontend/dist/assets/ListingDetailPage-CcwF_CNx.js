import { c as createLucideIcon, a as useParams, u as useNavigate, b as useAuth, r as reactExports, j as jsxRuntimeExports, L as Link, B as Button, d as Badge, e as Separator, f as ue } from "./index-Dg45A33R.js";
import { C as Card, a as CardContent } from "./card-Chn20a5B.js";
import { S as Skeleton } from "./skeleton-Ca2vIRxf.js";
import { T as Tag, a as CategoryBadge } from "./CategoryBadge-BWvMWLTu.js";
import { C as CryptoAmountDisplay } from "./CryptoAmountDisplay-oChi6Gmn.js";
import { a as useListing, b as useInitiatePayment } from "./use-backend-LwZ60sw8.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "8", cy: "21", r: "1", key: "jimo8o" }],
  ["circle", { cx: "19", cy: "21", r: "1", key: "13723u" }],
  [
    "path",
    {
      d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",
      key: "9zh506"
    }
  ]
];
const ShoppingCart = createLucideIcon("shopping-cart", __iconNode);
const CRYPTO_OPTIONS = [
  { value: "BTC", label: "Bitcoin (BTC)", icon: "₿" },
  { value: "ETH", label: "Ethereum (ETH)", icon: "Ξ" },
  { value: "USDC", label: "USD Coin (USDC)", icon: "$" },
  { value: "SOL", label: "Solana (SOL)", icon: "◎" }
];
function ListingDetailPage() {
  const { id } = useParams({ from: "/listings/$id" });
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const listingId = BigInt(id);
  const { data: listing, isLoading } = useListing(listingId);
  const initiatePayment = useInitiatePayment();
  const [selectedCrypto, setSelectedCrypto] = reactExports.useState("BTC");
  async function handleBuy() {
    if (!isAuthenticated) {
      login();
      return;
    }
    try {
      const result = await initiatePayment.mutateAsync({
        listingId,
        cryptoCurrency: selectedCrypto
      });
      navigate({
        to: "/checkout/$txnId",
        params: { txnId: result.transactionId.toString() }
      });
    } catch {
      ue.error("Failed to initiate payment. Please try again.");
    }
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-32 mb-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full mt-8" })
        ] })
      ] })
    ] });
  }
  if (!listing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container mx-auto px-4 py-16 text-center",
        "data-ocid": "listing.not_found.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-12 h-12 text-muted-foreground/30 mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-2", children: "Listing not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "This listing may have been removed or doesn't exist." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
            "Back to browse"
          ] }) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/",
        className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-fast mb-6",
        "data-ocid": "listing.back.link",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          "Back to browse"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square rounded-xl overflow-hidden bg-muted border border-border", children: listing.coverImageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: listing.coverImageUrl,
          alt: listing.title,
          className: "w-full h-full object-cover"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-16 h-16 text-muted-foreground/30" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryBadge, { category: listing.category }),
            !listing.isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: "Inactive" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground leading-snug", children: listing.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-2 leading-relaxed", children: listing.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-3xl text-foreground", children: [
            "$",
            listing.priceUsd.toLocaleString("en-US", {
              minimumFractionDigits: 2
            })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CryptoAmountDisplay,
            {
              priceUsd: listing.priceUsd,
              showAll: true,
              size: "sm"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-muted/30 border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-3 space-y-1.5 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Platform fee (2.5%)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
              "$",
              (listing.priceUsd * 0.025).toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-medium text-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Seller receives" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
              "$",
              (listing.priceUsd * 0.975).toFixed(2)
            ] })
          ] })
        ] }) }),
        listing.isActive && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Pay with:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-2 gap-2",
              "data-ocid": "listing.crypto_selector.panel",
              children: CRYPTO_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setSelectedCrypto(opt.value),
                  "data-ocid": `listing.crypto.${opt.value.toLowerCase()}.radio`,
                  className: `flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-fast ${selectedCrypto === opt.value ? "border-accent bg-accent/10 text-foreground" : "border-border bg-card text-muted-foreground hover:border-primary/40"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-base", children: opt.icon }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: opt.value })
                  ]
                },
                opt.value
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "w-full",
              size: "lg",
              onClick: handleBuy,
              disabled: initiatePayment.isPending,
              "data-ocid": "listing.buy.primary_button",
              children: initiatePayment.isPending ? "Initiating payment…" : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4 mr-2" }),
                isAuthenticated ? `Pay with ${selectedCrypto}` : "Sign in to Purchase"
              ] })
            }
          )
        ] })
      ] })
    ] })
  ] });
}
export {
  ListingDetailPage as default
};
