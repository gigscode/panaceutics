-- QR Code Infrastructure Migration
-- Run this in the Supabase Dashboard: SQL Editor → New Query → paste → Run
-- ============================================================================

create table if not exists qr_links (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  destination_url text not null,
  label text,
  created_at timestamptz default now()
);

create table if not exists qr_scans (
  id uuid primary key default gen_random_uuid(),
  slug text not null references qr_links(slug) on delete cascade,
  scanned_at timestamptz default now(),
  device_type text,
  user_agent text,
  referer text
);

-- Index for fast scan lookups by slug and time
create index if not exists qr_scans_slug_idx on qr_scans(slug);
create index if not exists qr_scans_scanned_at_idx on qr_scans(scanned_at);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
-- Enable RLS on both tables so that anonymous / authenticated clients using
-- the public anon key cannot read or write rows unless a policy permits it.
-- The service-role key (used server-side) bypasses RLS entirely, so Route
-- Handlers that use serverClient() are unaffected.
alter table qr_links enable row level security;
alter table qr_scans  enable row level security;

-- Allow anyone to SELECT from qr_links (needed for the redirect engine if
-- ever called via browserClient, and for future public product pages).
create policy "public read qr_links"
  on qr_links for select
  using (true);

-- Deny all other operations on qr_links for the anon/authenticated roles.
-- Inserts, updates, and deletes must go through the service-role API.

-- Allow anyone to INSERT into qr_scans (fire-and-forget scan logging via
-- the redirect route uses serverClient, but this policy future-proofs the
-- table if scan logging is ever moved to a client-side path).
create policy "public insert qr_scans"
  on qr_scans for insert
  with check (true);

-- Allow read of qr_scans only through service-role (no SELECT policy for anon).
-- This prevents the full scan history from being readable via browserClient.

-- Seed rows (one per product that ships with a printable QR code)
insert into qr_links (slug, destination_url, label) values
  ('myofibrox',   '/product/201', 'Myofibrox'),
  ('prostafexin', '/product/202', 'Prostafexin'),
  ('atxilox',     '/product/203', 'Atxilox'),
  ('metaxin',     '/product/204', 'Metaxin'),
  ('vantax',      '/product/301', 'Vantax'),
  ('neuzurin',    '/product/302', 'Neuzurin'),
  ('solafen',     '/product/303', 'Solafen Ointment'),
  ('glomefix',    '/product/401', 'Glomefix'),
  ('gastrapep',   '/product/604', 'Gastrapep'),
  ('breviflorex', '/product/701', 'Breviflorex')
on conflict (slug) do nothing;
