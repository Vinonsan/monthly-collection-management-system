'use client'

import React, { useState } from 'react'
import SVG from './Svg'

type InputSize = 'sm' | 'md' | 'lg' | 'xl'

interface InputProps {
  id: string
  label?: string
  type: 'text' | 'email' | 'number' | 'password'
  placeholder?: string
  value: string | number
  maxLength?: number
  max?: number
  min?: number
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  error?: string
  size?: InputSize
  className?: string
  onChange: (_value: string | number) => void
  onBlur?: (_e: React.FocusEvent<HTMLInputElement>) => void
}

const sizeStyles: Record<InputSize, string> = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-3 text-lg',
  xl: 'px-5 py-4 text-xl'
}

const labelSizeStyles: Record<InputSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg'
}

const Input = (props: InputProps) => {
  const {
    id,
    label,
    type,
    placeholder,
    value,
    maxLength,
    max,
    min,
    disabled = false,
    readOnly = false,
    required = false,
    error,
    size = 'md',
    className = '',
    onChange,
    onBlur
  } = props
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || readOnly) return

    const rawValue = e.target.value

    if (type === 'number') {
      if (rawValue === '') {
        onChange('')
        return
      }

      const numericValue = Number(rawValue)
      if (!isNaN(numericValue)) {
        if (
          (max !== undefined && numericValue > max) ||
          (min !== undefined && numericValue < min)
        ) {
          return
        }
        onChange(numericValue)
      }

      return
    }

    if (maxLength && rawValue.length > maxLength) return

    onChange(rawValue)
  }

  const baseClasses =
    'w-full bg-white text-gray-950 placeholder-gray-400 rounded-md border border-gray-300 font-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed outline-none focus:border-theme-primary'

  const sizeClasses = sizeStyles[size]
  const errorClasses = error ? 'border-red-500' : ''
  const disabledClasses = disabled ? 'cursor-not-allowed bg-neutral-50' : ''
  const labelSizeClasses = labelSizeStyles[size]
  const passwordWrapperClasses =
    'flex w-full items-center rounded-md border border-gray-300 bg-white font-light transition-colors focus-within:border-theme-primary'
  const passwordInputClasses =
    'min-w-0 flex-1 border-0 bg-transparent text-gray-950 outline-none placeholder-gray-400 disabled:cursor-not-allowed'

  return (
    <div className="w-full">
      { label && (
        <label
          htmlFor={ id }
          className={ `mb-1 block ${labelSizeClasses} font-medium text-gray-700` }
        >
          { label }
          { required && <span className="ml-1 text-red-500">*</span> }
        </label>
      ) }

      { isPassword ? (
        <div
          className={ `${passwordWrapperClasses} ${errorClasses} ${disabledClasses} ${className}` }
        >
          <input
            id={ id }
            type={ inputType }
            value={ value }
            placeholder={ placeholder }
            disabled={ disabled }
            readOnly={ readOnly }
            required={ required }
            maxLength={ maxLength }
            onChange={ (e) => handleChange(e) }
            onBlur={ onBlur }
            className={ `${passwordInputClasses} ${sizeClasses}` }
          />

          <button
            type="button"
            aria-label={ showPassword ? 'Hide password' : 'Show password' }
            title={ showPassword ? 'Hide password' : 'Show password' }
            disabled={ disabled }
            onClick={ () => setShowPassword((current) => !current) }
            className="mr-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-theme-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            <SVG type={ showPassword ? 'eye-close' : 'eye' } width={ 18 } height={ 18 } />
          </button>
        </div>
      ) : (
        <input
          id={ id }
          type={ inputType }
          value={ value }
          placeholder={ placeholder }
          disabled={ disabled }
          readOnly={ readOnly }
          required={ required }
          maxLength={ type !== 'number' ? maxLength : undefined }
          max={ type === 'number' ? max : undefined }
          min={ type === 'number' ? min : undefined }
          onChange={ (e) => handleChange(e) }
          onBlur={ onBlur }
          className={ `${baseClasses} ${sizeClasses} ${errorClasses} ${disabledClasses} ${className}` }
        />
      ) }

      { error && <p className="mt-1 text-sm text-red-600">{ error }</p> }
    </div>
  )
}

export default Input
