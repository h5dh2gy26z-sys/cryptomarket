import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useActor } from "@caffeineai/core-infrastructure";
import { CheckCircle2, CreditCard, ExternalLink, Info } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";
import { PageLoader } from "../components/ui/LoadingSpinner";
import { useMyProfile } from "../hooks/use-backend";

export default function SettingsPage() {
  const { data: profile, isLoading } = useMyProfile();
  const { actor } = useActor(createActor);

  const [stripeAccountId, setStripeAccountId] = useState(
    profile?.stripeConnectAccountId ?? "",
  );
  const [isSavingStripe, setIsSavingStripe] = useState(false);

  async function handleSaveStripe(e: React.FormEvent) {
    e.preventDefault();
    if (!actor || !stripeAccountId.trim()) return;
    setIsSavingStripe(true);
    try {
      await actor.connectStripeAccount(stripeAccountId.trim());
      toast.success("Stripe Connect account linked successfully!");
    } catch {
      toast.error("Failed to connect Stripe account.");
    } finally {
      setIsSavingStripe(false);
    }
  }

  if (isLoading) return <PageLoader message="Loading settings…" />;

  const hasStripe = !!profile?.stripeConnectAccountId;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-foreground">
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Configure your account and payout preferences
        </p>
      </div>

      {/* Stripe Connect */}
      <Card className="border-border shadow-card mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CreditCard className="w-5 h-5 text-primary" />
            Stripe Connect
            {hasStripe && (
              <Badge className="ml-auto bg-accent/10 text-accent border-accent/30 text-xs">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Connected
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            Connect your Stripe account to receive fiat payouts when buyers
            complete crypto payments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSaveStripe}
            className="space-y-4"
            data-ocid="settings.stripe.form"
          >
            <div className="space-y-1.5">
              <Label htmlFor="stripe-id">Stripe Connect Account ID</Label>
              <Input
                id="stripe-id"
                placeholder="acct_xxxxxxxxxxxxxxxx"
                value={stripeAccountId}
                onChange={(e) => setStripeAccountId(e.target.value)}
                className="font-mono"
                data-ocid="settings.stripe_account.input"
              />
              <p className="text-xs text-muted-foreground flex items-start gap-1.5 mt-1">
                <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                Find your account ID in the Stripe Dashboard under Settings →
                Account.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={isSavingStripe || !stripeAccountId.trim()}
                data-ocid="settings.stripe.submit_button"
              >
                {isSavingStripe
                  ? "Connecting…"
                  : hasStripe
                    ? "Update account"
                    : "Connect Stripe"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  window.open(
                    "https://dashboard.stripe.com/connect/accounts",
                    "_blank",
                  )
                }
                data-ocid="settings.stripe_dashboard.link"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Stripe Dashboard
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Fee structure */}
      <Card className="border-border shadow-xs">
        <CardHeader>
          <CardTitle className="text-lg">Fee Structure</CardTitle>
          <CardDescription>
            Transparent pricing — no hidden fees.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: "Platform fee", value: "2.5%", note: "Per transaction" },
            {
              label: "Crypto network fee",
              value: "Variable",
              note: "Paid by buyer",
            },
            {
              label: "Stripe payout fee",
              value: "~0.5%",
              note: "When you withdraw",
            },
            {
              label: "Minimum payout",
              value: "$10.00",
              note: "USD equivalent",
            },
          ].map((item, i) => (
            <div key={item.label}>
              {i > 0 && <Separator className="mb-3" />}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {item.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.note}</p>
                </div>
                <Badge variant="outline" className="font-mono text-sm">
                  {item.value}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
