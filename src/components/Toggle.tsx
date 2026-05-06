'use client'

type ToggleSize = 'sm' | 'md' | 'lg' | 'xl'
type ToggleVariant = 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'secondary' | 'none'
type ToggleAppearance = 'solid' | 'outline'

interface ToggleProps {
  _checked: boolean
  onChange: (_checked: boolean) => void
  disabled?: boolean
  size?: ToggleSize
  variant?: ToggleVariant
  appearance?: ToggleAppearance
  label?: string
  className?: string
}

const sizeStyles: Record<ToggleSize, { container: string; thumb: string; translate: string }> = {
  sm: {
    container: 'h-5 w-9',
    thumb: 'h-4 w-4',
    translate: 'translate-x-4'
  },
  md: {
    container: 'h-7 w-12',
    thumb: 'h-5 w-5',
    translate: 'translate-x-6'
  },
  lg: {
    container: 'h-9 w-16',
    thumb: 'h-7 w-7',
    translate: 'translate-x-8'
  },
  xl: {
    container: 'h-11 w-20',
    thumb: 'h-9 w-9',
    translate: 'translate-x-10'
  }
}

const variantTokens: Record<
  ToggleVariant,
  {
    solid: {
      checked: string
      unchecked: string
      thumbChecked?: string
    }
    outline: {
      checked: string
      unchecked: string
      thumbChecked?: string
    }
  }
> = {
  primary: {
    solid: {
      checked: 'bg-theme-primary',
      unchecked: 'bg-gray-300'
    },
    outline: {
      checked: 'bg-transparent border-2 border-theme-primary',
      unchecked: 'bg-transparent border-2 border-gray-300',
      thumbChecked: 'bg-theme-primary'
    }
  },
  success: {
    solid: {
      checked: 'bg-green-600',
      unchecked: 'bg-gray-300'
    },
    outline: {
      checked: 'bg-transparent border-2 border-green-600',
      unchecked: 'bg-transparent border-2 border-gray-300',
      thumbChecked: 'bg-green-600'
    }
  },
  danger: {
    solid: {
      checked: 'bg-red-600',
      unchecked: 'bg-gray-300'
    },
    outline: {
      checked: 'bg-transparent border-2 border-red-600',
      unchecked: 'bg-transparent border-2 border-gray-300',
      thumbChecked: 'bg-red-600'
    }
  },
  warning: {
    solid: {
      checked: 'bg-yellow-600',
      unchecked: 'bg-gray-300'
    },
    outline: {
      checked: 'bg-transparent border-2 border-yellow-600',
      unchecked: 'bg-transparent border-2 border-gray-300',
      thumbChecked: 'bg-yellow-600'
    }
  },
  info: {
    solid: {
      checked: 'bg-blue-600',
      unchecked: 'bg-gray-300'
    },
    outline: {
      checked: 'bg-transparent border-2 border-blue-600',
      unchecked: 'bg-transparent border-2 border-gray-300',
      thumbChecked: 'bg-blue-600'
    }
  },
  secondary: {
    solid: {
      checked: 'bg-gray-600',
      unchecked: 'bg-gray-300'
    },
    outline: {
      checked: 'bg-transparent border-2 border-gray-600',
      unchecked: 'bg-transparent border-2 border-gray-300',
      thumbChecked: 'bg-gray-600'
    }
  },
  none: {
    solid: {
      checked: 'bg-indigo-500',
      unchecked: 'bg-gray-300'
    },
    outline: {
      checked: 'bg-transparent border-2 border-indigo-500',
      unchecked: 'bg-transparent border-2 border-gray-300',
      thumbChecked: 'bg-indigo-500'
    }
  }
}

const Toggle = (props: ToggleProps) => {
  const {
    _checked,
    onChange,
    disabled = false,
    size = 'md',
    variant = 'none',
    appearance = 'solid',
    label,
    className = ''
  } = props

  const sizeStyle = sizeStyles[size]

  const handleClick = () => {
    if (!disabled) {
      onChange(!_checked)
    }
  }

  const baseClasses =
    'relative inline-flex items-center rounded-full transition-colors duration-200'

  const containerClasses = sizeStyle.container

  const token = variantTokens[variant]
  const variantStyles = token[appearance]

  const variantClasses = _checked ? variantStyles.checked : variantStyles.unchecked

  const disabledClasses = disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
  const labelClasses = disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'

  const thumbColor =
    appearance === 'outline' && _checked && variantStyles.thumbChecked
      ? variantStyles.thumbChecked
      : 'bg-white'

  const thumbClasses = `inline-block transform rounded-full ${thumbColor} shadow transition-transform duration-200 ${sizeStyle.thumb} ${_checked ? sizeStyle.translate : 'translate-x-1'}`

  return (
    <label className={ `inline-flex items-center gap-3 ${labelClasses}` }>
      <button
        type="button"
        role="switch"
        aria-checked={ _checked }
        disabled={ disabled }
        onClick={ handleClick }
        className={ `${baseClasses} ${containerClasses} ${variantClasses} ${disabledClasses} ${className}` }
      >
        <span className={ thumbClasses } />
      </button>

      { label && (
        <span className="text-sm font-medium text-black/70">{ label }</span>
      ) }
    </label>
  )
}

export default Toggle
