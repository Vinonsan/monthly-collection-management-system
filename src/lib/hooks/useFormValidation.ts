'use client'

import { useState } from 'react'
import type { z } from 'zod'

export type FormValidationErrors<TForm extends object> = Partial<Record<keyof TForm, string>>

export const getFieldError = <TForm extends object>(
  errors: FormValidationErrors<TForm>,
  field: keyof TForm
) => errors[field]

export const useFormValidation = <TForm extends object>(schema: z.ZodType<TForm>) => {
  const [errors, setErrors] = useState<FormValidationErrors<TForm>>({})

  const validateForm = (form: TForm) => {
    const result = schema.safeParse(form)

    if (result.success) {
      setErrors({})
      return true
    }

    const nextErrors = result.error.issues.reduce((current, issue) => {
      const field = issue.path[0] as keyof TForm | undefined

      if (!field || current[field]) return current

      current[field] = issue.message
      return current
    }, {} as FormValidationErrors<TForm>)

    setErrors(nextErrors)
    return false
  }

  const clearErrors = () => {
    setErrors({})
  }

  return {
    errors,
    validateForm,
    clearErrors
  }
}
