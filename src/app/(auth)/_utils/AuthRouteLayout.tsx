'use client'

import { ReactNode, useEffect, useSyncExternalStore } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { authCookieName } from '@/src/app/_utils/authDevConfig'
import LayoutChildren from './LayoutChildren'

interface AuthRouteLayoutProps {
  children: ReactNode
}

const plainAuthRoutes = ['/login', '/verify-otp', '/forgot-password']

const subscribeToAuthCookie = () => () => undefined

const getAuthCookieSnapshot = () => document.cookie
  .split(';')
  .some((cookie) => cookie.trim().startsWith(`${authCookieName}=`))

const getServerAuthSnapshot = () => false

const AuthRouteLayout = (props: AuthRouteLayoutProps) => {
  const { children } = props
  const pathname = usePathname()
  const router = useRouter()
  const isPlainAuthRoute = plainAuthRoutes.includes(pathname)
  const isAuthenticated = useSyncExternalStore(
    subscribeToAuthCookie,
    getAuthCookieSnapshot,
    getServerAuthSnapshot
  )

  useEffect(() => {
    if (!isPlainAuthRoute && !isAuthenticated) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`)
    }
  }, [isAuthenticated, isPlainAuthRoute, pathname, router])

  if (isPlainAuthRoute) {
    return <>{ children }</>
  }

  if (!isAuthenticated) {
    return null
  }

  return <LayoutChildren>{ children }</LayoutChildren>
}

export default AuthRouteLayout
