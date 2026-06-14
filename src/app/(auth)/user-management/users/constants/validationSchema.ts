import { z } from 'zod'

export const userSchema = z.object({
  cardNo: z.string().trim().min(1, 'Card no is required'),
  name: z.string().trim().min(1, 'User name is required'),
  wardNo: z.string().trim().min(1, 'Ward no is required'),
  phone: z.string().trim().min(1, 'Phone is required'),
  address: z.string().trim().min(1, 'Address is required'),
  balance: z.number().min(0, 'Balance cannot be negative')
})
