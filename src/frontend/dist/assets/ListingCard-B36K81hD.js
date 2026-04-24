import { j as jsxRuntimeExports, d as Badge, L as Link, B as Button } from "./index-Dg45A33R.js";
import { C as Card, a as CardContent } from "./card-Chn20a5B.js";
import { S as Skeleton } from "./skeleton-Ca2vIRxf.js";
import { c as useCryptoRates } from "./use-backend-LwZ60sw8.js";
import { T as Tag, a as CategoryBadge } from "./CategoryBadge-BWvMWLTu.js";
import { A as ArrowRight } from "./arrow-right-Bl54Df8w.js";
function cryptoAmount(priceUsd, rateUsd) {
  const amount = priceUsd / rateUsd;
  if (amount < 1e-3) return amount.toFixed(6);
  if (amount < 1) return amount.toFixed(4);
  return amount.toFixed(3);
}
function ListingCard({ listing, index = 0 }) {
  const { data: rates } = useCryptoRates();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "group overflow-hidden border-border shadow-card hover:shadow-elevated transition-smooth cursor-pointer",
      "data-ocid": `listing.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/3] overflow-hidden bg-muted", children: [
          listing.coverImageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: listing.coverImageUrl,
              alt: listing.title,
              className: "w-full h-full object-cover group-hover:scale-105 transition-smooth"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-10 h-10 text-muted-foreground/30" }) }),
          !listing.isActive && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/60 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: "Inactive" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryBadge, { category: listing.category }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground line-clamp-2 text-sm leading-snug group-hover:text-primary transition-colors", children: listing.title }),
            listing.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 line-clamp-2", children: listing.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-lg text-foreground", children: [
                "$",
                listing.priceUsd.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })
              ] }),
              rates && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs text-muted-foreground mt-0.5", children: [
                "≈ ",
                cryptoAmount(listing.priceUsd, rates.BTC),
                " BTC",
                " · ",
                cryptoAmount(listing.priceUsd, rates.ETH),
                " ETH"
              ] })
            ] }),
            rates && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "outline",
                className: "text-accent border-accent/30 bg-accent/5 font-mono text-xs flex-shrink-0",
                children: [
                  cryptoAmount(listing.priceUsd, rates.USDC),
                  " USDC"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/listings/$id",
              params: { id: listing.id.toString() },
              className: "block",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  className: "w-full group/btn",
                  size: "sm",
                  "data-ocid": `listing.view_button.${index + 1}`,
                  children: [
                    "View Listing",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5 ml-1.5 group-hover/btn:translate-x-0.5 transition-transform" })
                  ]
                }
              )
            }
          )
        ] })
      ]
    }
  );
}
function ListingCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[4/3] w-full rounded-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex flex-col gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-24" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-36" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full" })
    ] })
  ] });
}
export {
  ListingCardSkeleton as L,
  ListingCard as a
};
