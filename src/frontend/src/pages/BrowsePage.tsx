import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "@tanstack/react-router";
import { Search, ShoppingBag, Sparkles } from "lucide-react";
import { useState } from "react";
import { CategoryFilter } from "../components/ui/CategoryBadge";
import { ExchangeRateTicker } from "../components/ui/CryptoAmountDisplay";
import { ListingCard, ListingCardSkeleton } from "../components/ui/ListingCard";
import { useListings } from "../hooks/use-backend";
import type { Category, ListingFilter } from "../types";

const SKELETON_KEYS = ["s1", "s2", "s3", "s4", "s5", "s6"];

export default function BrowsePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | undefined>();
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const filter: ListingFilter = {
    ...(debouncedSearch ? { searchQuery: debouncedSearch } : {}),
    ...(category ? { category } : {}),
  };

  const {
    data: listings,
    isLoading,
    isError,
  } = useListings(Object.keys(filter).length > 0 ? filter : undefined);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    setDebouncedSearch(search);
  }

  return (
    <div className="flex flex-col">
      {/* Hero section */}
      <section className="bg-card border-b border-border py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Ticker */}
          <div className="flex justify-center mb-6">
            <ExchangeRateTicker className="px-4 py-2 bg-muted/50 rounded-full border border-border" />
          </div>

          <div className="text-center space-y-4 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-medium text-accent mb-2">
              <Sparkles className="w-3 h-3" />
              Global crypto marketplace
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground tracking-tight">
              Buy & sell with{" "}
              <span className="text-accent">cryptocurrency</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Discover products and services from sellers worldwide. Pay with
              BTC, ETH, USDC and more.
            </p>
          </div>

          {/* Search bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex gap-2 max-w-xl mx-auto"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search listings…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
                data-ocid="browse.search_input"
              />
            </div>
            <Button type="submit" data-ocid="browse.search.submit_button">
              Search
            </Button>
          </form>
        </div>
      </section>

      {/* Browse section */}
      <section className="py-10 px-4 bg-background">
        <div className="container mx-auto">
          {/* Category filters */}
          <div className="mb-6">
            <CategoryFilter selected={category} onChange={setCategory} />
          </div>

          {/* Results */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {SKELETON_KEYS.map((key) => (
                <ListingCardSkeleton key={key} />
              ))}
            </div>
          ) : isError ? (
            <div
              className="text-center py-16 space-y-3"
              data-ocid="browse.error_state"
            >
              <p className="text-muted-foreground">
                Failed to load listings. Please try again.
              </p>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            </div>
          ) : listings && listings.length > 0 ? (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                {listings.length} listing{listings.length !== 1 ? "s" : ""}{" "}
                found
              </p>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                data-ocid="browse.listings.list"
              >
                {listings.map((listing, i) => (
                  <ListingCard
                    key={listing.id.toString()}
                    listing={listing}
                    index={i}
                  />
                ))}
              </div>
            </>
          ) : (
            <div
              className="text-center py-20 space-y-4"
              data-ocid="browse.listings.empty_state"
            >
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg text-foreground">
                  No listings found
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  {debouncedSearch || category
                    ? "Try adjusting your search or filters."
                    : "Be the first to list something for sale!"}
                </p>
              </div>
              <Button
                onClick={() => navigate({ to: "/sell" })}
                data-ocid="browse.create_listing.primary_button"
              >
                Create a listing
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Value props section */}
      <section className="py-12 px-4 bg-muted/30 border-t border-border">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "₿",
                title: "Multi-crypto payments",
                desc: "Accept BTC, ETH, USDC, SOL and more — globally, instantly.",
              },
              {
                icon: "🔒",
                title: "Secure & transparent",
                desc: "All transactions are recorded on-chain. No hidden fees.",
              },
              {
                icon: "💸",
                title: "Seller-controlled payouts",
                desc: "Request your fiat payout via Stripe Connect whenever you're ready.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-5 rounded-xl bg-card border border-border shadow-xs"
              >
                <span className="text-2xl flex-shrink-0 mt-0.5">
                  {item.icon}
                </span>
                <div>
                  <h3 className="font-display font-semibold text-sm text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
