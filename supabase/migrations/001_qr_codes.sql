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
