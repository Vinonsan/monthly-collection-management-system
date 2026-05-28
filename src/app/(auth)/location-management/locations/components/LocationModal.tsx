'use client'

import Button from '@/src/components/Button'
import Input from '@/src/components/Input'
import Modal from '@/src/components/Modal'
import Select from '@/src/components/Select'
import type { LocationForm } from '../types/locations'

interface LocationModalProps {
  open: boolean
  editingLocationId: number | null
  form: LocationForm
  collectorOptions: { id: string; name: string }[]
  onClose: () => void
  onSubmit: () => void
  onFormChange: (_form: LocationForm) => void
}

const statusOptions = [
  { id: 'Active', name: 'Active' },
  { id: 'Inactive', name: 'Inactive' }
]

const LocationModal = (props: LocationModalProps) => {
  const {
    open,
    editingLocationId,
    form,
    collectorOptions,
    onClose,
    onSubmit,
    onFormChange
  } = props

  return (
    <Modal
      open={ open }
      title={ editingLocationId ? 'Update Location' : 'Add Location' }
      size="lg"
      onClose={ onClose }
      footer={ (
        <>
          <Button variant="secondary" appearance="outline" onClick={ onClose }>
            Cancel
          </Button>
          <Button onClick={ onSubmit }>
            { editingLocationId ? 'Update Location' : 'Add Location' }
          </Button>
        </>
      ) }
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Input id="location-code" label="Location Code" type="text" value={ form.locationCode } onChange={ (value) => onFormChange({ ...form, locationCode: String(value) }) } />
        <Input id="location-name" label="Location Name" type="text" value={ form.locationName } onChange={ (value) => onFormChange({ ...form, locationName: String(value) }) } />
        <Input id="location-address" label="Address" type="text" value={ form.address } onChange={ (value) => onFormChange({ ...form, address: String(value) }) } />
        <Select
          label="Collector"
          options={ collectorOptions }
          labelKey="name"
          valueKey="id"
          value={ form.collector }
          onChange={ (value) => onFormChange({ ...form, collector: String(value || '') }) }
          placeholder="Select collector"
          searchable
          position="bottom"
        />
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

export default LocationModal
