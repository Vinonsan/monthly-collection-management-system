'use client'

import { useState } from 'react'
import Select from '@/src/components/Select'

const wardOptions = [
  { id: 1, name: 'Ward A', collector: 'Nimal' },
  { id: 2, name: 'Ward B', collector: 'Kamal' },
  { id: 3, name: 'Ward C', collector: 'Saman' },
  { id: 4, name: 'Ward D', collector: 'Ruwan' }
]

const Page = () => {
  const [ward, setWard] = useState<string | number | (string | number)[] | null>(1)
  const [wards, setWards] = useState<string | number | (string | number)[] | null>([1, 3])
  const [status, setStatus] = useState<string | number | (string | number)[] | null>(null)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Select Examples</h1>
        <p className="mt-2 text-gray-600">Single, multiple, searchable, disabled, and error states.</p>
      </div>

      <section className="grid gap-5 rounded-md border border-gray-200 bg-white p-5 shadow-sm lg:grid-cols-2">
        <Select
          label="Ward"
          options={ wardOptions }
          labelKey="name"
          valueKey="id"
          value={ ward }
          onChange={ setWard }
          placeholder="Select ward"
        />

        <Select
          label="Searchable ward"
          options={ wardOptions }
          labelKey="name"
          valueKey="id"
          searchKey={ ['name', 'collector'] }
          value={ status }
          onChange={ setStatus }
          placeholder="Search ward"
          searchable
        />

        <Select
          label="Multiple wards"
          options={ wardOptions }
          labelKey="name"
          valueKey="id"
          value={ wards }
          onChange={ setWards }
          placeholder="Select wards"
          isMultiple
          searchable
        />

        <Select
          label="Disabled"
          options={ wardOptions }
          labelKey="name"
          valueKey="id"
          value={ 2 }
          disabled
        />

        <Select
          label="Required select"
          options={ wardOptions }
          labelKey="name"
          valueKey="id"
          placeholder="Select one"
          required
          error="Please select a ward."
        />
      </section>
    </div>
  )
}

export default Page
