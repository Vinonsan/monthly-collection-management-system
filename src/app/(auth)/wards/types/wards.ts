export type WardRow = {
  id: number
  wardNo: string
  wardName: string
  collector: string
  memberCount: number
  monthlyTarget: number
}

export type WardForm = Omit<WardRow, 'id'>
