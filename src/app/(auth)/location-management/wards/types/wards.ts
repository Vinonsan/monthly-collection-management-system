export type WardRow = {
  id: number
  wardNo: string
  wardName: string
  collector: string
  location: string
  memberCount: number
  monthlyTarget: number
}

export type WardForm = Omit<WardRow, 'id'>
