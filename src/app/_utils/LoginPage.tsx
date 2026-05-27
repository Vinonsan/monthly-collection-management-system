'use client'

import Link from 'next/link'
import type { FormEvent } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/src/components/Button'
import Input from '@/src/components/Input'
import PhoneInput from '@/src/components/PhoneInput'
import { authCookieName, devAuth, normalizeDigits } from './authDevConfig'

const LoginPage = () => {
  const router = useRouter()
  const [phone, setPhone] = useState(devAuth.phone)
  const [password, setPassword] = useState(devAuth.password)
  const [error, setError] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const phoneMatches = normalizeDigits(phone) === normalizeDigits(devAuth.phone)
    const passwordMatches = password === devAuth.password

    if (!phoneMatches || !passwordMatches) {
      setError('Invalid development login details.')
      return
    }

    document.cookie = `${authCookieName}=dev-session; path=/; max-age=86400; samesite=lax`
    const redirectTo = new URLSearchParams(window.location.search).get('redirect') || '/'
    router.push(redirectTo)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8">
      <section className="w-full max-w-[420px] rounded-md border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-7 text-center">
          <h1 className="text-2xl font-semibold text-slate-950">Login</h1>
          <p className="mt-2 text-sm text-slate-500">
            Enter your phone number and password.
          </p>
        </div>

        <form className="space-y-5" onSubmit={ handleSubmit }>
          <PhoneInput
            id="login-phone"
            label="Phone number"
            value={ phone }
            required
            onChange={ setPhone }
          />

          <Input
            id="login-password"
            label="Password"
            type="password"
            value={ password }
            required
            placeholder="Enter password"
            onChange={ (value) => setPassword(String(value)) }
          />

          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-sm font-medium text-theme-primary hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" size="lg" className="w-full">
            Login
          </Button>

          { error && <p className="text-center text-sm text-red-600">{ error }</p> }
        </form>
      </section>
    </main>
  )
}

export default LoginPage
