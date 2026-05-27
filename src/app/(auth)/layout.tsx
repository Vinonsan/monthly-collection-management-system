import { ReactNode } from 'react'
import AuthRouteLayout from './_utils/AuthRouteLayout'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <AuthRouteLayout>{ children }</AuthRouteLayout>
}
