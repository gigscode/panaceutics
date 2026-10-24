# Implementation Plan — QR Code Infrastructure (Supabase)

## Findings from codebase exploration

- **Font**: `app/layout.tsx` already uses `next/font/local` with Geist woff2 files from `public/fonts/`. Do NOT use `next/font/google` anywhere.
- **Path alias**: `@/*` maps to `./*` (repo root). Use `@/lib/...`, `@/components/...`, etc.
- **`lib/` pattern**: Files export plain TypeScript functions/constants (see `lib/utils.ts`, `lib/config.ts`, `lib/api.ts`). Follow the same style for `lib/supabase.ts`.
- **shadcn primitives confirmed present**: `Button`, `Card` (+ CardHeader/CardContent/CardTitle/CardDescription/CardFooter), `Input`, `Tabs` (+ TabsList/TabsTrigger/TabsContent), `Select`, `Slider`, `Label`, `Badge`, `Table` (+ TableHeader/TableBody/TableRow/TableHead/TableCell), `Separator`. All live in `components/ui/`.
- **Recharts + chart wrapper**: `recharts` 2.15.4 is installed. `components/ui/chart.tsx` provides the `ChartConfig`/`ChartContainer` wrapper used by existing charts — use it for the bar chart.
- **No existing `app/api/` directory** — create it fresh.
- **No existing `app/admin/` directory** — create it fresh. No auth middleware is present; a simple `ADMIN_SECRET` header check is sufficient for MVP.
- **No existing `supabase/` directory** — create it fresh.
- **`qrcode.react`**: provides `QRCodeSVG` and `QRCodeCanvas` named exports. Use `QRCodeSVG` for display; `QRCodeCanvas` via ref for PNG download.
- **Brand colour**: `#042f2e` (emerald-800) — use as the default QR foreground colour.
- **Build command**: `pnpm build` (`next build`). No test suite — verify by running `pnpm build` after all steps.
- **Next.js version**: 16.3.3. Route Handlers use the standard `app/` directory pattern with `route.ts`. The redirect in `next.config.mjs` uses the `/explore` path — the new `/qr/[slug]` route must not conflict with it.

---

## Implementation Plan

- [ ] 1. Install `@supabase/supabase-js` and `qrcode.react` packages.
      Run `pnpm add @supabase/supabase-js qrcode.react` and `pnpm add -D @types/qrcode.react` in the repo root. After install, confirm both appear in `package.json` dependencies.
      Files: `package.json`, `pnpm-lock.yaml` (auto-updated)
      Verify: `pnpm build` — build reaches the compilation step without a missing-module error (it will fail on missing env vars, which is expected at this stage).

- [ ] 2. Create `.env.local.example` with placeholder values.
      Document every environment variable the QR feature needs. Include `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and `ADMIN_SECRET`. Prefix comments explaining where to find each value in the Supabase dashboard.
      Files: `.env.local.example`
      Verify: File exists and all four variable names are present — `grep -c "SUPABASE\|ADMIN_SECRET" .env.local.example` returns 4.

- [ ] 3. Create `lib/supabase.ts` — Supabase client factory.
      Export two functions:
      - `createBrowserClient()` — uses `@supabase/supabase-js` `createClient` with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Safe to call from client components.
      - `createServerClient()` — uses `SUPABASE_SERVICE_ROLE_KEY` (non-public). Must only be imported in server-only files (Route Handlers, Server Components). Add a comment warning against importing this in `'use client'` files.
      Keep it simple — no singleton pattern needed at this scale; each call to `createClient` returns a new instance, which is fine for server-side route handlers.
      Files: `lib/supabase.ts`
      Verify: TypeScript compilation passes — `pnpm build` (or `npx tsc --noEmit`).

- [ ] 4. Create `supabase/migrations/001_qr_codes.sql` — database schema.
      Create two tables:

      **`qr_links`**
      ```sql
      id          uuid PRIMARY KEY DEFAULT gen_random_uuid()
      slug        text UNIQUE NOT NULL          -- e.g. "solafen-brochure"
      destination text NOT NULL                 -- full redirect URL
      label       text NOT NULL DEFAULT ''      -- human-readable name for admin UI
      created_at  timestamptz NOT NULL DEFAULT now()
      updated_at  timestamptz NOT NULL DEFAULT now()
      ```

      **`qr_scans`**
      ```sql
      id          uuid PRIMARY KEY DEFAULT gen_random_uuid()
      link_id     uuid NOT NULL REFERENCES qr_links(id) ON DELETE CASCADE
      scanned_at  timestamptz NOT NULL DEFAULT now()
      device_type text NOT NULL DEFAULT 'unknown'  -- 'mobile' | 'desktop' | 'unknown'
      user_agent  text
      ip          text
      ```

      Indexes: `CREATE INDEX ON qr_scans(link_id)` and `CREATE INDEX ON qr_scans(scanned_at)`.

      Seed rows: Insert 3 sample `qr_links` rows for Solafen Ointment, Glomefix, and Breviflorex product pages using hardcoded UUIDs so they are stable across re-runs.

      Add a comment at the top of the file noting this must be run in the Supabase SQL Editor (Dashboard → SQL Editor → New Query → paste → Run).

      Files: `supabase/migrations/001_qr_codes.sql`
      Verify: File is valid SQL — review for syntax. Actual execution is manual (Supabase dashboard).

- [ ] 5. Create `app/qr/[slug]/route.ts` — scan-and-redirect Route Handler.
      This is a Next.js Route Handler (`GET` export). Steps:
      1. Import `createServerClient` from `@/lib/supabase`.
      2. Extract `slug` from `params`.
      3. Query `qr_links` where `slug = params.slug`. If not found, return `NextResponse.redirect('/404', { status: 302 })` (redirect to home with a not-found param is fine; a 404 response also works — use redirect for a better UX).
      4. **Fire-and-forget analytics**: call `supabase.from('qr_scans').insert({...})` but do NOT await it in the response path. Wrap it in a void-returning arrow and let it run. Detect device type from the `user-agent` request header: if it contains `Mobile` or `Android` → `'mobile'`, else `'desktop'`. Also log `ip` from the `x-forwarded-for` header (first entry).
      5. Return `NextResponse.redirect(link.destination, { status: 302 })`.

      **Important**: This route must be entirely server-side — no `'use client'` directive. It must also NOT wrap the admin route pattern; the file path is `app/qr/[slug]/route.ts`, which is distinct from `app/api/admin/qr/route.ts`.

      Files: `app/qr/[slug]/route.ts`
      Verify: `pnpm build` — the dynamic route compiles cleanly.

- [ ] 6. Create `app/api/admin/qr/route.ts` — admin CRUD API.
      Three exports: `GET`, `POST`, `DELETE`.

      **Authentication**: Check `request.headers.get('x-admin-secret') === process.env.ADMIN_SECRET`. If it doesn't match, return `NextResponse.json({ error: 'Unauthorized' }, { status: 401 })`. Use `createServerClient` from `@/lib/supabase`.

      **GET** — Return all `qr_links` with aggregated scan count:
      ```sql
      SELECT qr_links.*, COUNT(qr_scans.id) AS scan_count
      FROM qr_links
      LEFT JOIN qr_scans ON qr_scans.link_id = qr_links.id
      GROUP BY qr_links.id
      ORDER BY qr_links.created_at DESC
      ```
      Use Supabase's `.select('*, qr_scans(count)')` with embedded count pattern OR run a raw RPC. Prefer the embedded count pattern: `supabase.from('qr_links').select('*, qr_scans(count)')` — Supabase returns `qr_scans: [{ count: N }]`.

      **POST** — Accept JSON body `{ slug, destination, label }`. Validate that all three are non-empty strings. Insert into `qr_links`. Return the created row.

      **DELETE** — Accept JSON body `{ id }`. Delete from `qr_links` where `id` matches. The `ON DELETE CASCADE` on `qr_scans` handles cleanup automatically.

      Files: `app/api/admin/qr/route.ts`
      Verify: `pnpm build` — route compiles cleanly.

- [ ] 7. Create `components/admin/qr-dashboard.tsx` — client dashboard component.
      This is a `'use client'` component. It receives `initialLinks` (array from server fetch) as a prop and manages UI state locally with `useState`/`useCallback`.

      **Prop type**:
      ```ts
      type QrLink = {
        id: string
        slug: string
        destination: string
        label: string
        created_at: string
        qr_scans: [{ count: number }]
      }
      ```

      **Structure** — three `Tabs`:

      **Tab 1: "Links"**
      - A form with `Input` fields for `label`, `slug`, `destination` and an "Add Link" `Button`. On submit, call `POST /api/admin/qr` with the `x-admin-secret` header (read from `NEXT_PUBLIC_ADMIN_SECRET` or prompt — see note below). After success, refresh the link list via `GET /api/admin/qr`.
      - A `Table` listing all links: columns = Label, Slug, Destination (truncated), Scans, Actions. The Slug cell shows the full QR URL (`https://panaceutics.org/qr/{slug}`). Actions = Delete button (calls `DELETE /api/admin/qr`).
      - Note on `ADMIN_SECRET` in client: The admin dashboard is an internal tool. Expose it as `NEXT_PUBLIC_ADMIN_SECRET` for simplicity — document in `.env.local.example` that this env var is for the admin UI only and must NOT be committed. If this is a concern, the page can be placed behind a simple server-side password check in a future iteration.

      **Tab 2: "Generator"**
      - A `Select` or dropdown to pick which link slug to generate a QR code for (populated from `initialLinks`).
      - `Input` for custom URL (pre-fills with `https://panaceutics.org/qr/{selectedSlug}`).
      - A colour `Input type="color"` for foreground colour, defaulting to `#042f2e`.
      - A `Slider` for size (128–512 px, default 256).
      - Live preview using `QRCodeSVG` from `qrcode.react` (import as `import { QRCodeSVG } from 'qrcode.react'`).
      - PNG download: render a hidden `QRCodeCanvas` with a `ref`; on button click, call `canvasRef.current.toDataURL('image/png')` and trigger a download anchor.
      - SVG download: serialize the rendered `QRCodeSVG` DOM node via `new XMLSerializer().serializeToString(svgRef.current)`, create a Blob, and trigger a download anchor.

      **Tab 3: "Analytics"**
      - Summary cards using `Card`+`CardContent`: Total Links, Total Scans, top-performing slug.
      - A bar chart using `recharts` `BarChart` wrapped in `ChartContainer` from `@/components/ui/chart`. X-axis = slug label, Y-axis = scan count. Use the brand colour `#042f2e` for bars. Import `BarChart`, `Bar`, `XAxis`, `YAxis`, `Tooltip`, `ResponsiveContainer` from `recharts`.

      Files: `components/admin/qr-dashboard.tsx`
      Verify: `pnpm build` — component compiles without TypeScript errors.

- [ ] 8. Create `app/admin/qr/page.tsx` — Server Component wrapper.
      This is a **Server Component** (no `'use client'`). It:
      1. Calls `createServerClient` from `@/lib/supabase` to fetch all QR links with scan counts on the server (same query as the GET route).
      2. Passes the result as `initialLinks` prop to `<QrDashboard>` from `@/components/admin/qr-dashboard`.
      3. Uses `generateMetadata` or a simple `export const metadata` for the page title: `"QR Admin — Panaceutics"`.

      The page is intentionally not behind any Next.js `middleware` auth for MVP — it relies on the `ADMIN_SECRET` pattern within the client component for API calls. Add a `// TODO: add middleware auth before public launch` comment.

      Files: `app/admin/qr/page.tsx`
      Verify: `pnpm build` — full project builds with zero errors.

---

## File creation order (dependency sequence)

1. `.env.local.example` — no dependencies
2. `lib/supabase.ts` — depends on env vars being documented
3. `supabase/migrations/001_qr_codes.sql` — standalone SQL
4. `app/qr/[slug]/route.ts` — depends on `lib/supabase.ts`
5. `app/api/admin/qr/route.ts` — depends on `lib/supabase.ts`
6. `components/admin/qr-dashboard.tsx` — depends on shadcn primitives (already exist) and `qrcode.react` (step 1)
7. `app/admin/qr/page.tsx` — depends on `lib/supabase.ts` and `components/admin/qr-dashboard.tsx`

Install packages (step 1 in the plan) must happen before any TypeScript compilation step.

---

## Key constraints summary

| Constraint | Source | Rule |
|---|---|---|
| Font loading | `app/layout.tsx` | Always `next/font/local`; never `next/font/google` |
| Path alias | `tsconfig.json` | `@/` resolves to repo root |
| Brand colour | `viewport.themeColor` | `#042f2e` = default QR foreground |
| Package manager | `pnpm-lock.yaml` present | Use `pnpm add`, never `npm install` |
| No test suite | `package.json` | Verify with `pnpm build` |
| Admin secret in client | Architecture decision | Use `NEXT_PUBLIC_ADMIN_SECRET`; document risk in `.env.local.example` |
| `qrcode.react` imports | Package API | `import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react'` |
| Recharts chart wrapper | `components/ui/chart.tsx` | Use `ChartContainer` from `@/components/ui/chart` |
