import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Component Playground',
  description: 'Component examples and playground'
}

export default function Page() {
  const examples = [
    {
      name: 'Badges',
      href: '/example/badge',
      description: 'Preview badge variants, appearances, and sizes.'
    },
    {
      name: 'Buttons',
      href: '/example/button',
      description: 'Preview button colors, appearances, states, and sizes.'
    },
    {
      name: 'Inputs',
      href: '/example/input',
      description: 'Preview input sizes, types, disabled, read-only, and error states.'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Component Playground</h1>
        <p className="mt-2 text-gray-600">Select a component from the sidebar or open one below.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        { examples.map((example) => (
          <Link
            key={ example.href }
            href={ example.href }
            className="rounded-md border border-gray-200 bg-white p-5 shadow-sm transition-colors hover:border-blue-300 hover:bg-blue-50"
          >
            <h2 className="text-lg font-semibold text-gray-950">{ example.name }</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">{ example.description }</p>
          </Link>
        )) }
      </div>
    </div>
  )
}
