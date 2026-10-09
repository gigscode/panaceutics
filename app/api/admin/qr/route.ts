import { NextRequest, NextResponse } from 'next/server'
import { serverClient } from '@/lib/supabase'

// Auth is enforced by middleware.ts before this route is reached.
// The middleware checks the admin_session cookie against ADMIN_SECRET (server-side only).
// These handlers therefore do NOT need to re-check any secret or header.

// GET /api/admin/qr — list all links with scan counts (aggregate query, not full scan)
export async function GET(_request: NextRequest) {
  const supabase = serverClient()

  // Fetch all links with an embedded aggregate count — Supabase returns
  // qr_scans as [{ count: N }] so we never transfer individual scan rows.
  const { data: links, error: linksError } = await supabase
    .from('qr_links')
    .select('*, qr_scans(count)')
    .order('created_at', { ascending: false })

  if (linksError) {
    return NextResponse.json({ error: linksError.message }, { status: 500 })
  }

  // Normalise the embedded count into a flat scan_count number
  const result = (links ?? []).map((link) => {
    const countArr = link.qr_scans as unknown as { count: number }[] | null
    const scan_count = countArr?.[0]?.count ?? 0
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { qr_scans: _dropped, ...rest } = link as typeof link & { qr_scans: unknown }
    return { ...rest, scan_count }
  })

  return NextResponse.json(result)
}

// POST /api/admin/qr — create a new link
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)

  if (!body) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { slug, destination_url, label } = body as {
    slug?: string
    destination_url?: string
    label?: string
  }

  if (!slug || !destination_url) {
    return NextResponse.json(
      { error: 'slug and destination_url are required' },
      { status: 400 },
    )
  }

  const supabase = serverClient()

  const { data, error } = await supabase
    .from('qr_links')
    .insert({ slug: slug.trim(), destination_url: destination_url.trim(), label: label?.trim() ?? null })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}

// PATCH /api/admin/qr — update label and/or destination_url for an existing link
export async function PATCH(request: NextRequest) {
  const body = await request.json().catch(() => null)

  if (!body) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { slug, destination_url, label } = body as {
    slug?: string
    destination_url?: string
    label?: string
  }

  if (!slug) {
    return NextResponse.json({ error: 'slug is required' }, { status: 400 })
  }

  const updates: { destination_url?: string; label?: string | null } = {}
  if (destination_url !== undefined) updates.destination_url = destination_url.trim()
  if (label !== undefined) updates.label = label.trim() || null

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No fields to update' }, { status: 400 })
  }

  const supabase = serverClient()

  const { data, error } = await supabase
    .from('qr_links')
    .update(updates)
    .eq('slug', slug)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// DELETE /api/admin/qr?slug=... — delete a link (cascades to scans)
export async function DELETE(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug')

  if (!slug) {
    return NextResponse.json({ error: 'slug query param is required' }, { status: 400 })
  }

  const supabase = serverClient()

  const { error } = await supabase.from('qr_links').delete().eq('slug', slug)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ deleted: slug })
}
