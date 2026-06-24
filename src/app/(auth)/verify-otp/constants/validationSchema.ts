import { z } from 'zod'
import { normalizeDigits } from '@/src/lib/auth/utils'

export const otpVerificationSchema = z.object({
  otp: z
    .string()
    .trim()
    .min(1, 'OTP is required')
    .refine((otp) => normalizeDigits(otp).length === 6, {
      message: 'OTP must have 6 digits'
    })
})

export type OtpVerificationForm = z.infer<typeof otpVerificationSchema>
