'use client'

import { ReactNode, useEffect } from 'react'
import Button from './Button'
import SVG from './Svg'

type ModalSize = 'sm' | 'md' | 'lg' | 'xl'

interface ModalProps {
  open: boolean
  title?: ReactNode
  children: ReactNode
  footer?: ReactNode
  size?: ModalSize
  closeOnOverlayClick?: boolean
  onClose: () => void
}

const sizeStyles: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl'
}

const Modal = (props: ModalProps) => {
  const {
    open,
    title,
    children,
    footer,
    size = 'md',
    closeOnOverlayClick = true,
    onClose
  } = props

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose, open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <button
        type="button"
        aria-label="Close modal overlay"
        className="absolute inset-0 cursor-default"
        onClick={ closeOnOverlayClick ? onClose : undefined }
      />

      <section
        role="dialog"
        aria-modal="true"
        className={ `relative z-10 w-full rounded-md bg-white shadow-xl ${sizeStyles[size]}` }
      >
        <header className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-gray-950">{ title }</h2>
          <Button
            variant="secondary"
            appearance="ghost"
            size="sm"
            className="h-16 w-16 px-0"
            aria-label="Close modal"
            onClick={ onClose }
          >
            <SVG type="close" width={ 32 } height={ 32 } />
          </Button>
        </header>

        <div className="px-5 py-4 text-sm leading-6 text-gray-700">{ children }</div>

        { footer && (
          <footer className="flex justify-end gap-3 border-t border-gray-200 px-5 py-4">
            { footer }
          </footer>
        ) }
      </section>
    </div>
  )
}

export default Modal
