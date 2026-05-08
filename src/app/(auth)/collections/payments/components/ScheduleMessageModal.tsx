'use client'

import Button from '@/src/components/Button'
import DateInput from '@/src/components/DateInput'
import Modal from '@/src/components/Modal'
import type { ScheduleMessageForm } from '../types/payments'

interface ScheduleMessageModalProps {
  open: boolean
  form: ScheduleMessageForm
  onClose: () => void
  onSubmit: () => void
  onFormChange: (_form: ScheduleMessageForm) => void
}

const ScheduleMessageModal = (props: ScheduleMessageModalProps) => {
  const {
    open,
    form,
    onClose,
    onSubmit,
    onFormChange
  } = props

  return (
    <Modal
      open={ open }
      title="Schedule Message"
      size="lg"
      onClose={ onClose }
      footer={ (
        <>
          <Button variant="secondary" appearance="outline" onClick={ onClose }>
            Cancel
          </Button>
          <Button onClick={ onSubmit }>
            Schedule Message
          </Button>
        </>
      ) }
    >
      <div className="grid gap-4">
        <DateInput
          label="Date"
          value={ form.date }
          placeholder="Select date"
          onChange={ (value) => onFormChange({ ...form, date: value }) }
        />
        <div>
          <label htmlFor="schedule-message" className="mb-1 block text-sm font-medium text-gray-700">
            Message Description
          </label>
          <textarea
            id="schedule-message"
            value={ form.message }
            placeholder="Enter message description"
            onChange={ (event) => onFormChange({ ...form, message: event.target.value }) }
            className="min-h-32 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base font-light text-gray-950 outline-none transition-colors placeholder:text-gray-400 focus:border-theme-primary"
          />
        </div>
      </div>
    </Modal>
  )
}

export default ScheduleMessageModal
