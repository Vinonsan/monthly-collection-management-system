'use client'

import { type FormEvent, useState } from 'react'
import Button from '@/src/components/Button'
import Input from '@/src/components/Input'
import Modal from '@/src/components/Modal'
import { getFieldError, useFormValidation } from '@/src/lib/hooks/useFormValidation'
import { emptyLocationForm } from '../constants/locations'
import { locationSchema } from '../constants/validationSchema'
import type { LocationForm } from '../types/locations'

interface LocationModalProps {
  open: boolean
  isEditing: boolean
  initialForm?: LocationForm
  onClose: () => void
  onSubmit: (_form: LocationForm) => void
}

const LocationModal = (props: LocationModalProps) => {
  const {
    open,
    isEditing,
    initialForm = emptyLocationForm,
    onClose,
    onSubmit
  } = props
  const [form, setForm] = useState<LocationForm>(initialForm)
  const {
    errors,
    validateForm,
    clearErrors
  } = useFormValidation<LocationForm>(locationSchema)

  const handleClose = () => {
    setForm(emptyLocationForm)
    clearErrors()
    onClose()
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm(form)) return

    onSubmit(form)
    setForm(emptyLocationForm)
    clearErrors()
  }

  return (
    <Modal
      open={ open }
      title={ isEditing ? 'Update Location' : 'Add Location' }
      size="md"
      onClose={ handleClose }
      footer={ (
        <Button type="submit" form="location-form">
          { isEditing ? 'Update Location' : 'Add Location' }
        </Button>
      ) }
    >
      <form id="location-form" className="grid gap-4" onSubmit={ handleSubmit }>
        <Input
          id="location-name"
          label="Location Name"
          type="text"
          value={ form.locationName }
          error={ getFieldError(errors, 'locationName') }
          onChange={ (value) => setForm((current) => ({ ...current, locationName: String(value) })) }
        />
      </form>
    </Modal>
  )
}

export default LocationModal
