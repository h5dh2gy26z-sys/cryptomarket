import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import ListingTypes "../types/listings";
import UserTypes "../types/users";
import ListingLib "../lib/listings";

mixin (
  accessControlState : AccessControl.AccessControlState,
  listings : Map.Map<Common.ListingId, ListingTypes.Listing>,
  profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
  nextListingId : { var value : Nat },
) {
  /// Seller: create a new listing
  public shared ({ caller }) func createListing(input : ListingTypes.ListingInput) : async ListingTypes.Listing {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: must be logged in");
    };
    let id = nextListingId.value;
    nextListingId.value += 1;
    ListingLib.createListing(listings, id, caller, input);
  };

  /// Seller: update own listing
  public shared ({ caller }) func updateListing(listingId : Common.ListingId, input : ListingTypes.ListingInput) : async ?ListingTypes.Listing {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: must be logged in");
    };
    ListingLib.updateListing(listings, listingId, caller, input);
  };

  /// Seller: delete own listing
  public shared ({ caller }) func deleteListing(listingId : Common.ListingId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: must be logged in");
    };
    ListingLib.deleteListing(listings, listingId, caller);
  };

  /// Public: get a single listing
  public query func getListing(listingId : Common.ListingId) : async ?ListingTypes.Listing {
    ListingLib.getListing(listings, listingId);
  };

  /// Public: browse/search active listings with optional filter
  public query func browseListings(filter : ?ListingTypes.ListingFilter) : async [ListingTypes.Listing] {
    ListingLib.listActiveListings(listings, filter);
  };

  /// Seller: get own listings
  public query ({ caller }) func getMyListings() : async [ListingTypes.Listing] {
    ListingLib.getSellerListings(listings, caller);
  };
};
