import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import AccessControl "mo:caffeineai-authorization/access-control";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Common "../types/common";
import TxnTypes "../types/transactions";
import ListingTypes "../types/listings";
import UserTypes "../types/users";
import TxnLib "../lib/transactions";

mixin (
  accessControlState : AccessControl.AccessControlState,
  transactions : Map.Map<Common.TransactionId, TxnTypes.Transaction>,
  listings : Map.Map<Common.ListingId, ListingTypes.Listing>,
  profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
  nextTxnId : { var value : Nat },
  nowPaymentsApiKey : { var value : ?Text },
  stripeSecretKey : { var value : ?Text },
) {
  /// HTTP outcall transform (required by IC)
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // ---- Admin config ----

  public shared ({ caller }) func setNowPaymentsApiKey(apiKey : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin only");
    };
    nowPaymentsApiKey.value := ?apiKey;
  };

  public shared ({ caller }) func setStripeSecretKey(secretKey : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin only");
    };
    stripeSecretKey.value := ?secretKey;
  };

  public query ({ caller }) func isPaymentConfigured() : async Bool {
    switch (nowPaymentsApiKey.value, stripeSecretKey.value) {
      case (?_, ?_) true;
      case _ false;
    };
  };

  // ---- Buyer checkout ----

  /// Buyer initiates crypto payment for a listing via NOWPayments
  public shared ({ caller }) func initiateCryptoPayment(
    listingId : Common.ListingId,
    cryptoCurrency : Text,
  ) : async TxnTypes.PaymentInitResult {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: must be logged in");
    };

    let apiKey = switch (nowPaymentsApiKey.value) {
      case (?k) k;
      case null Runtime.trap("NOWPayments API key not configured");
    };

    let listing = switch (listings.get(listingId)) {
      case (?l) l;
      case null Runtime.trap("Listing not found");
    };

    if (not listing.isActive) {
      Runtime.trap("Listing is not active");
    };

    let txnId = nextTxnId.value;
    nextTxnId.value += 1;

    let txn = TxnLib.createPendingTransaction(
      transactions, txnId, listingId, caller, listing.sellerId, listing.priceUsd,
    );

    // Build NOWPayments request body
    let orderId = txnId.toText();
    let body = "{\"price_amount\":" # floatToText(listing.priceUsd) #
      ",\"price_currency\":\"usd\",\"pay_currency\":\"" # cryptoCurrency #
      "\",\"order_id\":\"" # orderId # "\"}";

    let headers : [OutCall.Header] = [
      { name = "x-api-key"; value = apiKey },
      { name = "Content-Type"; value = "application/json" },
    ];

    let responseText = await OutCall.httpPostRequest(
      "https://api.nowpayments.io/v1/payment",
      headers,
      body,
      transform,
    );

    // Parse the JSON response on the frontend; here we extract paymentId and payment_address
    // using simple text search since Motoko has no built-in JSON parser
    let paymentId = extractJsonField(responseText, "payment_id");
    let paymentAddress = extractJsonField(responseText, "pay_address");
    let paymentAmountText = extractJsonField(responseText, "pay_amount");
    let paymentAmount = textToFloat(paymentAmountText);

    ignore TxnLib.updateTransactionPayment(transactions, txnId, paymentId, paymentAddress, cryptoCurrency);

    // NOWPayments payments expire in ~20 minutes (1200 seconds)
    let expiresAt = Time.now() + 1_200_000_000_000;

    {
      transactionId = txnId;
      paymentId;
      paymentAddress;
      paymentAmount;
      currency = cryptoCurrency;
      expiresAt;
    };
  };

  /// Webhook / polling: update transaction status from NOWPayments
  public shared ({ caller }) func updatePaymentStatus(paymentId : Text) : async ?TxnTypes.Transaction {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: must be logged in");
    };

    let apiKey = switch (nowPaymentsApiKey.value) {
      case (?k) k;
      case null Runtime.trap("NOWPayments API key not configured");
    };

    let headers : [OutCall.Header] = [
      { name = "x-api-key"; value = apiKey },
    ];

    let responseText = await OutCall.httpGetRequest(
      "https://api.nowpayments.io/v1/payment/" # paymentId,
      headers,
      transform,
    );

    let status = extractJsonField(responseText, "payment_status");
    let txnHash = extractJsonField(responseText, "outcome_hash");

    if (status == "finished" or status == "confirmed") {
      TxnLib.markTransactionPaid(transactions, paymentId, txnHash);
    } else if (status == "failed" or status == "expired" or status == "refunded") {
      TxnLib.markTransactionFailed(transactions, paymentId);
    } else {
      // Status still pending — find and return the current transaction
      let found = transactions.entries().find(func((_, t)) {
        switch (t.nowPaymentsPaymentId) {
          case (?pid) pid == paymentId;
          case null false;
        };
      });
      switch (found) {
        case (?(_, t)) ?t;
        case null null;
      };
    };
  };

  // ---- Seller payout ----

  /// Seller requests payout for a paid transaction
  public shared ({ caller }) func requestPayout(txnId : Common.TransactionId) : async TxnTypes.PayoutResult {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: must be logged in");
    };

    let secretKey = switch (stripeSecretKey.value) {
      case (?k) k;
      case null Runtime.trap("Stripe secret key not configured");
    };

    let txn = switch (transactions.get(txnId)) {
      case (?t) t;
      case null Runtime.trap("Transaction not found");
    };

    if (not Principal.equal(txn.sellerId, caller)) {
      Runtime.trap("Unauthorized: not your transaction");
    };

    switch (txn.status) {
      case (#paid) {};
      case _ Runtime.trap("Transaction is not in paid status");
    };

    if (txn.stripeTransferId != null) {
      Runtime.trap("Payout already requested for this transaction");
    };

    let sellerProfile = switch (profiles.get(txn.sellerId)) {
      case (?p) p;
      case null Runtime.trap("Seller profile not found");
    };

    let stripeAccountId = switch (sellerProfile.stripeConnectAccountId) {
      case (?id) id;
      case null Runtime.trap("Seller has not connected a Stripe account");
    };

    // Convert to cents for Stripe (multiply by 100)
    let amountCents = floatToNatCents(txn.sellerAmountUsd);

    let body = "amount=" # amountCents.toText() #
      "&currency=usd" #
      "&destination=" # stripeAccountId;

    let authHeader = "Bearer " # secretKey;
    let headers : [OutCall.Header] = [
      { name = "Authorization"; value = authHeader },
      { name = "Content-Type"; value = "application/x-www-form-urlencoded" },
    ];

    let responseText = await OutCall.httpPostRequest(
      "https://api.stripe.com/v1/transfers",
      headers,
      body,
      transform,
    );

    let stripeTransferId = extractJsonField(responseText, "id");

    ignore TxnLib.markTransactionPaidOut(transactions, txnId, stripeTransferId);

    {
      transactionId = txnId;
      stripeTransferId;
      amountUsd = txn.sellerAmountUsd;
    };
  };

  // ---- Dashboard queries ----

  public query ({ caller }) func getMyTransactionsAsSeller() : async [TxnTypes.Transaction] {
    TxnLib.getSellerTransactions(transactions, caller);
  };

  public query ({ caller }) func getMyTransactionsAsBuyer() : async [TxnTypes.Transaction] {
    TxnLib.getBuyerTransactions(transactions, caller);
  };

  public query ({ caller }) func getSellerBalance() : async TxnTypes.SellerBalance {
    TxnLib.getSellerBalance(transactions, caller);
  };

  public query ({ caller }) func getTransaction(txnId : Common.TransactionId) : async ?TxnTypes.Transaction {
    TxnLib.getTransaction(transactions, txnId);
  };

  // ---- Private helpers ----

  /// Simple JSON string field extractor — finds "key":"value" or "key":value
  private func extractJsonField(json : Text, key : Text) : Text {
    let needle = "\"" # key # "\":";
    let parts = json.split(#text needle);
    let iter = parts;
    ignore iter.next(); // skip prefix
    switch (iter.next()) {
      case null "";
      case (?rest) {
        if (rest.size() == 0) return "";
        let chars = rest.toArray();
        if (Text.fromChar(chars[0]) == "\"") {
          // string value — find content between first and second quote
          let stripped = Text.fromArray(chars.sliceToArray(1, chars.size()));
          switch (stripped.split(#text "\"").next()) {
            case null "";
            case (?v) v;
          };
        } else {
          // numeric/null — take chars until delimiter
          var i = 0;
          var acc = "";
          label scanLoop {
            while (i < chars.size()) {
              let c = chars[i];
              if (c == ',' or c == '}' or c == ' ' or c == '\n' or c == '\r') {
                break scanLoop;
              };
              acc := acc # Text.fromChar(c);
              i += 1;
            };
          };
          acc;
        };
      };
    };
  };

  private func floatToText(f : Float) : Text {
    f.toText();
  };

  private func textToFloat(t : Text) : Float {
    if (t == "" or t == "null") return 0.0;
    let chars = t.toArray();
    var intPart : Float = 0.0;
    var fracPart : Float = 0.0;
    var fracDiv : Float = 10.0;
    var inFrac = false;
    var negative = false;
    var i = 0;
    if (chars.size() > 0 and chars[0] == '-') {
      negative := true;
      i := 1;
    };
    while (i < chars.size()) {
      let c = chars[i];
      if (c == '.') {
        inFrac := true;
      } else if (c >= '0' and c <= '9') {
        let digit = (c.toNat32() - 48).toNat().toFloat();
        if (inFrac) {
          fracPart := fracPart + digit / fracDiv;
          fracDiv := fracDiv * 10.0;
        } else {
          intPart := intPart * 10.0 + digit;
        };
      };
      i += 1;
    };
    let result = intPart + fracPart;
    if (negative) -result else result;
  };

  private func floatToNatCents(usd : Float) : Nat {
    let cents = usd * 100.0;
    let truncated : Int = cents.toInt();
    if (truncated < 0) 0 else truncated.toNat();
  };
};
