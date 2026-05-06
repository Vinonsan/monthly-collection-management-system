'use client'

import { useState } from 'react'
import DateInput from '@/src/components/DateInput'

const sizes = ['sm', 'md', 'lg', 'xl'] as const
const variants = ['none', 'primary', 'success', 'danger', 'warning', 'info', 'secondary'] as const

const Page = () => {
  const [date, setDate] = useState<Date | null>(new Date(2026, 4, 6))

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Date Input Examples</h1>
        <p className="mt-2 text-gray-600">Date input sizes, variants, disabled, and error states.</p>
      </div>

      <section className="space-y-5 rounded-md border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold">Sizes</h2>
        <div className="grid gap-5 lg:grid-cols-2">
          { sizes.map((size) => (
            <DateInput
              key={ size }
              name={ `date-${size}` }
              label={ `Date ${size}` }
              value={ date }
              size={ size }
              onChange={ setDate }
            />
          )) }
        </div>
      </section>

      <section className="space-y-5 rounded-md border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold">Variants</h2>
        <div className="grid gap-5 lg:grid-cols-2">
          { variants.map((variant) => (
            <DateInput
              key={ variant }
              name={ `date-${variant}` }
              label={ variant }
              defaultValue={ new Date(2026, 4, 6) }
              variant={ variant }
            />
          )) }
        </div>
      </section>

      <section className="grid gap-5 rounded-md border border-gray-200 bg-white p-5 shadow-sm lg:grid-cols-2">
        <DateInput
          name="date-disabled"
          label="Disabled"
          defaultValue={ new Date(2026, 4, 6) }
          disabled
        />

        <DateInput
          name="date-error"
          label="Required date"
          required
          error="Date is required."
        />

        <DateInput
          name="date-range"
          label="Limited range"
          defaultValue={ new Date(2026, 4, 6) }
          minDate={ new Date(2026, 0, 1) }
          maxDate={ new Date(2026, 11, 31) }
        />
      </section>
    </div>
  )
}

export default Page
