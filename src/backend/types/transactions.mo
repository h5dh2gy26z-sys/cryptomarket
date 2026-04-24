import Common "common";

module {
  public type Transaction = {
    id : Common.TransactionId;
    listingId : Common.ListingId;
    buyerId : Common.UserId;
    sellerId : Common.UserId;
    amountUsd : Float;
    platformFeeUsd : Float;
    sellerAmountUsd : Float;
    status : Common.TransactionStatus;
    nowPaymentsPaymentId : ?Text;
    cryptoTxnHash : ?Text;
    cryptoCurrency : ?Text;
    cryptoAddress : ?Text;
    stripeTransferId : ?Text;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type PaymentInitResult = {
    transactionId : Common.TransactionId;
    paymentId : Text;
    paymentAddress : Text;
    paymentAmount : Float;
    currency : Text;
    expiresAt : Common.Timestamp;
  };

  public type PayoutResult = {
    transactionId : Common.TransactionId;
    stripeTransferId : Text;
    amountUsd : Float;
  };

  public type SellerBalance = {
    availableUsd : Float;
    pendingUsd : Float;
  };
};
