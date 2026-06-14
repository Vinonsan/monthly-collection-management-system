'use client'

import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant =
  | 'primary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'secondary'

export type ButtonAppearance = 'solid' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  appearance?: ButtonAppearance
  size?: ButtonSize
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-12 px-5 text-lg',
  xl: 'h-14 px-6 text-xl'
}

const variantStyles: Record<ButtonVariant, Record<ButtonAppearance, string>> = {
  primary: {
    solid: 'bg-theme-primary text-white border-theme-primary hover:bg-theme-primary/90',
    outline:
      'bg-transparent text-theme-primary border-theme-primary hover:bg-theme-primary/10',
    ghost: 'border-transparent text-theme-primary hover:bg-theme-primary/80'
  },
  success: {
    solid: 'bg-green-600 text-white border-green-600 hover:bg-green-700',
    outline:
      'bg-transparent text-green-700 border-green-300 hover:bg-green-50',
    ghost:
      'border-transparent text-green-700 hover:bg-green-50'
  },
  danger: {
    solid: 'bg-red-800 text-white  border-red-100 hover:bg-red-700',
    outline:
      'bg-transparent text-red-700 border-red-300 hover:bg-red-50',
    ghost:
      'border-transparent text-red-700 hover:bg-red-50'
  },
  warning: {
    solid: 'bg-yellow-600 text-white border-yellow-600 hover:bg-yellow-700',
    outline:
      'bg-transparent text-yellow-700 border-yellow-300 hover:bg-yellow-50',
    ghost:
      'border-transparent text-yellow-700 hover:bg-yellow-50'
  },
  info: {
    solid: 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700',
    outline:
      'bg-transparent text-blue-700 border-blue-300 hover:bg-blue-50',
    ghost:
      'border-transparent text-blue-700 hover:bg-blue-50'
  },
  secondary: {
    solid: 'bg-gray-700 text-white border-gray-700 hover:bg-gray-800',
    outline:
      'bg-transparent text-gray-700 border-gray-300 hover:bg-gray-50',
    ghost:
      'border-transparent text-gray-700 hover:bg-gray-50'
  }
}

const Button = (props: ButtonProps) => {
  const {
    children,
    variant = 'primary',
    appearance = 'solid',
    size = 'md',
    className = '',
    type = 'button',
    ...buttonProps
  } = props

  const baseClasses =
    'inline-flex items-center justify-center rounded-md border font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-theme-primary/30 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer'

  return (
    <button
      type={ type }
      className={ `${baseClasses} ${sizeStyles[size]} ${variantStyles[variant][appearance]} ${className}` }
      { ...buttonProps }
    >
      { children }
    </button>
  )
}

export default Button
