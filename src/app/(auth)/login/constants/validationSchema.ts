import { z } from 'zod'
import { devAuth, normalizeDigits } from '@/src/app/_utils/authDevConfig'

export const phoneVerificationSchema = z.object({
  phone: z
    .string()
    .trim()
    .min(1, 'Phone number is required')
    .refine((phone) => normalizeDigits(phone).length === 9, {
      message: 'Phone number must have 10 digits'
    })
    .refine((phone) => normalizeDigits(phone) === normalizeDigits(devAuth.phone), {
      message: 'Invalid phone number.'
    })
})

export type PhoneVerificationForm = z.infer<typeof phoneVerificationSchema>
