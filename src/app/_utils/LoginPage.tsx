'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Button from '@/src/components/Button'
import PhoneInput from '@/src/components/PhoneInput'
import { useZodForm } from '@/src/lib/hooks/useZodForm'
import { useSendOtpMutation } from '@/src/lib/redux/api/auth/api'
import {
  phoneVerificationSchema,
  type PhoneVerificationForm
} from '@/src/app/(auth)/login/constants/validationSchema'
import { normalizeDigits } from '@/src/lib/auth/utils'
import {
  OTP_TOKEN_STORAGE_KEY,
  VERIFIED_PHONE_STORAGE_KEY
} from '@/src/lib/auth/constants'
import { useErrorHandler } from '@/src/lib/hooks/useErrorHandler'

const LoginPage = () => {
  const router = useRouter()
  const [sendOtp, { isLoading }] = useSendOtpMutation()
  const { handleError, showSuccess } = useErrorHandler()
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useZodForm<PhoneVerificationForm>(phoneVerificationSchema, {
    defaultValues: {
      phone: ''
    }
  })
  const phone = watch('phone')

  const handlePhoneSubmit = async (form: PhoneVerificationForm) => {
    const normalizedPhone = normalizeDigits(form.phone)

    try {
      const response = await sendOtp({ phone: form.phone }).unwrap()

      if (!response.success || !response.otpToken) {
        return
      }

      window.sessionStorage.setItem(VERIFIED_PHONE_STORAGE_KEY, normalizedPhone)
      window.sessionStorage.setItem(OTP_TOKEN_STORAGE_KEY, response.otpToken)

      showSuccess('OTP sent successfully')

      const redirectTo = new URLSearchParams(window.location.search).get('redirect') || '/'
      router.push(`/verify-otp?redirect=${encodeURIComponent(redirectTo)}`)
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center  px-4 py-8">
      <form
        className="w-full max-w-110"
        onSubmit={ handleSubmit(handlePhoneSubmit) }
      >
        <section className="flex min-h-130 flex-col rounded-md border border-dark-base/10 p-6 text-center shadow-[0_20px_50px_rgba(9,60,93,0.14)] sm:p-8">
          <div className="mx-auto mb-6 flex h-40 w-40 items-center justify-center overflow-hidden rounded-md  sm:h-48 sm:w-48">
            <Image
              src="/auth/otp-verification.png"
              alt="Phone verification"
              width={ 480 }
              height={ 480 }
              unoptimized
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mb-6">
            <h1 className="mt-2 text-2xl text-left font-semibold text-slate-950">
              Phone Verification
            </h1>
            <p className="mt-2 text-left text-sm text-slate-500">
              Confirm the phone number registered for this collection account.
            </p>
          </div>

          <div className="mt-auto space-y-4">
            <PhoneInput
              id="login-phone"
              label="Phone number"
              value={ phone }
              required
              error={ errors.phone?.message }
              onChange={ (value) => {
                setValue('phone', value, {
                  shouldDirty: true,
                  shouldValidate: Boolean(errors.phone)
                })
              } }
            />

            <Button type="submit" size="lg" className="w-full" disabled={ isLoading }>
              { isLoading ? 'Sending Code...' : 'Send Code' }
            </Button>
          </div>
        </section>
      </form>
    </main>
  )
}

export default LoginPage
