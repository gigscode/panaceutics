// TODO: add middleware auth before public launch
import type { Metadata } from 'next'

// Force dynamic rendering — this page fetches from Supabase at request time
// and requires env vars that are not available at build time.
export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { serverClient } from '@/lib/supabase'
import { QrDashboard } from '@/components/admin/qr-dashboard'
import type { QrLink, AnalyticsData } from '@/components/admin/qr-dashboard'

export const metadata: Metadata = {
  title: 'QR Code Manager — Panaceutics',
}

export default async function QrAdminPage() {
  const supabase = serverClient()

  // Fetch all links with embedded aggregate scan counts — no full table scan
  const { data: links } = await supabase
    .from('qr_links')
    .select('*, qr_scans(count)')
    .order('created_at', { ascending: false })

  // For scansToday we only need today's rows; filter in the DB using UTC midnight
  const now = new Date()
  // Use Date.UTC so todayStart is always midnight UTC, regardless of server timezone
  const todayStartUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())).toISOString()

  const { data: todayScans } = await supabase
    .from('qr_scans')
    .select('slug')
    .gte('scanned_at', todayStartUTC)

  const scansToday = todayScans?.length ?? 0

  // Normalise the embedded count into a flat scan_count number
  const linksWithCount: QrLink[] = (links ?? []).map((l) => {
    const countArr = (l as typeof l & { qr_scans: { count: number }[] | null }).qr_scans
    const scan_count = countArr?.[0]?.count ?? 0
    return { id: l.id, slug: l.slug, destination_url: l.destination_url, label: l.label ?? null, created_at: l.created_at ?? '', scan_count }
  })

  const totalScans = linksWithCount.reduce((s, l) => s + l.scan_count, 0)

  const analytics: AnalyticsData = {
    totalLinks: linksWithCount.length,
    totalScans,
    scansToday,
    perSlug: linksWithCount.map((l) => ({
      slug: l.slug,
      label: l.label ?? l.slug,
      scans: l.scan_count,
    })),
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: '#042f2e' }}>
              QR Code Manager
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage QR links, generate codes, and view scan analytics
            </p>
          </div>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:underline"
          >
            ← Back to site
          </Link>
        </div>

        <QrDashboard links={linksWithCount} analytics={analytics} />
      </div>
    </div>
  )
}
