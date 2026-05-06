'use client'

import React, { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type SidebarLink = {
  name: string
  href: string
}

const SIDEBAR_LINKS: SidebarLink[] = [
  { name: 'Badges', href: '/example/badge' },
  { name: 'Buttons', href: '/example/button' },
  { name: 'Inputs', href: '/example/input' }
]

export default function ExamplesLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-950">
      <aside className="w-64 shrink-0 border-r border-gray-200 bg-white shadow-sm">
        <div className="border-b px-6 py-5">
          <h1 className="text-lg font-semibold tracking-tight">UI Components</h1>
          <p className="mt-1 text-xs text-gray-500">Design system</p>
        </div>

        <nav className="px-3 py-4">
          <p className="mb-2 px-3 text-xs font-medium tracking-wide text-gray-400 uppercase">
            Components
          </p>

          <ul className="flex flex-col gap-1">
            { SIDEBAR_LINKS.map((link) => {
              const isActive = pathname === link.href

              return (
                <li key={ link.href }>
                  <Link
                    href={ link.href }
                    className={ [
                      'group flex items-center rounded-md px-3 py-2 text-sm transition-all',
                      isActive
                        ? 'bg-blue-50 font-medium text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    ].join(' ') }
                  >
                    <span
                      className={ [
                        'mr-3 h-2 w-2 rounded-full transition-opacity',
                        isActive
                          ? 'bg-blue-500 opacity-100'
                          : 'bg-gray-300 opacity-0 group-hover:opacity-100'
                      ].join(' ') }
                    />

                    { link.name }
                  </Link>
                </li>
              )
            }) }
          </ul>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">{ children }</main>
    </div>
  )
}
