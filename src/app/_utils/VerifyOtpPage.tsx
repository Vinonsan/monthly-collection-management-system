'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Button from '@/src/components/Button'
import { useZodForm } from '@/src/lib/hooks/useZodForm'
import {
  otpVerificationSchema,
  type OtpVerificationForm
} from '@/src/app/(auth)/verify-otp/constants/validationSchema'
import {
  devAuth,
  normalizeDigits,
  saveDevAuthSession,
  verifiedPhoneStorageKey
} from './authDevConfig'

const otpSlots = Array.from({ length: 6 })

const VerifyOtpPage = () => {
  const router = useRouter()
  const otpInputRef = useRef<HTMLInputElement>(null)
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useZodForm<OtpVerificationForm>(otpVerificationSchema, {
    defaultValues: {
      otp: ''
    }
  })
  const otp = watch('otp')

  useEffect(() => {
    const verifiedPhone = window.sessionStorage.getItem(verifiedPhoneStorageKey)

    if (verifiedPhone !== normalizeDigits(devAuth.phone)) {
      router.replace('/login')
      return
    }

    window.setTimeout(() => otpInputRef.current?.focus(), 0)
  }, [router])

  const handleOtpSubmit = () => {
    const verifiedPhone = window.sessionStorage.getItem(verifiedPhoneStorageKey)

    if (verifiedPhone !== normalizeDigits(devAuth.phone)) {
      router.replace('/login')
      return
    }

    window.sessionStorage.removeItem(verifiedPhoneStorageKey)
    saveDevAuthSession()

    const redirectTo = new URLSearchParams(window.location.search).get('redirect') || '/'
    router.push(redirectTo)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,#e8f3f6_0%,#f8fafc_48%,#eef6ff_100%)] px-4 py-8">
      <form
        className="w-full max-w-[440px]"
        onSubmit={ handleSubmit(handleOtpSubmit) }
      >
        <section className="flex min-h-[520px] flex-col rounded-md border border-white/80 bg-white p-6 text-center shadow-[0_20px_50px_rgba(9,60,93,0.14)] sm:p-8">
          <div className="mx-auto mb-6 flex h-40 w-40 items-center justify-center overflow-hidden rounded-md bg-slate-50 sm:h-48 sm:w-48">
            <Image
              src="/auth/otp-verification.png"
              alt="OTP verification"
              width={ 480 }
              height={ 480 }
              unoptimized
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-theme-accent">
              Verification
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-950">
              Account Verification
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Enter the 6 digit OTP to open the dashboard.
            </p>
          </div>

          <div className="mt-auto space-y-5">
            <div>
              <label
                htmlFor="login-otp"
                className="mb-2 block text-left text-sm font-medium text-gray-700"
              >
                OTP <span className="ml-1 text-red-500">*</span>
              </label>

              <button
                type="button"
                onClick={ () => otpInputRef.current?.focus() }
                className="relative grid w-full grid-cols-6 gap-2"
              >
                { otpSlots.map((_, index) => (
                  <span
                    key={ index }
                    className="flex aspect-square items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-lg font-semibold text-slate-950 transition"
                  >
                    { otp[index] || '' }
                  </span>
                )) }
              </button>

              <input
                ref={ otpInputRef }
                id="login-otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={ otp }
                required
                maxLength={ 6 }
                onChange={ (event) => {
                  setValue('otp', normalizeDigits(event.target.value).slice(0, 6), {
                    shouldDirty: true,
                    shouldValidate: Boolean(errors.otp)
                  })
                } }
                className="sr-only"
              />

              { errors.otp?.message && (
                <p className="mt-2 text-left text-sm text-red-600">
                  { errors.otp.message }
                </p>
              ) }
            </div>

            <Button type="submit" size="lg" className="w-full">
              Verify Code
            </Button>

            <Button
              type="button"
              size="md"
              appearance="ghost"
              className="w-full"
              onClick={ () => {
                window.sessionStorage.removeItem(verifiedPhoneStorageKey)
                router.push('/login')
              } }
            >
              Change Number
            </Button>
          </div>
        </section>
      </form>
    </main>
  )
}

export default VerifyOtpPage
