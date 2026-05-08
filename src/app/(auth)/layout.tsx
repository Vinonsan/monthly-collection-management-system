import { ReactNode } from 'react'
import LayoutChildren from './_utils/LayoutChildren'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <LayoutChildren>{ children }</LayoutChildren>
}
