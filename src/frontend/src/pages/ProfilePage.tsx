import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PageLoader } from "../components/ui/LoadingSpinner";
import { useMyProfile, useSaveProfile } from "../hooks/use-backend";
import { UserRole } from "../types";

const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.buyer]: "Buyer — I buy items",
  [UserRole.seller]: "Seller — I sell items",
  [UserRole.both]: "Both — I buy and sell",
};

export default function ProfilePage() {
  const { data: profile, isLoading } = useMyProfile();
  const saveProfile = useSaveProfile();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [displayPictureUrl, setDisplayPictureUrl] = useState("");
  const [role, setRole] = useState<UserRole>(UserRole.buyer);

  useEffect(() => {
    if (profile) {
      setName(profile.name ?? "");
      setEmail(profile.email ?? "");
      setDisplayPictureUrl(profile.displayPictureUrl ?? "");
      setRole(profile.role ?? UserRole.buyer);
    }
  }, [profile]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await saveProfile.mutateAsync({ name, email, displayPictureUrl, role });
      toast.success("Profile saved successfully!");
    } catch {
      toast.error("Failed to save profile. Please try again.");
    }
  }

  if (isLoading) return <PageLoader message="Loading profile…" />;

  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-foreground">
          My Profile
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your account information and preferences
        </p>
      </div>

      {/* Avatar section */}
      <Card className="border-border shadow-card mb-6">
        <CardContent className="p-6 flex items-center gap-5">
          <Avatar className="w-16 h-16">
            <AvatarImage src={displayPictureUrl} />
            <AvatarFallback className="bg-primary text-primary-foreground font-bold text-xl">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-display font-semibold text-foreground">
              {name || "Anonymous User"}
            </p>
            <p className="text-sm text-muted-foreground">
              {email || "No email set"}
            </p>
            {profile && (
              <p className="font-mono text-xs text-muted-foreground mt-1">
                {profile.id.toText().slice(0, 24)}…
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit form */}
      <Card className="border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Profile details</CardTitle>
          <CardDescription>
            Update your display name, email, and role.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            data-ocid="profile.form"
          >
            <div className="space-y-1.5">
              <Label htmlFor="profile-name">Display name</Label>
              <Input
                id="profile-name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                data-ocid="profile.name.input"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="profile-email">Email</Label>
              <Input
                id="profile-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-ocid="profile.email.input"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="profile-avatar">Profile picture URL</Label>
              <Input
                id="profile-avatar"
                type="url"
                placeholder="https://example.com/avatar.jpg"
                value={displayPictureUrl}
                onChange={(e) => setDisplayPictureUrl(e.target.value)}
                data-ocid="profile.avatar.input"
              />
            </div>

            <div className="space-y-1.5">
              <Label>Account role</Label>
              <Select
                value={role}
                onValueChange={(v) => setRole(v as UserRole)}
              >
                <SelectTrigger data-ocid="profile.role.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(ROLE_LABELS).map(([val, label]) => (
                    <SelectItem key={val} value={val}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              disabled={saveProfile.isPending}
              data-ocid="profile.save.submit_button"
              className="w-full sm:w-auto"
            >
              {saveProfile.isPending ? "Saving…" : "Save profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
