import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/admin/auth
 * Accepts { password } in JSON body.
 * Checks against ADMIN_SECRET (server-side env var — never exposed to the client).
 * On success, sets an HttpOnly admin_session cookie and returns 200.
 * On failure, returns 401.
 *
 * DELETE /api/admin/auth — clears the session cookie (logout).
 */

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  const password = body?.password as string | undefined

  const secret = process.env.ADMIN_SECRET

  if (!secret) {
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
  }

  if (!password || password !== secret) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  // HttpOnly so JS cannot read the cookie; SameSite=Strict prevents CSRF
  response.cookies.set('admin_session', secret, {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    // 8-hour session — adjust as needed
    maxAge: 60 * 60 * 8,
    // secure: true in production (HTTPS); Next.js sets this automatically on Vercel
    secure: process.env.NODE_ENV === 'production',
  })

  return response
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  response.cookies.delete('admin_session')
  return response
}
