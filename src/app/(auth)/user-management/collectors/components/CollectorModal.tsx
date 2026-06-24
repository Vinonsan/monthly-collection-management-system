'use client'

import { type FormEvent, useState } from 'react'
import Button from '@/src/components/Button'
import Input from '@/src/components/Input'
import Modal from '@/src/components/Modal'
import Select from '@/src/components/Select'
import { getFieldError, useFormValidation } from '@/src/lib/hooks/useFormValidation'
import { collectorFormStatusOptions, emptyCollectorForm } from '../constants/collectors'
import { collectorSchema } from '../constants/validationSchema'
import type { CollectorForm } from '../types/collectors'

interface CollectorModalProps {
  open: boolean
  isEditing: boolean
  initialForm?: CollectorForm
  onClose: () => void
  onSubmit: (_form: CollectorForm) => void
}

const CollectorModal = (props: CollectorModalProps) => {
  const {
    open,
    isEditing,
    initialForm = emptyCollectorForm,
    onClose,
    onSubmit
  } = props
  const [form, setForm] = useState<CollectorForm>(initialForm)
  const {
    errors,
    validateForm,
    clearErrors
  } = useFormValidation<CollectorForm>(collectorSchema)

  const handleClose = () => {
    setForm(emptyCollectorForm)
    clearErrors()
    onClose()
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm(form)) return

    onSubmit(form)
    setForm(emptyCollectorForm)
    clearErrors()
  }

  return (
    <Modal
      open={ open }
      title={ isEditing ? 'Update Collector' : 'Add Collector' }
      size="md"
      onClose={ handleClose }
      footer={ (
        <>
          <Button type="submit" form="collector-form">
            { isEditing ? 'Update Collector' : 'Add Collector' }
          </Button>
        </>
      ) }
    >
      <form id="collector-form" className="grid gap-4 md:grid-cols-1" onSubmit={ handleSubmit }>
        <Input
          id="collector-name"
          label="Collector Name"
          type="text"
          value={ form.name }
          error={ getFieldError(errors, 'name') }
          onChange={ (value) => setForm((current) => ({ ...current, name: String(value) })) }
        />
        <Input
          id="collector-phone"
          label="Phone"
          type="text"
          value={ form.phone }
          error={ getFieldError(errors, 'phone') }
          onChange={ (value) => setForm((current) => ({ ...current, phone: String(value) })) }
        />
        <Select
          label="Status"
          options={ collectorFormStatusOptions }
          labelKey="name"
          valueKey="id"
          value={ form.status }
          error={ getFieldError(errors, 'status') }
          onChange={ (value) => setForm((current) => ({
            ...current,
            status: value === 'Inactive' ? 'Inactive' : 'Active'
          })) }
          position="bottom"
        />
      </form>
    </Modal>
  )
}

export default CollectorModal
