'use client'

import { useCallback } from 'react'
import { toast } from 'react-toastify'

interface ErrorWithMessage {
  data?: {
    message?: string
  }
  message?: string
}

const extractErrorMessage = (error: unknown): string => {
  if (typeof error === 'string') return error

  const err = error as ErrorWithMessage

  if (err?.data?.message) return err.data.message
  if (err?.message) return err.message

  return 'Something went wrong'
}

export const useErrorHandler = () => {
  const handleError = useCallback((error: unknown) => {
    const message = extractErrorMessage(error)
    toast.error(message)
  }, [])

  const showSuccess = useCallback((message: string) => {
    toast.success(message)
  }, [])

  return { handleError, showSuccess }
}
