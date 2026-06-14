'use client'

import { useForm, type FieldErrors, type FieldValues, type Resolver, type UseFormProps } from 'react-hook-form'
import type { z } from 'zod'

const createZodResolver = <TForm extends FieldValues>(
  schema: z.ZodType<TForm>
): Resolver<TForm> => async (values) => {
  const result = schema.safeParse(values)

  if (result.success) {
    return {
      values: result.data,
      errors: {}
    }
  }

  const errors = result.error.issues.reduce((current, issue) => {
    const field = issue.path[0]

    if (typeof field !== 'string' || current[field]) return current

    current[field] = {
      type: issue.code,
      message: issue.message
    }

    return current
  }, {} as Record<string, { type: string, message: string }>)

  return {
    values: {},
    errors: errors as FieldErrors<TForm>
  }
}

export const useZodForm = <TForm extends FieldValues>(
  schema: z.ZodType<TForm>,
  options?: Omit<UseFormProps<TForm>, 'resolver'>
) => useForm<TForm>({
  ...options,
  resolver: createZodResolver(schema)
})
