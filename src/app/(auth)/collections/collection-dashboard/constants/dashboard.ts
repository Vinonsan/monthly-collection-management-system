import { paymentRows } from '../../payments/constants/payments'
import type { PaymentRow } from '../../payments/types/payments'
import type { SummaryCard } from '../types/dashboard'

const formatCurrency = (amount: number) => `Rs. ${amount.toLocaleString()}`

const getCollectionSummaryCards = (payments: PaymentRow[]): SummaryCard[] => {
  const targetAmount = payments.reduce((total, payment) => total + payment.monthlyAmount, 0)
  const collectedAmount = payments.reduce((total, payment) => total + payment.paidAmount, 0)
  const pendingAmount = payments.reduce((total, payment) => total + payment.balance, 0)
  const collectionPercentage = targetAmount > 0 ? Math.round((collectedAmount / targetAmount) * 100) : 0
  const paidUsers = payments.filter((payment) => payment.status === 'Paid').length
  const dueUsers = payments.filter((payment) => payment.status !== 'Paid').length

  return [
    { label: 'This Month Target Amount', value: formatCurrency(targetAmount), helper: `${payments.length} user records`, accent: 'border-theme-primary/25 bg-theme-primary/5' },
    { label: 'Collected Amount', value: formatCurrency(collectedAmount), helper: 'Payments received this month', accent: 'border-green-200 bg-green-50' },
    { label: 'Pending Amount', value: formatCurrency(pendingAmount), helper: 'Remaining balance to collect', accent: 'border-red-200 bg-red-50' },
    { label: 'Collection Percentage', value: `${collectionPercentage}%`, helper: 'Collected against target', accent: 'border-blue-200 bg-blue-50' },
    { label: 'Total Paid Users', value: paidUsers.toLocaleString(), helper: 'Users fully paid', accent: 'border-emerald-200 bg-emerald-50' },
    { label: 'Total Due Users', value: dueUsers.toLocaleString(), helper: 'Partial and due users', accent: 'border-yellow-200 bg-yellow-50' }
  ]
}

export const summaryCards = getCollectionSummaryCards(paymentRows)
