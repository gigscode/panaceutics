"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import type { StorePreferences } from "@/lib/types"

export default function SettingsPage() {
  const [settings, setSettings] = useState<StorePreferences | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/store-preferences")
        if (!response.ok) throw new Error("Failed to fetch settings")
        const data = await response.json()
        setSettings(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!settings) return
    const { name, value } = e.target
    setSettings((prev) => (prev ? { ...prev, [name]: value } : null))
  }

  const handleSave = async () => {
    if (!settings) return

    setSaving(true)
    try {
      const response = await fetch("/api/store-preferences", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })
      if (!response.ok) throw new Error("Failed to save settings")
      alert("Settings saved successfully!")
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save settings")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!settings) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-destructive">{error || "Failed to load settings"}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage store preferences and configuration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Store Information</CardTitle>
            <CardDescription>Basic store details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Store Name</label>
              <input
                type="text"
                name="storeName"
                value={settings.storeName || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={settings.email || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={settings.phone || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={settings.address || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Business Settings</CardTitle>
            <CardDescription>Financial and operational settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Currency</label>
              <select
                name="currency"
                value={settings.currency || "USD"}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
                <option>CAD</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Tax Rate (%)</label>
              <input
                type="number"
                name="taxRate"
                value={settings.taxRate || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="pt-4">
              <Button
                onClick={handleSave}
                disabled={saving}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Save Settings"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
