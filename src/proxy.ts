import { NextResponse, type NextRequest } from 'next/server'

const publicRoutes = ['/login', '/forgot-password']
const authCookieName = 'monthly_collection_session'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isPublicRoute = publicRoutes.includes(pathname)
  const isAuthenticated = Boolean(request.cookies.get(authCookieName)?.value)

  if (!isAuthenticated && !isPublicRoute) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/login'
    loginUrl.searchParams.set('redirect', pathname)

    return NextResponse.redirect(loginUrl)
  }

  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/collections/:path*',
    '/users/:path*',
    '/wards/:path*',
    '/login',
    '/forgot-password'
  ]
}
