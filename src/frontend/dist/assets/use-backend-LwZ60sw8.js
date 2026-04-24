var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentResult, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn, _a;
import { $ as Subscribable, a0 as shallowEqualObjects, a1 as hashKey, a2 as getDefaultState, a3 as notifyManager, a4 as useQueryClient, r as reactExports, a5 as noop, a6 as shouldThrowError, a7 as useQuery, Y as useActor, Z as createActor } from "./index-Dg45A33R.js";
var MutationObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _MutationObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentMutation);
    __privateAdd(this, _mutateOptions);
    __privateSet(this, _client, client);
    this.setOptions(options);
    this.bindMethods();
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _a2;
    const prevOptions = this.options;
    this.options = __privateGet(this, _client).defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: __privateGet(this, _currentMutation),
        observer: this
      });
    }
    if ((prevOptions == null ? void 0 : prevOptions.mutationKey) && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state.status) === "pending") {
      __privateGet(this, _currentMutation).setOptions(this.options);
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this, action);
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  reset() {
    var _a2;
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, void 0);
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this);
  }
  mutate(variables, options) {
    var _a2;
    __privateSet(this, _mutateOptions, options);
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, __privateGet(this, _client).getMutationCache().build(__privateGet(this, _client), this.options));
    __privateGet(this, _currentMutation).addObserver(this);
    return __privateGet(this, _currentMutation).execute(variables);
  }
}, _client = new WeakMap(), _currentResult = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
  var _a2;
  const state = ((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state) ?? getDefaultState();
  __privateSet(this, _currentResult, {
    ...state,
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isIdle: state.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, notify_fn = function(action) {
  notifyManager.batch(() => {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    if (__privateGet(this, _mutateOptions) && this.hasListeners()) {
      const variables = __privateGet(this, _currentResult).variables;
      const onMutateResult = __privateGet(this, _currentResult).context;
      const context = {
        client: __privateGet(this, _client),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      if ((action == null ? void 0 : action.type) === "success") {
        try {
          (_b = (_a2 = __privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b.call(
            _a2,
            action.data,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_d = (_c = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _d.call(
            _c,
            action.data,
            null,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      } else if ((action == null ? void 0 : action.type) === "error") {
        try {
          (_f = (_e = __privateGet(this, _mutateOptions)).onError) == null ? void 0 : _f.call(
            _e,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_h = (_g = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _h.call(
            _g,
            void 0,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      }
    }
    this.listeners.forEach((listener) => {
      listener(__privateGet(this, _currentResult));
    });
  });
}, _a);
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
function useBackendActor() {
  return useActor(createActor);
}
function useListings(filter) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["listings", filter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.browseListings(filter ?? null);
    },
    enabled: !!actor && !isFetching,
    staleTime: 3e4
  });
}
function useListing(id) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["listing", id == null ? void 0 : id.toString()],
    queryFn: async () => {
      if (!actor || id === void 0) return null;
      return actor.getListing(id);
    },
    enabled: !!actor && !isFetching && id !== void 0
  });
}
function useMyListings() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["my-listings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyListings();
    },
    enabled: !!actor && !isFetching
  });
}
function useCreateListing() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Not connected");
      return actor.createListing(input);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["listings"] });
      qc.invalidateQueries({ queryKey: ["my-listings"] });
    }
  });
}
function useUpdateListing() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateListing(id, input);
    },
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ["listings"] });
      qc.invalidateQueries({ queryKey: ["listing", id.toString()] });
      qc.invalidateQueries({ queryKey: ["my-listings"] });
    }
  });
}
function useDeleteListing() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteListing(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["listings"] });
      qc.invalidateQueries({ queryKey: ["my-listings"] });
    }
  });
}
function useMyProfile() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["my-profile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching
  });
}
function useSaveProfile() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ name, email, displayPictureUrl, role }) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveCallerUserProfile(name, email, displayPictureUrl, role);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my-profile"] });
    }
  });
}
function useSellerTransactions() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["seller-transactions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyTransactionsAsSeller();
    },
    enabled: !!actor && !isFetching
  });
}
function useBuyerTransactions() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["buyer-transactions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyTransactionsAsBuyer();
    },
    enabled: !!actor && !isFetching
  });
}
function useTransaction(id) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["transaction", id == null ? void 0 : id.toString()],
    queryFn: async () => {
      if (!actor || id === void 0) return null;
      return actor.getTransaction(id);
    },
    enabled: !!actor && !isFetching && id !== void 0,
    refetchInterval: (query) => {
      const data = query.state.data;
      if ((data == null ? void 0 : data.status) === "pending") return 5e3;
      return false;
    }
  });
}
function useSellerBalance() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["seller-balance"],
    queryFn: async () => {
      if (!actor) return { availableUsd: 0, pendingUsd: 0 };
      return actor.getSellerBalance();
    },
    enabled: !!actor && !isFetching
  });
}
function useInitiatePayment() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ listingId, cryptoCurrency }) => {
      if (!actor) throw new Error("Not connected");
      return actor.initiateCryptoPayment(listingId, cryptoCurrency);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["buyer-transactions"] });
    }
  });
}
function useRequestPayout() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (txnId) => {
      if (!actor) throw new Error("Not connected");
      return actor.requestPayout(txnId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["seller-transactions"] });
      qc.invalidateQueries({ queryKey: ["seller-balance"] });
    }
  });
}
function useCryptoRates() {
  return useQuery({
    queryKey: ["crypto-rates"],
    queryFn: async () => {
      var _a2, _b, _c, _d;
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,usd-coin,solana&vs_currencies=usd"
        );
        const data = await res.json();
        return {
          BTC: ((_a2 = data.bitcoin) == null ? void 0 : _a2.usd) ?? 65e3,
          ETH: ((_b = data.ethereum) == null ? void 0 : _b.usd) ?? 3400,
          USDC: ((_c = data["usd-coin"]) == null ? void 0 : _c.usd) ?? 1,
          SOL: ((_d = data.solana) == null ? void 0 : _d.usd) ?? 160
        };
      } catch {
        return { BTC: 65e3, ETH: 3400, USDC: 1, SOL: 160 };
      }
    },
    staleTime: 6e4,
    refetchInterval: 12e4
  });
}
export {
  useListing as a,
  useInitiatePayment as b,
  useCryptoRates as c,
  useTransaction as d,
  useCreateListing as e,
  useSellerBalance as f,
  useSellerTransactions as g,
  useMyListings as h,
  useRequestPayout as i,
  useDeleteListing as j,
  useUpdateListing as k,
  useBuyerTransactions as l,
  useMyProfile as m,
  useSaveProfile as n,
  useListings as u
};
