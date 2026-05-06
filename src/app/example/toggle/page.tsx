'use client'

import { useState } from 'react'
import Toggle from '@/src/components/Toggle'

const variants = ['primary', 'success', 'danger', 'warning', 'info', 'secondary', 'none'] as const
const sizes = ['sm', 'md', 'lg', 'xl'] as const
const appearances = ['solid', 'outline'] as const

const Page = () => {
  const [checked, setChecked] = useState(true)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Toggle Examples</h1>
        <p className="mt-2 text-gray-600">All toggle colors, appearances, sizes, and disabled state.</p>
      </div>

      { appearances.map((appearance) => (
        <section
          key={ appearance }
          className="space-y-4 rounded-md border border-gray-200 bg-white p-5 shadow-sm"
        >
          <h2 className="text-xl font-semibold capitalize">{ appearance } toggles</h2>
          <div className="flex flex-wrap items-center gap-5">
            { variants.map((variant) => (
              <Toggle
                key={ `${appearance}-${variant}` }
                _checked={ checked }
                onChange={ setChecked }
                variant={ variant }
                appearance={ appearance }
                label={ variant }
              />
            )) }
          </div>
        </section>
      )) }

      <section className="space-y-4 rounded-md border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold">Sizes</h2>
        <div className="flex flex-wrap items-center gap-5">
          { sizes.map((size) => (
            <Toggle
              key={ size }
              _checked={ checked }
              onChange={ setChecked }
              size={ size }
              variant="primary"
              label={ size }
            />
          )) }
          <Toggle _checked disabled onChange={ setChecked } label="disabled" />
        </div>
      </section>
    </div>
  )
}

export default Page
