'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Button from '@/src/components/Button'
import PhoneInput from '@/src/components/PhoneInput'
import { useZodForm } from '@/src/lib/hooks/useZodForm'
import {
  phoneVerificationSchema,
  type PhoneVerificationForm
} from '@/src/app/(auth)/login/constants/validationSchema'
import { devAuth, normalizeDigits, verifiedPhoneStorageKey } from './authDevConfig'

const LoginPage = () => {
  const router = useRouter()
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useZodForm<PhoneVerificationForm>(phoneVerificationSchema, {
    defaultValues: {
      phone: devAuth.phone
    }
  })
  const phone = watch('phone')

  const handlePhoneSubmit = (form: PhoneVerificationForm) => {
    window.sessionStorage.setItem(verifiedPhoneStorageKey, normalizeDigits(form.phone))
    const redirectTo = new URLSearchParams(window.location.search).get('redirect') || '/'
    router.push(`/verify-otp?redirect=${encodeURIComponent(redirectTo)}`)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,#e8f3f6_0%,#f8fafc_48%,#eef6ff_100%)] px-4 py-8">
      <form
        className="w-full max-w-[440px]"
        onSubmit={ handleSubmit(handlePhoneSubmit) }
      >
        <section className="flex min-h-[520px] flex-col rounded-md border border-white/80 bg-white p-6 text-center shadow-[0_20px_50px_rgba(9,60,93,0.14)] sm:p-8">
          <div className="mx-auto mb-6 flex h-40 w-40 items-center justify-center overflow-hidden rounded-md bg-slate-50 sm:h-48 sm:w-48">
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
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-theme-accent">
              Login
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-950">
              Phone Verification
            </h1>
            <p className="mt-2 text-sm text-slate-500">
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

            <Button type="submit" size="lg" className="w-full">
              Send Code
            </Button>
          </div>
        </section>
      </form>
    </main>
  )
}

export default LoginPage
