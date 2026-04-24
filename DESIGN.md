# Design Brief: Global Crypto-to-Fiat Marketplace

## Aesthetic
Modern fintech with understated confidence. Professional financial tone inspired by Stripe, Wise, and Coinbase. Clean, accessible typography with strategic accent usage for transactions and CTAs.

## Tone
Trustworthy, transparent, refined. Avoids corporate sterility through generous spacing and intentional hierarchy. Crypto-native but not chaotic — organized, legible, premium feel.

## Differentiation
Financial apps often feel cold or corporate. This design adds humanity through refined typography (General Sans + DM Sans), careful elevation hierarchy, and emerald accents that signal growth/transaction completion without shouting.

## Color Palette

| Token | Light OKLCH | Dark OKLCH | Purpose |
|-------|-----------|-----------|---------|
| **Primary** | `0.35 0.1 250` | `0.72 0.12 250` | Navy blue — trustworthiness, CTAs, navigation |
| **Secondary** | `0.5 0.05 250` | `0.28 0.05 250` | Slate — subtle backgrounds, secondary actions |
| **Accent** | `0.65 0.22 130` | `0.72 0.2 130` | Emerald — transaction success, crypto signals |
| **Destructive** | `0.55 0.22 25` | `0.62 0.2 22` | Red — sell/risk signals, errors |
| **Neutral** | `0.98 0.01 240` / `0.12 0.01 240` | Dark slate/off-white | Backgrounds, cards, borders |

## Typography

| Role | Font | Size | Weight | Usage |
|------|------|------|--------|-------|
| **Display** | General Sans | 28–48px | 600–700 | Page titles, hero sections |
| **Body** | DM Sans | 14–18px | 400–500 | Content, descriptions, UI text |
| **Mono** | JetBrains Mono | 12–14px | 400 | Wallet addresses, transaction IDs, code |

## Elevation & Depth

| Surface | Treatment | Use Case |
|---------|-----------|----------|
| **Background** | Solid neutral (`0.98` light, `0.12` dark) | Main page background |
| **Card** | Pure white/slate with `shadow-card` | Listings, transaction rows |
| **Elevated** | Same surface with `shadow-elevated` | Modals, popovers, active states |
| **Border** | `0.88` light / `0.25` dark + `0.02 C` | Dividers, input outlines |

## Structural Zones

| Zone | Background | Border | Purpose |
|------|-----------|--------|---------|
| **Header** | Card surface | Border-bottom | Navigation, wallet status, primary actions |
| **Main Content** | Background | None | Listings, transaction history |
| **Card/Listing** | Card surface | Border | Crypto assets, sell offers, transaction items |
| **Sidebar (if nav)** | Sidebar token | Sidebar-border | Navigation, filtering |
| **Footer** | Muted | Border-top | Links, copyright, secondary info |

## Spacing & Rhythm
- **Base unit**: 4px (Tailwind default)
- **Density**: Generous (16–24px margins/padding on cards) — financial apps benefit from breathing room
- **Grid**: 12-column responsive (sm, md, lg, xl breakpoints)
- **Compact sections**: 12px padding for dense tables; spacious cards: 24px padding

## Component Patterns

| Component | Styling |
|-----------|---------|
| **Button (primary)** | `bg-primary text-primary-foreground` with `transition-smooth` |
| **Button (secondary)** | `border border-border bg-background` |
| **Input** | `border border-input bg-input` with focus ring `ring-accent` |
| **Card** | `bg-card border border-border shadow-card` |
| **Badge (success)** | `bg-accent/20 text-accent` — subtle emerald highlight |
| **Badge (error)** | `bg-destructive/20 text-destructive` |
| **Transaction row** | Alternate `bg-muted/30` for visual rhythm |
| **Link** | `text-primary underline decoration-offset-2` |

## Motion & Interaction
- **Transitions**: `transition-smooth` (0.3s cubic-bezier) for state changes
- **Fast feedback**: `transition-fast` (0.15s) for hover/active states
- **Entrance**: `animate-fade-in` or `animate-slide-in` for modals, overlays
- **Loading**: Pulse or spinner in primary accent color

## Dark Mode
Intentional color shifts: lighter primary (`0.72`), darker backgrounds (`0.12`), enhanced contrast on foreground text. Chart colors use full saturation range for visibility.

## Constraints
- ✅ Navy primary with emerald accents (not purple, not teal)
- ✅ Specific bundled fonts only (no system fallbacks)
- ✅ Minimum 0.7 L difference for text/background
- ✅ Rounded corners max `6px` for professional feel (not `16px`)
- ✅ No gradients except chart data visualization
- ✅ Soft shadows only — no glow, no blur effects
- ✅ Max 5 core colors (primary, secondary, accent, destructive, neutral)

## Signature Detail
Emerald accent (`0.65 0.22 130`) used sparingly: transaction checkmarks, positive price movements, active CTAs, success states. Signals growth and crypto confidence without overwhelming the interface. Paired with crisp navy for financial gravitas.

## Responsive Strategy
Mobile-first. Header collapses to hamburger. Cards stack to full width on `sm`. Transaction tables convert to card view below `md`. Navigation sidebar hidden by default, drawer on mobile.

---

**Total design files**: 3 (index.css, tailwind.config.js, DESIGN.md) + 3 fonts (General Sans, DM Sans, JetBrains Mono)
