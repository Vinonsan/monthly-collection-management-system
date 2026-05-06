'use client'

import React from 'react'

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

      <input
        id={ id }
        type={ type }
        value={ value }
        placeholder={ placeholder }
        disabled={ disabled }
        readOnly={ readOnly }
        maxLength={ type !== 'number' ? maxLength : undefined }
        max={ type === 'number' ? max : undefined }
        min={ type === 'number' ? min : undefined }
        onChange={ (e) => handleChange(e) }
        onBlur={ onBlur }
        className={ `${baseClasses} ${sizeClasses} ${errorClasses} ${disabledClasses} ${className}` }
      />

      { error && <p className="mt-1 text-sm text-red-600">{ error }</p> }
    </div>
  )
}

export default Input
