'use client'

import React from 'react'

type PhoneInputSize = 'sm' | 'md' | 'lg' | 'xl'

interface PhoneInputProps {
  id: string
  label?: string
  value: string
  placeholder?: string
  countryCode?: string
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  error?: string
  size?: PhoneInputSize
  className?: string
  onChange: (_value: string) => void
  onBlur?: (_e: React.FocusEvent<HTMLInputElement>) => void
}

const sizeStyles: Record<PhoneInputSize, string> = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-3 text-lg',
  xl: 'px-5 py-4 text-xl'
}

const labelSizeStyles: Record<PhoneInputSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg'
}

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 10)

  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`

  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`
}

const PhoneInput = (props: PhoneInputProps) => {
  const {
    id,
    label,
    value,
    placeholder = '77 123 4567',
    countryCode = '+94',
    disabled = false,
    readOnly = false,
    required = false,
    error,
    size = 'md',
    className = '',
    onChange,
    onBlur
  } = props

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || readOnly) return

    onChange(formatPhone(event.target.value))
  }

  const baseInputClasses =
    'w-full border-0 bg-transparent text-gray-950 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed'
  const wrapperClasses =
    'flex w-full items-center rounded-md border border-gray-300 bg-white font-light transition-colors focus-within:border-theme-primary disabled:opacity-50'
  const errorClasses = error ? 'border-red-500 focus-within:border-red-500' : ''
  const disabledClasses = disabled ? 'cursor-not-allowed bg-neutral-50 opacity-50' : ''

  return (
    <div className="w-full">
      { label && (
        <label
          htmlFor={ id }
          className={ `mb-1 block ${labelSizeStyles[size]} font-medium text-gray-700` }
        >
          { label }
          { required && <span className="ml-1 text-red-500">*</span> }
        </label>
      ) }

      <div className={ `${wrapperClasses} ${errorClasses} ${disabledClasses} ${className}` }>
        <span className="border-r border-gray-200 px-3 text-sm font-medium text-gray-600">
          { countryCode }
        </span>
        <input
          id={ id }
          type="tel"
          inputMode="tel"
          value={ value }
          placeholder={ placeholder }
          disabled={ disabled }
          readOnly={ readOnly }
          required={ required }
          onChange={ handleChange }
          onBlur={ onBlur }
          className={ `${baseInputClasses} ${sizeStyles[size]}` }
        />
      </div>

      { error && <p className="mt-1 text-sm text-red-600">{ error }</p> }
    </div>
  )
}

export default PhoneInput
