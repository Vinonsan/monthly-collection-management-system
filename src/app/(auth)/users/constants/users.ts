import type { UserForm, UserRow } from '../types/users'

export const initialUsers: UserRow[] = [
  { id: 1, cardNo: '1', name: 'Nimal Perera', wardNo: '1', phone: '077 123 4567', address: 'Temple Road', balance: 2500},
  { id: 2, cardNo: '2', name: 'Kamal Silva', wardNo: '2', phone: '071 456 7890', address: 'Lake View Lane', balance: 1800},
  { id: 3, cardNo: '3', name: 'Saman Kumara', wardNo: '1', phone: '075 222 1133', address: 'Station Road', balance: 0},
  { id: 4, cardNo: '4', name: 'Ruwan Jayasinghe', wardNo: '3', phone: '076 987 2211', address: 'School Mawatha', balance: 3200},
  { id: 5, cardNo: '5', name: 'Amal Fernando', wardNo: '2', phone: '072 345 7788', address: 'Market Street', balance: 2100 },
  { id: 6, cardNo: '6', name: 'Sunil Dias', wardNo: '4', phone: '070 555 9911', address: 'New Town', balance: 900 },
  { id: 7, cardNo: '7', name: 'Kasun Nirosh', wardNo: '3', phone: '078 654 1188', address: 'Main Street', balance: 1450 },
  { id: 8, cardNo: '8', name: 'Dinesh Mendis', wardNo: '1', phone: '074 456 6622', address: 'River Side', balance: 2800 },
  { id: 9, cardNo: '9', name: 'Lalith Perera', wardNo: '4', phone: '071 222 3344', address: 'Hospital Road', balance: 1600 },
  { id: 10, cardNo: '10', name: 'Pradeep Silva', wardNo: '2', phone: '077 888 4477', address: 'Old Road', balance: 2200 }
]

export const emptyUserForm: UserForm = {
  cardNo: '',
  name: '',
  wardNo: 'Ward 01',
  phone: '',
  address: '',
  balance: 0,
}


