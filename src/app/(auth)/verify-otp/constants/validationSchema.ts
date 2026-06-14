import { z } from 'zod'
import { devAuth, normalizeDigits } from '@/src/app/_utils/authDevConfig'

export const otpVerificationSchema = z.object({
  otp: z
    .string()
    .trim()
    .min(1, 'OTP is required')
    .refine((otp) => normalizeDigits(otp).length === 6, {
      message: 'OTP must have 6 digits'
    })
    .refine((otp) => normalizeDigits(otp) === normalizeDigits(devAuth.otp), {
      message: 'Invalid OTP.'
    })
})

export type OtpVerificationForm = z.infer<typeof otpVerificationSchema>
