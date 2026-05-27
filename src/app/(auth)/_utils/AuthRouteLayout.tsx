'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import LayoutChildren from './LayoutChildren'

interface AuthRouteLayoutProps {
  children: ReactNode
}

const plainAuthRoutes = ['/login', '/forgot-password']

const AuthRouteLayout = (props: AuthRouteLayoutProps) => {
  const { children } = props
  const pathname = usePathname()

  if (plainAuthRoutes.includes(pathname)) {
    return <>{ children }</>
  }

  return <LayoutChildren>{ children }</LayoutChildren>
}

export default AuthRouteLayout
