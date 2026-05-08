export type IconType =
  | 'sort-asc'
  | 'sort-desc'
  | 'date-picker'
  | 'curved-arrow'
  | 'chevron-down'
  | 'search'
  | 'plus'
  | 'edit'
  | 'delete'
  | 'close'
  | 'dashboard'
  | 'users'
  | 'wallet'
  | 'map'
  | 'reports'
  | 'settings'

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

    case 'plus':
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
            d="M10 4v12M4 10h12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )

    case 'edit':
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
            d="M11.7 4.3l4 4M4 16l4.4-.9 7.1-7.1a2.1 2.1 0 00-3-3L5.4 12.1 4 16z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )

    case 'delete':
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
            d="M4 6h12M8 6V4h4v2M6 6l.7 10h6.6L14 6"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
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

    case 'dashboard':
      return (
        <svg className={ className } width={ width || 18 } height={ height || 18 } viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 4h6v5H3V4zM11 4h6v3h-6V4zM11 9h6v7h-6V9zM3 11h6v5H3v-5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      )

    case 'users':
      return (
        <svg className={ className } width={ width || 18 } height={ height || 18 } viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.5 9a3 3 0 100-6 3 3 0 000 6zM2.5 16.5c.6-2.7 2.4-4.2 5-4.2s4.4 1.5 5 4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M13 9.2a2.4 2.4 0 100-4.8M13.7 12.4c2 .4 3.2 1.8 3.8 4.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )

    case 'wallet':
      return (
        <svg className={ className } width={ width || 18 } height={ height || 18 } viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 6.5A2.5 2.5 0 015.5 4H15a2 2 0 012 2v8a2 2 0 01-2 2H5.5A2.5 2.5 0 013 13.5v-7z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M13 10h4v3h-4a1.5 1.5 0 010-3z" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )

    case 'map':
      return (
        <svg className={ className } width={ width || 18 } height={ height || 18 } viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 17s5-4.4 5-9a5 5 0 10-10 0c0 4.6 5 9 5 9z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M10 10.2a2.2 2.2 0 100-4.4 2.2 2.2 0 000 4.4z" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )

    case 'reports':
      return (
        <svg className={ className } width={ width || 18 } height={ height || 18 } viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 16V9M10 16V4M16 16v-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M3 16.5h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )

    case 'settings':
      return (
        <svg className={ className } width={ width || 18 } height={ height || 18 } viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 12.8a2.8 2.8 0 100-5.6 2.8 2.8 0 000 5.6z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M16.5 11.2V8.8l-2-.5a5.5 5.5 0 00-.6-1.4l1-1.8-1.7-1.7-1.8 1a5.5 5.5 0 00-1.4-.6l-.5-2H7.1l-.5 2a5.5 5.5 0 00-1.4.6l-1.8-1-1.7 1.7 1 1.8a5.5 5.5 0 00-.6 1.4l-2 .5v2.4l2 .5c.1.5.3 1 .6 1.4l-1 1.8 1.7 1.7 1.8-1c.4.3.9.5 1.4.6l.5 2h2.4l.5-2c.5-.1 1-.3 1.4-.6l1.8 1 1.7-1.7-1-1.8c.3-.4.5-.9.6-1.4l2-.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      )

    default:
      return null
    }
  }

  return <>{ renderIcon() }</>
}

export default SVG
