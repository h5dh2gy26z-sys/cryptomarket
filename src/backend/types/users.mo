import Common "common";

module {
  public type UserProfile = {
    id : Common.UserId;
    name : Text;
    email : Text;
    displayPictureUrl : Text;
    role : Common.UserRole;
    stripeConnectAccountId : ?Text;
    createdAt : Common.Timestamp;
  };
};
