'use client'

import React, { ReactNode } from 'react'

export type BadgeVariant =
  | 'primary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'secondary'
  | 'none'
type BadgeAppearance = 'solid' | 'outline'
type BadgeSize = 'xs' | 'sm' | 'md' | 'lg'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  appearance?: BadgeAppearance
  size?: BadgeSize
  className?: string
}

const sizeStyles: Record<BadgeSize, string> = {
  xs: 'px-1 py-0.5 text-[8px]',
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base'
}

const variantTokens: Record<
  BadgeVariant,
  {
    solid: {
      bg: string
      text: string
      border: string
    }
    outline: {
      bg: string
      text: string
      border: string
    }
  }
> = {
  primary: {
    solid: {
      bg: 'bg-theme-primary',
      text: 'text-white',
      border: 'border-2 border-theme-primary'
    },
    outline: {
      bg: 'bg-transparent',
      text: 'text-theme-primary',
      border: 'border-theme-primary'
    }
  },
  success: {
    solid: {
      bg: 'bg-green-600',
      text: 'text-white',
      border: 'border-2 border-green-100'
    },
    outline: {
      bg: 'bg-green-50',
      text: 'text-green-700',
      border: 'border-green-200'
    }
  },
  danger: {
    solid: {
      bg: 'bg-red-600',
      text: 'text-white',
      border: 'border-2 border-red-100'
    },
    outline: {
      bg: 'bg-red-50',
      text: 'text-red-700',
      border: 'border-red-200'
    }
  },
  warning: {
    solid: {
      bg: 'bg-yellow-600',
      text: 'text-white',
      border: 'border-2 border-yellow-100'
    },
    outline: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-700',
      border: 'border-yellow-200'
    }
  },
  info: {
    solid: {
      bg: 'bg-blue-600',
      text: 'text-white',
      border: 'border-blue-600'
    },
    outline: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200'
    }
  },
  secondary: {
    solid: {
      bg: 'bg-gray-500',
      text: 'text-white',
      border: 'border-gray-500'
    },
    outline: {
      bg: 'bg-gray-50',
      text: 'text-gray-600',
      border: 'border-gray-300'
    }
  },
  none: {
    solid: {
      bg: '',
      text: '',
      border: ''
    },
    outline: {
      bg: '',
      text: '',
      border: ''
    }
  }
}

const Badge = (props: BadgeProps) => {
  const {
    children,
    variant = 'secondary',
    appearance = 'solid',
    size = 'sm',
    className = ''
  } = props

  const baseClasses = 'inline-flex items-center justify-center rounded-full whitespace-nowrap'

  const sizeClasses = sizeStyles[size]

  const token = variantTokens[variant]
  const variantStyles = token[appearance]

  const variantClasses =
    variant === 'none'
      ? ''
      : `${variantStyles.bg} ${variantStyles.text} border ${variantStyles.border}`

  return (
    <span className={ `${baseClasses} ${sizeClasses} ${variantClasses} ${className}` }>
      { children }
    </span>
  )
}

export default Badge
