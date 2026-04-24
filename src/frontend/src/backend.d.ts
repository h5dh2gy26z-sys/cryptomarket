import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface Listing {
    id: ListingId;
    coverImageUrl: string;
    title: string;
    createdAt: Timestamp;
    description: string;
    isActive: boolean;
    updatedAt: Timestamp;
    category: Category;
    sellerId: UserId;
    priceUsd: number;
}
export interface SellerBalance {
    availableUsd: number;
    pendingUsd: number;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface Transaction {
    id: TransactionId;
    status: TransactionStatus;
    cryptoAddress?: string;
    nowPaymentsPaymentId?: string;
    listingId: ListingId;
    createdAt: Timestamp;
    stripeTransferId?: string;
    updatedAt: Timestamp;
    platformFeeUsd: number;
    buyerId: UserId;
    amountUsd: number;
    sellerId: UserId;
    sellerAmountUsd: number;
    cryptoTxnHash?: string;
    cryptoCurrency?: string;
}
export type UserId = Principal;
export type TransactionId = bigint;
export interface ListingInput {
    coverImageUrl: string;
    title: string;
    description: string;
    category: Category;
    priceUsd: number;
}
export interface PayoutResult {
    stripeTransferId: string;
    amountUsd: number;
    transactionId: TransactionId;
}
export interface PaymentInitResult {
    expiresAt: Timestamp;
    paymentAddress: string;
    currency: string;
    paymentId: string;
    paymentAmount: number;
    transactionId: TransactionId;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type ListingId = bigint;
export interface ListingFilter {
    minPriceUsd?: number;
    maxPriceUsd?: number;
    category?: Category;
    searchQuery?: string;
}
export interface UserProfile {
    id: UserId;
    name: string;
    createdAt: Timestamp;
    role: UserRole;
    email: string;
    displayPictureUrl: string;
    stripeConnectAccountId?: string;
}
export enum Category {
    clothing = "clothing",
    other = "other",
    home = "home",
    books = "books",
    sports = "sports",
    digital = "digital",
    services = "services",
    electronics = "electronics"
}
export enum TransactionStatus {
    pending = "pending",
    paid = "paid",
    refunded = "refunded",
    failed = "failed"
}
export enum UserRole {
    both = "both",
    seller = "seller",
    buyer = "buyer"
}
export enum UserRole__1 {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole__1): Promise<void>;
    browseListings(filter: ListingFilter | null): Promise<Array<Listing>>;
    connectStripeAccount(stripeConnectAccountId: string): Promise<void>;
    createListing(input: ListingInput): Promise<Listing>;
    deleteListing(listingId: ListingId): Promise<boolean>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole__1>;
    getListing(listingId: ListingId): Promise<Listing | null>;
    getMyListings(): Promise<Array<Listing>>;
    getMyTransactionsAsBuyer(): Promise<Array<Transaction>>;
    getMyTransactionsAsSeller(): Promise<Array<Transaction>>;
    getSellerBalance(): Promise<SellerBalance>;
    getTransaction(txnId: TransactionId): Promise<Transaction | null>;
    getUserProfile(userId: UserId): Promise<UserProfile | null>;
    initiateCryptoPayment(listingId: ListingId, cryptoCurrency: string): Promise<PaymentInitResult>;
    isCallerAdmin(): Promise<boolean>;
    isPaymentConfigured(): Promise<boolean>;
    requestPayout(txnId: TransactionId): Promise<PayoutResult>;
    saveCallerUserProfile(name: string, email: string, displayPictureUrl: string, role: UserRole): Promise<UserProfile>;
    setNowPaymentsApiKey(apiKey: string): Promise<void>;
    setStripeSecretKey(secretKey: string): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateListing(listingId: ListingId, input: ListingInput): Promise<Listing | null>;
    updatePaymentStatus(paymentId: string): Promise<Transaction | null>;
}
