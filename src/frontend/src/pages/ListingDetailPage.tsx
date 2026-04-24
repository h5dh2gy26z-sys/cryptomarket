import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, ShoppingCart, Tag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { CategoryBadge } from "../components/ui/CategoryBadge";
import { CryptoAmountDisplay } from "../components/ui/CryptoAmountDisplay";
import { StatusBadge } from "../components/ui/StatusBadge";
import { useAuth } from "../hooks/use-auth";
import { useInitiatePayment, useListing } from "../hooks/use-backend";

const CRYPTO_OPTIONS = [
  { value: "BTC", label: "Bitcoin (BTC)", icon: "₿" },
  { value: "ETH", label: "Ethereum (ETH)", icon: "Ξ" },
  { value: "USDC", label: "USD Coin (USDC)", icon: "$" },
  { value: "SOL", label: "Solana (SOL)", icon: "◎" },
];

export default function ListingDetailPage() {
  const { id } = useParams({ from: "/listings/$id" });
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const listingId = BigInt(id);

  const { data: listing, isLoading } = useListing(listingId);
  const initiatePayment = useInitiatePayment();

  const [selectedCrypto, setSelectedCrypto] = useState("BTC");

  async function handleBuy() {
    if (!isAuthenticated) {
      login();
      return;
    }
    try {
      const result = await initiatePayment.mutateAsync({
        listingId,
        cryptoCurrency: selectedCrypto,
      });
      navigate({
        to: "/checkout/$txnId",
        params: { txnId: result.transactionId.toString() },
      });
    } catch {
      toast.error("Failed to initiate payment. Please try again.");
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Skeleton className="h-6 w-32 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="aspect-square rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-10 w-full mt-8" />
          </div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div
        className="container mx-auto px-4 py-16 text-center"
        data-ocid="listing.not_found.error_state"
      >
        <Tag className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
        <h2 className="font-display font-bold text-xl text-foreground mb-2">
          Listing not found
        </h2>
        <p className="text-muted-foreground mb-6">
          This listing may have been removed or doesn't exist.
        </p>
        <Link to="/">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to browse
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumb */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-fast mb-6"
        data-ocid="listing.back.link"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to browse
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Cover image */}
        <div className="aspect-square rounded-xl overflow-hidden bg-muted border border-border">
          {listing.coverImageUrl ? (
            <img
              src={listing.coverImageUrl}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Tag className="w-16 h-16 text-muted-foreground/30" />
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CategoryBadge category={listing.category} />
              {!listing.isActive && (
                <Badge variant="secondary" className="text-xs">
                  Inactive
                </Badge>
              )}
            </div>
            <h1 className="font-display font-bold text-2xl text-foreground leading-snug">
              {listing.title}
            </h1>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
              {listing.description}
            </p>
          </div>

          <Separator />

          {/* Pricing */}
          <div className="space-y-2">
            <p className="font-display font-bold text-3xl text-foreground">
              $
              {listing.priceUsd.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </p>
            <CryptoAmountDisplay
              priceUsd={listing.priceUsd}
              showAll
              size="sm"
            />
          </div>

          {/* Fee note */}
          <Card className="bg-muted/30 border-border">
            <CardContent className="p-3 space-y-1.5 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Platform fee (2.5%)</span>
                <span className="font-mono">
                  ${(listing.priceUsd * 0.025).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between font-medium text-accent">
                <span>Seller receives</span>
                <span className="font-mono">
                  ${(listing.priceUsd * 0.975).toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Crypto selector */}
          {listing.isActive && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Pay with:</p>
              <div
                className="grid grid-cols-2 gap-2"
                data-ocid="listing.crypto_selector.panel"
              >
                {CRYPTO_OPTIONS.map((opt) => (
                  <button
                    type="button"
                    key={opt.value}
                    onClick={() => setSelectedCrypto(opt.value)}
                    data-ocid={`listing.crypto.${opt.value.toLowerCase()}.radio`}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-fast ${
                      selectedCrypto === opt.value
                        ? "border-accent bg-accent/10 text-foreground"
                        : "border-border bg-card text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    <span className="font-mono text-base">{opt.icon}</span>
                    <span>{opt.value}</span>
                  </button>
                ))}
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handleBuy}
                disabled={initiatePayment.isPending}
                data-ocid="listing.buy.primary_button"
              >
                {initiatePayment.isPending ? (
                  "Initiating payment…"
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {isAuthenticated
                      ? `Pay with ${selectedCrypto}`
                      : "Sign in to Purchase"}
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
