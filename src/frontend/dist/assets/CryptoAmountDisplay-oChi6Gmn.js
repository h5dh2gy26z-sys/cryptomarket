import { j as jsxRuntimeExports } from "./index-Dg45A33R.js";
import { S as Skeleton } from "./skeleton-Ca2vIRxf.js";
import { c as useCryptoRates } from "./use-backend-LwZ60sw8.js";
const CRYPTO_CONFIG = {
  BTC: { label: "BTC", decimals: 6 },
  ETH: { label: "ETH", decimals: 4 },
  USDC: { label: "USDC", decimals: 2 },
  SOL: { label: "SOL", decimals: 3 },
  MATIC: { label: "MATIC", decimals: 2 }
};
function formatCryptoAmount(priceUsd, rateUsd, decimals) {
  const amount = priceUsd / rateUsd;
  return amount.toFixed(decimals);
}
function CryptoAmountDisplay({
  priceUsd,
  currency = "BTC",
  showAll = false,
  size = "md"
}) {
  const { data: rates, isLoading } = useCryptoRates();
  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" });
  }
  if (!rates) return null;
  const rateMap = {
    BTC: rates.BTC,
    ETH: rates.ETH,
    USDC: rates.USDC,
    SOL: rates.SOL
  };
  if (showAll) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex flex-wrap gap-2 ${sizeClasses[size]}`, children: ["BTC", "ETH", "USDC"].map((sym) => {
      const rate2 = rateMap[sym];
      if (!rate2) return null;
      const cfg2 = CRYPTO_CONFIG[sym];
      const amount2 = formatCryptoAmount(priceUsd, rate2, cfg2.decimals);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: "font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded text-xs",
          children: [
            amount2,
            " ",
            cfg2.label
          ]
        },
        sym
      );
    }) });
  }
  const rate = rateMap[currency];
  if (!rate) return null;
  const cfg = CRYPTO_CONFIG[currency];
  const amount = formatCryptoAmount(priceUsd, rate, cfg.decimals);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `font-mono text-muted-foreground ${sizeClasses[size]}`, children: [
    amount,
    " ",
    cfg.label
  ] });
}
function ExchangeRateTicker({
  className = ""
}) {
  const { data: rates, isLoading } = useCryptoRates();
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex gap-3 ${className}`, children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }, i)) });
  }
  if (!rates) return null;
  const tickers = [
    { sym: "BTC", price: rates.BTC },
    { sym: "ETH", price: rates.ETH },
    { sym: "SOL", price: rates.SOL }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex items-center gap-4 ${className}`, children: tickers.map(({ sym, price }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-semibold text-foreground", children: sym }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
      "$",
      price.toLocaleString("en-US", { maximumFractionDigits: 0 })
    ] })
  ] }, sym)) });
}
export {
  CryptoAmountDisplay as C,
  ExchangeRateTicker as E
};
