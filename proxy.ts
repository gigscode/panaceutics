import { type NextRequest, NextResponse } from 'next/server'

/**
 * Proxy — protects /admin/qr and /api/admin/qr from unauthenticated access.
 *
 * The admin_session cookie is set by POST /api/admin/auth after the user
 * submits the correct ADMIN_SECRET password on the login page.
 * ADMIN_SECRET is server-side only and never exposed to the browser bundle.
 *
 * Note: In Next.js 16, this file is named proxy.ts and exports `proxy`.
 * The `middleware` export name is deprecated.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Let the login page and its auth API through unconditionally
  if (pathname === '/admin/qr/login' || pathname === '/api/admin/auth') {
    return NextResponse.next()
  }

  // Guard: /admin/qr (and subpaths) + /api/admin/qr
  const isAdminPage = pathname.startsWith('/admin/qr')
  const isAdminApi = pathname.startsWith('/api/admin/qr')

  if (isAdminPage || isAdminApi) {
    const sessionCookie = request.cookies.get('admin_session')?.value
    const secret = process.env.ADMIN_SECRET

    if (!secret || sessionCookie !== secret) {
      // API callers get 401; page visitors get redirected to login
      if (isAdminApi) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      const loginUrl = new URL('/admin/qr/login', request.url)
      loginUrl.searchParams.set('next', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/qr/:path*', '/api/admin/qr/:path*'],
}
