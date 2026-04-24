module {
  public type UserId = Principal;
  public type ListingId = Nat;
  public type TransactionId = Nat;
  public type Timestamp = Int;

  public type UserRole = {
    #seller;
    #buyer;
    #both;
  };

  public type TransactionStatus = {
    #pending;
    #paid;
    #failed;
    #refunded;
  };

  public type Category = {
    #electronics;
    #clothing;
    #books;
    #home;
    #sports;
    #digital;
    #services;
    #other;
  };
};
