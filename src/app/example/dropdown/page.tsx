'use client'

import { useState } from 'react'
import DropDown, { type DropDownItem } from '@/src/components/DropDown'

const items: DropDownItem[] = [
  { label: 'View details', value: 'view' },
  { label: 'Mark as paid', value: 'paid' },
  { label: 'Export record', value: 'export' },
  { label: 'Delete disabled', value: 'delete', disabled: true }
]

const variants = ['primary', 'success', 'danger', 'warning', 'info', 'secondary'] as const
const sizes = ['sm', 'md', 'lg'] as const

const Page = () => {
  const [selectedAction, setSelectedAction] = useState('No action selected')

  const handleSelect = (item: DropDownItem) => {
    setSelectedAction(item.label)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">DropDown Examples</h1>
        <p className="mt-2 text-gray-600">Dropdown variants, sizes, disabled items, and selection action.</p>
      </div>

      <section className="space-y-4 rounded-md border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold">Variants</h2>
        <div className="flex flex-wrap items-center gap-3">
          { variants.map((variant) => (
            <DropDown
              key={ variant }
              label={ variant }
              items={ items }
              variant={ variant }
              onSelect={ handleSelect }
            />
          )) }
        </div>
        <p className="text-sm text-gray-600">Selected: { selectedAction }</p>
      </section>

      <section className="space-y-4 rounded-md border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold">Sizes</h2>
        <div className="flex flex-wrap items-center gap-3">
          { sizes.map((size) => (
            <DropDown
              key={ size }
              label={ size }
              items={ items }
              size={ size }
              variant="secondary"
              onSelect={ handleSelect }
            />
          )) }
          <DropDown label="disabled" items={ items } disabled />
        </div>
      </section>
    </div>
  )
}

export default Page
