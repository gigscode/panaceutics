import { type NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Let the login page and its auth API through unconditionally
  if (pathname === '/admin/qr/login' || pathname === '/api/admin/auth') {
    return NextResponse.next()
  }

  // Guard: /admin/qr (and subpaths) + /api/admin/qr
  const isAdminPage = pathname.startsWith('/admin/qr')
  const isAdminApi  = pathname.startsWith('/api/admin/qr')

  if (isAdminPage || isAdminApi) {
    const sessionCookie = request.cookies.get('admin_session')?.value
    const secret = process.env.ADMIN_SECRET

    if (!secret || sessionCookie !== secret) {
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
