// Re-export backend types for use throughout the frontend
export type {
  Listing,
  ListingId,
  ListingInput,
  ListingFilter,
  Transaction,
  TransactionId,
  PaymentInitResult,
  PayoutResult,
  SellerBalance,
  UserProfile,
  UserId,
  Timestamp,
} from "../backend";

export { Category, TransactionStatus, UserRole, UserRole__1 } from "../backend";

// Frontend-only types
export interface CryptoRate {
  symbol: string;
  name: string;
  priceUsd: number;
  change24h: number;
}

export interface CryptoRates {
  BTC: CryptoRate;
  ETH: CryptoRate;
  USDC: CryptoRate;
  [key: string]: CryptoRate;
}

export type SupportedCrypto = "BTC" | "ETH" | "USDC" | "SOL" | "MATIC";

export interface NavItem {
  label: string;
  href: string;
  protected?: boolean;
}
