import { Toaster } from "@/components/ui/sonner";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  ChevronDown,
  Globe,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  PlusCircle,
  Receipt,
  Settings,
  ShoppingBag,
  User,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";

interface LayoutProps {
  children: React.ReactNode;
}

const NAV_LINKS = [
  { label: "Browse", href: "/", icon: ShoppingBag },
  { label: "Sell", href: "/sell", icon: PlusCircle, protected: true },
  {
    label: "Dashboard",
    href: "/seller/dashboard",
    icon: LayoutDashboard,
    protected: true,
  },
];

export function Layout({ children }: LayoutProps) {
  const { isAuthenticated, isLoading, login, logout, principalId } = useAuth();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const [mobileOpen, setMobileOpen] = useState(false);

  const initials = principalId ? principalId.slice(0, 2).toUpperCase() : "CM";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-xs">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 min-w-0 transition-fast hover:opacity-80"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground tracking-tight hidden sm:block">
              CryptoMarket
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => {
              const isActive =
                currentPath === link.href ||
                (link.href !== "/" && currentPath.startsWith(link.href));
              if (link.protected && !isAuthenticated) return null;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  data-ocid={`nav.${link.label.toLowerCase()}.link`}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-fast ${
                    isActive
                      ? "text-foreground bg-muted"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Crypto ticker badge */}
            <Badge
              variant="outline"
              className="hidden lg:flex items-center gap-1 font-mono text-xs text-accent border-accent/30 bg-accent/5"
            >
              <Globe className="w-3 h-3" />
              <span>Multi-chain</span>
            </Badge>

            {isLoading ? (
              <div className="w-24 h-9 rounded-md bg-muted animate-pulse" />
            ) : isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 pr-2"
                    data-ocid="nav.profile.open_modal_button"
                    aria-label="User menu"
                  >
                    <Avatar className="w-7 h-7">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="w-3 h-3 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56"
                  data-ocid="nav.profile.dropdown_menu"
                >
                  <DropdownMenuLabel>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium">My Account</span>
                      {principalId && (
                        <span className="text-xs font-mono text-muted-foreground truncate">
                          {principalId.slice(0, 20)}…
                        </span>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      to="/profile"
                      data-ocid="nav.profile.link"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/seller/dashboard"
                      data-ocid="nav.dashboard.link"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <BarChart3 className="w-4 h-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/buyer/transactions"
                      data-ocid="nav.buyer_txns.link"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Receipt className="w-4 h-4" />
                      My Purchases
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/settings"
                      data-ocid="nav.settings.link"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive cursor-pointer"
                    onClick={logout}
                    data-ocid="nav.logout.button"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={login}
                size="sm"
                data-ocid="nav.login.button"
                className="flex items-center gap-1.5"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign in</span>
              </Button>
            )}

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              data-ocid="nav.mobile_menu.toggle"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile nav drawer */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-card animate-slide-in">
            <nav
              className="container mx-auto px-4 py-3 flex flex-col gap-1"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map((link) => {
                if (link.protected && !isAuthenticated) return null;
                const isActive =
                  currentPath === link.href ||
                  (link.href !== "/" && currentPath.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    data-ocid={`nav.mobile.${link.label.toLowerCase()}.link`}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-fast ${
                      isActive
                        ? "text-foreground bg-muted"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 bg-background">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                <Zap className="w-3 h-3 text-primary-foreground" />
              </div>
              <span className="font-display font-semibold text-sm text-foreground">
                CryptoMarket
              </span>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-xs text-muted-foreground">
                Global crypto marketplace
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-fast">
                Browse
              </Link>
              <span>·</span>
              <span>
                © {new Date().getFullYear()}. Built with love using{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  caffeine.ai
                </a>
              </span>
            </div>
          </div>
        </div>
      </footer>

      <Toaster richColors position="bottom-right" />
    </div>
  );
}
