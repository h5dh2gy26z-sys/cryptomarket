import { Skeleton } from "@/components/ui/skeleton";
import { useCryptoRates } from "../../hooks/use-backend";
import type { SupportedCrypto } from "../../types";

interface CryptoAmountDisplayProps {
  priceUsd: number;
  currency?: SupportedCrypto;
  showAll?: boolean;
  size?: "sm" | "md" | "lg";
}

const CRYPTO_CONFIG: Record<
  SupportedCrypto,
  { label: string; decimals: number }
> = {
  BTC: { label: "BTC", decimals: 6 },
  ETH: { label: "ETH", decimals: 4 },
  USDC: { label: "USDC", decimals: 2 },
  SOL: { label: "SOL", decimals: 3 },
  MATIC: { label: "MATIC", decimals: 2 },
};

function formatCryptoAmount(
  priceUsd: number,
  rateUsd: number,
  decimals: number,
): string {
  const amount = priceUsd / rateUsd;
  return amount.toFixed(decimals);
}

export function CryptoAmountDisplay({
  priceUsd,
  currency = "BTC",
  showAll = false,
  size = "md",
}: CryptoAmountDisplayProps) {
  const { data: rates, isLoading } = useCryptoRates();

  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  if (isLoading) {
    return <Skeleton className="h-4 w-32" />;
  }

  if (!rates) return null;

  const rateMap: Partial<Record<SupportedCrypto, number>> = {
    BTC: rates.BTC,
    ETH: rates.ETH,
    USDC: rates.USDC,
    SOL: rates.SOL,
  };

  if (showAll) {
    return (
      <div className={`flex flex-wrap gap-2 ${sizeClasses[size]}`}>
        {(["BTC", "ETH", "USDC"] as SupportedCrypto[]).map((sym) => {
          const rate = rateMap[sym];
          if (!rate) return null;
          const cfg = CRYPTO_CONFIG[sym];
          const amount = formatCryptoAmount(priceUsd, rate, cfg.decimals);
          return (
            <span
              key={sym}
              className="font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded text-xs"
            >
              {amount} {cfg.label}
            </span>
          );
        })}
      </div>
    );
  }

  const rate = rateMap[currency];
  if (!rate) return null;

  const cfg = CRYPTO_CONFIG[currency];
  const amount = formatCryptoAmount(priceUsd, rate, cfg.decimals);

  return (
    <span className={`font-mono text-muted-foreground ${sizeClasses[size]}`}>
      {amount} {cfg.label}
    </span>
  );
}

// Exchange rate ticker for header/display
interface ExchangeRateTickerProps {
  className?: string;
}

export function ExchangeRateTicker({
  className = "",
}: ExchangeRateTickerProps) {
  const { data: rates, isLoading } = useCryptoRates();

  if (isLoading) {
    return (
      <div className={`flex gap-3 ${className}`}>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-4 w-24" />
        ))}
      </div>
    );
  }

  if (!rates) return null;

  const tickers = [
    { sym: "BTC", price: rates.BTC },
    { sym: "ETH", price: rates.ETH },
    { sym: "SOL", price: rates.SOL },
  ];

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {tickers.map(({ sym, price }) => (
        <div key={sym} className="flex items-center gap-1.5">
          <span className="font-mono text-xs font-semibold text-foreground">
            {sym}
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            ${price.toLocaleString("en-US", { maximumFractionDigits: 0 })}
          </span>
        </div>
      ))}
    </div>
  );
}
