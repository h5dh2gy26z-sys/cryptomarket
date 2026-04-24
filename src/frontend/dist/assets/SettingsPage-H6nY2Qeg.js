import { c as createLucideIcon, Y as useActor, r as reactExports, j as jsxRuntimeExports, P as PageLoader, d as Badge, B as Button, e as Separator, f as ue, Z as createActor } from "./index-Dg45A33R.js";
import { C as Card, b as CardHeader, c as CardTitle, d as CardDescription, a as CardContent } from "./card-Chn20a5B.js";
import { I as Input } from "./input-BhHiXbVE.js";
import { L as Label } from "./label-CU1-HzrB.js";
import { m as useMyProfile } from "./use-backend-LwZ60sw8.js";
import { C as CircleCheck } from "./circle-check-Bp282HG-.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode);
function SettingsPage() {
  const { data: profile, isLoading } = useMyProfile();
  const { actor } = useActor(createActor);
  const [stripeAccountId, setStripeAccountId] = reactExports.useState(
    (profile == null ? void 0 : profile.stripeConnectAccountId) ?? ""
  );
  const [isSavingStripe, setIsSavingStripe] = reactExports.useState(false);
  async function handleSaveStripe(e) {
    e.preventDefault();
    if (!actor || !stripeAccountId.trim()) return;
    setIsSavingStripe(true);
    try {
      await actor.connectStripeAccount(stripeAccountId.trim());
      ue.success("Stripe Connect account linked successfully!");
    } catch {
      ue.error("Failed to connect Stripe account.");
    } finally {
      setIsSavingStripe(false);
    }
  }
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, { message: "Loading settings…" });
  const hasStripe = !!(profile == null ? void 0 : profile.stripeConnectAccountId);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl text-foreground", children: "Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Configure your account and payout preferences" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border shadow-card mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-5 h-5 text-primary" }),
          "Stripe Connect",
          hasStripe && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "ml-auto bg-accent/10 text-accent border-accent/30 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 mr-1" }),
            "Connected"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Connect your Stripe account to receive fiat payouts when buyers complete crypto payments." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleSaveStripe,
          className: "space-y-4",
          "data-ocid": "settings.stripe.form",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "stripe-id", children: "Stripe Connect Account ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "stripe-id",
                  placeholder: "acct_xxxxxxxxxxxxxxxx",
                  value: stripeAccountId,
                  onChange: (e) => setStripeAccountId(e.target.value),
                  className: "font-mono",
                  "data-ocid": "settings.stripe_account.input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-start gap-1.5 mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-3 h-3 mt-0.5 flex-shrink-0" }),
                "Find your account ID in the Stripe Dashboard under Settings → Account."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  disabled: isSavingStripe || !stripeAccountId.trim(),
                  "data-ocid": "settings.stripe.submit_button",
                  children: isSavingStripe ? "Connecting…" : hasStripe ? "Update account" : "Connect Stripe"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  onClick: () => window.open(
                    "https://dashboard.stripe.com/connect/accounts",
                    "_blank"
                  ),
                  "data-ocid": "settings.stripe_dashboard.link",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4 mr-2" }),
                    "Open Stripe Dashboard"
                  ]
                }
              )
            ] })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border shadow-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "Fee Structure" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Transparent pricing — no hidden fees." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: [
        { label: "Platform fee", value: "2.5%", note: "Per transaction" },
        {
          label: "Crypto network fee",
          value: "Variable",
          note: "Paid by buyer"
        },
        {
          label: "Stripe payout fee",
          value: "~0.5%",
          note: "When you withdraw"
        },
        {
          label: "Minimum payout",
          value: "$10.00",
          note: "USD equivalent"
        }
      ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        i > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: item.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: item.note })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "font-mono text-sm", children: item.value })
        ] })
      ] }, item.label)) })
    ] })
  ] });
}
export {
  SettingsPage as default
};
