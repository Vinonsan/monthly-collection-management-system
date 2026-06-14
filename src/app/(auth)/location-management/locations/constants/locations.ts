import type { LocationForm, LocationRow } from '../types/locations'

export const initialLocations: LocationRow[] = [
  { id: 1, locationCode: 'LOC-001', locationName: 'North Temple Area', address: 'Temple Road', collector: 'Nimal Perera', status: 'Active' },
  { id: 2, locationCode: 'LOC-002', locationName: 'Lake View', address: 'Lake View Lane', collector: 'Kamal Silva', status: 'Active' },
  { id: 3, locationCode: 'LOC-003', locationName: 'Main Street', address: 'Main Street', collector: 'Ruwan Jayasinghe', status: 'Active' },
  { id: 4, locationCode: 'LOC-004', locationName: 'New Town', address: 'New Town', collector: 'Sunil Dias', status: 'Inactive' },
  { id: 5, locationCode: 'LOC-005', locationName: 'Market Street', address: 'Market Street', collector: 'Amal Fernando', status: 'Active' },
  { id: 6, locationCode: 'LOC-006', locationName: 'River Side', address: 'River Side', collector: 'Dinesh Mendis', status: 'Active' }
]

export const emptyLocationForm: LocationForm = {
  locationCode: '',
  locationName: '',
  address: '',
  collector: '',
  status: 'Active'
}
