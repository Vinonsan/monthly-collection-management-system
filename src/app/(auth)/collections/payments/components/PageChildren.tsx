'use client'

import { useState } from 'react'
import Badge, { type BadgeVariant } from '@/src/components/Badge'
import Button from '@/src/components/Button'
import DataTable, { type DataTableColumn } from '@/src/components/DataTable'
import SearchTextbox, { type SearchTextboxFilterValue, useSearchTextbox } from '@/src/components/SearchTextbox'
import Select from '@/src/components/Select'
import SVG from '@/src/components/Svg'
import { usePageActions } from '@/src/lib/hooks/usePageActions'
import {
  formatCurrency,
  getPaymentBalance,
  getPaymentStatus,
  paymentRows,
  paymentStatusOptions
} from '../constants/payments'
import type { PaymentAmountForm, PaymentRow, PaymentStatus } from '../types/payments'
import PaymentModal from './PaymentModal'
import ScheduleMessageModal from './ScheduleMessageModal'

const statusVariant: Record<PaymentStatus, BadgeVariant> = {
  Paid: 'success',
  Partial: 'warning',
  Due: 'danger'
}

const PageChildren = () => {
  const [paymentData, setPaymentData] = useState<PaymentRow[]>(paymentRows)
  const [status, setStatus] = useState<SearchTextboxFilterValue>('all')
  const [ward, setWard] = useState<SearchTextboxFilterValue>('all')
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<PaymentRow | null>(null)
  const wardOptions = [
    { id: 'all', name: 'All wards' },
    ...Array.from(new Set(paymentData.map((payment) => payment.ward))).map((item) => ({
      id: item,
      name: item
    }))
  ]
  const {
    search,
    setSearch,
    resetSearch,
    filteredData: filteredPayments
  } = useSearchTextbox(
    paymentData,
    [
      (payment) => payment.cardNo,
      (payment) => payment.userName,
      (payment) => payment.ward,
      (payment) => payment.lastPaidMonth,
      (payment) => payment.status
    ],
    [
      {
        value: ward,
        match: (payment, value) => value === 'all' || payment.ward === value
      },
      {
        value: status,
        match: (payment, value) => value === 'all' || payment.status === value
      }
    ]
  )
  const resetFilters = () => {
    resetSearch()
    setStatus('all')
    setWard('all')
  }
  const {
    resetPage,
    refreshPage
  } = usePageActions({
    onReset: resetFilters,
    onRefresh: () => {
      setPaymentData(paymentRows)
      resetFilters()
    }
  })

  const openPaymentModal = (payment: PaymentRow) => {
    setSelectedPayment(payment)
    setPaymentModalOpen(true)
  }

  const closePaymentModal = () => {
    setPaymentModalOpen(false)
    setSelectedPayment(null)
  }

  const openScheduleModal = () => {
    setScheduleModalOpen(true)
  }

  const closeScheduleModal = () => {
    setScheduleModalOpen(false)
  }

  const handlePaymentSubmit = (form: PaymentAmountForm) => {
    if (!selectedPayment) return

    setPaymentData((current) =>
      current.map((payment) => {
        if (payment.id !== selectedPayment.id) return payment

        const paidAmount = payment.paidAmount + form.amount
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
      render: (row) => formatCurrency(row.monthlyAmount)
    },
    {
      key: 'balance',
      header: 'Balance',
      render: (row) => formatCurrency(row.balance)
    },
    { key: 'lastPaidMonth', header: 'Last Paid Month' },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <Badge variant={ statusVariant[row.status] } appearance="solid" size="sm">
          { row.status }
        </Badge>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex justify-end gap-2">
          <Button
            variant="primary"
            appearance="solid"
            size="sm"
   
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
  
          <Button 
          variant="primary"
          className="flex items-center gap-2"
          onClick={ openScheduleModal }
          >
            <SVG type="date-picker" width={ 17 } height={ 17 } />
            Schedule Message
          </Button>

      </div>

      <div className="flex gap-3 items-end justify-center">

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

                <SearchTextbox
          id="payment-search"
          label="Search payments"
          value={ search }
          onChange={ setSearch }
          placeholder="Search by card no, user name, ward, month, or status"
        />

                <Button
            variant="secondary"
            appearance="outline"
            className="flex items-center gap-2"
            onClick={ resetPage }
          >
            <SVG type="reset" width={ 17 } height={ 17 } />
          
          </Button>
          <Button
            variant="secondary"
            appearance="outline"
            className="flex items-center gap-2"
            onClick={ refreshPage }
          >
            <SVG type="refresh" width={ 17 } height={ 17 } />
        
          </Button>
      </div>

      

      <DataTable
        data={ filteredPayments }
        columns={ columns }
        getRowId={ (row) => row.id }
        emptyMessage="No payments match the current filters."
        pagination
        defaultPageSize={ 5 }
        pageSizeOptions={ [2,5, 10] }
      />

      <PaymentModal
        open={ paymentModalOpen }
        payment={ selectedPayment }
        onClose={ closePaymentModal }
        onSubmit={ handlePaymentSubmit }
      />

      <ScheduleMessageModal
        open={ scheduleModalOpen }
        onClose={ closeScheduleModal }
        onSubmit={ handleScheduleSubmit }
      />
    </div>
  )
}

export default PageChildren
