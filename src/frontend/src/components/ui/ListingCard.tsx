import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink, Tag } from "lucide-react";
import { useCryptoRates } from "../../hooks/use-backend";
import type { Listing } from "../../types";
import { CategoryBadge } from "./CategoryBadge";

interface ListingCardProps {
  listing: Listing;
  index?: number;
}

function cryptoAmount(priceUsd: number, rateUsd: number): string {
  const amount = priceUsd / rateUsd;
  if (amount < 0.001) return amount.toFixed(6);
  if (amount < 1) return amount.toFixed(4);
  return amount.toFixed(3);
}

export function ListingCard({ listing, index = 0 }: ListingCardProps) {
  const { data: rates } = useCryptoRates();

  return (
    <Card
      className="group overflow-hidden border-border shadow-card hover:shadow-elevated transition-smooth cursor-pointer"
      data-ocid={`listing.item.${index + 1}`}
    >
      {/* Cover image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {listing.coverImageUrl ? (
          <img
            src={listing.coverImageUrl}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <Tag className="w-10 h-10 text-muted-foreground/30" />
          </div>
        )}
        {!listing.isActive && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
            <Badge variant="secondary" className="text-xs">
              Inactive
            </Badge>
          </div>
        )}
        <div className="absolute top-2 left-2">
          <CategoryBadge category={listing.category} />
        </div>
      </div>

      <CardContent className="p-4 flex flex-col gap-3">
        {/* Title */}
        <div>
          <h3 className="font-display font-semibold text-foreground line-clamp-2 text-sm leading-snug group-hover:text-primary transition-colors">
            {listing.title}
          </h3>
          {listing.description && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {listing.description}
            </p>
          )}
        </div>

        {/* Price */}
        <div className="flex items-end justify-between gap-2">
          <div>
            <p className="font-display font-bold text-lg text-foreground">
              $
              {listing.priceUsd.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            {rates && (
              <p className="font-mono text-xs text-muted-foreground mt-0.5">
                ≈ {cryptoAmount(listing.priceUsd, rates.BTC)} BTC
                {" · "}
                {cryptoAmount(listing.priceUsd, rates.ETH)} ETH
              </p>
            )}
          </div>
          {rates && (
            <Badge
              variant="outline"
              className="text-accent border-accent/30 bg-accent/5 font-mono text-xs flex-shrink-0"
            >
              {cryptoAmount(listing.priceUsd, rates.USDC)} USDC
            </Badge>
          )}
        </div>

        {/* CTA */}
        <Link
          to="/listings/$id"
          params={{ id: listing.id.toString() }}
          className="block"
        >
          <Button
            className="w-full group/btn"
            size="sm"
            data-ocid={`listing.view_button.${index + 1}`}
          >
            View Listing
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export function ListingCardSkeleton() {
  return (
    <Card className="overflow-hidden border-border">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <CardContent className="p-4 flex flex-col gap-3">
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-full" />
        </div>
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-3 w-36" />
          </div>
          <Skeleton className="h-6 w-20" />
        </div>
        <Skeleton className="h-8 w-full" />
      </CardContent>
    </Card>
  );
}
