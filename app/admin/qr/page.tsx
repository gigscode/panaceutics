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

  // Fetch all links
  const { data: links } = await supabase
    .from('qr_links')
    .select('*')
    .order('created_at', { ascending: false })

  // Fetch all scans
  const { data: scans } = await supabase.from('qr_scans').select('slug, scanned_at')

  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()

  const scanCountMap: Record<string, number> = {}
  let scansToday = 0

  for (const scan of scans ?? []) {
    scanCountMap[scan.slug] = (scanCountMap[scan.slug] ?? 0) + 1
    if (scan.scanned_at >= todayStart) scansToday++
  }

  const linksWithCount: QrLink[] = (links ?? []).map((l) => ({
    ...l,
    scan_count: scanCountMap[l.slug] ?? 0,
  }))

  const totalScans = (scans ?? []).length

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
