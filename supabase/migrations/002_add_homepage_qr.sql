-- Migration 002: Add homepage QR link
-- Safe to run even if the homepage slug already exists.
-- Run this in: Supabase Dashboard → SQL Editor → New Query → paste → Run
-- ============================================================================

insert into qr_links (slug, destination_url, label)
values ('home', '/', 'Panaceutics Homepage')
on conflict (slug) do nothing;
