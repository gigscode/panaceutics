# QR Code Infrastructure — Verification Results

**Date**: First implementation pass  
**Build command**: `pnpm build` (Next.js 16.3.3 / Turbopack)

## TypeScript Check

```
pnpm tsc --noEmit
```

**Result**: ✅ PASS — 0 errors, 0 warnings

Initial run produced 15 type errors across 3 files due to Supabase generics.
Root cause: `Database` type lacked `Relationships` array on table entries and
`Views/Functions/Enums/CompositeTypes` keys — Supabase's `createClient<Database>`
inferred `never` for all table rows. Fixed by completing the Database type shape.

Additionally, `supabase.from('qr_scans').insert(...).then(...).catch(...)` chain
caused a TS error because Supabase's `PostgrestBuilder` doesn't expose `.catch()`
directly in the chain. Fixed by using `void supabase.from(...).insert(...)` 
(fire-and-forget with void operator).

## Build

```
pnpm build
```

**Result**: ✅ PASS — compiled successfully, 0 errors

Initial build attempt failed with prerender error on `/admin/qr`:  
`Error: supabaseUrl is required.`  
Cause: Next.js tried to statically prerender the server component at build time,
but `NEXT_PUBLIC_SUPABASE_URL` is not set in CI/build environment.  
Fix: Added `export const dynamic = 'force-dynamic'` to `app/admin/qr/page.tsx`.

## Files Created

| File | Status |
|------|--------|
| `.env.local.example` | ✅ Created |
| `lib/supabase.ts` | ✅ Created |
| `supabase/migrations/001_qr_codes.sql` | ✅ Created |
| `app/qr/[slug]/route.ts` | ✅ Compiles, builds |
| `app/api/admin/qr/route.ts` | ✅ Compiles, builds |
| `components/admin/qr-dashboard.tsx` | ✅ Compiles, builds |
| `app/admin/qr/page.tsx` | ✅ Compiles, builds (dynamic) |

## Routes in Build Output

- `ƒ /admin/qr` — dynamic server page ✅  
- `ƒ /api/admin/qr` — dynamic API route (GET/POST/DELETE) ✅  
- `ƒ /qr/[slug]` — dynamic redirect + scan logging ✅  

## Notes

- `@supabase/supabase-js@2.117.3` and `qrcode.react@4.2.0` installed via pnpm.
- `@types/qrcode@1.5.6` installed as dev dependency.
- No `@supabase/ssr` was added (not needed; supabase-js v2 `createClient` used directly).
- The vaul peer dependency warning for React 19 was pre-existing and unrelated.

---

## Review pass 2 — fix findings #2–#6

**Date**: Second pass (review findings remediation)  
**Commit**: `e8b0250`

### Finding #2 — Full qr_scans table scan

**Fix**: Replaced the separate `select('slug')` full-table fetch with a Supabase
embedded aggregate: `select('*, qr_scans(count)')`. Applied in both
`app/api/admin/qr/route.ts` (GET handler) and `app/admin/qr/page.tsx`.
The count is normalised from `qr_scans: [{ count: N }]` to a flat `scan_count`
number before being returned/used.

For `scansToday`, the page now issues a separate `gte` query filtered to
UTC midnight — fetching only today's scan rows rather than the full history.

### Finding #3 — Non-atomic edit (delete + reinsert)

**Fix**: Added `PATCH /api/admin/qr` endpoint that calls
`supabase.from('qr_links').update({...}).eq('slug', slug)`.
Updated `handleSaveEdit` in `LinksTab` to call PATCH instead of
DELETE + POST. No scan data can be lost during an edit.

### Finding #4 — PNG download 100 ms setTimeout race

**Fix**: Replaced `setTimeout(..., 100)` with `flushSync(() => root.render(...))`.
`flushSync` forces React to complete the render synchronously before returning,
so `container.querySelector('canvas')` is guaranteed to succeed on any device.

### Finding #5 — scansToday uses server local time

**Fix**: `todayStart` now computed with `Date.UTC(now.getUTCFullYear(), ...)` and
stored as `todayStartUTC`. The DB query uses `.gte('scanned_at', todayStartUTC)`,
so midnight is always UTC-anchored regardless of the server's local timezone.

### Finding #6 — No RLS policies

**Fix**: Added to `supabase/migrations/001_qr_codes.sql`:
- `ALTER TABLE qr_links ENABLE ROW LEVEL SECURITY`
- `ALTER TABLE qr_scans ENABLE ROW LEVEL SECURITY`
- Public SELECT policy on `qr_links` (redirect engine + product pages)
- Public INSERT policy on `qr_scans` (future client-side scan logging)
- No SELECT policy on `qr_scans` for anon role (analytics only via service key)

**`pnpm tsc --noEmit`**: ✅ PASS — 0 errors  
**`pnpm build`**: ✅ PASS — compiled successfully, all routes present


## TypeScript Check

```
pnpm tsc --noEmit
```

**Result**: ✅ PASS — 0 errors, 0 warnings

Initial run produced 15 type errors across 3 files due to Supabase generics.
Root cause: `Database` type lacked `Relationships` array on table entries and
`Views/Functions/Enums/CompositeTypes` keys — Supabase's `createClient<Database>`
inferred `never` for all table rows. Fixed by completing the Database type shape.

Additionally, `supabase.from('qr_scans').insert(...).then(...).catch(...)` chain
caused a TS error because Supabase's `PostgrestBuilder` doesn't expose `.catch()`
directly in the chain. Fixed by using `void supabase.from(...).insert(...)` 
(fire-and-forget with void operator).

## Build

```
pnpm build
```

**Result**: ✅ PASS — compiled successfully, 0 errors

Initial build attempt failed with prerender error on `/admin/qr`:  
`Error: supabaseUrl is required.`  
Cause: Next.js tried to statically prerender the server component at build time,
but `NEXT_PUBLIC_SUPABASE_URL` is not set in CI/build environment.  
Fix: Added `export const dynamic = 'force-dynamic'` to `app/admin/qr/page.tsx`.

## Files Created

| File | Status |
|------|--------|
| `.env.local.example` | ✅ Created |
| `lib/supabase.ts` | ✅ Created |
| `supabase/migrations/001_qr_codes.sql` | ✅ Created |
| `app/qr/[slug]/route.ts` | ✅ Compiles, builds |
| `app/api/admin/qr/route.ts` | ✅ Compiles, builds |
| `components/admin/qr-dashboard.tsx` | ✅ Compiles, builds |
| `app/admin/qr/page.tsx` | ✅ Compiles, builds (dynamic) |

## Routes in Build Output

- `ƒ /admin/qr` — dynamic server page ✅  
- `ƒ /api/admin/qr` — dynamic API route (GET/POST/DELETE) ✅  
- `ƒ /qr/[slug]` — dynamic redirect + scan logging ✅  

## Notes

- `@supabase/supabase-js@2.117.3` and `qrcode.react@4.2.0` installed via pnpm.
- `@types/qrcode@1.5.6` installed as dev dependency.
- No `@supabase/ssr` was added (not needed; supabase-js v2 `createClient` used directly).
- The vaul peer dependency warning for React 19 was pre-existing and unrelated.
