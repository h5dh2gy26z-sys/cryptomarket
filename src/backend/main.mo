import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Common "types/common";
import UserTypes "types/users";
import ListingTypes "types/listings";
import TxnTypes "types/transactions";
import UsersMixin "mixins/users-api";
import ListingsMixin "mixins/listings-api";
import PaymentsMixin "mixins/payments-api";

actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // State
  let profiles = Map.empty<Common.UserId, UserTypes.UserProfile>();
  let listings = Map.empty<Common.ListingId, ListingTypes.Listing>();
  let transactions = Map.empty<Common.TransactionId, TxnTypes.Transaction>();

  let nextListingId = { var value : Nat = 1 };
  let nextTxnId = { var value : Nat = 1 };

  let nowPaymentsApiKey = { var value : ?Text = null };
  let stripeSecretKey = { var value : ?Text = null };

  // Domain mixins
  include UsersMixin(accessControlState, profiles);
  include ListingsMixin(accessControlState, listings, profiles, nextListingId);
  include PaymentsMixin(accessControlState, transactions, listings, profiles, nextTxnId, nowPaymentsApiKey, stripeSecretKey);
};
