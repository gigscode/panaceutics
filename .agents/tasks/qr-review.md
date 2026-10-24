# QR Code Infrastructure on Supabase

This change adds a complete dynamic QR code service to the Panaceutics Next.js 15 project: a slug-based redirect engine, fire-and-forget scan analytics logged to Supabase, a full admin dashboard (Links / Generator / Analytics tabs), and a PostgreSQL migration with RLS. The implementation is self-contained — no third-party redirect SaaS — using `@supabase/supabase-js` v2 with the service-role key kept strictly server-side. The build passes cleanly after two verified remediation passes.

Watch for: `NEXT_PUBLIC_ADMIN_SECRET` embedded in the client bundle exposes the admin secret to the browser, making the API route's auth gate trivially bypassable (confirmed). The `.env.local.example` file referenced in the verification report was not found on disk — onboarding is blocked without it (confirmed).

**Verdict**: NEEDS_CHANGES

---

## High-level view

The admin API route has a structural auth flaw: `isAuthorized` accepts a secret matching either `process.env.ADMIN_SECRET` or `process.env.NEXT_PUBLIC_ADMIN_SECRET`, and the dashboard client reads the secret from `NEXT_PUBLIC_ADMIN_SECRET`. Because all `NEXT_PUBLIC_*` vars are baked into the browser bundle at build time, anyone who loads the admin page can extract the secret from the JS bundle and call the API directly, bypassing any future middleware auth. A server-only secret is needed here.

The admin page at `/admin/qr` carries a `// TODO: add middleware auth before public launch` comment and has no auth guard. The API secret is the only access control in place, and it is readable from the browser bundle, so the two gaps compound each other.

The SQL migration's FK `qr_scans(slug) → qr_links(slug)` is a text-column reference. If a slug is ever updated via a future code path, the FK breaks silently for existing scan rows. The current PATCH endpoint only allows updating `destination_url` and `label`, so this holds for now — but there is no DB-level enforcement.

The `.env.local.example` file is referenced in the verification report as created, but does not exist on disk. Any developer setting up the project has no documented list of required env vars.

---

<details>
<summary>Issues (4)</summary>

1. **Admin secret exposed in browser bundle** — `NEXT_PUBLIC_ADMIN_SECRET` is baked into the JS bundle; anyone loading the admin page can read it from the source and call the API directly. Rename to `ADMIN_SECRET` everywhere and remove the `NEXT_PUBLIC_` variant from `isAuthorized` and the dashboard component. Pass it via a server-rendered prop or a cookie, or enforce auth at the middleware level before the page is served.

2. **Admin page is publicly accessible** — `/admin/qr` has no auth guard; the `// TODO: add middleware auth before public launch` comment is the only acknowledgment. Before shipping, add Next.js middleware that checks a session cookie or similar credential and redirects unauthenticated requests.

3. **`.env.local.example` not on disk** — The verification report confirms it was created, but the file does not exist. Without it, a new developer has no list of required env vars (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_SECRET`) and cannot run the project. Recreate and commit the file.

4. **Text-column FK has no slug-immutability guard** — The `qr_scans(slug)` FK references `qr_links(slug)` as plain text; if a slug is ever updated via a future code path, the FK breaks silently for existing scan rows. Add a `BEFORE UPDATE` trigger on `qr_links` that rejects slug changes, or migrate the FK to reference `qr_links.id`.

</details>

<details>
<summary>Details</summary>

## Admin secret in the browser bundle

`qr-dashboard.tsx` (line 57) reads `process.env.NEXT_PUBLIC_ADMIN_SECRET` and sends it as `x-admin-secret` on every mutating API call. In Next.js, any env var prefixed `NEXT_PUBLIC_` is statically replaced at build time and ends up in the JS bundle served to the browser — it is not a secret. `isAuthorized` in `app/api/admin/qr/route.ts` (line 7) accepts a match against either `process.env.ADMIN_SECRET` **or** `process.env.NEXT_PUBLIC_ADMIN_SECRET`, so the public variant is sufficient to authenticate. Any user who loads the admin page, opens DevTools → Sources, and searches for the secret value can find it and replay the header against the API from anywhere.

The fix is to remove `NEXT_PUBLIC_ADMIN_SECRET` from both the check and the dashboard entirely. The dashboard can authenticate through a server-set cookie after a proper login, or the API calls can be proxied through a server action that injects the secret server-side. `isAuthorized` should then only check `process.env.ADMIN_SECRET`.

## Unguarded admin page

The admin page at `/admin/qr` is a Server Component that calls `serverClient()` directly and renders the full dashboard — no session check, no redirect, no middleware. The comment `// TODO: add middleware auth before public launch` (line 1 of `page.tsx`) acknowledges the gap. The API secret being the only gate is insufficient even when the secret is not public, because the page itself is fully readable. Any authenticated Supabase session or future product page navigation could accidentally surface the link.

## Missing `.env.local.example`

The file was listed in the verification report's "Files Created" table and is the documented onboarding artifact, but `find` returns nothing for it anywhere in the project tree. `lib/supabase.ts` uses four env vars with non-null assertions (`!`): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and the admin routes use `ADMIN_SECRET`. Missing any of these at runtime throws at the `createClient` call. Without the example file these aren't documented anywhere.

## Slug FK mutability assumption

The FK `qr_scans(slug) → qr_links(slug) ON DELETE CASCADE` is a text-column reference rather than a UUID. This is consistent throughout the implementation, but it creates an implicit constraint: if a slug is ever renamed, the FK breaks. The PATCH endpoint only allows updating `destination_url` and `label`, never `slug`, so the constraint holds for now — but there is no DB-level enforcement preventing a future code path from issuing a direct `slug` update. Adding a `BEFORE UPDATE` trigger on `qr_links` that raises an exception on slug changes would close this permanently.

</details>

---

<details>
<summary>File map</summary>

| File | What changed |
|------|-------------|
| `lib/supabase.ts` | New file — typed Supabase client factory, `browserClient` / `serverClient`, full `Database` schema type |
| `supabase/migrations/001_qr_codes.sql` | New file — `qr_links` and `qr_scans` tables, indexes, RLS policies, 10-row product seed |
| `app/qr/[slug]/route.ts` | New file — slug redirect engine with fire-and-forget scan logging |
| `app/api/admin/qr/route.ts` | New file — GET/POST/PATCH/DELETE admin API with `x-admin-secret` auth |
| `app/admin/qr/page.tsx` | New file — server component page, `force-dynamic`, passes data to `QrDashboard` |
| `components/admin/qr-dashboard.tsx` | New file — three-tab dashboard (Links, Generator, Analytics) with PNG/SVG download |

Full diff: `git diff main -- lib/supabase.ts supabase/migrations/001_qr_codes.sql app/qr app/api/admin/qr app/admin/qr components/admin/qr-dashboard.tsx`

</details>
