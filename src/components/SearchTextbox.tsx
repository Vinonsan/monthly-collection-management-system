'use client'

import SVG from './Svg'

interface SearchTextboxProps {
  id: string
  value: string
  placeholder?: string
  label?: string
  className?: string
  onChange: (_value: string) => void
}

const SearchTextbox = (props: SearchTextboxProps) => {
  const {
    id,
    value,
    placeholder = 'Search',
    label,
    className = '',
    onChange
  } = props

  return (
    <div className={ `w-full ${className}` }>
      { label && (
        <label htmlFor={ id } className="mb-1 block text-sm font-medium text-gray-700">
          { label }
        </label>
      ) }

      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
          <SVG type="search" width={ 17 } height={ 17 } />
        </span>

        <input
          id={ id }
          type="search"
          value={ value }
          placeholder={ placeholder }
          onChange={ (event) => onChange(event.target.value) }
          className="h-10 w-full rounded-md border border-gray-300 bg-white py-2 pr-3 pl-10 text-sm text-gray-950 outline-none transition-colors placeholder:text-gray-400 focus:border-theme-primary"
        />
      </div>
    </div>
  )
}

export default SearchTextbox
