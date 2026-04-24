import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Common "../types/common";
import ListingTypes "../types/listings";

module {
  public func createListing(
    listings : Map.Map<Common.ListingId, ListingTypes.Listing>,
    nextId : Nat,
    sellerId : Common.UserId,
    input : ListingTypes.ListingInput,
  ) : ListingTypes.Listing {
    let now = Time.now();
    let listing : ListingTypes.Listing = {
      id = nextId;
      sellerId;
      title = input.title;
      description = input.description;
      priceUsd = input.priceUsd;
      category = input.category;
      coverImageUrl = input.coverImageUrl;
      isActive = true;
      createdAt = now;
      updatedAt = now;
    };
    listings.add(nextId, listing);
    listing;
  };

  public func updateListing(
    listings : Map.Map<Common.ListingId, ListingTypes.Listing>,
    listingId : Common.ListingId,
    sellerId : Common.UserId,
    input : ListingTypes.ListingInput,
  ) : ?ListingTypes.Listing {
    switch (listings.get(listingId)) {
      case (?existing) {
        if (not Principal.equal(existing.sellerId, sellerId)) {
          Runtime.trap("Not the owner of this listing");
        };
        let updated : ListingTypes.Listing = {
          existing with
          title = input.title;
          description = input.description;
          priceUsd = input.priceUsd;
          category = input.category;
          coverImageUrl = input.coverImageUrl;
          updatedAt = Time.now();
        };
        listings.add(listingId, updated);
        ?updated;
      };
      case null null;
    };
  };

  public func deleteListing(
    listings : Map.Map<Common.ListingId, ListingTypes.Listing>,
    listingId : Common.ListingId,
    sellerId : Common.UserId,
  ) : Bool {
    switch (listings.get(listingId)) {
      case (?existing) {
        if (not Principal.equal(existing.sellerId, sellerId)) {
          Runtime.trap("Not the owner of this listing");
        };
        listings.remove(listingId);
        true;
      };
      case null false;
    };
  };

  public func getListing(
    listings : Map.Map<Common.ListingId, ListingTypes.Listing>,
    listingId : Common.ListingId,
  ) : ?ListingTypes.Listing {
    listings.get(listingId);
  };

  public func listActiveListings(
    listings : Map.Map<Common.ListingId, ListingTypes.Listing>,
    filter : ?ListingTypes.ListingFilter,
  ) : [ListingTypes.Listing] {
    let allActive = listings.values().filter(func(l) { l.isActive });
    let filtered = switch (filter) {
      case null allActive;
      case (?f) {
        allActive.filter(func(l : ListingTypes.Listing) : Bool {
          let categoryMatch = switch (f.category) {
            case null true;
            case (?cat) {
              switch (l.category, cat) {
                case (#electronics, #electronics) true;
                case (#clothing, #clothing) true;
                case (#books, #books) true;
                case (#home, #home) true;
                case (#sports, #sports) true;
                case (#digital, #digital) true;
                case (#services, #services) true;
                case (#other, #other) true;
                case _ false;
              };
            };
          };
          let searchMatch = switch (f.searchQuery) {
            case null true;
            case (?q) {
              let lowerQ = q.toLower();
              l.title.toLower().contains(#text (lowerQ)) or l.description.toLower().contains(#text (lowerQ));
            };
          };
          let minMatch = switch (f.minPriceUsd) {
            case null true;
            case (?minP) l.priceUsd >= minP;
          };
          let maxMatch = switch (f.maxPriceUsd) {
            case null true;
            case (?maxP) l.priceUsd <= maxP;
          };
          categoryMatch and searchMatch and minMatch and maxMatch;
        });
      };
    };
    filtered.toArray();
  };

  public func getSellerListings(
    listings : Map.Map<Common.ListingId, ListingTypes.Listing>,
    sellerId : Common.UserId,
  ) : [ListingTypes.Listing] {
    listings.values().filter(func(l) { Principal.equal(l.sellerId, sellerId) }).toArray();
  };
};
