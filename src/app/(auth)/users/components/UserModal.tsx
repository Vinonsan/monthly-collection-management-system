'use client'

import Button from '@/src/components/Button'
import Input from '@/src/components/Input'
import Modal from '@/src/components/Modal'
import Select from '@/src/components/Select'
import type { UserForm } from '../types/users'

interface UserModalProps {
  open: boolean
  editingUserId: number | null
  form: UserForm
  wardOptions: Array<{ id: string; name: string }>
  onClose: () => void
  onSubmit: () => void
  onFormChange: (_form: UserForm) => void
}

const UserModal = (props: UserModalProps) => {
  const {
    open,
    editingUserId,
    form,
    wardOptions,
    onClose,
    onSubmit,
    onFormChange
  } = props

  return (
    <Modal
      open={ open }
      title={ editingUserId ? 'Update User' : 'Add User' }
      size="lg"
      onClose={ onClose }
      footer={ (
        <>
          <Button variant="secondary" appearance="outline" onClick={ onClose }>
            Cancel
          </Button>
          <Button onClick={ onSubmit }>
            { editingUserId ? 'Update User' : 'Add User' }
          </Button>
        </>
      ) }
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Input id="card-no" label="Card No" type="text" value={ form.cardNo } onChange={ (value) => onFormChange({ ...form, cardNo: String(value) }) } />
        <Input id="user-name" label="User Name" type="text" value={ form.name } onChange={ (value) => onFormChange({ ...form, name: String(value) }) } />
        <Select label="Ward No" options={ wardOptions } labelKey="name" valueKey="id" value={ form.wardNo } onChange={ (value) => onFormChange({ ...form, wardNo: String(value || '') }) } />
        <Input id="phone" label="Phone" type="text" value={ form.phone } onChange={ (value) => onFormChange({ ...form, phone: String(value) }) } />
        <Input id="address" label="Address" type="text" value={ form.address } onChange={ (value) => onFormChange({ ...form, address: String(value) }) } />
        <Input id="balance" label="Balance" type="number" value={ form.balance } min={ 0 } onChange={ (value) => onFormChange({ ...form, balance: Number(value || 0) }) } />
      </div>
    </Modal>
  )
}

export default UserModal
