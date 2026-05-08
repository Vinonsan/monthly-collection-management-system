'use client'

import Button from '@/src/components/Button'
import Input from '@/src/components/Input'
import Modal from '@/src/components/Modal'
import type { PaymentAmountForm, PaymentRow } from '../types/payments'

interface PaymentModalProps {
  open: boolean
  payment: PaymentRow | null
  form: PaymentAmountForm
  onClose: () => void
  onSubmit: () => void
  onFormChange: (_form: PaymentAmountForm) => void
}

const PaymentModal = (props: PaymentModalProps) => {
  const {
    open,
    payment,
    form,
    onClose,
    onSubmit,
    onFormChange
  } = props

  return (
    <Modal
      open={ open }
      title="Add Payment"
      size="md"
      onClose={ onClose }
      footer={ (
        <>
          <Button variant="secondary" appearance="outline" onClick={ onClose }>
            Cancel
          </Button>
          <Button onClick={ onSubmit }>
            Add Payment
          </Button>
        </>
      ) }
    >
      <div className="space-y-4">
        { payment && (
          <div className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-sm font-semibold text-slate-950">{ payment.userName }</p>
            <p className="mt-1 text-xs text-slate-500">
              Card { payment.cardNo } · Balance Rs. { payment.balance.toLocaleString() }
            </p>
          </div>
        ) }

        <Input
          id="payment-amount"
          label="Amount"
          type="number"
          value={ form.amount }
          min={ 0 }
          onChange={ (value) => onFormChange({ amount: Number(value || 0) }) }
        />
      </div>
    </Modal>
  )
}

export default PaymentModal
