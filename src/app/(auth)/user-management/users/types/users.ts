export type UserRow = {
  id: number
  cardNo: string
  name: string
  wardNo: string
  phone: string
  address: string
  balance: number
}

export type UserForm = Omit<UserRow, 'id'>
