import type { CollectorForm, CollectorRow } from '../types/collectors'

export const initialCollectors: CollectorRow[] = [
  { id: 1, collectorNo: 'COL-001', name: 'Nimal Perera', phone: '077 123 4567', assignedArea: 'North Temple Area', status: 'Active' },
  { id: 2, collectorNo: 'COL-002', name: 'Kamal Silva', phone: '071 456 7890', assignedArea: 'Lake View', status: 'Active' },
  { id: 3, collectorNo: 'COL-003', name: 'Ruwan Jayasinghe', phone: '076 987 2211', assignedArea: 'Main Street', status: 'Active' },
  { id: 4, collectorNo: 'COL-004', name: 'Sunil Dias', phone: '070 555 9911', assignedArea: 'New Town', status: 'Inactive' },
  { id: 5, collectorNo: 'COL-005', name: 'Amal Fernando', phone: '072 345 7788', assignedArea: 'Market Street', status: 'Active' },
  { id: 6, collectorNo: 'COL-006', name: 'Dinesh Mendis', phone: '074 456 6622', assignedArea: 'River Side', status: 'Active' }
]

export const emptyCollectorForm: CollectorForm = {
  collectorNo: '',
  name: '',
  phone: '',
  assignedArea: '',
  status: 'Active'
}

export const collectorStatusOptions = [
  { id: 'all', name: 'All statuses' },
  { id: 'Active', name: 'Active' },
  { id: 'Inactive', name: 'Inactive' }
]

export const collectorFormStatusOptions = collectorStatusOptions.filter((option) => option.id !== 'all')
