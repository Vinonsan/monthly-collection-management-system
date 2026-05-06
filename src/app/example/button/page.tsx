'use client'

import Button, {
  type ButtonAppearance,
  type ButtonSize,
  type ButtonVariant
} from '@/src/components/Button'

const variants: ButtonVariant[] = [
  'primary',
  'success',
  'danger',
  'warning',
  'info',
  'secondary'
]
const appearances: ButtonAppearance[] = ['solid', 'outline', 'ghost']
const sizes: ButtonSize[] = ['sm', 'md', 'lg', 'xl']

const Page = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Button Examples</h1>
        <p className="mt-2 text-gray-600">All button colors, appearances, sizes, and disabled state.</p>
      </div>

      { appearances.map((appearance) => (
        <section
          key={ appearance }
          className="space-y-4 rounded-md border border-gray-200 bg-white p-5 shadow-sm"
        >
          <h2 className="text-xl font-semibold capitalize">{ appearance } buttons</h2>

          <div className="flex flex-wrap items-center gap-3">
            { variants.map((variant) => (
              <Button key={ `${appearance}-${variant}` } variant={ variant } appearance={ appearance }>
                { variant }
              </Button>
            )) }
          </div>
        </section>
      )) }

      <section className="space-y-4 rounded-md border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold">Sizes</h2>

        <div className="flex flex-wrap items-center gap-3">
          { sizes.map((size) => (
            <Button key={ size } size={ size }>
              { size }
            </Button>
          )) }
          <Button disabled>disabled</Button>
        </div>
      </section>
    </div>
  )
}

export default Page
