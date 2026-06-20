import { z } from 'zod'
import { normalizeDigits } from '@/src/lib/auth/utils'

export const phoneVerificationSchema = z.object({
  phone: z
    .string()
    .trim()
    .min(1, 'Phone number is required')
    .refine((phone) => normalizeDigits(phone).length === 9, {
      message: 'Phone number must have 9 digits'
    })
})

export type PhoneVerificationForm = z.infer<typeof phoneVerificationSchema>
