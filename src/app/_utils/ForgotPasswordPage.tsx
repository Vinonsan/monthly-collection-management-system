'use client'

import Link from 'next/link'
import { useState } from 'react'
import Button from '@/src/components/Button'
import Input from '@/src/components/Input'
import PhoneInput from '@/src/components/PhoneInput'
import { devAuth, normalizeDigits } from './authDevConfig'

const ForgotPasswordPage = () => {
  const [step, setStep] = useState<'phone' | 'otp' | 'password'>('phone')
  const [phone, setPhone] = useState(devAuth.phone)
  const [otp, setOtp] = useState(devAuth.otp)
  const [password, setPassword] = useState(devAuth.password)
  const [confirmPassword, setConfirmPassword] = useState(devAuth.password)
  const [error, setError] = useState('')

  const handleOtpChange = (value: string) => {
    setOtp(value.replace(/\D/g, '').slice(0, 6))
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8">
      <section className="w-full max-w-[420px] rounded-md border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-7 text-center">
          <h1 className="text-2xl font-semibold text-slate-950">Forgot password</h1>
          <p className="mt-2 text-sm text-slate-500">
            { step === 'phone' && 'Enter your phone number to receive an OTP.' }
            { step === 'otp' && `Enter the OTP sent to +94 ${phone || 'your phone number'}.` }
            { step === 'password' && 'Create a new password for your account.' }
          </p>
        </div>

        { step === 'phone' && (
          <form
            className="space-y-5"
            onSubmit={ (event) => {
              event.preventDefault()
              setError('')
              setStep('otp')
            } }
          >
            <PhoneInput
              id="forgot-phone"
              label="Phone number"
              value={ phone }
              required
              onChange={ setPhone }
            />

            <Button type="submit" size="lg" className="w-full">
              Send OTP
            </Button>
          </form>
        ) }

        { step === 'otp' && (
          <form
            className="space-y-5"
            onSubmit={ (event) => {
              event.preventDefault()
              if (normalizeDigits(otp) !== devAuth.otp) {
                setError('Invalid development OTP.')
                return
              }
              setError('')
              setStep('password')
            } }
          >
            <div>
              <label htmlFor="forgot-otp" className="mb-1 block text-sm font-medium text-gray-700">
                OTP<span className="ml-1 text-red-500">*</span>
              </label>
              <input
                id="forgot-otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={ otp }
                placeholder="000000"
                maxLength={ 6 }
                required
                onChange={ (event) => handleOtpChange(event.target.value) }
                className="h-12 w-full rounded-md border border-gray-300 bg-white px-4 text-center font-mono text-xl tracking-[0.35em] text-gray-950 outline-none transition-colors placeholder:text-gray-300 focus:border-theme-primary"
              />
            </div>

            <Button type="submit" size="lg" className="w-full">
              Verify OTP
            </Button>

            { error && <p className="text-center text-sm text-red-600">{ error }</p> }

            <div className="flex items-center justify-between gap-3 text-sm">
              <button
                type="button"
                onClick={ () => setStep('phone') }
                className="font-medium text-slate-600 hover:text-theme-primary"
              >
                Change phone
              </button>
              <button type="button" className="font-medium text-theme-primary hover:underline">
                Resend OTP
              </button>
            </div>
          </form>
        ) }

        { step === 'password' && (
          <form
            className="space-y-5"
            onSubmit={ (event) => {
              event.preventDefault()
              if (password !== confirmPassword) {
                setError('Passwords do not match.')
                return
              }
              setError('')
            } }
          >
            <Input
              id="forgot-new-password"
              label="New password"
              type="password"
              value={ password }
              required
              placeholder="Enter new password"
              onChange={ (value) => setPassword(String(value)) }
            />

            <Input
              id="forgot-confirm-password"
              label="Confirm password"
              type="password"
              value={ confirmPassword }
              required
              placeholder="Re-enter new password"
              onChange={ (value) => setConfirmPassword(String(value)) }
            />

            <Button type="submit" size="lg" className="w-full">
              Reset Password
            </Button>

            { error && <p className="text-center text-sm text-red-600">{ error }</p> }
          </form>
        ) }

        <div className="mt-5 text-center text-sm">
          <Link href="/login" className="font-medium text-theme-primary hover:underline">
            Back to login
          </Link>
        </div>
      </section>
    </main>
  )
}

export default ForgotPasswordPage
