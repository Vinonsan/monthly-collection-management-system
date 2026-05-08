'use client'

import { useMemo, useState } from 'react'
import Badge, { type BadgeVariant } from '@/src/components/Badge'
import Button from '@/src/components/Button'
import DataTable, { type DataTableColumn } from '@/src/components/DataTable'
import SearchTextbox from '@/src/components/SearchTextbox'
import Select from '@/src/components/Select'
import SVG from '@/src/components/Svg'
import {
  emptyPaymentAmountForm,
  emptyScheduleMessageForm,
  formatCurrency,
  getPaymentBalance,
  getPaymentStatus,
  paymentRows,
  paymentStatusOptions
} from '../constants/payments'
import type { PaymentAmountForm, PaymentRow, PaymentStatus, ScheduleMessageForm } from '../types/payments'
import PaymentModal from './PaymentModal'
import ScheduleMessageModal from './ScheduleMessageModal'

const statusVariant: Record<PaymentStatus, BadgeVariant> = {
  Paid: 'success',
  Partial: 'warning',
  Due: 'danger'
}

const PageChildren = () => {
  const [paymentData, setPaymentData] = useState<PaymentRow[]>(paymentRows)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<string | number | (string | number)[] | null>('all')
  const [ward, setWard] = useState<string | number | (string | number)[] | null>('all')
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<PaymentRow | null>(null)
  const [paymentForm, setPaymentForm] = useState<PaymentAmountForm>(emptyPaymentAmountForm)
  const [scheduleForm, setScheduleForm] = useState<ScheduleMessageForm>(emptyScheduleMessageForm)

  const wardOptions = useMemo(() => [
    { id: 'all', name: 'All wards' },
    ...Array.from(new Set(paymentData.map((payment) => payment.ward))).map((item) => ({
      id: item,
      name: item
    }))
  ], [paymentData])

  const filteredPayments = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return paymentData.filter((payment) => {
      const matchesWard = ward === 'all' || payment.ward === ward
      const matchesStatus = status === 'all' || payment.status === status
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [payment.cardNo, payment.userName, payment.ward, payment.lastPaidMonth, payment.status]
          .join(' ')
          .toLowerCase()
          .includes(normalizedSearch)

      return matchesWard && matchesStatus && matchesSearch
    })
  }, [paymentData, search, status, ward])

  const openPaymentModal = (payment: PaymentRow) => {
    setSelectedPayment(payment)
    setPaymentForm(emptyPaymentAmountForm)
    setPaymentModalOpen(true)
  }

  const closePaymentModal = () => {
    setPaymentModalOpen(false)
    setSelectedPayment(null)
    setPaymentForm(emptyPaymentAmountForm)
  }

  const openScheduleModal = () => {
    setScheduleForm(emptyScheduleMessageForm)
    setScheduleModalOpen(true)
  }

  const closeScheduleModal = () => {
    setScheduleModalOpen(false)
    setScheduleForm(emptyScheduleMessageForm)
  }

  const handlePaymentSubmit = () => {
    if (!selectedPayment) return

    setPaymentData((current) =>
      current.map((payment) => {
        if (payment.id !== selectedPayment.id) return payment

        const paidAmount = payment.paidAmount + paymentForm.amount
        const balance = getPaymentBalance(payment.monthlyAmount, paidAmount)

        return {
          ...payment,
          paidAmount,
          balance,
          status: getPaymentStatus(payment.monthlyAmount, paidAmount),
          lastPaidMonth: 'May 2026'
        }
      })
    )
    closePaymentModal()
  }

  const handleScheduleSubmit = () => {
    closeScheduleModal()
  }

  const columns: DataTableColumn<PaymentRow>[] = [
    { key: 'cardNo', header: 'Card No' },
    { key: 'userName', header: 'User Name' },
    { key: 'ward', header: 'Ward' },
    {
      key: 'monthlyAmount',
      header: 'Monthly Amount',
      align: 'right',
      render: (row) => formatCurrency(row.monthlyAmount)
    },
    {
      key: 'paidAmount',
      header: 'Paid Amount',
      align: 'right',
      render: (row) => formatCurrency(row.paidAmount)
    },
    {
      key: 'balance',
      header: 'Balance',
      align: 'right',
      render: (row) => formatCurrency(row.balance)
    },
    { key: 'lastPaidMonth', header: 'Last Paid Month' },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <Badge variant={ statusVariant[row.status] } appearance="outline" size="sm">
          { row.status }
        </Badge>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (row) => (
        <div className="flex justify-end gap-2">
          <Button
            variant="success"
            appearance="ghost"
            size="sm"
            className="h-9 w-9 px-0"
            aria-label="Add payment"
            onClick={ () => openPaymentModal(row) }
          >
            <SVG type="plus" width={ 16 } height={ 16 } />
          </Button>
        </div>
      )
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl bg-theme-primary/10 px-3 py-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-950">Payments</h1>
          <p className="mt-1 text-sm text-slate-500">
            View payment records, balances, and paid status by ward.
          </p>
        </div>

        <Button className="flex items-center gap-2" onClick={ openScheduleModal }>
          <SVG type="date-picker" width={ 17 } height={ 17 } />
          Schedule Message
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px_220px]">
        <SearchTextbox
          id="payment-search"
          label="Search payments"
          value={ search }
          onChange={ setSearch }
          placeholder="Search by card no, user name, ward, month, or status"
        />

        <Select
          label="Paid Status"
          options={ paymentStatusOptions }
          labelKey="name"
          valueKey="id"
          value={ status }
          onChange={ setStatus }
          placeholder="Select status"
          position="bottom"
        />

        <Select
          label="Ward"
          options={ wardOptions }
          labelKey="name"
          valueKey="id"
          value={ ward }
          onChange={ setWard }
          placeholder="Select ward"
          position="bottom"
        />
      </div>

      <DataTable
        data={ filteredPayments }
        columns={ columns }
        getRowId={ (row) => row.id }
        emptyMessage="No payments match the current filters."
        pagination
        defaultPageSize={ 5 }
        pageSizeOptions={ [5, 10] }
      />

      <PaymentModal
        open={ paymentModalOpen }
        payment={ selectedPayment }
        form={ paymentForm }
        onClose={ closePaymentModal }
        onSubmit={ handlePaymentSubmit }
        onFormChange={ setPaymentForm }
      />

      <ScheduleMessageModal
        open={ scheduleModalOpen }
        form={ scheduleForm }
        onClose={ closeScheduleModal }
        onSubmit={ handleScheduleSubmit }
        onFormChange={ setScheduleForm }
      />
    </div>
  )
}

export default PageChildren
