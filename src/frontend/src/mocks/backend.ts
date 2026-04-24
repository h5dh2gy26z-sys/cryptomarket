import type { backendInterface } from "../backend";
import { Category, TransactionStatus, UserRole, UserRole__1 } from "../backend";
import { Principal } from "@icp-sdk/core/principal";

const samplePrincipal = Principal.anonymous();

const sampleListings = [
  {
    id: BigInt(1),
    coverImageUrl: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400",
    title: "Bitcoin Hardware Wallet",
    createdAt: BigInt(Date.now() * 1_000_000),
    description: "Secure hardware wallet for Bitcoin and other cryptocurrencies. Brand new, unopened.",
    isActive: true,
    updatedAt: BigInt(Date.now() * 1_000_000),
    category: Category.electronics,
    sellerId: samplePrincipal,
    priceUsd: 129.99,
  },
  {
    id: BigInt(2),
    coverImageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400",
    title: "Ethereum NFT Art Bundle",
    createdAt: BigInt(Date.now() * 1_000_000),
    description: "Collection of 5 premium NFT artworks on the Ethereum blockchain. Includes transfer of ownership.",
    isActive: true,
    updatedAt: BigInt(Date.now() * 1_000_000),
    category: Category.digital,
    sellerId: samplePrincipal,
    priceUsd: 450.0,
  },
  {
    id: BigInt(3),
    coverImageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
    title: "DeFi Consulting Session",
    createdAt: BigInt(Date.now() * 1_000_000),
    description: "1-hour consulting session with a DeFi expert. Learn about yield farming, liquidity pools, and strategies.",
    isActive: true,
    updatedAt: BigInt(Date.now() * 1_000_000),
    category: Category.services,
    sellerId: samplePrincipal,
    priceUsd: 200.0,
  },
  {
    id: BigInt(4),
    coverImageUrl: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400",
    title: "Crypto Trading Course",
    createdAt: BigInt(Date.now() * 1_000_000),
    description: "Comprehensive video course on cryptocurrency trading. 20+ hours of content for all skill levels.",
    isActive: true,
    updatedAt: BigInt(Date.now() * 1_000_000),
    category: Category.digital,
    sellerId: samplePrincipal,
    priceUsd: 79.99,
  },
  {
    id: BigInt(5),
    coverImageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400",
    title: "Solana Merch T-Shirt",
    createdAt: BigInt(Date.now() * 1_000_000),
    description: "Official Solana community t-shirt. High quality cotton, available in multiple sizes.",
    isActive: true,
    updatedAt: BigInt(Date.now() * 1_000_000),
    category: Category.clothing,
    sellerId: samplePrincipal,
    priceUsd: 34.99,
  },
  {
    id: BigInt(6),
    coverImageUrl: "https://images.unsplash.com/photo-1602665741946-27e3e9ca7b17?w=400",
    title: "Blockchain Development Book",
    createdAt: BigInt(Date.now() * 1_000_000),
    description: "Comprehensive guide to blockchain development. Covers Solidity, Web3.js, and DeFi protocols.",
    isActive: true,
    updatedAt: BigInt(Date.now() * 1_000_000),
    category: Category.books,
    sellerId: samplePrincipal,
    priceUsd: 49.99,
  },
];

const sampleTransactions = [
  {
    id: BigInt(1),
    status: TransactionStatus.paid,
    cryptoAddress: "1A1zP1eP5QGefi2DMPTfTL5SLmv7Divf",
    nowPaymentsPaymentId: "np_5521839",
    listingId: BigInt(1),
    createdAt: BigInt((Date.now() - 86400000) * 1_000_000),
    stripeTransferId: "tr_abc123",
    updatedAt: BigInt(Date.now() * 1_000_000),
    platformFeeUsd: 6.5,
    buyerId: samplePrincipal,
    amountUsd: 129.99,
    sellerId: samplePrincipal,
    sellerAmountUsd: 123.49,
    cryptoTxnHash: "0xabc123def456789",
    cryptoCurrency: "BTC",
  },
  {
    id: BigInt(2),
    status: TransactionStatus.pending,
    cryptoAddress: "0x742d35Cc6634C0532925a3b8D4C9Be2",
    nowPaymentsPaymentId: "np_5521840",
    listingId: BigInt(2),
    createdAt: BigInt((Date.now() - 3600000) * 1_000_000),
    stripeTransferId: undefined,
    updatedAt: BigInt(Date.now() * 1_000_000),
    platformFeeUsd: 22.5,
    buyerId: samplePrincipal,
    amountUsd: 450.0,
    sellerId: samplePrincipal,
    sellerAmountUsd: 427.5,
    cryptoTxnHash: undefined,
    cryptoCurrency: "ETH",
  },
  {
    id: BigInt(3),
    status: TransactionStatus.failed,
    cryptoAddress: "DfRaEhJb1vxjJNXi6yMxhH8SQ5ZAa1t2",
    nowPaymentsPaymentId: "np_5521841",
    listingId: BigInt(3),
    createdAt: BigInt((Date.now() - 172800000) * 1_000_000),
    stripeTransferId: undefined,
    updatedAt: BigInt(Date.now() * 1_000_000),
    platformFeeUsd: 10.0,
    buyerId: samplePrincipal,
    amountUsd: 200.0,
    sellerId: samplePrincipal,
    sellerAmountUsd: 190.0,
    cryptoTxnHash: undefined,
    cryptoCurrency: "SOL",
  },
];

const sampleUserProfile = {
  id: samplePrincipal,
  name: "Alex Johnson",
  createdAt: BigInt((Date.now() - 30 * 86400000) * 1_000_000),
  role: UserRole.both,
  email: "alex@example.com",
  displayPictureUrl: "https://i.pravatar.cc/150?img=12",
  stripeConnectAccountId: "acct_abc123",
};

export const mockBackend: backendInterface = {
  _initializeAccessControl: async () => undefined,

  assignCallerUserRole: async (_user: Principal, _role: UserRole__1) => undefined,

  browseListings: async (_filter) => sampleListings,

  connectStripeAccount: async (_stripeConnectAccountId: string) => undefined,

  createListing: async (input) => ({
    id: BigInt(7),
    coverImageUrl: input.coverImageUrl,
    title: input.title,
    createdAt: BigInt(Date.now() * 1_000_000),
    description: input.description,
    isActive: true,
    updatedAt: BigInt(Date.now() * 1_000_000),
    category: input.category,
    sellerId: samplePrincipal,
    priceUsd: input.priceUsd,
  }),

  deleteListing: async (_listingId) => true,

  getCallerUserProfile: async () => sampleUserProfile,

  getCallerUserRole: async () => UserRole__1.user,

  getListing: async (listingId) =>
    sampleListings.find((l) => l.id === listingId) ?? null,

  getMyListings: async () => sampleListings.slice(0, 3),

  getMyTransactionsAsBuyer: async () => sampleTransactions,

  getMyTransactionsAsSeller: async () => sampleTransactions,

  getSellerBalance: async () => ({
    availableUsd: 547.99,
    pendingUsd: 427.5,
  }),

  getTransaction: async (txnId) =>
    sampleTransactions.find((t) => t.id === txnId) ?? null,

  getUserProfile: async (_userId) => sampleUserProfile,

  initiateCryptoPayment: async (listingId, cryptoCurrency) => ({
    expiresAt: BigInt((Date.now() + 3600000) * 1_000_000),
    paymentAddress: cryptoCurrency === "BTC"
      ? "1A1zP1eP5QGefi2DMPTfTL5SLmv7Divf"
      : "0x742d35Cc6634C0532925a3b8D4C9Be2",
    currency: cryptoCurrency,
    paymentId: "np_5521999",
    paymentAmount: 0.0019,
    transactionId: BigInt(7),
  }),

  isCallerAdmin: async () => false,

  isPaymentConfigured: async () => true,

  requestPayout: async (txnId) => ({
    stripeTransferId: "tr_payout123",
    amountUsd: 123.49,
    transactionId: txnId,
  }),

  saveCallerUserProfile: async (name, email, displayPictureUrl, role) => ({
    id: samplePrincipal,
    name,
    createdAt: BigInt(Date.now() * 1_000_000),
    role,
    email,
    displayPictureUrl,
    stripeConnectAccountId: undefined,
  }),

  setNowPaymentsApiKey: async (_apiKey: string) => undefined,

  setStripeSecretKey: async (_secretKey: string) => undefined,

  transform: async (input) => ({
    status: input.response.status,
    body: input.response.body,
    headers: input.response.headers,
  }),

  updateListing: async (listingId, input) => {
    const existing = sampleListings.find((l) => l.id === listingId);
    if (!existing) return null;
    return { ...existing, ...input, updatedAt: BigInt(Date.now() * 1_000_000) };
  },

  updatePaymentStatus: async (paymentId) => {
    if (!paymentId) return null;
    return sampleTransactions[0];
  },
};
