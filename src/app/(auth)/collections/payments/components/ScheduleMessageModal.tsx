'use client'

import { type FormEvent, useState } from 'react'
import Button from '@/src/components/Button'
import DateInput from '@/src/components/DateInput'
import Modal from '@/src/components/Modal'
import { getFieldError, useFormValidation } from '@/src/lib/hooks/useFormValidation'
import { emptyScheduleMessageForm } from '../constants/payments'
import { scheduleMessageSchema } from '../constants/validationSchema'
import type { ScheduleMessageForm } from '../types/payments'

interface ScheduleMessageModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (_form: ScheduleMessageForm) => void
}

const ScheduleMessageModal = (props: ScheduleMessageModalProps) => {
  const {
    open,
    onClose,
    onSubmit
  } = props
  const [form, setForm] = useState<ScheduleMessageForm>(emptyScheduleMessageForm)
  const {
    errors,
    validateForm,
    clearErrors
  } = useFormValidation<ScheduleMessageForm>(scheduleMessageSchema)

  const handleClose = () => {
    setForm(emptyScheduleMessageForm)
    clearErrors()
    onClose()
  }

  const handleScheduleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm(form)) return

    onSubmit(form)
    setForm(emptyScheduleMessageForm)
    clearErrors()
  }

  return (
    <Modal
      open={ open }
      title="Schedule Message"
      size="lg"
      onClose={ handleClose }
      footer={ (
        <>
          <Button variant="secondary" appearance="outline" onClick={ handleClose }>
            Cancel
          </Button>
          <Button type="submit" form="schedule-message-form">
            Schedule Message
          </Button>
        </>
      ) }
    >
      <form
        id="schedule-message-form"
        className="grid gap-4"
        onSubmit={ handleScheduleSubmit }
      >
        <DateInput
          name="schedule-date"
          label="Date"
          value={ form.date }
          placeholder="Select date"
          error={ getFieldError(errors, 'date') }
          onChange={ (value) => setForm((current) => ({ ...current, date: value })) }
        />
        <div>
          <label htmlFor="schedule-message" className="mb-1 block text-sm font-medium text-gray-700">
            Message Description
          </label>
          <textarea
            id="schedule-message"
            value={ form.message }
            placeholder="Enter message description"
            aria-invalid={ getFieldError(errors, 'message') ? 'true' : 'false' }
            onChange={ (event) => setForm((current) => ({ ...current, message: event.target.value })) }
            className="min-h-32 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base font-light text-gray-950 outline-none transition-colors placeholder:text-gray-400 focus:border-theme-primary aria-invalid:border-red-500 aria-invalid:focus:border-red-500"
          />
          { getFieldError(errors, 'message') && (
            <p className="mt-1 text-sm text-red-600">{ getFieldError(errors, 'message') }</p>
          ) }
        </div>
      </form>
    </Modal>
  )
}

export default ScheduleMessageModal
