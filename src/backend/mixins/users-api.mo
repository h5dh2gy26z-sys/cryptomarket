import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import UserTypes "../types/users";
import UserLib "../lib/users";

mixin (
  accessControlState : AccessControl.AccessControlState,
  profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
) {
  public query ({ caller }) func getCallerUserProfile() : async ?UserTypes.UserProfile {
    UserLib.getProfile(profiles, caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(
    name : Text,
    email : Text,
    displayPictureUrl : Text,
    role : Common.UserRole,
  ) : async UserTypes.UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: must be logged in");
    };
    UserLib.saveProfile(profiles, caller, name, email, displayPictureUrl, role);
  };

  public query ({ caller }) func getUserProfile(userId : Common.UserId) : async ?UserTypes.UserProfile {
    UserLib.getProfile(profiles, userId);
  };

  /// Seller onboarding: connect Stripe Connect account
  public shared ({ caller }) func connectStripeAccount(stripeConnectAccountId : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: must be logged in");
    };
    UserLib.setStripeConnect(profiles, caller, stripeConnectAccountId);
  };
};
