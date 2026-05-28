'use client'

import { type FormEvent, useState } from 'react'
import Button from '@/src/components/Button'
import Input from '@/src/components/Input'
import Modal from '@/src/components/Modal'
import Select from '@/src/components/Select'
import { getFieldError, useFormValidation } from '@/src/lib/hooks/useFormValidation'
import { emptyUserForm } from '../constants/users'
import { userSchema } from '../constants/validationSchema'
import type { UserForm } from '../types/users'

interface UserModalProps {
  open: boolean
  editingUserId: number | null
  initialForm?: UserForm
  wardOptions: Array<{ id: string; name: string }>
  onClose: () => void
  onSubmit: (_form: UserForm) => void
}

const UserModal = (props: UserModalProps) => {
  const {
    open,
    editingUserId,
    initialForm = emptyUserForm,
    wardOptions,
    onClose,
    onSubmit
  } = props
  const [form, setForm] = useState<UserForm>(initialForm)
  const {
    errors,
    validateForm,
    clearErrors
  } = useFormValidation<UserForm>(userSchema)

  const handleClose = () => {
    setForm(emptyUserForm)
    clearErrors()
    onClose()
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm(form)) return

    onSubmit(form)
    setForm(emptyUserForm)
    clearErrors()
  }

  return (
    <Modal
      open={ open }
      title={ editingUserId ? 'Update User' : 'Add User' }
      size="lg"
      onClose={ handleClose }
      footer={ (
        <>
          <Button variant="secondary" appearance="outline" onClick={ handleClose }>
            Cancel
          </Button>
          <Button type="submit" form="user-form">
            { editingUserId ? 'Update User' : 'Add User' }
          </Button>
        </>
      ) }
    >
      <form id="user-form" className="grid gap-4 md:grid-cols-2" onSubmit={ handleSubmit }>
        <Input
          id="card-no"
          label="Card No"
          type="text"
          value={ form.cardNo }
          error={ getFieldError(errors, 'cardNo') }
          onChange={ (value) => setForm((current) => ({ ...current, cardNo: String(value) })) }
        />
        <Input
          id="user-name"
          label="User Name"
          type="text"
          value={ form.name }
          error={ getFieldError(errors, 'name') }
          onChange={ (value) => setForm((current) => ({ ...current, name: String(value) })) }
        />
        <Select
          label="Ward No"
          options={ wardOptions }
          labelKey="name"
          valueKey="id"
          value={ form.wardNo }
          error={ getFieldError(errors, 'wardNo') }
          onChange={ (value) => setForm((current) => ({ ...current, wardNo: String(value || '') })) }
          position="bottom"
        />
        <Input
          id="phone"
          label="Phone"
          type="text"
          value={ form.phone }
          error={ getFieldError(errors, 'phone') }
          onChange={ (value) => setForm((current) => ({ ...current, phone: String(value) })) }
        />
        <Input
          id="address"
          label="Address"
          type="text"
          value={ form.address }
          error={ getFieldError(errors, 'address') }
          onChange={ (value) => setForm((current) => ({ ...current, address: String(value) })) }
        />
        <Input
          id="balance"
          label="Balance"
          type="number"
          value={ form.balance }
          min={ 0 }
          error={ getFieldError(errors, 'balance') }
          onChange={ (value) => setForm((current) => ({ ...current, balance: Number(value || 0) })) }
        />
      </form>
    </Modal>
  )
}

export default UserModal
