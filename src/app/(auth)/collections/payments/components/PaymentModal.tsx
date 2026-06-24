'use client'

import { type FormEvent, useState } from 'react'
import Button from '@/src/components/Button'
import Input from '@/src/components/Input'
import Modal from '@/src/components/Modal'
import { getFieldError, useFormValidation } from '@/src/lib/hooks/useFormValidation'
import { emptyPaymentAmountForm } from '../constants/payments'
import { getPaymentAmountSchema } from '../constants/validationSchema'
import type { PaymentAmountForm, PaymentRow } from '../types/payments'

interface PaymentModalProps {
  open: boolean
  payment: PaymentRow | null
  onClose: () => void
  onSubmit: (_form: PaymentAmountForm) => void
}

const PaymentModal = (props: PaymentModalProps) => {
  const {
    open,
    payment,
    onClose,
    onSubmit
  } = props
  const [form, setForm] = useState<PaymentAmountForm>(emptyPaymentAmountForm)
  const {
    errors,
    validateForm,
    clearErrors
  } = useFormValidation<PaymentAmountForm>(getPaymentAmountSchema(payment?.balance ?? 0))

  const handleClose = () => {
    setForm(emptyPaymentAmountForm)
    clearErrors()
    onClose()
  }

  const handlePaymentSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm(form)) return

    onSubmit(form)
    setForm(emptyPaymentAmountForm)
    clearErrors()
  }

  return (
    <Modal
      open={ open }
      title="Add Payment"
      size="md"
      onClose={ handleClose }
      footer={ (
        <>
          <Button variant="secondary" appearance="outline" onClick={ handleClose }>
            Cancel
          </Button>
          <Button type="submit" form="payment-amount-form">
            Add Payment
          </Button>
        </>
      ) }
    >
      <form
        id="payment-amount-form"
        className="space-y-4"
        onSubmit={ handlePaymentSubmit }
      >
        { payment && (
          <div className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-sm font-semibold text-slate-950">{ payment.userName }</p>
            <p className="mt-1 text-xs text-slate-500">
              Card { payment.cardNo } - Balance Rs. { payment.balance.toLocaleString() }
            </p>
          </div>
        ) }

        <Input
          id="payment-amount"
          label="Amount"
          type="number"
          value={ form.amount }
          min={ 0 }
          max={ payment?.balance }
          error={ getFieldError(errors, 'amount') }
          onChange={ (value) => setForm({ amount: Number(value || 0) }) }
        />
      </form>
    </Modal>
  )
}

export default PaymentModal
