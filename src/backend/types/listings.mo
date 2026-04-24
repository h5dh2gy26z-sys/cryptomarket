import Common "common";

module {
  public type Listing = {
    id : Common.ListingId;
    sellerId : Common.UserId;
    title : Text;
    description : Text;
    priceUsd : Float;
    category : Common.Category;
    coverImageUrl : Text;
    isActive : Bool;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type ListingInput = {
    title : Text;
    description : Text;
    priceUsd : Float;
    category : Common.Category;
    coverImageUrl : Text;
  };

  public type ListingFilter = {
    category : ?Common.Category;
    searchQuery : ?Text;
    minPriceUsd : ?Float;
    maxPriceUsd : ?Float;
  };
};
