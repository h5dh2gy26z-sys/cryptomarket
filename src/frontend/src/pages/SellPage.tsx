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
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import { PlusCircle, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateListing } from "../hooks/use-backend";
import { Category } from "../types";

const CATEGORY_LABELS: Record<Category, string> = {
  [Category.electronics]: "Electronics",
  [Category.clothing]: "Clothing",
  [Category.books]: "Books",
  [Category.home]: "Home",
  [Category.sports]: "Sports",
  [Category.digital]: "Digital",
  [Category.services]: "Services",
  [Category.other]: "Other",
};

export default function SellPage() {
  const navigate = useNavigate();
  const createListing = useCreateListing();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priceUsd, setPriceUsd] = useState("");
  const [category, setCategory] = useState<Category>(Category.other);
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!priceUsd || Number.isNaN(Number(priceUsd)) || Number(priceUsd) <= 0) {
      newErrors.priceUsd = "Enter a valid price greater than 0";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    try {
      const listing = await createListing.mutateAsync({
        title: title.trim(),
        description: description.trim(),
        priceUsd: Number(priceUsd),
        category,
        coverImageUrl: coverImageUrl.trim(),
      });
      toast.success("Listing created successfully!");
      navigate({ to: "/listings/$id", params: { id: listing.id.toString() } });
    } catch {
      toast.error("Failed to create listing. Please try again.");
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-foreground">
          Create a listing
        </h1>
        <p className="text-muted-foreground mt-1">
          List your product or service and accept crypto payments globally.
        </p>
      </div>

      <Card className="shadow-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Listing details</CardTitle>
          <CardDescription>
            Fill in the details about what you're selling. Buyers pay in
            cryptocurrency, and you receive USD via Stripe Connect.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            data-ocid="sell.form"
          >
            {/* Title */}
            <div className="space-y-1.5">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="What are you selling?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                data-ocid="sell.title.input"
                aria-invalid={!!errors.title}
              />
              {errors.title && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="sell.title.field_error"
                >
                  {errors.title}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your item in detail…"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                data-ocid="sell.description.textarea"
                aria-invalid={!!errors.description}
              />
              {errors.description && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="sell.description.field_error"
                >
                  {errors.description}
                </p>
              )}
            </div>

            {/* Price + Category */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="price">Price (USD) *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                    $
                  </span>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="0.00"
                    value={priceUsd}
                    onChange={(e) => setPriceUsd(e.target.value)}
                    className="pl-7"
                    data-ocid="sell.price.input"
                    aria-invalid={!!errors.priceUsd}
                  />
                </div>
                {errors.priceUsd && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="sell.price.field_error"
                  >
                    {errors.priceUsd}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={category}
                  onValueChange={(v) => setCategory(v as Category)}
                >
                  <SelectTrigger id="category" data-ocid="sell.category.select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(CATEGORY_LABELS).map(([val, label]) => (
                      <SelectItem key={val} value={val}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Cover image */}
            <div className="space-y-1.5">
              <Label htmlFor="coverImage">Cover image URL</Label>
              <div className="flex gap-2">
                <Input
                  id="coverImage"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={coverImageUrl}
                  onChange={(e) => setCoverImageUrl(e.target.value)}
                  data-ocid="sell.cover_image.input"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Paste a public image URL for your listing cover photo.
              </p>
            </div>

            {/* Fee breakdown */}
            {priceUsd && Number(priceUsd) > 0 && (
              <div className="rounded-lg bg-muted/30 border border-border p-3 space-y-1.5 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Sale price</span>
                  <span className="font-mono">
                    ${Number(priceUsd).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Platform fee (2.5%)</span>
                  <span className="font-mono">
                    −${(Number(priceUsd) * 0.025).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-accent border-t border-border pt-1.5">
                  <span>You receive</span>
                  <span className="font-mono">
                    ${(Number(priceUsd) * 0.975).toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={createListing.isPending}
              data-ocid="sell.submit_button"
            >
              {createListing.isPending ? (
                "Creating listing…"
              ) : (
                <>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Create listing
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
