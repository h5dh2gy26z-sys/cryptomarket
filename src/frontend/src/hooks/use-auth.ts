import { useInternetIdentity } from "@caffeineai/core-infrastructure";

export function useAuth() {
  const {
    login,
    clear,
    loginStatus,
    identity,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
  } = useInternetIdentity();

  const isLoading = isInitializing || isLoggingIn;
  const principalId = identity?.getPrincipal().toText();

  return {
    login,
    logout: clear,
    isAuthenticated,
    isLoading,
    loginStatus,
    identity,
    principalId,
  };
}
