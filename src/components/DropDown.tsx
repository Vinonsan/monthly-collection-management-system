'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import SVG from './Svg'

type DropDownSize = 'sm' | 'md' | 'lg'
type DropDownVariant = 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'secondary'

export interface DropDownItem {
  label: string
  value: string
  disabled?: boolean
}

interface DropDownProps {
  label: ReactNode
  items: DropDownItem[]
  onSelect?: (_item: DropDownItem) => void
  size?: DropDownSize
  variant?: DropDownVariant
  disabled?: boolean
  className?: string
}

const sizeStyles: Record<DropDownSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-12 px-5 text-lg'
}

const variantStyles: Record<DropDownVariant, string> = {
  primary: 'bg-theme-primary text-white border-theme-primary hover:bg-blue-700',
  success: 'bg-green-600 text-white border-green-600 hover:bg-green-700',
  danger: 'bg-red-600 text-white border-red-600 hover:bg-red-700',
  warning: 'bg-yellow-600 text-white border-yellow-600 hover:bg-yellow-700',
  info: 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700',
  secondary: 'bg-gray-700 text-white border-gray-700 hover:bg-gray-800'
}

const DropDown = (props: DropDownProps) => {
  const {
    label,
    items,
    onSelect,
    size = 'md',
    variant = 'secondary',
    disabled = false,
    className = ''
  } = props

  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (item: DropDownItem) => {
    if (item.disabled) return

    onSelect?.(item)
    setIsOpen(false)
  }

  return (
    <div ref={ containerRef } className={ `relative inline-block ${className}` }>
      <button
        type="button"
        disabled={ disabled }
        onClick={ () => setIsOpen((current) => !current) }
        className={ `inline-flex items-center justify-center gap-2 rounded-md border font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${sizeStyles[size]} ${variantStyles[variant]}` }
      >
        { label }
        <span className={ `text-sm leading-none transition-transform ${isOpen ? 'rotate-180' : ''}` }>
          <SVG type="chevron-down" width={ 16 } height={ 16 } />
        </span>
      </button>

      { isOpen && !disabled && (
        <div className="absolute right-0 z-50 mt-2 min-w-44 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg">
          { items.map((item) => (
            <button
              key={ item.value }
              type="button"
              disabled={ item.disabled }
              onClick={ () => handleSelect(item) }
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              { item.label }
            </button>
          )) }
        </div>
      ) }
    </div>
  )
}

export default DropDown
