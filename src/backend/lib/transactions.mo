import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Common "../types/common";
import TxnTypes "../types/transactions";

module {
  /// 2.9% + $0.30 platform fee
  public let PLATFORM_FEE_PERCENT : Float = 0.029;
  public let PLATFORM_FEE_FIXED_USD : Float = 0.30;

  public func calculateFees(amountUsd : Float) : (platformFee : Float, sellerAmount : Float) {
    let fee = amountUsd * PLATFORM_FEE_PERCENT + PLATFORM_FEE_FIXED_USD;
    let sellerAmount = amountUsd - fee;
    (fee, sellerAmount);
  };

  public func createPendingTransaction(
    transactions : Map.Map<Common.TransactionId, TxnTypes.Transaction>,
    nextId : Nat,
    listingId : Common.ListingId,
    buyerId : Common.UserId,
    sellerId : Common.UserId,
    amountUsd : Float,
  ) : TxnTypes.Transaction {
    let (platformFeeUsd, sellerAmountUsd) = calculateFees(amountUsd);
    let now = Time.now();
    let txn : TxnTypes.Transaction = {
      id = nextId;
      listingId;
      buyerId;
      sellerId;
      amountUsd;
      platformFeeUsd;
      sellerAmountUsd;
      status = #pending;
      nowPaymentsPaymentId = null;
      cryptoTxnHash = null;
      cryptoCurrency = null;
      cryptoAddress = null;
      stripeTransferId = null;
      createdAt = now;
      updatedAt = now;
    };
    transactions.add(nextId, txn);
    txn;
  };

  public func updateTransactionPayment(
    transactions : Map.Map<Common.TransactionId, TxnTypes.Transaction>,
    txnId : Common.TransactionId,
    paymentId : Text,
    cryptoAddress : Text,
    cryptoCurrency : Text,
  ) : ?TxnTypes.Transaction {
    switch (transactions.get(txnId)) {
      case (?txn) {
        let updated : TxnTypes.Transaction = {
          txn with
          nowPaymentsPaymentId = ?paymentId;
          cryptoAddress = ?cryptoAddress;
          cryptoCurrency = ?cryptoCurrency;
          updatedAt = Time.now();
        };
        transactions.add(txnId, updated);
        ?updated;
      };
      case null null;
    };
  };

  public func markTransactionPaid(
    transactions : Map.Map<Common.TransactionId, TxnTypes.Transaction>,
    paymentId : Text,
    cryptoTxnHash : Text,
  ) : ?TxnTypes.Transaction {
    let found = transactions.entries().find(func((_, t)) {
      switch (t.nowPaymentsPaymentId) {
        case (?pid) pid == paymentId;
        case null false;
      };
    });
    switch (found) {
      case (?(_, txn)) {
        let updated : TxnTypes.Transaction = {
          txn with
          status = #paid;
          cryptoTxnHash = ?cryptoTxnHash;
          updatedAt = Time.now();
        };
        transactions.add(txn.id, updated);
        ?updated;
      };
      case null null;
    };
  };

  public func markTransactionFailed(
    transactions : Map.Map<Common.TransactionId, TxnTypes.Transaction>,
    paymentId : Text,
  ) : ?TxnTypes.Transaction {
    let found = transactions.entries().find(func((_, t)) {
      switch (t.nowPaymentsPaymentId) {
        case (?pid) pid == paymentId;
        case null false;
      };
    });
    switch (found) {
      case (?(_, txn)) {
        let updated : TxnTypes.Transaction = {
          txn with
          status = #failed;
          updatedAt = Time.now();
        };
        transactions.add(txn.id, updated);
        ?updated;
      };
      case null null;
    };
  };

  public func markTransactionPaidOut(
    transactions : Map.Map<Common.TransactionId, TxnTypes.Transaction>,
    txnId : Common.TransactionId,
    stripeTransferId : Text,
  ) : ?TxnTypes.Transaction {
    switch (transactions.get(txnId)) {
      case (?txn) {
        let updated : TxnTypes.Transaction = {
          txn with
          stripeTransferId = ?stripeTransferId;
          updatedAt = Time.now();
        };
        transactions.add(txnId, updated);
        ?updated;
      };
      case null null;
    };
  };

  public func getSellerTransactions(
    transactions : Map.Map<Common.TransactionId, TxnTypes.Transaction>,
    sellerId : Common.UserId,
  ) : [TxnTypes.Transaction] {
    transactions.values().filter(func(t) { Principal.equal(t.sellerId, sellerId) }).toArray();
  };

  public func getBuyerTransactions(
    transactions : Map.Map<Common.TransactionId, TxnTypes.Transaction>,
    buyerId : Common.UserId,
  ) : [TxnTypes.Transaction] {
    transactions.values().filter(func(t) { Principal.equal(t.buyerId, buyerId) }).toArray();
  };

  public func getSellerBalance(
    transactions : Map.Map<Common.TransactionId, TxnTypes.Transaction>,
    sellerId : Common.UserId,
  ) : TxnTypes.SellerBalance {
    var available : Float = 0.0;
    var pending : Float = 0.0;
    transactions.values().forEach(func(t) {
      if (Principal.equal(t.sellerId, sellerId)) {
        switch (t.status) {
          case (#paid) {
            switch (t.stripeTransferId) {
              case null available := available + t.sellerAmountUsd;
              case _ {};
            };
          };
          case (#pending) {
            pending := pending + t.sellerAmountUsd;
          };
          case _ {};
        };
      };
    });
    { availableUsd = available; pendingUsd = pending };
  };

  public func getTransaction(
    transactions : Map.Map<Common.TransactionId, TxnTypes.Transaction>,
    txnId : Common.TransactionId,
  ) : ?TxnTypes.Transaction {
    transactions.get(txnId);
  };
};
