import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  DollarSign,
  Package,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import { PageLoader } from "../components/ui/LoadingSpinner";
import {
  TransactionRow,
  TransactionRowSkeleton,
} from "../components/ui/TransactionRow";
import {
  useMyListings,
  useRequestPayout,
  useSellerBalance,
  useSellerTransactions,
} from "../hooks/use-backend";

const SKELETON_KEYS = ["t1", "t2", "t3"];

export default function SellerDashboardPage() {
  const { data: balance, isLoading: balanceLoading } = useSellerBalance();
  const { data: transactions, isLoading: txnLoading } = useSellerTransactions();
  const { data: listings, isLoading: listingsLoading } = useMyListings();
  const requestPayout = useRequestPayout();

  async function handlePayout(txnId: bigint) {
    try {
      await requestPayout.mutateAsync(txnId);
      toast.success("Payout requested successfully!");
    } catch {
      toast.error("Failed to request payout. Please try again.");
    }
  }

  const recentTransactions = transactions?.slice(0, 5) ?? [];
  const activeListings = listings?.filter((l) => l.isActive).length ?? 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-foreground">
            Seller Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Track your sales and manage payouts
          </p>
        </div>
        <Link to="/sell">
          <Button data-ocid="dashboard.create_listing.primary_button">
            <Package className="w-4 h-4 mr-2" />
            New listing
          </Button>
        </Link>
      </div>

      {/* Balance cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card
          className="shadow-card border-border"
          data-ocid="dashboard.balance.card"
        >
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  Available
                </p>
                {balanceLoading ? (
                  <div className="h-8 w-24 bg-muted rounded animate-pulse mt-1" />
                ) : (
                  <p className="font-display font-bold text-2xl text-accent mt-1">
                    ${balance?.availableUsd.toFixed(2) ?? "0.00"}
                  </p>
                )}
              </div>
              <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="shadow-card border-border"
          data-ocid="dashboard.pending.card"
        >
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  Pending
                </p>
                {balanceLoading ? (
                  <div className="h-8 w-24 bg-muted rounded animate-pulse mt-1" />
                ) : (
                  <p className="font-display font-bold text-2xl text-primary mt-1">
                    ${balance?.pendingUsd.toFixed(2) ?? "0.00"}
                  </p>
                )}
              </div>
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="shadow-card border-border"
          data-ocid="dashboard.listings.card"
        >
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  Active Listings
                </p>
                {listingsLoading ? (
                  <div className="h-8 w-16 bg-muted rounded animate-pulse mt-1" />
                ) : (
                  <p className="font-display font-bold text-2xl text-foreground mt-1">
                    {activeListings}
                  </p>
                )}
              </div>
              <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                <Package className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent transactions */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold text-lg text-foreground">
              Recent Sales
            </h2>
            <Link
              to="/seller/transactions"
              className="text-sm text-primary hover:text-primary/80 transition-fast flex items-center gap-1"
              data-ocid="dashboard.all_transactions.link"
            >
              View all
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2" data-ocid="dashboard.transactions.list">
            {txnLoading ? (
              SKELETON_KEYS.map((k) => <TransactionRowSkeleton key={k} />)
            ) : recentTransactions.length === 0 ? (
              <div
                className="py-12 text-center text-muted-foreground border border-dashed border-border rounded-xl"
                data-ocid="dashboard.transactions.empty_state"
              >
                <BarChart3 className="w-10 h-10 mx-auto mb-3 text-muted-foreground/40" />
                <p className="font-medium text-sm">No sales yet</p>
                <p className="text-xs mt-1">
                  Sales will appear here once buyers complete purchases.
                </p>
              </div>
            ) : (
              recentTransactions.map((txn, i) => (
                <TransactionRow
                  key={txn.id.toString()}
                  transaction={txn}
                  index={i}
                  showPayoutButton
                  onRequestPayout={handlePayout}
                />
              ))
            )}
          </div>
        </div>

        {/* Quick links */}
        <div className="space-y-4">
          <h2 className="font-display font-semibold text-lg text-foreground">
            Quick Links
          </h2>
          <div className="space-y-2">
            {[
              {
                to: "/seller/listings",
                label: "My Listings",
                icon: Package,
                ocid: "dashboard.my_listings.link",
              },
              {
                to: "/seller/transactions",
                label: "All Transactions",
                icon: BarChart3,
                ocid: "dashboard.all_txns.link",
              },
              {
                to: "/settings",
                label: "Payout Settings",
                icon: DollarSign,
                ocid: "dashboard.settings.link",
              },
            ].map((item) => (
              <Link key={item.to} to={item.to} data-ocid={item.ocid}>
                <Card className="hover:shadow-card transition-smooth cursor-pointer border-border">
                  <CardContent className="p-4 flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      {item.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
