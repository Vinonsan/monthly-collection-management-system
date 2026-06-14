import { z } from 'zod'

export const locationSchema = z.object({
  locationCode: z.string(),
  locationName: z.string().trim().min(1, 'Location name is required'),
  address: z.string(),
  collector: z.string(),
  status: z.enum(['Active', 'Inactive'])
})
