'use client'

import { useState } from 'react'
import PhoneInput from '@/src/components/PhoneInput'

const sizes = ['sm', 'md', 'lg', 'xl'] as const

const Page = () => {
  const [phone, setPhone] = useState('771 234 567')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Phone Input Examples</h1>
        <p className="mt-2 text-gray-600">Phone input sizes, formatting, disabled, read-only, and error states.</p>
      </div>

      <section className="space-y-5 rounded-md border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold">Sizes</h2>
        <div className="grid gap-5 lg:grid-cols-2">
          { sizes.map((size) => (
            <PhoneInput
              key={ size }
              id={ `phone-${size}` }
              label={ `Phone ${size}` }
              value={ phone }
              size={ size }
              onChange={ setPhone }
            />
          )) }
        </div>
      </section>

      <section className="grid gap-5 rounded-md border border-gray-200 bg-white p-5 shadow-sm lg:grid-cols-2">
        <PhoneInput
          id="readonly-phone"
          label="Read only"
          value="112 345 678"
          readOnly
          onChange={ () => undefined }
        />
        <PhoneInput
          id="disabled-phone"
          label="Disabled"
          value="712 000 000"
          disabled
          onChange={ () => undefined }
        />
        <PhoneInput
          id="error-phone"
          label="Required phone"
          value=""
          required
          error="Phone number is required."
          onChange={ () => undefined }
        />
      </section>
    </div>
  )
}

export default Page
