'use client'

import { useState } from 'react'
import Button from '@/src/components/Button'
import Modal from '@/src/components/Modal'

const sizes = ['sm', 'md', 'lg', 'xl'] as const

const Page = () => {
  const [openSize, setOpenSize] = useState<(typeof sizes)[number] | null>(null)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Modal Examples</h1>
        <p className="mt-2 text-gray-600">Modal sizes with header, content, footer, overlay, and Escape close.</p>
      </div>

      <section className="space-y-4 rounded-md border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold">Sizes</h2>
        <div className="flex flex-wrap gap-3">
          { sizes.map((size) => (
            <Button key={ size } onClick={ () => setOpenSize(size) }>
              Open { size }
            </Button>
          )) }
        </div>
      </section>

      <Modal
        open={ openSize !== null }
        size={ openSize ?? 'md' }
        title={ `Collection Details ${openSize ? `(${openSize})` : ''}` }
        onClose={ () => setOpenSize(null) }
        footer={
          <>
            <Button variant="secondary" appearance="outline" onClick={ () => setOpenSize(null) }>
              Cancel
            </Button>
            <Button onClick={ () => setOpenSize(null) }>Save</Button>
          </>
        }
      >
        <p>
          This modal can show collection notes, payment confirmations, user card details, or
          ward-based record actions.
        </p>
      </Modal>
    </div>
  )
}

export default Page
