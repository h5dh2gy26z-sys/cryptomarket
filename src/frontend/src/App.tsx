import { useActor } from "@caffeineai/core-infrastructure";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { createActor } from "./backend";
import { Layout } from "./components/Layout";
import { PageLoader } from "./components/ui/LoadingSpinner";
import { useAuth } from "./hooks/use-auth";

// Lazy-loaded pages
const BrowsePage = lazy(() => import("./pages/BrowsePage"));
const ListingDetailPage = lazy(() => import("./pages/ListingDetailPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const SellPage = lazy(() => import("./pages/SellPage"));
const SellerDashboardPage = lazy(() => import("./pages/SellerDashboardPage"));
const SellerListingsPage = lazy(() => import("./pages/SellerListingsPage"));
const SellerTransactionsPage = lazy(
  () => import("./pages/SellerTransactionsPage"),
);
const BuyerTransactionsPage = lazy(
  () => import("./pages/BuyerTransactionsPage"),
);
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));

// Wrapper that checks auth before rendering protected pages
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, login } = useAuth();
  const { isFetching } = useActor(createActor);

  if (isLoading || isFetching) {
    return <PageLoader message="Checking authentication…" />;
  }

  if (!isAuthenticated) {
    return (
      <div
        className="flex-1 flex items-center justify-center min-h-[60vh]"
        data-ocid="auth.required.page"
      >
        <div className="text-center space-y-4 max-w-sm mx-auto px-4">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div>
            <h2 className="font-display font-bold text-xl text-foreground">
              Sign in required
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              You need to sign in with Internet Identity to access this page.
            </p>
          </div>
          <button
            type="button"
            onClick={login}
            data-ocid="auth.login.primary_button"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-fast"
          >
            Sign in with Internet Identity
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

function withLayout(component: React.ReactNode) {
  return <Layout>{component}</Layout>;
}

function withProtectedLayout(component: React.ReactNode) {
  return (
    <Layout>
      <ProtectedRoute>{component}</ProtectedRoute>
    </Layout>
  );
}

// Route definitions
const rootRoute = createRootRoute();

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () =>
    withLayout(
      <Suspense fallback={<PageLoader />}>
        <BrowsePage />
      </Suspense>,
    ),
});

const listingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/listings/$id",
  component: () =>
    withLayout(
      <Suspense fallback={<PageLoader />}>
        <ListingDetailPage />
      </Suspense>,
    ),
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout/$txnId",
  component: () =>
    withProtectedLayout(
      <Suspense fallback={<PageLoader />}>
        <CheckoutPage />
      </Suspense>,
    ),
});

const sellRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sell",
  component: () =>
    withProtectedLayout(
      <Suspense fallback={<PageLoader />}>
        <SellPage />
      </Suspense>,
    ),
});

const sellerDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/seller/dashboard",
  component: () =>
    withProtectedLayout(
      <Suspense fallback={<PageLoader />}>
        <SellerDashboardPage />
      </Suspense>,
    ),
});

const sellerListingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/seller/listings",
  component: () =>
    withProtectedLayout(
      <Suspense fallback={<PageLoader />}>
        <SellerListingsPage />
      </Suspense>,
    ),
});

const sellerTransactionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/seller/transactions",
  component: () =>
    withProtectedLayout(
      <Suspense fallback={<PageLoader />}>
        <SellerTransactionsPage />
      </Suspense>,
    ),
});

const buyerTransactionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/buyer/transactions",
  component: () =>
    withProtectedLayout(
      <Suspense fallback={<PageLoader />}>
        <BuyerTransactionsPage />
      </Suspense>,
    ),
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () =>
    withProtectedLayout(
      <Suspense fallback={<PageLoader />}>
        <ProfilePage />
      </Suspense>,
    ),
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: () =>
    withProtectedLayout(
      <Suspense fallback={<PageLoader />}>
        <SettingsPage />
      </Suspense>,
    ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  listingRoute,
  checkoutRoute,
  sellRoute,
  sellerDashboardRoute,
  sellerListingsRoute,
  sellerTransactionsRoute,
  buyerTransactionsRoute,
  profileRoute,
  settingsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
