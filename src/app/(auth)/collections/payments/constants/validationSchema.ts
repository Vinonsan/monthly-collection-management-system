import { z } from 'zod'

export const paymentAmountSchema = z.object({
  amount: z
    .number()
    .positive('Amount must be greater than 0')
})

export const getPaymentAmountSchema = (balance: number) =>
  paymentAmountSchema.refine((form) => form.amount <= balance, {
    path: ['amount'],
    message: 'Amount cannot be greater than balance'
  })

export const scheduleMessageSchema = z.object({
  date: z.date().nullable().refine((date) => date !== null, {
    message: 'Date is required'
  }),
  message: z
    .string()
    .trim()
    .min(1, 'Message description is required')
})
