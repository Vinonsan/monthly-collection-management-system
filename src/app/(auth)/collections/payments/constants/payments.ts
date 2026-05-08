import type { PaymentAmountForm, PaymentForm, PaymentRow, PaymentStatus, ScheduleMessageForm } from '../types/payments'

export const paymentRows: PaymentRow[] = [
  { id: 1, cardNo: '1', userName: 'Nimal Perera', ward: '1', monthlyAmount: 2500, paidAmount: 2500, balance: 0, lastPaidMonth: 'May 2026', status: 'Paid' },
  { id: 2, cardNo: '2', userName: 'Kamal Silva', ward: '2', monthlyAmount: 2500, paidAmount: 1500, balance: 1000, lastPaidMonth: 'May 2026', status: 'Partial' },
  { id: 3, cardNo: '3', userName: 'Saman Kumara', ward: '1', monthlyAmount: 2500, paidAmount: 0, balance: 2500, lastPaidMonth: 'April 2026', status: 'Due' },
  { id: 4, cardNo: '4', userName: 'Ruwan Jayasinghe', ward: '3', monthlyAmount: 3000, paidAmount: 3000, balance: 0, lastPaidMonth: 'May 2026', status: 'Paid' },
  { id: 5, cardNo: '5', userName: 'Amal Fernando', ward: '2', monthlyAmount: 2500, paidAmount: 2500, balance: 0, lastPaidMonth: 'May 2026', status: 'Paid' },
  { id: 6, cardNo: '6', userName: 'Sunil Dias', ward: '4', monthlyAmount: 2000, paidAmount: 0, balance: 2000, lastPaidMonth: 'March 2026', status: 'Due' },
  { id: 7, cardNo: '7', userName: 'Kasun Nirosh', ward: '3', monthlyAmount: 3000, paidAmount: 1800, balance: 1200, lastPaidMonth: 'May 2026', status: 'Partial' },
  { id: 8, cardNo: '8', userName: 'Dinesh Mendis', ward: '1', monthlyAmount: 2500, paidAmount: 2500, balance: 0, lastPaidMonth: 'May 2026', status: 'Paid' },
  { id: 9, cardNo: '9', userName: 'Lalith Perera', ward: '4', monthlyAmount: 2000, paidAmount: 1000, balance: 1000, lastPaidMonth: 'May 2026', status: 'Partial' },
  { id: 10, cardNo: '10', userName: 'Pradeep Silva', ward: '2', monthlyAmount: 2500, paidAmount: 0, balance: 2500, lastPaidMonth: 'April 2026', status: 'Due' }
]

export const emptyPaymentForm: PaymentForm = {
  cardNo: '',
  userName: '',
  ward: '1',
  monthlyAmount: 0,
  paidAmount: 0,
  lastPaidMonth: 'May 2026'
}

export const emptyPaymentAmountForm: PaymentAmountForm = {
  amount: 0
}

export const emptyScheduleMessageForm: ScheduleMessageForm = {
  date: null,
  message: ''
}

export const paymentStatusOptions = [
  { id: 'all', name: 'All statuses' },
  { id: 'Paid', name: 'Paid' },
  { id: 'Partial', name: 'Partial' },
  { id: 'Due', name: 'Due' }
]

export const formatCurrency = (amount: number) => `Rs. ${amount.toLocaleString()}`

export const getPaymentStatus = (monthlyAmount: number, paidAmount: number): PaymentStatus => {
  if (paidAmount >= monthlyAmount && monthlyAmount > 0) return 'Paid'
  if (paidAmount > 0) return 'Partial'

  return 'Due'
}

export const getPaymentBalance = (monthlyAmount: number, paidAmount: number) =>
  Math.max(monthlyAmount - paidAmount, 0)
