export type CollectorRow = {
  id: number
  collectorNo: string
  name: string
  phone: string
  assignedArea: string
  status: 'Active' | 'Inactive'
}

export type CollectorForm = Omit<CollectorRow, 'id'>
