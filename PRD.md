
Let me do a thorough codebase analysis before writing the PRD.


Let me finish gathering the remaining files needed for the PRD.


Now I have a thorough understanding of the entire codebase. Let me compile the full PRD.

---

# Product Requirements Document (PRD)
## Panaceutics — Panacea | Therapeutics Solutions

**Version:** 1.0 · **Date:** March 2026 · **Status:** Draft

---

## 1. Project Overview

**Panaceutics** (`panaceutics.org`) is a phytotherapy and evidence-based herbal medicine e-commerce and information platform. It bridges traditional plant-based wisdom with modern scientific validation, enabling users to browse herbal research, purchase science-backed formulations, and book consultations.

**Tagline:** *"Where the cure is natural, but the proof is scientific."*

**Core Purpose:**
- Present proprietary herbal research across seven medical disciplines
- Sell research-backed herbal products online
- Enable appointment booking and personalized consultation via WhatsApp
- Serve both Nigerian (NGN) and international (USD) customers

**Target Audience:**
- Patients and caregivers seeking evidence-based herbal alternatives
- Medical professionals exploring phytotherapy options
- International buyers interested in African herbal medicine
- Research collaborators and institutional partners

**Company Context (per About page):** Founded 2018 in Ado-Ekiti, Ekiti State, Nigeria. Operational across 25+ countries. Claims 25,000+ lives improved and 100+ research studies.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15.2.8 (App Router) |
| **Language** | TypeScript 5 |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS v4 |
| **UI Components** | Radix UI (full suite — accordion, dialog, select, tabs, etc.) |
| **Animation** | Framer Motion |
| **Icons** | Lucide React |
| **Forms** | React Hook Form + Zod (validation) |
| **Charts** | Recharts |
| **Date handling** | date-fns |
| **Carousel** | Embla Carousel |
| **HTTP client** | Axios |
| **Notifications** | Sonner (toasts) |
| **Fonts** | Geist (Google Fonts via next/font) |
| **Analytics** | Vercel Analytics (`@vercel/analytics`) |
| **Deployment** | Vercel |
| **Target DB** | Supabase *(intended — see §10 Known Issues)* |
| **Payment (intended)** | Paystack (inline JS SDK — `lib/paystack.ts`) |
| **Payment (active)** | Manual bank transfer (GTB) + WhatsApp confirmation |
| **CSS utilities** | `clsx` + `tailwind-merge` |
| **Package manager** | pnpm |

---

## 3. Features & Functionality

### 3.1 Research & Content
- **7 Medical Category Pages** — each with a custom hero layout, description, research overview, and product listings: Metabolic Syndrome, Oncology, Neurology, Nephrology, Hematology, Infectiology, Ophthalmology
- **Research Detail Pages** — deep-dive articles for each research entry with image, category, read-time, and clinical notes
- **Category Overrides System** — `lib/category-overrides.ts` allows per-category custom titles, descriptions, hero images, and links to downloadable research PDFs and external publications
- **Publications Section** — homepage section surfacing key publications

### 3.2 Product Catalog
- **Static Product Data** — products are defined as typed TypeScript arrays per-category in `lib/categories/[category].ts` (not yet database-driven)
- **7 Product Categories**, each independently managed
- **Product Cards (`ShopProductCard`)** — display image, title, price, and add-to-cart
- **Category Pages** — up to 4 products shown per category with a "View All" link
- **Product Detail Pages** — individual product view with related products

### 3.3 Shopping Cart
- **Context-driven cart** via `CartProvider` (React Context)
- **localStorage persistence** — cart survives page refresh under key `panaceutics-cart`
- **Last visited category tracking** — `panaceutics-last-category` in localStorage powers smart "Back" links
- **Quantity management** — increase, decrease, remove per item
- **Clear cart** — single-click full cart clear
- **Order summary** — subtotal, shipping (free), tax (included)

### 3.4 Payment Flow
- **Bank Transfer** — GTB account details displayed with one-click clipboard copy
- **WhatsApp Confirmation** — after transfer, customer taps "I've Made Payment" which pre-fills a structured WhatsApp message (order ID, item list, total) to `+2348070943256`
- **Auto-generated Order ID** — `ORD-<timestamp>` format
- **Cart guard** — empty cart redirects to `/cart` before reaching `/payment`
- **Order Confirmation Page** — shows order status tracker (Confirmed → Processing → Shipped), order items, shipping address, and cost breakdown

### 3.5 Multi-Currency Support
- **Supported currencies:** NGN (Nigerian Naira) and USD (US Dollar)
- **Conversion rate:** 1 USD = ₦1,600 (hardcoded in `lib/currency.ts`)
- **Auto-detection:** On mount, `CurrencyProvider` checks `window.navigator.languages` for `ng`/`nigeria`/`en-ng` indicators — defaults to NGN for Nigerian users, USD for all others
- **Manual override:** `useCurrency()` hook exposes `setCurrency` for manual switching
- **SSR-safe:** Server always returns NGN to prevent hydration mismatches; currency detection fires after a 100ms client-side delay

### 3.6 Appointment Booking
- **WhatsApp CTA** — "Book an Appointment" in the header opens a pre-filled WhatsApp message to `+2348070943256`
- **Chat With Us page** — dedicated `/chat` page with animated hero, feature cards (Personal Consultation, Custom Formulation, Ongoing Support), process steps, and a direct WhatsApp link

### 3.7 Contact
- Contact form with fields: Name, Email, Phone, Subject, Message
- Three contact info cards: phone numbers, email addresses, physical address (Ado-Ekiti, Nigeria)
- *(Note: form submission is not currently wired to any backend — see §10)*

### 3.8 About / Company
- Company founding story and mission statement
- Core values (Nature First, Scientific Rigor, Global Access, Patient Centered)
- Interactive timeline of milestones (2018–2023)
- Key metrics: 25K+ lives improved, 98% satisfaction, 100+ studies, 25+ countries

### 3.9 SEO & Metadata
- Full Open Graph tags (title, description, image)
- Twitter Card (`summary_large_image`)
- Robots meta (`index: true, follow: true`) with Google-specific directives
- Per-product dynamic `generateMetadata` for OG tags
- Web App Manifest (`/manifest.json`) and PWA icons (apple-icon, favicon)
- Theme color: `#042f2e`
- Canonical base URL: `https://panaceutics.org`

### 3.10 Admin / Dashboard (API-only)
- Dashboard stats endpoint aggregates total products, categories, orders, revenue, and recent orders
- All admin endpoints protected by `ADMIN_API_TOKEN` header bearer token

---

## 4. Pages & Routes

| Route | Page | Type | Description |
|---|---|---|---|
| `/` | Home | Server | Hero, About Us section, Explore (category grid), CTA, Publications, Book-a-Call |
| `/about` | About | Server | Company story, values, milestone timeline, CTA |
| `/contact` | Contact | Client | Contact info cards + message form |
| `/chat` | Chat With Us | Client | WhatsApp consultation CTA with animated hero |
| `/explore/categories` | Browse Categories | Server | Grid of all 7 medical categories |
| `/explore/[slug]` | Category Page | Client | Category hero + product grid (uses category overrides) |
| `/explore/category/[slug]` | Legacy Redirect | Server | Redirects to `/explore/[slug]` |
| `/explore/item/[id]` | Research Item Detail | Server | Full research article with image, description, clinical notes |
| `/cart` | Shopping Cart | Client | Cart items, quantity controls, order summary, checkout CTA |
| `/payment` | Payment | Client | Loads cart from localStorage → renders `PaymentPage` component |
| `/checkout` | Checkout | Client | Alternative bank transfer page (partially overlaps with `/payment`) |
| `/order-confirmation/[id]` | Order Confirmation | Client | Status tracker, order details, shipping info |
| `/products` | Products | Server | Renders `ProductsClient` component |
| `/products/[id]` | Product Detail | Server | Product info, related products, OG metadata |
| `/product/[id]` | Product (Legacy?) | — | Separate product detail route (exists but not fully traced) |
| `/research/[category]` | Research Pages | — | 7 per-category research deep-dive pages |
| `/privacy-policy` | Privacy Policy | — | Legal privacy policy page |

---

## 5. Components

| Component | Responsibility |
|---|---|
| `Header` | Sticky nav with logo, desktop/mobile navigation, WhatsApp book-appointment CTA, cart count badge *(cart icon currently commented out)* |
| `Footer` | Links grid (Shop, Company) + copyright |
| `Hero` | Homepage hero section |
| `AboutUs` | Homepage about/mission block |
| `Explore` | Homepage category card grid |
| `Cta` | Call-to-action banner component |
| `Publications` | Homepage publications section |
| `BookCall` | Book-a-call CTA block |
| `CategoryCard` | Category display card (image, name, description, slug link) |
| `ShopProductCard` | Product card for category listing (image, title, price, add-to-cart) |
| `PaymentPage` | Full bank transfer payment UI: order summary, bank details with copy, instructions, WhatsApp confirmation button |
| `ProductDetail` | Product detail page component |
| `ProductsClient` | Client-side products listing |
| `Price` (UI) | Renders a `Price` object (`{amount, currency}`) as a formatted currency string |
| `CurrencyProvider` | React Context: exposes `currency`, `setCurrency`, `isLoading` |
| `CartProvider` | React Context: manages cart items with localStorage sync, exposes full CRUD + `lastVisitedCategory` |
| `ResearchDevelopment` | Research approach section |
| `MetricsCard` | Animated counter cards (lives improved, satisfaction, etc.) |
| `CurrencySwitcher` | UI control for manual currency toggle |
| `ThemeProvider` | Wraps app in `next-themes` for theme management |
| `ui/*` | Full Radix UI component library (Button, Card, Input, Dialog, Sheet, Table, Tabs, etc.) |

---

## 6. Data Models

> **Note:** The following models are inferred from `lib/types.ts`, `app/providers.tsx`, `lib/researches.ts`, `lib/categories/category-data.ts`, and API route bodies. The app intends to use Supabase but currently implements these against MongoDB (see §10).

### 6.1 Product
| Field | Type | Notes |
|---|---|---|
| `_id` | `string` | Document identifier |
| `name` | `string` | Product name |
| `slug` | `string` | URL-friendly identifier |
| `description` | `string` | Product description |
| `price` | `number` | Current price |
| `originalPrice` | `number` | Pre-discount price |
| `discount` | `number` | Discount percentage |
| `images` | `string[]` | Image URLs |
| `imageUrl` | `string?` | Optional primary image |
| `imageVariants` | `{url: string}[]?` | Additional image variants |
| `category` | `string` | Category name |
| `tags` | `string[]` | Product tags |
| `rating` | `number` | Average rating |
| `reviews` | `number` | Review count |
| `inStock` | `boolean` | Stock status |
| `stock` | `number` | Quantity available |
| `createdAt` | `string` | ISO timestamp |

### 6.2 Category
| Field | Type | Notes |
|---|---|---|
| `_id` | `string` | Document identifier |
| `name` | `string` | Category name |
| `slug` | `string` | URL-friendly identifier |
| `image` | `string` | Category image URL |
| `description` | `string?` | Optional description |
| `featured` | `boolean?` | Featured flag |
| `productCount` | `number` | Number of products |

### 6.3 Order
| Field | Type | Notes |
|---|---|---|
| `_id` | `string` | Document identifier |
| `items` | `OrderItem[]` | Line items (id, name, price, quantity, image) |
| `total` | `number` | Order subtotal |
| `status` | `string` | `"pending"` on creation |
| `customer` | `object` | firstName, lastName, email, phone |
| `shipping` | `object` | address, city, state, zipCode |
| `createdAt` | `string` | ISO timestamp |

### 6.4 StorePreferences
| Field | Type | Notes |
|---|---|---|
| `storeName` | `string` | |
| `storeLogo` | `string` | |
| `showStoreLogo` | `boolean` | |
| `storeType` | `enum` | `"books" \| "clothing" \| "produce" \| "services" \| "general"` |
| `colors` | `{primary, secondary, accent}` | Hex color strings |
| `heroLayout` | `enum` | `"centered" \| "split" \| "fullwidth"` |
| `heroData` | `object` | title, subtitle, cta, background, textColor |
| `categoryLayout` | `enum` | `"grid" \| "carousel" \| "featured"` |
| `productCardLayout` | `enum` | `"standard" \| "compact" \| "detailed" \| "minimal"` |
| `paymentMethod` | `enum` | `"paystack" \| "zenith"` |
| `newsletterLayout` | `enum` | `"simple" \| "split" \| "overlay"` |
| `featuredSectionTitle` | `string` | |
| `newArrivalsTitle` | `string` | |
| `categories` | `Category[]` | |
| `featuredProducts` | `Product[]` | |
| `products` | `Product[]` | |

### 6.5 Research (Static — `lib/researches.ts` / `lib/categories/*.ts`)
| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Sequential string ID |
| `title` | `string` | Research/product title |
| `category` | `string` | Medical category name |
| `description` | `string` | Summary/problem statement |
| `image` | `string` | Image path |
| `price` | `{amount: number, currency: 'NGN'}` | Product price |
| `details` | `string?` | Clinical notes |
| `date` | `string?` | Publication date |
| `readTime` | `string?` | Estimated read time |

### 6.6 CartItem (Client-side State)
| Field | Type |
|---|---|
| `id` | `string` |
| `title` | `string` |
| `price` | `{amount: number, currency: 'NGN' \| 'USD'}` |
| `quantity` | `number` |
| `image` | `string` |
| `category` | `string` |

### 6.7 Review (API-referenced, no route implemented)
| Field | Type |
|---|---|
| `_id` | `string` |
| `productId` | `string` |
| `userId` | `string` |
| `userName` | `string` |
| `rating` | `number` |
| `comment` | `string` |
| `createdAt` | `string` |

---

## 7. API Routes

All routes live under `app/api/`. Error handling and method validation are handled by shared middleware in `lib/middleware.ts`.

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `GET` | `/api/products` | No | List all products |
| `POST` | `/api/products` | No | Create a new product |
| `GET` | `/api/products/[id]` | No | Get product by ID |
| `PUT` | `/api/products/[id]` | No | Update product by ID |
| `DELETE` | `/api/products/[id]` | No | Delete product by ID |
| `GET` | `/api/categories` | No | List all categories |
| `POST` | `/api/categories` | No | Create a new category |
| `GET` | `/api/categories/[id]` | No | Get category by ID |
| `PUT` | `/api/categories/[id]` | No | Update category by ID |
| `DELETE` | `/api/categories/[id]` | No | Delete category by ID |
| `GET` | `/api/orders` | No | List all orders (sorted by `createdAt` desc) |
| `POST` | `/api/orders` | No | Create a new order (status: `"pending"`) |
| `GET` | `/api/orders/[id]` | No | Get order by ID |
| `PUT` | `/api/orders/[id]` | No | Update order by ID |
| `GET` | `/api/store-preferences` | No | Get store configuration |
| `PUT` | `/api/store-preferences` | No | Upsert store configuration |
| `GET` | `/api/dashboard/stats` | No | Aggregate: total products, categories, orders, revenue, recent 5 orders |
| `GET` | `/api/products/[id]/reviews` | No | *(Referenced in `lib/api.ts` — route file not found)* |
| `POST` | `/api/reviews` | No | *(Referenced in `lib/api.ts` — route file not found)* |

**Middleware utilities (`lib/middleware.ts`):**
- `withErrorHandler(handler)` — wraps handler with try/catch, returns JSON error responses
- `validateMethod(req, allowedMethods)` — throws 405 if method not in allowed list
- `validateAuth(req)` — checks `Authorization: Bearer <ADMIN_API_TOKEN>` header *(defined but not applied to any current route)*

---

## 8. User Flows

### 8.1 Browse & Discover
```
Homepage (/)
  → Explore section (category cards)
  → /explore/categories (full category grid)
  → /explore/[slug] (e.g. /explore/metabolic-syndrome)
    → Custom hero + research description + product cards
    → "More on Research" link → /research/[category]
    → Individual product card → /explore/item/[id]
```

### 8.2 Purchase Flow
```
/explore/[slug]
  → Add to Cart (ShopProductCard)
    → CartProvider.addItem() → localStorage updated
  → /cart
    → Review items, adjust quantities, remove items
    → "Proceed to Payment" → /payment
      → Load cart from localStorage
      → Display order summary + GTB bank details
      → User makes bank transfer
      → Click "I've Made Payment"
        → WhatsApp opens with pre-filled order message
        → Manual order confirmation by Panaceutics team
```

### 8.3 Appointment / Consultation Flow
```
Header → "Book an Appointment" (WhatsApp CTA)
  → wa.me/+2348070943256?text=<pre-filled message>

/chat page → "Start Your Journey" / "Chat With Us Now"
  → wa.me/+2348070943256
```

### 8.4 Research Deep-Dive Flow
```
/explore/[slug]
  → "More on Research" button → /research/[category] (e.g. /research/metabolic-syndrome)
/explore/item/[id]
  → Full research article page with image, description, clinical details
  → Back link to parent category
```

### 8.5 Contact Flow
```
/contact
  → Fill form (name, email, phone, subject, message)
  → Click "Send Message"
    → (currently: console.log only — not wired to backend)
```

---

## 9. Non-Functional Requirements

### 9.1 Performance
- Next.js App Router with server components minimizes client-side JS
- `next/image` used throughout for automatic image optimization and lazy loading
- Geist font loaded via `next/font` (zero layout shift)
- Vercel Edge Network handles global CDN and caching
- `Analytics` from `@vercel/analytics` for web vitals monitoring

### 9.2 SEO
- Static and dynamic metadata via Next.js `Metadata` API
- Full Open Graph and Twitter Card support
- Robots: `index: true, follow: true` with `max-image-preview: large`
- Web App Manifest for PWA discoverability
- Clean URL slugs for all category and product pages
- `generateMetadata` on `/products/[id]` for per-product OG tags

### 9.3 Responsiveness
- Mobile-first design with Tailwind CSS breakpoints (`sm`, `md`, `lg`)
- Mobile hamburger navigation with full-screen overlay
- Responsive grid layouts (1 → 2 → 3/4 columns)
- `viewport` set with `device-width` and `maximumScale: 1`

### 9.4 Accessibility
- Radix UI primitives provide ARIA-compliant interactive elements (dialogs, menus, tabs, etc.)
- Semantic HTML elements (`header`, `main`, `footer`, `nav`, `article`)
- `alt` text on all `next/image` instances
- Focus-visible styles via Tailwind

### 9.5 Security
- `ADMIN_API_TOKEN` environment variable for admin API protection (`lib/middleware.ts`)
- `rel="noopener noreferrer"` on all `target="_blank"` links
- No client-side secrets exposed (payment keys not present in frontend)

### 9.6 Deployment
- **Platform:** Vercel (inferred from `@vercel/analytics` dependency and user confirmation)
- **Domain:** `panaceutics.org` (set as `metadataBase` in layout)
- **Environment Variables needed:**
  - `MONGODB_URI` *(to be replaced with Supabase credentials)*
  - `MONGODB_DB_NAME` *(to be removed)*
  - `ADMIN_API_TOKEN`
  - Future: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 10. Known Issues / Gaps

### 🔴 Critical

1. **MongoDB used instead of Supabase** — `lib/db.ts` contains a full MongoDB client using `MongoClient` from the `mongodb` npm package. All 9 API routes (`/api/products`, `/api/categories`, `/api/orders`, `/api/store-preferences`, `/api/dashboard/stats`) import `getCollection()` from `lib/db.ts` and execute MongoDB-style queries (`.find()`, `.insertOne()`, `.findOneAndUpdate()`, `.deleteOne()`, `.countDocuments()`, `.aggregate()`). **None of these routes will work until the database layer is migrated to Supabase.**

2. **`mongodb` package must be removed** — `package.json` lists `"mongodb": "^6.20.0"` as a dependency. This should be replaced with `@supabase/supabase-js`.

3. **`ObjectId` MongoDB-specific IDs** — Product and category ID lookups use `new ObjectId(params.id)` in `app/api/products/[id]/route.ts`, `app/api/categories/[id]/route.ts`, and `app/api/orders/[id]/route.ts`. Supabase uses UUID strings or integer IDs; these route handlers must be rewritten.

4. **Static product data not connected to database** — Products are currently defined as hardcoded TypeScript arrays in `lib/categories/*.ts` and `lib/researches.ts`. The API routes read from a database, creating a split where the frontend uses static data and the backend has empty/disconnected collections. A migration plan is needed to either: (a) seed the Supabase database from the static arrays, or (b) move the app to read exclusively from Supabase at runtime.

### 🟡 Moderate

5. **Paystack integrated but inactive** — `lib/paystack.ts` dynamically loads the Paystack inline JS SDK but is not called anywhere in the active payment flow. The `StorePreferences.paymentMethod` field supports `"paystack"` but the `PaymentPage` component uses hardcoded GTB bank transfer logic. Paystack should either be fully wired or the dead code removed.

6. **Contact form not wired** — `app/contact/page.tsx` `handleSubmit` only calls `console.log("Form submitted:", formData)`. No API call, no email service, no Supabase insert. The form needs a backend integration.

7. **Review API routes missing** — `lib/api.ts` calls `GET /api/products/[id]/reviews` and `POST /api/reviews`, but neither route file exists. Any component attempting to use `getProductReviews()` or `createReview()` will receive a 404.

8. **Two overlapping payment pages** — `/payment` (using `PaymentPage` component with WhatsApp confirmation) and `/checkout` (a simpler bank transfer card) coexist with duplicated logic. The cart's "Proceed to Payment" button goes to `/payment`; `/checkout` appears to be an orphaned draft.

9. **`lib/api.ts` → `getStorePreferences()` runtime failure** — This client function calls `/api/store-preferences` which reads from MongoDB. Since MongoDB is not connected, `app/products/page.tsx` and `app/products/[id]/page.tsx` (which call `getStorePreferences()`) will fail at runtime.

### 🟢 Minor

10. **Cart icon commented out in header** — The `<Link href="/cart">` with badge count is commented out in `components/header.tsx`. Users have no visible cart count indicator in the nav.

11. **Newsletter component commented out** — `<Newsletter />` is commented out in `app/page.tsx`. The component file exists but is unused.

12. **Admin API auth not applied** — `validateAuth()` is defined in `lib/middleware.ts` but is not applied to any route handler. All write operations (POST, PUT, DELETE) are currently publicly accessible.

13. **`/product/[id]` route purpose unclear** — `app/product/[id]/` exists as a directory but was not fully traced. It may be a legacy or duplicate of `/products/[id]`.

14. **Hardcoded support email mismatch** — `/checkout/page.tsx` shows `support@naturalhealing.com` (placeholder). `PaymentPage` and the header use `support@panaceutics.com`. These should be unified.

15. **Hardcoded GTB account number** — `1234567890` in both `PaymentPage` and `CheckoutPage` is clearly a placeholder. Real account details need to be provided.

16. **Currency conversion rate is hardcoded** — `NGN_TO_USD_RATE = 1600` in `lib/currency.ts` is static. This will go stale as exchange rates fluctuate. A live rate API (e.g. ExchangeRate API) should be considered.

17. **No user authentication** — There is no login/signup system. Cart, order history, and personalized recommendations require user identity. If Supabase is the intended backend, Supabase Auth would be the natural integration.

18. **`app/products/[id]/page.tsx` product lookup uses `p._id`** — When Supabase is integrated, the ID field will likely be `p.id` (UUID) rather than `p._id` (MongoDB ObjectId). All such references need updating.

---

*This PRD reflects the state of the codebase as of the analysis date. Section 10 (Known Issues) represents the highest-priority engineering work required before the application can function correctly end-to-end in production.*
