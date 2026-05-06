'use client'

import { useState } from 'react'
import Input from '@/src/components/Input'

const sizes = ['sm', 'md', 'lg', 'xl'] as const

const Page = () => {
  const [textValue, setTextValue] = useState('Monthly collection')
  const [amountValue, setAmountValue] = useState<string | number>(2500)
  const [emailValue, setEmailValue] = useState('admin@example.com')
  const [passwordValue, setPasswordValue] = useState('secret123')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Input Examples</h1>
        <p className="mt-2 text-gray-600">All input sizes, common types, and field states.</p>
      </div>

      <section className="space-y-5 rounded-md border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold">Sizes</h2>

        <div className="grid gap-5 lg:grid-cols-2">
          { sizes.map((size) => (
            <Input
              key={ size }
              id={ `input-${size}` }
              label={ `Text input ${size}` }
              type="text"
              value={ textValue }
              placeholder="Enter collection name"
              size={ size }
              onChange={ (value) => setTextValue(String(value)) }
            />
          )) }
        </div>
      </section>

      <section className="space-y-5 rounded-md border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold">Types and States</h2>

        <div className="grid gap-5 lg:grid-cols-2">
          <Input
            id="amount"
            label="Amount"
            type="number"
            value={ amountValue }
            min={ 0 }
            max={ 100000 }
            onChange={ setAmountValue }
          />

          <Input
            id="email"
            label="Email"
            type="email"
            value={ emailValue }
            onChange={ (value) => setEmailValue(String(value)) }
          />

          <Input
            id="password"
            label="Password"
            type="password"
            value={ passwordValue }
            onChange={ (value) => setPasswordValue(String(value)) }
          />

          <Input
            id="readonly"
            label="Read only"
            type="text"
            value="Ward A"
            readOnly
            onChange={ () => undefined }
          />

          <Input
            id="disabled"
            label="Disabled"
            type="text"
            value="Disabled input"
            disabled
            onChange={ () => undefined }
          />

          <Input
            id="error"
            label="Required field"
            type="text"
            value=""
            placeholder="Missing value"
            required
            error="This field is required."
            onChange={ () => undefined }
          />
        </div>
      </section>
    </div>
  )
}

export default Page
