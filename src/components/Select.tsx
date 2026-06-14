'use client'

import {
  forwardRef,
  Fragment,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import SVG from './Svg'

type OptionType = Record<string, unknown>
type SelectSize = 'sm' | 'md' | 'lg' | 'xl'
type SelectVariant = 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'secondary' | 'none'
type SelectAppearance = 'solid' | 'outline'

export interface AsyncSelectProps {
  fetchOptions: (_params: { page: number; limit: number; search?: string }) => Promise<{
    data: OptionType[]
    hasMore?: boolean
    totalCount?: number
  }>
  pageSize?: number
  minSearchLength?: number
  searchDelay?: number
}

export interface SelectRef {
  clearAsyncOptions: () => void
}

export interface ISelectProps {
  options: OptionType[]
  isMultiple?: boolean
  labelKey: string
  valueKey: string
  searchKey?: string | string[]
  placeholder?: string
  value?: string | number | (string | number)[] | null
  onChange?: (
    _value: string | number | (string | number)[] | null,
    _option: OptionType | OptionType[] | null
  ) => void
  disabled?: boolean
  required?: boolean
  error?: string
  label?: string
  size?: SelectSize
  variant?: SelectVariant
  appearance?: SelectAppearance
  className?: string
  searchable?: boolean
  position?: 'bottom' | 'top' | 'dynamic'
  async?: AsyncSelectProps
  renderOption?: (_option: OptionType, _isSelected: boolean) => ReactNode
  renderSelectedValue?: (_option: OptionType) => ReactNode
}

const sizeStyles: Record<SelectSize, string> = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-3 text-lg',
  xl: 'px-5 py-4 text-xl'
}

const labelSizeStyles: Record<SelectSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg'
}

const variantTokens: Record<
  SelectVariant,
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
      border: 'border-theme-primary'
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
      border: 'border-green-600'
    },
    outline: {
      bg: 'bg-transparent',
      text: 'text-green-600',
      border: 'border-green-600'
    }
  },
  danger: {
    solid: {
      bg: 'bg-red-600',
      text: 'text-white',
      border: 'border-red-600'
    },
    outline: {
      bg: 'bg-transparent',
      text: 'text-red-600',
      border: 'border-red-600'
    }
  },
  warning: {
    solid: {
      bg: 'bg-yellow-600',
      text: 'text-white',
      border: 'border-yellow-600'
    },
    outline: {
      bg: 'bg-transparent',
      text: 'text-yellow-600',
      border: 'border-yellow-600'
    }
  },
  info: {
    solid: {
      bg: 'bg-blue-600',
      text: 'text-white',
      border: 'border-blue-600'
    },
    outline: {
      bg: 'bg-transparent',
      text: 'text-blue-600',
      border: 'border-blue-600'
    }
  },
  secondary: {
    solid: {
      bg: 'bg-gray-600',
      text: 'text-white',
      border: 'border-gray-600'
    },
    outline: {
      bg: 'bg-transparent',
      text: 'text-gray-600',
      border: 'border-gray-600'
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

const getNestedValue = (obj: OptionType, path: string): string | number | undefined => {
  if (!path) return undefined
  return path.split('.').reduce((acc: unknown, key: string) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key]
    }
    return undefined
  }, obj) as string | number | undefined
}

const Select = forwardRef<SelectRef, ISelectProps>((props, ref) => {
  const {
    options,
    isMultiple = false,
    labelKey,
    valueKey,
    searchKey,
    placeholder = 'Select',
    onChange,
    disabled = false,
    required = false,
    error,
    label,
    size = 'md',
    variant = 'none',
    appearance = 'solid',
    className = '',
    searchable = false,
    position = 'dynamic',
    value,
    async,
    renderOption,
    renderSelectedValue
  } = props

  const getInitialSelectedFromValue = (
    val: string | number | (string | number)[] | null,
    opts: OptionType[],
    valKey: string,
    multiple: boolean
  ): OptionType[] => {
    if (val === null || val === undefined) return []

    if (multiple && Array.isArray(val)) {
      return opts.filter((opt) => {
        const optValue = getNestedValue(opt, valKey)
        return optValue !== undefined && val.includes(optValue)
      })
    } else if (!multiple && !Array.isArray(val)) {
      const found = opts.find((opt) => getNestedValue(opt, valKey) === val)
      return found ? [found] : []
    }

    return []
  }

  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<OptionType[]>(() => {
    if (value !== undefined) {
      return getInitialSelectedFromValue(value, options, valueKey, isMultiple)
    }
    return []
  })
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom')

  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [asyncOptions, setAsyncOptions] = useState<OptionType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [asyncError, setAsyncError] = useState<string | null>(null)
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null)

  useImperativeHandle(
    ref,
    () => ({
      clearAsyncOptions: () => {
        setAsyncOptions([])
        setSelected([])
        setAsyncError(null)
        setCurrentPage(1)
        setHasMore(true)
      }
    }),
    []
  )

  const fetchAsyncOptions = useCallback(
    async(page: number = 1, searchTerm?: string, append: boolean = false) => {
      if (!async?.fetchOptions) return

      setIsLoading(true)
      setAsyncError(null)

      try {
        const result = await async.fetchOptions({
          page,
          limit: async.pageSize || 10,
          search: searchTerm
        })

        if (append) {
          setAsyncOptions((prev) => [...prev, ...result.data])
        } else {
          setAsyncOptions(result.data)
        }

        let hasMoreData = false

        if (result.hasMore !== undefined) {
          hasMoreData = result.hasMore
        } else if (result.data.length === 0) {
          hasMoreData = false
        } else if (result.data.length < (async.pageSize || 10)) {
          hasMoreData = false
        } else if (result.totalCount !== undefined) {
          const currentTotalData = append
            ? asyncOptions.length + result.data.length
            : result.data.length
          hasMoreData = currentTotalData < result.totalCount
        } else {
          hasMoreData = result.data.length === (async.pageSize || 10)
        }

        setHasMore(hasMoreData)
        setCurrentPage(page)
      } catch (error) {
        setAsyncError(error instanceof Error ? error.message : 'Failed to fetch options')
      } finally {
        setIsLoading(false)
      }
    },
    [async, asyncOptions.length]
  )

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore && async) {
      fetchAsyncOptions(currentPage + 1, search, true)
    }
  }, [isLoading, hasMore, currentPage, search, fetchAsyncOptions, async])

  const handleSearchChange = useCallback(
    (searchValue: string) => {
      setSearch(searchValue)

      if (searchTimeout) {
        clearTimeout(searchTimeout)
      }

      const timeout = setTimeout(() => {
        if (async) {
          const minLength = async.minSearchLength || 0
          if (searchValue.length >= minLength) {
            fetchAsyncOptions(1, searchValue, false)
          } else if (searchValue.length === 0) {
            fetchAsyncOptions(1, undefined, false)
          }
        }
      }, async?.searchDelay || 300)

      setSearchTimeout(timeout)
    },
    [async, searchTimeout, fetchAsyncOptions]
  )

  useEffect(() => {
    if (!isOpen) {
      setSearch('')
    }
  }, [isOpen])

  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout)
      }
    }
  }, [searchTimeout])

  const calculateDropdownPosition = useCallback(() => {
    if (!containerRef.current) return 'bottom'
    if (position === 'bottom') return 'bottom'
    if (position === 'top') return 'top'

    const containerRect = containerRef.current.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const dropdownHeight = 240
    const spaceBelow = viewportHeight - containerRect.bottom
    const spaceAbove = containerRect.top

    if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
      return 'top'
    }

    return 'bottom'
  }, [position])

  useEffect(() => {
    if (value !== undefined) {
      const merged = async ? [...asyncOptions, ...options] : options
      const seen = new Set<string | number>()
      const deduped = merged.filter((opt) => {
        const val = getNestedValue(opt, valueKey)
        if (val === undefined) return false
        if (seen.has(val)) return false
        seen.add(val)
        return true
      })
      const newSelected = getInitialSelectedFromValue(value, deduped, valueKey, isMultiple)
      setSelected(newSelected)
    }
  }, [value, options, valueKey, isMultiple, async, asyncOptions])

  useEffect(() => {
    if (isOpen && async && asyncOptions.length === 0 && !isLoading) {
      fetchAsyncOptions(1)
    }
  }, [isOpen, async, asyncOptions.length, isLoading, fetchAsyncOptions])

  useEffect(() => {
    if (async && value !== undefined && asyncOptions.length > 0 && selected.length === 0) {
      const newSelected = getInitialSelectedFromValue(value, asyncOptions, valueKey, isMultiple)
      setSelected(newSelected)
    }
  }, [async, value, asyncOptions, selected.length, valueKey, isMultiple])

  useEffect(() => {
    if (
      async &&
      value !== undefined &&
      selected.length === 0 &&
      asyncOptions.length === 0 &&
      !isLoading
    ) {
      if (typeof value === 'string' || typeof value === 'number') {
        fetchAsyncOptions(1, value.toString())
      }
    }
  }, [async, value, selected.length, asyncOptions.length, isLoading, fetchAsyncOptions])

  useEffect(() => {
    if (isOpen) {
      const position = calculateDropdownPosition()
      setDropdownPosition(position)
      if (searchable && inputRef.current) {
        setTimeout(() => {
          inputRef.current?.focus()
        }, 0)
      }
    }
  }, [isOpen, searchable, calculateDropdownPosition])

  useEffect(() => {
    if (!isOpen || position !== 'dynamic') return

    let timeoutId: NodeJS.Timeout
    const handleScroll = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        const calculatedPosition = calculateDropdownPosition()
        setDropdownPosition(calculatedPosition)
      }, 16)
    }

    window.addEventListener('scroll', handleScroll, true)
    window.addEventListener('resize', handleScroll)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('scroll', handleScroll, true)
      window.removeEventListener('resize', handleScroll)
    }
  }, [isOpen, position, calculateDropdownPosition])

  const baseClasses =
    'w-full rounded-md font-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed outline-none'

  const sizeClasses = sizeStyles[size]
  const labelSizeClasses = labelSizeStyles[size]

  const token = variantTokens[variant]
  const variantStyles = token[appearance]

  const variantClasses =
    variant === 'none'
      ? 'border border-gray-300 bg-white text-gray-950'
      : `border bg-white text-gray-950 ${variantStyles.border}`

  const errorClasses = error ? 'border-red-500' : ''
  const disabledClasses = disabled
    ? 'cursor-not-allowed bg-neutral-50'
    : 'cursor-pointer'
  const openClasses = isOpen ? 'outline-none' : ''

  const currentOptions = async ? asyncOptions : options

  const filteredOptions = async
    ? currentOptions
    : search
      ? options.filter((opt) => {
        const keys = Array.isArray(searchKey) ? searchKey : [searchKey || labelKey]
        return keys.some((key) => {
          const searchValue = getNestedValue(opt, key)
          return searchValue?.toString().toLowerCase().includes(search.toLowerCase())
        })
      })
      : options

  const handleSelect = (option: OptionType) => {
    if (isMultiple) {
      const alreadySelected = selected.some(
        (s) => getNestedValue(s, valueKey) === getNestedValue(option, valueKey)
      )
      const newSelected = alreadySelected
        ? selected.filter((s) => getNestedValue(s, valueKey) !== getNestedValue(option, valueKey))
        : [...selected, option]

      setSelected(newSelected)
      onChange?.(
        newSelected.map((s) => getNestedValue(s, valueKey)) as (string | number)[],
        newSelected
      )
    } else {
      setSelected([option])
      onChange?.(getNestedValue(option, valueKey) as string | number, option)
      setIsOpen(false)
      setSearch('')
    }
  }

  const isSelected = (option: OptionType) =>
    selected.some((s) => getNestedValue(s, valueKey) === getNestedValue(option, valueKey))

  const handleSelectAll = () => {
    if (!isMultiple) return

    if (selected.length === filteredOptions.length) {
      setSelected([])
      onChange?.([], [])
    } else {
      setSelected(filteredOptions)
      onChange?.(
        filteredOptions.map((opt) => getNestedValue(opt, valueKey) as string | number),
        filteredOptions
      )
    }
  }

  const isAllSelected =
    isMultiple && selected.length === filteredOptions.length && filteredOptions.length > 0

  const removeItem = (index: number) => {
    const newSelected = selected.filter((_, i) => i !== index)
    setSelected(newSelected)
    onChange?.(
      newSelected.map((s) => getNestedValue(s, valueKey)) as (string | number)[],
      newSelected
    )
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (!isOpen || !async || !dropdownRef.current) return

    const dropdown = dropdownRef.current
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = dropdown
      if (scrollTop + clientHeight >= scrollHeight - 10 && hasMore && !isLoading) {
        loadMore()
      }
    }

    dropdown.addEventListener('scroll', handleScroll)
    return () => dropdown.removeEventListener('scroll', handleScroll)
  }, [isOpen, async, hasMore, isLoading, loadMore])

  const displayValue = selected.length
    ? isMultiple
      ? ''
      : getNestedValue(selected[0], labelKey)
    : ''

  return (
    <div className="w-full">
      { label && (
        <label
          className={ `mb-1 block ${labelSizeClasses} font-medium text-gray-700` }
        >
          { label }
          { required && <span className="text-error ml-1">*</span> }
        </label>
      ) }
      <div ref={ containerRef } className="relative w-full">
        <div
          className={ `flex items-center ${baseClasses} ${sizeClasses} ${variantClasses} ${errorClasses} ${disabledClasses} ${openClasses} ${className}` }
          onClick={ () => !disabled && setIsOpen(!isOpen) }
        >
          { isMultiple && selected.length > 0 ? (
            <div className="flex flex-1 flex-wrap gap-1">
              { selected.map((item, index) => (
                <div
                  key={ index }
                  className="flex items-center rounded bg-blue-100 px-2 py-1 text-xs"
                >
                  { renderSelectedValue
                    ? renderSelectedValue(item)
                    : renderOption
                      ? renderOption(item, true)
                      : getNestedValue(item, labelKey) }
                  <button
                    type="button"
                    onClick={ (e) => {
                      e.stopPropagation()
                      removeItem(index)
                    } }
                    className="ml-1 text-gray-500 hover:text-gray-800"
                    aria-label="Remove selected option"
                  >
                    <SVG type="close" width={ 12 } height={ 12 } />
                  </button>
                </div>
              )) }
            </div>
          ) : (
            <span
              className={ `flex-1 ${displayValue ? 'text-gray-950' : 'text-gray-400'}` }
            >
              { renderSelectedValue && selected.length > 0
                ? renderSelectedValue(selected[0])
                : renderOption && selected.length > 0
                  ? renderOption(selected[0], true)
                  : displayValue || placeholder }
            </span>
          ) }

          { !disabled && (
            <span className={ `ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}` }>
              <SVG type="chevron-down" className="text-black/50" width={ 16 } height={ 16 } />
            </span>
          ) }
        </div>

        { isOpen && !disabled && (
          <div
            ref={ dropdownRef }
            className={ `absolute z-50 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg ${
              dropdownPosition === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'
            }` }
          >
            { searchable && (
              <div className="sticky top-0 z-30 bg-white p-3">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <SVG type="search" className="text-gray-400" width={ 16 } height={ 16 } />
                  </div>

                  <input
                    ref={ inputRef }
                    type="text"
                    placeholder="Search"
                    value={ search }
                    onChange={ (e) =>
                      async ? handleSearchChange(e.target.value) : setSearch(e.target.value)
                    }
                    className="w-full rounded-md border border-gray-300 p-2 pl-10 text-sm text-gray-950 outline-none placeholder:text-gray-400 focus:border-theme-primary"
                    onClick={ (e) => e.stopPropagation() }
                  />
                </div>
              </div>
            ) }

            { asyncError ? (
              <div className="p-3 text-sm text-red-500">Error: { asyncError }</div>
            ) : filteredOptions.length === 0 && !isLoading ? (
              <div className="p-3 text-sm text-gray-500">
                { async ? 'No options found' : 'No options available' }
              </div>
            ) : (
              <Fragment>
                { isMultiple && (
                  <div
                    className={ `flex cursor-pointer items-center px-4 py-2 hover:bg-blue-50 ${
                      isAllSelected ? 'bg-blue-100 font-medium' : ''
                    }` }
                    onClick={ handleSelectAll }
                  >
                    <input
                      type="checkbox"
                      checked={ isAllSelected }
                      onChange={ handleSelectAll }
                      className="mr-2 h-4 w-4"
                      onClick={ (e) => e.stopPropagation() }
                    />
                    <span className="text-sm font-medium text-gray-800">
                      Select All
                    </span>
                  </div>
                ) }

                { filteredOptions.map((option, index) => (
                  <div
                    key={ index }
                    className={ `flex cursor-pointer items-center px-4 py-2 hover:bg-blue-50 ${
                      isSelected(option) ? 'bg-blue-100 font-medium' : ''
                    }` }
                    onClick={ () => handleSelect(option) }
                  >
                    { isMultiple && (
                      <input
                        type="checkbox"
                        checked={ isSelected(option) }
                        onChange={ () => handleSelect(option) }
                        className="mr-2 h-4 w-4"
                        onClick={ (e) => e.stopPropagation() }
                      />
                    ) }
                    { renderOption ? (
                      renderOption(option, isSelected(option))
                    ) : (
                      <span className="text-gray-800">
                        { getNestedValue(option, labelKey) }
                      </span>
                    ) }
                  </div>
                )) }

                { isLoading && <div className="p-3 text-sm text-gray-500">Loading...</div> }
              </Fragment>
            ) }
          </div>
        ) }

        { error && <p className="mt-1 text-sm text-red-600">{ error }</p> }
      </div>
    </div>
  )
})

Select.displayName = 'Select'

export default Select
