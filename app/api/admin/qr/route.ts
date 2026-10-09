import { NextRequest, NextResponse } from 'next/server'
import { serverClient } from '@/lib/supabase'

function isAuthorized(request: NextRequest): boolean {
  const secret = request.headers.get('x-admin-secret')
  return secret === process.env.ADMIN_SECRET || secret === process.env.NEXT_PUBLIC_ADMIN_SECRET
}

// GET /api/admin/qr — list all links with scan counts
export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = serverClient()

  // Fetch all links
  const { data: links, error: linksError } = await supabase
    .from('qr_links')
    .select('*')
    .order('created_at', { ascending: false })

  if (linksError) {
    return NextResponse.json({ error: linksError.message }, { status: 500 })
  }

  // Fetch scan counts grouped by slug
  const { data: scans, error: scansError } = await supabase
    .from('qr_scans')
    .select('slug')

  if (scansError) {
    return NextResponse.json({ error: scansError.message }, { status: 500 })
  }

  // Build a count map
  const scanCountMap: Record<string, number> = {}
  for (const scan of scans ?? []) {
    scanCountMap[scan.slug] = (scanCountMap[scan.slug] ?? 0) + 1
  }

  const result = (links ?? []).map((link) => ({
    ...link,
    scan_count: scanCountMap[link.slug] ?? 0,
  }))

  return NextResponse.json(result)
}

// POST /api/admin/qr — create a new link
export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

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

// DELETE /api/admin/qr?slug=... — delete a link (cascades to scans)
export async function DELETE(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

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
