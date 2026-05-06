export type IconType =
  | 'sort-asc'
  | 'sort-desc'
  | 'date-picker'
  | 'curved-arrow'
  | 'chevron-down'
  | 'search'
  | 'close'

export interface ISVGProps {
  type: IconType
  className?: string
  width?: number | string
  height?: number | string
}

const SVG = (props: ISVGProps) => {
  const { type, className = '', width, height } = props

  const renderIcon = () => {
    switch (type) {
    case 'sort-asc':
      return (
        <svg
          className={ className }
          width={ width || 20 }
          height={ height || 20 }
          viewBox="0 0 20 20"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
      )

    case 'sort-desc':
      return (
        <svg
          className={ className }
          width={ width || 20 }
          height={ height || 20 }
          viewBox="0 0 20 20"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      )

    case 'date-picker':
      return (
        <svg
          className={ className }
          width={ width || 20 }
          height={ height || 20 }
          viewBox="0 0 20 20"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clipRule="evenodd"
          />
        </svg>
      )

    case 'curved-arrow':
      return (
        <svg
          className={ className }
          width={ width || 64 }
          height={ height || 40 }
          viewBox="0 0 64 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 20 C10 12, 20 8, 28 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="2 4"
          />
          <path
            d="M28 10
           C36 12, 36 20, 36 20
           C37 26, 32 30, 28 24
           C26 21, 28 18, 32 20
           C38 24, 46 26, 54 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M54 24 L48 20 M54 24 L48 28"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )

    case 'chevron-down':
      return (
        <svg
          className={ className }
          width={ width || 16 }
          height={ height || 16 }
          viewBox="0 0 20 20"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      )

    case 'search':
      return (
        <svg
          className={ className }
          width={ width || 16 }
          height={ height || 16 }
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 15a6 6 0 100-12 6 6 0 000 12z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M13.5 13.5L17 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )

    case 'close':
      return (
        <svg
          className={ className }
          width={ width || 16 }
          height={ height || 16 }
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 5l10 10M15 5L5 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )

    default:
      return null
    }
  }

  return <>{ renderIcon() }</>
}

export default SVG
