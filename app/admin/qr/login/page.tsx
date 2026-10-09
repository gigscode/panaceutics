'use client'

import React, { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const BRAND_COLOR = '#042f2e'

// Separate component so useSearchParams() is inside a Suspense boundary.
function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') ?? '/admin/qr'

  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
        credentials: 'same-origin',
      })

      if (res.ok) {
        router.push(next)
        router.refresh()
      } else {
        setError('Incorrect password. Try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          autoFocus
          required
        />
      </div>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={loading || !password}
        style={{ backgroundColor: BRAND_COLOR }}
      >
        {loading ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  )
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm rounded-2xl shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle
            className="text-xl font-bold text-center"
            style={{ color: BRAND_COLOR }}
          >
            QR Admin Access
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center mt-1">
            Enter the admin password to continue
          </p>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div className="h-24 animate-pulse rounded bg-muted" />}>
            <LoginForm />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
