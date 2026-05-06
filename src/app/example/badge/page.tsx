'use client'

import Badge from '@/src/components/Badge'

const variants = ['primary', 'success', 'danger', 'warning', 'info', 'secondary'] as const

const sizes = ['xs', 'sm', 'md', 'lg'] as const
const appearances = ['solid', 'outline'] as const

const Page = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Badge Examples</h1>
        <p className="mt-2 text-gray-600">All badge colors, appearances, and sizes.</p>
      </div>

      { appearances.map((appearance) => (
        <div key={ appearance } className="space-y-6 rounded-md border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold capitalize">{ appearance } badges</h2>

          { sizes.map((size) => (
            <div key={ size } className="space-y-3">
              <h3 className="text-sm font-medium text-gray-500 uppercase">Size: { size }</h3>

              <div className="flex flex-wrap gap-3">
                { variants.map((variant) => (
                  <Badge
                    key={ `${appearance}-${size}-${variant}` }
                    size={ size }
                    variant={ variant }
                    appearance={ appearance }
                  >
                    { variant }
                  </Badge>
                )) }
              </div>
            </div>
          )) }
        </div>
      )) }
    </div>
  )
}

export default Page
