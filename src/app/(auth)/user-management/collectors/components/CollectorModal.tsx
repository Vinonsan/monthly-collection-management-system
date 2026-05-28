'use client'

import Button from '@/src/components/Button'
import Input from '@/src/components/Input'
import Modal from '@/src/components/Modal'
import Select from '@/src/components/Select'
import type { CollectorForm } from '../types/collectors'

interface CollectorModalProps {
  open: boolean
  editingCollectorId: number | null
  form: CollectorForm
  onClose: () => void
  onSubmit: () => void
  onFormChange: (_form: CollectorForm) => void
}

const statusOptions = [
  { id: 'Active', name: 'Active' },
  { id: 'Inactive', name: 'Inactive' }
]

const CollectorModal = (props: CollectorModalProps) => {
  const {
    open,
    editingCollectorId,
    form,
    onClose,
    onSubmit,
    onFormChange
  } = props

  return (
    <Modal
      open={ open }
      title={ editingCollectorId ? 'Update Collector' : 'Add Collector' }
      size="lg"
      onClose={ onClose }
      footer={ (
        <>
          <Button variant="secondary" appearance="outline" onClick={ onClose }>
            Cancel
          </Button>
          <Button onClick={ onSubmit }>
            { editingCollectorId ? 'Update Collector' : 'Add Collector' }
          </Button>
        </>
      ) }
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Input id="collector-no" label="Collector No" type="text" value={ form.collectorNo } onChange={ (value) => onFormChange({ ...form, collectorNo: String(value) }) } />
        <Input id="collector-name" label="Collector Name" type="text" value={ form.name } onChange={ (value) => onFormChange({ ...form, name: String(value) }) } />
        <Input id="collector-phone" label="Phone" type="text" value={ form.phone } onChange={ (value) => onFormChange({ ...form, phone: String(value) }) } />
        <Input id="assigned-area" label="Assigned Area" type="text" value={ form.assignedArea } onChange={ (value) => onFormChange({ ...form, assignedArea: String(value) }) } />
        <Select
          label="Status"
          options={ statusOptions }
          labelKey="name"
          valueKey="id"
          value={ form.status }
          onChange={ (value) => onFormChange({ ...form, status: value === 'Inactive' ? 'Inactive' : 'Active' }) }
          position="bottom"
        />
      </div>
    </Modal>
  )
}

export default CollectorModal
