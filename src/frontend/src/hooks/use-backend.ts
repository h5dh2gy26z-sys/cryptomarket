import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  Category,
  Listing,
  ListingFilter,
  ListingId,
  ListingInput,
  PaymentInitResult,
  PayoutResult,
  SellerBalance,
  Transaction,
  TransactionId,
  UserProfile,
  UserRole,
} from "../types";

function useBackendActor() {
  return useActor(createActor);
}

// ─── Listings ──────────────────────────────────────────────────────────────

export function useListings(filter?: ListingFilter) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Listing[]>({
    queryKey: ["listings", filter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.browseListings(filter ?? null);
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useListing(id: ListingId | undefined) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Listing | null>({
    queryKey: ["listing", id?.toString()],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      return actor.getListing(id);
    },
    enabled: !!actor && !isFetching && id !== undefined,
  });
}

export function useMyListings() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Listing[]>({
    queryKey: ["my-listings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyListings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateListing() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation<Listing, Error, ListingInput>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Not connected");
      return actor.createListing(input);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["listings"] });
      qc.invalidateQueries({ queryKey: ["my-listings"] });
    },
  });
}

export function useUpdateListing() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation<
    Listing | null,
    Error,
    { id: ListingId; input: ListingInput }
  >({
    mutationFn: async ({ id, input }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateListing(id, input);
    },
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ["listings"] });
      qc.invalidateQueries({ queryKey: ["listing", id.toString()] });
      qc.invalidateQueries({ queryKey: ["my-listings"] });
    },
  });
}

export function useDeleteListing() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation<boolean, Error, ListingId>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteListing(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["listings"] });
      qc.invalidateQueries({ queryKey: ["my-listings"] });
    },
  });
}

// ─── Users ─────────────────────────────────────────────────────────────────

export function useMyProfile() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<UserProfile | null>({
    queryKey: ["my-profile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveProfile() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation<
    UserProfile,
    Error,
    { name: string; email: string; displayPictureUrl: string; role: UserRole }
  >({
    mutationFn: async ({ name, email, displayPictureUrl, role }) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveCallerUserProfile(name, email, displayPictureUrl, role);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my-profile"] });
    },
  });
}

// ─── Transactions ──────────────────────────────────────────────────────────

export function useSellerTransactions() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Transaction[]>({
    queryKey: ["seller-transactions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyTransactionsAsSeller();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBuyerTransactions() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Transaction[]>({
    queryKey: ["buyer-transactions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyTransactionsAsBuyer();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTransaction(id: TransactionId | undefined) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Transaction | null>({
    queryKey: ["transaction", id?.toString()],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      return actor.getTransaction(id);
    },
    enabled: !!actor && !isFetching && id !== undefined,
    refetchInterval: (query) => {
      const data = query.state.data;
      if (data?.status === "pending") return 5_000;
      return false;
    },
  });
}

export function useSellerBalance() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<SellerBalance>({
    queryKey: ["seller-balance"],
    queryFn: async () => {
      if (!actor) return { availableUsd: 0, pendingUsd: 0 };
      return actor.getSellerBalance();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useInitiatePayment() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation<
    PaymentInitResult,
    Error,
    { listingId: ListingId; cryptoCurrency: string }
  >({
    mutationFn: async ({ listingId, cryptoCurrency }) => {
      if (!actor) throw new Error("Not connected");
      return actor.initiateCryptoPayment(listingId, cryptoCurrency);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["buyer-transactions"] });
    },
  });
}

export function useRequestPayout() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation<PayoutResult, Error, TransactionId>({
    mutationFn: async (txnId) => {
      if (!actor) throw new Error("Not connected");
      return actor.requestPayout(txnId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["seller-transactions"] });
      qc.invalidateQueries({ queryKey: ["seller-balance"] });
    },
  });
}

// ─── Crypto exchange rates (public API) ────────────────────────────────────

export interface ExchangeRates {
  BTC: number;
  ETH: number;
  USDC: number;
  SOL: number;
}

export function useCryptoRates() {
  return useQuery<ExchangeRates>({
    queryKey: ["crypto-rates"],
    queryFn: async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,usd-coin,solana&vs_currencies=usd",
        );
        const data = await res.json();
        return {
          BTC: data.bitcoin?.usd ?? 65000,
          ETH: data.ethereum?.usd ?? 3400,
          USDC: data["usd-coin"]?.usd ?? 1.0,
          SOL: data.solana?.usd ?? 160,
        };
      } catch {
        // Fallback rates if API fails
        return { BTC: 65000, ETH: 3400, USDC: 1.0, SOL: 160 };
      }
    },
    staleTime: 60_000,
    refetchInterval: 120_000,
  });
}

// ─── Category filter helper ────────────────────────────────────────────────

export function useListingsByCategory(category?: Category) {
  return useListings(category ? { category } : undefined);
}
