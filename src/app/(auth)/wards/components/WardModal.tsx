'use client'

import Button from '@/src/components/Button'
import Input from '@/src/components/Input'
import Modal from '@/src/components/Modal'
import type { WardForm } from '../types/wards'

interface WardModalProps {
  open: boolean
  editingWardId: number | null
  form: WardForm
  onClose: () => void
  onSubmit: () => void
  onFormChange: (_form: WardForm) => void
}

const WardModal = (props: WardModalProps) => {
  const {
    open,
    editingWardId,
    form,
    onClose,
    onSubmit,
    onFormChange
  } = props

  return (
    <Modal
      open={ open }
      title={ editingWardId ? 'Update Ward' : 'Add Ward' }
      size="lg"
      onClose={ onClose }
      footer={ (
        <>
          <Button variant="secondary" appearance="outline" onClick={ onClose }>
            Cancel
          </Button>
          <Button onClick={ onSubmit }>
            { editingWardId ? 'Update Ward' : 'Add Ward' }
          </Button>
        </>
      ) }
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Input id="ward-no" label="Ward No" type="text" value={ form.wardNo } onChange={ (value) => onFormChange({ ...form, wardNo: String(value) }) } />
        <Input id="ward-name" label="Ward Name" type="text" value={ form.wardName } onChange={ (value) => onFormChange({ ...form, wardName: String(value) }) } />
        <Input id="collector" label="Collector" type="text" value={ form.collector } onChange={ (value) => onFormChange({ ...form, collector: String(value) }) } />
        <Input id="member-count" label="Members" type="number" value={ form.memberCount } min={ 0 } onChange={ (value) => onFormChange({ ...form, memberCount: Number(value || 0) }) } />
        <Input id="monthly-target" label="Monthly Target" type="number" value={ form.monthlyTarget } min={ 0 } onChange={ (value) => onFormChange({ ...form, monthlyTarget: Number(value || 0) }) } />
      </div>
    </Modal>
  )
}

export default WardModal
