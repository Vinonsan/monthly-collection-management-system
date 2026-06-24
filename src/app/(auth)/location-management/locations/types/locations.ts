export type LocationRow = {
  id: number
  locationCode: string
  locationName: string
  address: string
  collector: string
  status: 'Active' | 'Inactive'
}

export type LocationForm = Omit<LocationRow, 'id'>
