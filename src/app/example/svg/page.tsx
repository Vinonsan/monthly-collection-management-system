import SVG, { type IconType } from '@/src/components/Svg'

const icons: IconType[] = [
  'sort-asc',
  'sort-desc',
  'date-picker',
  'curved-arrow',
  'chevron-down',
  'search',
  'close'
]

const Page = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">SVG Icon Examples</h1>
        <p className="mt-2 text-gray-600">Reusable SVG icon types with different sizes.</p>
      </div>

      <section className="grid gap-4 rounded-md border border-gray-200 bg-white p-5 shadow-sm md:grid-cols-2 xl:grid-cols-4">
        { icons.map((icon) => (
          <div
            key={ icon }
            className="flex min-h-32 flex-col items-center justify-center gap-3 rounded-md border border-gray-200 bg-gray-50 p-4"
          >
            <SVG type={ icon } className="text-theme-primary" width={ icon === 'curved-arrow' ? 96 : 32 } height={ icon === 'curved-arrow' ? 60 : 32 } />
            <span className="text-sm font-medium text-gray-700">{ icon }</span>
          </div>
        )) }
      </section>
    </div>
  )
}

export default Page
