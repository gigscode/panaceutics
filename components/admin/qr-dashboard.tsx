'use client'

import React, { useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type QrLink = {
  id: string
  slug: string
  destination_url: string
  label: string | null
  created_at: string
  scan_count: number
}

export type AnalyticsData = {
  totalLinks: number
  totalScans: number
  scansToday: number
  perSlug: { slug: string; label: string; scans: number }[]
}

interface QrDashboardProps {
  links: QrLink[]
  analytics: AnalyticsData
}

const BRAND_COLOR = '#042f2e'

// Auth is handled via the admin_session cookie set at login.
// The cookie is HttpOnly and sent automatically with same-origin requests;
// no secret is needed in the client bundle.
function adminHeaders() {
  return {
    'Content-Type': 'application/json',
  }
}

// ---------------------------------------------------------------------------
// Main Dashboard
// ---------------------------------------------------------------------------

export function QrDashboard({ links: initialLinks, analytics: initialAnalytics }: QrDashboardProps) {
  const router = useRouter()
  const [links, setLinks] = useState<QrLink[]>(initialLinks)
  const [analytics, setAnalytics] = useState<AnalyticsData>(initialAnalytics)

  const refreshData = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/qr', { headers: adminHeaders(), credentials: 'same-origin' })
      if (res.ok) {
        const data: QrLink[] = await res.json()
        setLinks(data)

        const totalScans = data.reduce((s, l) => s + l.scan_count, 0)
        setAnalytics((prev) => ({
          ...prev,
          totalLinks: data.length,
          totalScans,
          perSlug: data.map((l) => ({
            slug: l.slug,
            label: l.label ?? l.slug,
            scans: l.scan_count,
          })),
        }))
      }
    } catch {
      // network error — silently ignore, stale data remains visible
    }
    router.refresh()
  }, [router])

  return (
    <Tabs defaultValue="links" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="links">Links</TabsTrigger>
        <TabsTrigger value="generator">Generator</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>

      <TabsContent value="links">
        <LinksTab links={links} onMutate={refreshData} />
      </TabsContent>

      <TabsContent value="generator">
        <GeneratorTab links={links} />
      </TabsContent>

      <TabsContent value="analytics">
        <AnalyticsTab analytics={analytics} />
      </TabsContent>
    </Tabs>
  )
}

// ---------------------------------------------------------------------------
// Tab 1 — Links
// ---------------------------------------------------------------------------

function LinksTab({
  links,
  onMutate,
}: {
  links: QrLink[]
  onMutate: () => void
}) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [addForm, setAddForm] = useState({ slug: '', label: '', destination_url: '' })
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({ label: '', destination_url: '' })
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!addForm.slug || !addForm.destination_url) return
    setAdding(true)
    try {
      const res = await fetch('/api/admin/qr', {
        method: 'POST',
        headers: adminHeaders(),
        credentials: 'same-origin',
        body: JSON.stringify(addForm),
      })
      if (res.ok) {
        setAddForm({ slug: '', label: '', destination_url: '' })
        setShowAddForm(false)
        onMutate()
      }
    } finally {
      setAdding(false)
    }
  }

  function startEdit(link: QrLink) {
    setEditingId(link.id)
    setEditForm({ label: link.label ?? '', destination_url: link.destination_url })
  }

  async function handleSaveEdit(link: QrLink) {
    setSaving(true)
    try {
      // Atomic update via PATCH — no delete-then-reinsert, no data-loss window.
      const res = await fetch('/api/admin/qr', {
        method: 'PATCH',
        headers: adminHeaders(),
        credentials: 'same-origin',
        body: JSON.stringify({
          slug: link.slug,
          destination_url: editForm.destination_url,
          label: editForm.label,
        }),
      })
      if (res.ok) {
        setEditingId(null)
        onMutate()
      }
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(slug: string) {
    setDeleting(slug)
    try {
      await fetch(`/api/admin/qr?slug=${encodeURIComponent(slug)}`, {
        method: 'DELETE',
        headers: adminHeaders(),
        credentials: 'same-origin',
      })
      onMutate()
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">QR Links</h2>
        <Button
          size="sm"
          onClick={() => setShowAddForm((v) => !v)}
          style={{ backgroundColor: BRAND_COLOR }}
        >
          {showAddForm ? 'Cancel' : 'Add New Link'}
        </Button>
      </div>

      {showAddForm && (
        <form
          onSubmit={handleAdd}
          className="rounded-2xl border p-4 space-y-3 bg-white shadow"
        >
          <h3 className="font-medium text-sm">New Link</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="space-y-1">
              <Label htmlFor="add-slug">Slug</Label>
              <Input
                id="add-slug"
                placeholder="e.g. solafen-brochure"
                value={addForm.slug}
                onChange={(e) => setAddForm((f) => ({ ...f, slug: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="add-label">Label</Label>
              <Input
                id="add-label"
                placeholder="Human-readable name"
                value={addForm.label}
                onChange={(e) => setAddForm((f) => ({ ...f, label: e.target.value }))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="add-dest">Destination URL</Label>
              <Input
                id="add-dest"
                placeholder="/product/101 or https://..."
                value={addForm.destination_url}
                onChange={(e) =>
                  setAddForm((f) => ({ ...f, destination_url: e.target.value }))
                }
                required
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="submit" size="sm" disabled={adding} style={{ backgroundColor: BRAND_COLOR }}>
              {adding ? 'Saving…' : 'Save'}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      <div className="rounded-2xl border bg-white shadow overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Slug / QR URL</TableHead>
              <TableHead>Label</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead className="text-right">Scans</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {links.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  No links yet. Add one above.
                </TableCell>
              </TableRow>
            )}
            {links.map((link) =>
              editingId === link.id ? (
                <TableRow key={link.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {typeof window !== 'undefined' ? window.location.origin : ''}/qr/{link.slug}
                  </TableCell>
                  <TableCell>
                    <Input
                      value={editForm.label}
                      onChange={(e) => setEditForm((f) => ({ ...f, label: e.target.value }))}
                      className="h-7 text-sm"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={editForm.destination_url}
                      onChange={(e) =>
                        setEditForm((f) => ({ ...f, destination_url: e.target.value }))
                      }
                      className="h-7 text-sm"
                    />
                  </TableCell>
                  <TableCell className="text-right">{link.scan_count}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button size="sm" disabled={saving} onClick={() => handleSaveEdit(link)} style={{ backgroundColor: BRAND_COLOR }}>
                      {saving ? '…' : 'Save'}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </Button>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow key={link.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    /qr/{link.slug}
                  </TableCell>
                  <TableCell>{link.label ?? '—'}</TableCell>
                  <TableCell className="max-w-[200px] truncate text-sm">
                    {link.destination_url}
                  </TableCell>
                  <TableCell className="text-right">{link.scan_count}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => startEdit(link)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={deleting === link.slug}
                      onClick={() => handleDelete(link.slug)}
                    >
                      {deleting === link.slug ? '…' : 'Delete'}
                    </Button>
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Tab 2 — Generator
// ---------------------------------------------------------------------------

function GeneratorTab({ links }: { links: QrLink[] }) {
  const [selectedSlug, setSelectedSlug] = useState<string>('')
  const [customUrl, setCustomUrl] = useState('')
  const [fgColor, setFgColor] = useState(BRAND_COLOR)
  const [size, setSize] = useState(256)

  const svgRef = useRef<SVGSVGElement>(null)

  const qrValue = selectedSlug
    ? (typeof window !== 'undefined' ? window.location.origin : '') + '/qr/' + selectedSlug
    : customUrl

  function handleSlugChange(slug: string) {
    setSelectedSlug(slug)
    if (typeof window !== 'undefined') {
      setCustomUrl(window.location.origin + '/qr/' + slug)
    }
  }

  function downloadPng() {
    // Render QRCodeCanvas into a detached container synchronously via flushSync,
    // which guarantees the canvas is in the DOM before we read it — no setTimeout race.
    const container = document.createElement('div')
    container.style.cssText = 'position:absolute;left:-9999px;top:-9999px;'
    document.body.appendChild(container)

    import('react-dom/client').then(({ createRoot }) => {
      import('react-dom').then(({ flushSync }) => {
        const root = createRoot(container)

        // flushSync forces React to render synchronously before returning
        flushSync(() => {
          root.render(
            React.createElement(QRCodeCanvas, {
              value: qrValue || 'https://panaceutics.com',
              size,
              fgColor,
            }),
          )
        })

        const c = container.querySelector('canvas') as HTMLCanvasElement | null
        if (c) {
          const url = c.toDataURL('image/png')
          const a = document.createElement('a')
          a.href = url
          a.download = `qr-${selectedSlug || 'code'}.png`
          a.click()
        }

        root.unmount()
        document.body.removeChild(container)
      })
    })
  }

  function downloadSvg() {
    if (!svgRef.current) return
    const serializer = new XMLSerializer()
    const svgStr = serializer.serializeToString(svgRef.current)
    const blob = new Blob([svgStr], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `qr-${selectedSlug || 'code'}.svg`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">QR Code Generator</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Controls */}
        <div className="space-y-4 rounded-2xl border bg-white p-4 shadow">
          <div className="space-y-1">
            <Label>Select existing link</Label>
            <Select value={selectedSlug} onValueChange={handleSlugChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a link…" />
              </SelectTrigger>
              <SelectContent>
                {links.map((l) => (
                  <SelectItem key={l.slug} value={l.slug}>
                    {l.label ?? l.slug}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="custom-url">Or enter custom URL</Label>
            <Input
              id="custom-url"
              value={customUrl}
              onChange={(e) => {
                setCustomUrl(e.target.value)
                setSelectedSlug('')
              }}
              placeholder="https://panaceutics.com/qr/slug"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="fg-color">Foreground colour</Label>
            <div className="flex items-center gap-2">
              <input
                id="fg-color"
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="h-9 w-12 cursor-pointer rounded border"
              />
              <span className="font-mono text-sm">{fgColor}</span>
            </div>
          </div>

          <div className="space-y-1">
            <Label>
              Size: <span className="font-mono">{size}px</span>
            </Label>
            <Slider
              min={128}
              max={512}
              step={8}
              value={[size]}
              onValueChange={([v]) => setSize(v)}
              className="mt-2"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              onClick={downloadPng}
              disabled={!qrValue}
              style={{ backgroundColor: BRAND_COLOR }}
            >
              Download PNG
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={downloadSvg}
              disabled={!qrValue}
            >
              Download SVG
            </Button>
          </div>
        </div>

        {/* Preview */}
        <div className="flex items-center justify-center rounded-2xl border bg-white p-6 shadow">
          {qrValue ? (
            <QRCodeSVG
              ref={svgRef}
              value={qrValue}
              size={Math.min(size, 280)}
              fgColor={fgColor}
              bgColor="#ffffff"
              level="M"
            />
          ) : (
            <p className="text-muted-foreground text-sm">
              Select a link or enter a URL to preview
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Tab 3 — Analytics
// ---------------------------------------------------------------------------

function AnalyticsTab({ analytics }: { analytics: AnalyticsData }) {
  const maxScans = Math.max(...analytics.perSlug.map((s) => s.scans), 1)

  const chartData = analytics.perSlug.map((item) => ({
    name: item.label,
    scans: item.scans,
  }))

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Analytics Overview</h2>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="rounded-2xl shadow">
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Links
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold" style={{ color: BRAND_COLOR }}>
              {analytics.totalLinks}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow">
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Scans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold" style={{ color: BRAND_COLOR }}>
              {analytics.totalScans}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow">
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Scans Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold" style={{ color: BRAND_COLOR }}>
              {analytics.scansToday}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Bar chart */}
      <Card className="rounded-2xl shadow">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Scans per Link</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 8, right: 16, bottom: 32, left: 0 }}>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11 }}
                  angle={-35}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="scans" fill={BRAND_COLOR} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Per-slug table with visual bar */}
      <Card className="rounded-2xl shadow overflow-hidden">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Scan Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Link</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="text-right">Scans</TableHead>
                <TableHead className="w-40">Distribution</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {analytics.perSlug.map((item) => (
                <TableRow key={item.slug}>
                  <TableCell className="font-medium">{item.label}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {item.slug}
                  </TableCell>
                  <TableCell className="text-right">{item.scans}</TableCell>
                  <TableCell>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${(item.scans / maxScans) * 100}%`,
                          backgroundColor: BRAND_COLOR,
                        }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {analytics.perSlug.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                    No scan data yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
