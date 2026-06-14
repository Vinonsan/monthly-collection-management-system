export type PaymentStatus = 'Paid' | 'Partial' | 'Due'

export type PaymentRow = {
  id: number
  cardNo: string
  userName: string
  ward: string
  monthlyAmount: number
  paidAmount: number
  balance: number
  lastPaidMonth: string
  status: PaymentStatus
}

export type PaymentForm = Omit<PaymentRow, 'id' | 'balance' | 'status'>

export type PaymentAmountForm = {
  amount: number
}

export type ScheduleMessageForm = {
  date: Date | null
  message: string
}
