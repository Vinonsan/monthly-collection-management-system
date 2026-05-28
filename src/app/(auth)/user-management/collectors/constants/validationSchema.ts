import { z } from 'zod'

export const collectorSchema = z.object({
  collectorNo: z.string(),
  name: z.string().trim().min(1, 'Collector name is required'),
  phone: z.string().trim().min(1, 'Phone is required'),
  assignedArea: z.string(),
  status: z.enum(['Active', 'Inactive'])
})
