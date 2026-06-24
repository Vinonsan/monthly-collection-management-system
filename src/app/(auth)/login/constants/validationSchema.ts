import { z } from 'zod'
import { normalizeDigits } from '@/src/lib/auth/utils'

export const phoneVerificationSchema = z.object({
  phone: z
    .string()
    .trim()
    .superRefine((val, ctx) => {

      if (!val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Phone number is required',
        })
        return
      }

      if (normalizeDigits(val).length !== 9) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Phone number must have 9 digits',
        })
      }
    })
})

export type PhoneVerificationForm = z.infer<typeof phoneVerificationSchema>