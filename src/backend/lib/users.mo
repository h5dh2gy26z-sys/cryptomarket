import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Common "../types/common";
import UserTypes "../types/users";

module {
  public func getProfile(
    profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
    userId : Common.UserId,
  ) : ?UserTypes.UserProfile {
    profiles.get(userId);
  };

  public func saveProfile(
    profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
    userId : Common.UserId,
    name : Text,
    email : Text,
    displayPictureUrl : Text,
    role : Common.UserRole,
  ) : UserTypes.UserProfile {
    let now = Time.now();
    let existing = profiles.get(userId);
    let profile : UserTypes.UserProfile = switch (existing) {
      case (?p) {
        { p with name; email; displayPictureUrl; role };
      };
      case null {
        {
          id = userId;
          name;
          email;
          displayPictureUrl;
          role;
          stripeConnectAccountId = null;
          createdAt = now;
        };
      };
    };
    profiles.add(userId, profile);
    profile;
  };

  public func setStripeConnect(
    profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
    userId : Common.UserId,
    stripeConnectAccountId : Text,
  ) : () {
    let profile = switch (profiles.get(userId)) {
      case (?p) p;
      case null Runtime.trap("Profile not found");
    };
    profiles.add(userId, { profile with stripeConnectAccountId = ?stripeConnectAccountId });
  };

  public func getStripeConnectAccountId(
    profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
    userId : Common.UserId,
  ) : ?Text {
    switch (profiles.get(userId)) {
      case (?p) p.stripeConnectAccountId;
      case null null;
    };
  };
};
