import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Link } from "@tanstack/react-router";
import { Edit2, Package, Plus, Tag, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { CategoryBadge } from "../components/ui/CategoryBadge";
import { ListingCardSkeleton } from "../components/ui/ListingCard";
import {
  useDeleteListing,
  useMyListings,
  useUpdateListing,
} from "../hooks/use-backend";
import { Category, type Listing } from "../types";

const SKELETON_KEYS = ["l1", "l2", "l3"];

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

export default function SellerListingsPage() {
  const { data: listings, isLoading } = useMyListings();
  const deleteListing = useDeleteListing();
  const updateListing = useUpdateListing();

  const [editTarget, setEditTarget] = useState<Listing | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Listing | null>(null);

  // Edit form state
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editCategory, setEditCategory] = useState<Category>(Category.other);
  const [editImageUrl, setEditImageUrl] = useState("");

  function openEdit(listing: Listing) {
    setEditTarget(listing);
    setEditTitle(listing.title);
    setEditDesc(listing.description);
    setEditPrice(listing.priceUsd.toString());
    setEditCategory(listing.category);
    setEditImageUrl(listing.coverImageUrl);
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editTarget) return;
    try {
      await updateListing.mutateAsync({
        id: editTarget.id,
        input: {
          title: editTitle.trim(),
          description: editDesc.trim(),
          priceUsd: Number(editPrice),
          category: editCategory,
          coverImageUrl: editImageUrl.trim(),
        },
      });
      toast.success("Listing updated!");
      setEditTarget(null);
    } catch {
      toast.error("Failed to update listing.");
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      await deleteListing.mutateAsync(deleteTarget.id);
      toast.success("Listing deleted.");
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete listing.");
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-foreground">
            My Listings
          </h1>
          <p className="text-muted-foreground mt-1">
            {listings
              ? `${listings.length} listing${listings.length !== 1 ? "s" : ""}`
              : "Manage your listings"}
          </p>
        </div>
        <Link to="/sell">
          <Button data-ocid="seller_listings.create.primary_button">
            <Plus className="w-4 h-4 mr-2" />
            New listing
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKELETON_KEYS.map((k) => (
            <ListingCardSkeleton key={k} />
          ))}
        </div>
      ) : !listings || listings.length === 0 ? (
        <div
          className="py-20 text-center border border-dashed border-border rounded-xl"
          data-ocid="seller_listings.empty_state"
        >
          <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground/40" />
          <h3 className="font-display font-semibold text-lg text-foreground">
            No listings yet
          </h3>
          <p className="text-muted-foreground text-sm mt-1 mb-6">
            Create your first listing to start selling.
          </p>
          <Link to="/sell">
            <Button data-ocid="seller_listings.create_first.button">
              Create a listing
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3" data-ocid="seller_listings.list">
          {listings.map((listing, i) => (
            <Card
              key={listing.id.toString()}
              className="border-border shadow-xs hover:shadow-card transition-smooth"
              data-ocid={`seller_listings.item.${i + 1}`}
            >
              <CardContent className="p-4 flex items-center gap-4">
                {/* Image */}
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  {listing.coverImageUrl ? (
                    <img
                      src={listing.coverImageUrl}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Tag className="w-6 h-6 text-muted-foreground/40" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium text-sm text-foreground truncate">
                      {listing.title}
                    </p>
                    <CategoryBadge category={listing.category} />
                    {!listing.isActive && (
                      <Badge variant="secondary" className="text-xs">
                        Inactive
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                    {listing.description}
                  </p>
                  <p className="font-display font-bold text-sm text-foreground mt-1">
                    ${listing.priceUsd.toFixed(2)}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => openEdit(listing)}
                    data-ocid={`seller_listings.edit_button.${i + 1}`}
                    aria-label={`Edit ${listing.title}`}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => setDeleteTarget(listing)}
                    data-ocid={`seller_listings.delete_button.${i + 1}`}
                    aria-label={`Delete ${listing.title}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit dialog */}
      <Dialog
        open={!!editTarget}
        onOpenChange={(o) => !o && setEditTarget(null)}
      >
        <DialogContent
          className="max-w-lg"
          data-ocid="seller_listings.edit.dialog"
        >
          <DialogHeader>
            <DialogTitle>Edit listing</DialogTitle>
            <DialogDescription>
              Update the details for your listing.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                data-ocid="seller_listings.edit_title.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-desc">Description</Label>
              <Textarea
                id="edit-desc"
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                rows={3}
                data-ocid="seller_listings.edit_description.textarea"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="edit-price">Price (USD)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  step="0.01"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  data-ocid="seller_listings.edit_price.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select
                  value={editCategory}
                  onValueChange={(v) => setEditCategory(v as Category)}
                >
                  <SelectTrigger data-ocid="seller_listings.edit_category.select">
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
            <div className="space-y-1.5">
              <Label htmlFor="edit-image">Cover image URL</Label>
              <Input
                id="edit-image"
                type="url"
                value={editImageUrl}
                onChange={(e) => setEditImageUrl(e.target.value)}
                data-ocid="seller_listings.edit_image.input"
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditTarget(null)}
                data-ocid="seller_listings.edit.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={updateListing.isPending}
                data-ocid="seller_listings.edit.save_button"
              >
                {updateListing.isPending ? "Saving…" : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete dialog */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
      >
        <DialogContent data-ocid="seller_listings.delete.dialog">
          <DialogHeader>
            <DialogTitle>Delete listing</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{deleteTarget?.title}"? This
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteTarget(null)}
              data-ocid="seller_listings.delete.cancel_button"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteListing.isPending}
              data-ocid="seller_listings.delete.confirm_button"
            >
              {deleteListing.isPending ? "Deleting…" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
