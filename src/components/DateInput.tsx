'use client'

import { forwardRef, useState } from 'react'

type DateInputSize = 'sm' | 'md' | 'lg' | 'xl'
type DateInputVariant = 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'secondary' | 'none'
type DateInputAppearance = 'solid' | 'outline'

export interface IStyle {
  [key: string]: string | number | undefined
}

export interface IDateInputProps {
  name?: string
  placeholder?: string
  value?: Date | null
  defaultValue?: Date | null
  disabled?: boolean
  required?: boolean
  error?: string
  label?: string
  size?: DateInputSize
  variant?: DateInputVariant
  appearance?: DateInputAppearance
  style?: IStyle
  className?: string
  onChange?: (_value: Date | null) => void
  onBlur?: () => void
  minDate?: Date
  maxDate?: Date
  format?: string
  iconWidth?: number | string
  iconHeight?: number | string
}

const sizeStyles: Record<DateInputSize, string> = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-3 text-lg',
  xl: 'px-5 py-4 text-xl'
}

const labelSizeStyles: Record<DateInputSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg'
}

const variantBorders: Record<DateInputVariant, string> = {
  primary: 'border-theme-primary',
  success: 'border-green-600',
  danger: 'border-red-600',
  warning: 'border-yellow-600',
  info: 'border-blue-600',
  secondary: 'border-gray-600',
  none: 'border-gray-300'
}

const toInputDate = (date?: Date | null) => {
  if (!date) return ''

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

const fromInputDate = (value: string) => {
  if (!value) return null

  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

const DateInput = forwardRef<HTMLDivElement, IDateInputProps>((props, ref) => {
  const {
    name,
    placeholder = 'Select Date',
    value,
    defaultValue,
    disabled = false,
    required = false,
    error,
    label,
    size = 'md',
    variant = 'none',
    className = '',
    onChange,
    onBlur,
    minDate,
    maxDate,
    style
  } = props

  const [internalValue, setInternalValue] = useState<Date | null>(defaultValue ?? null)
  const currentDate = value !== undefined ? value : internalValue

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = fromInputDate(event.target.value)

    if (value === undefined) {
      setInternalValue(nextValue)
    }

    onChange?.(nextValue)
  }

  const baseClasses =
    'w-full rounded-md border bg-white text-gray-950 font-light transition-colors outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:opacity-50 focus:border-theme-primary'

  const errorClasses = error ? 'border-red-500 focus:border-red-500' : ''

  return (
    <div className="w-full" ref={ ref } style={ style }>
      { label && (
        <label
          htmlFor={ name }
          className={ `mb-1 block ${labelSizeStyles[size]} font-medium text-gray-700` }
        >
          { label }
          { required && <span className="ml-1 text-red-500">*</span> }
        </label>
      ) }

      <input
        id={ name }
        name={ name }
        type="date"
        value={ toInputDate(currentDate) }
        min={ toInputDate(minDate) || undefined }
        max={ toInputDate(maxDate) || undefined }
        placeholder={ placeholder }
        disabled={ disabled }
        required={ required }
        onChange={ handleChange }
        onBlur={ onBlur }
        className={ `${baseClasses} ${sizeStyles[size]} ${variantBorders[variant]} ${errorClasses} ${className}` }
      />

      { error && <p className="mt-1 text-sm text-red-600">{ error }</p> }
    </div>
  )
})

DateInput.displayName = 'DateInput'

export default DateInput
