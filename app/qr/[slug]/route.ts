import { NextRequest, NextResponse } from 'next/server'
import { serverClient } from '@/lib/supabase'

export const runtime = 'nodejs'

function detectDevice(ua: string): string {
  if (/mobile|android|iphone|ipad|tablet/i.test(ua)) {
    if (/tablet|ipad/i.test(ua)) return 'tablet'
    return 'mobile'
  }
  return 'desktop'
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const supabase = serverClient()

  const { data: link } = await supabase
    .from('qr_links')
    .select('destination_url')
    .eq('slug', slug)
    .single()

  if (!link) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Fire-and-forget scan logging — do not await, do not block the redirect
  const userAgent = request.headers.get('user-agent') ?? ''
  const referer = request.headers.get('referer') ?? ''
  const deviceType = detectDevice(userAgent)

  void supabase
    .from('qr_scans')
    .insert({
      slug,
      device_type: deviceType,
      user_agent: userAgent,
      referer,
    })

  // Build absolute URL for relative destinations (e.g. /product/301)
  const destination = link.destination_url.startsWith('http')
    ? link.destination_url
    : new URL(link.destination_url, request.url).toString()

  return NextResponse.redirect(destination, { status: 302 })
}
