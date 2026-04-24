import { c as createLucideIcon, u as useNavigate, r as reactExports, j as jsxRuntimeExports, B as Button, S as ShoppingBag } from "./index-Dg45A33R.js";
import { I as Input } from "./input-BhHiXbVE.js";
import { C as CategoryFilter } from "./CategoryBadge-BWvMWLTu.js";
import { E as ExchangeRateTicker } from "./CryptoAmountDisplay-oChi6Gmn.js";
import { L as ListingCardSkeleton, a as ListingCard } from "./ListingCard-B36K81hD.js";
import { u as useListings } from "./use-backend-LwZ60sw8.js";
import "./skeleton-Ca2vIRxf.js";
import "./card-Chn20a5B.js";
import "./arrow-right-Bl54Df8w.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
const SKELETON_KEYS = ["s1", "s2", "s3", "s4", "s5", "s6"];
function BrowsePage() {
  const navigate = useNavigate();
  const [search, setSearch] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState();
  const [debouncedSearch, setDebouncedSearch] = reactExports.useState("");
  const filter = {
    ...debouncedSearch ? { searchQuery: debouncedSearch } : {},
    ...category ? { category } : {}
  };
  const {
    data: listings,
    isLoading,
    isError
  } = useListings(Object.keys(filter).length > 0 ? filter : void 0);
  function handleSearchSubmit(e) {
    e.preventDefault();
    setDebouncedSearch(search);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border py-12 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExchangeRateTicker, { className: "px-4 py-2 bg-muted/50 rounded-full border border-border" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-medium text-accent mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3" }),
          "Global crypto marketplace"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-4xl md:text-5xl text-foreground tracking-tight", children: [
          "Buy & sell with",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "cryptocurrency" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground max-w-xl mx-auto", children: "Discover products and services from sellers worldwide. Pay with BTC, ETH, USDC and more." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleSearchSubmit,
          className: "flex gap-2 max-w-xl mx-auto",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "search",
                  placeholder: "Search listings…",
                  value: search,
                  onChange: (e) => setSearch(e.target.value),
                  className: "pl-9",
                  "data-ocid": "browse.search_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", "data-ocid": "browse.search.submit_button", children: "Search" })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-10 px-4 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryFilter, { selected: category, onChange: setCategory }) }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: SKELETON_KEYS.map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx(ListingCardSkeleton, {}, key)) }) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-16 space-y-3",
          "data-ocid": "browse.error_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Failed to load listings. Please try again." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => window.location.reload(),
                children: "Retry"
              }
            )
          ]
        }
      ) : listings && listings.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-4", children: [
          listings.length,
          " listing",
          listings.length !== 1 ? "s" : "",
          " ",
          "found"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
            "data-ocid": "browse.listings.list",
            children: listings.map((listing, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              ListingCard,
              {
                listing,
                index: i
              },
              listing.id.toString()
            ))
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-20 space-y-4",
          "data-ocid": "browse.listings.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-8 h-8 text-muted-foreground/50" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-lg text-foreground", children: "No listings found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: debouncedSearch || category ? "Try adjusting your search or filters." : "Be the first to list something for sale!" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: () => navigate({ to: "/sell" }),
                "data-ocid": "browse.create_listing.primary_button",
                children: "Create a listing"
              }
            )
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 px-4 bg-muted/30 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
      {
        icon: "₿",
        title: "Multi-crypto payments",
        desc: "Accept BTC, ETH, USDC, SOL and more — globally, instantly."
      },
      {
        icon: "🔒",
        title: "Secure & transparent",
        desc: "All transactions are recorded on-chain. No hidden fees."
      },
      {
        icon: "💸",
        title: "Seller-controlled payouts",
        desc: "Request your fiat payout via Stripe Connect whenever you're ready."
      }
    ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex gap-4 p-5 rounded-xl bg-card border border-border shadow-xs",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl flex-shrink-0 mt-0.5", children: item.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground", children: item.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: item.desc })
          ] })
        ]
      },
      item.title
    )) }) }) })
  ] });
}
export {
  BrowsePage as default
};
