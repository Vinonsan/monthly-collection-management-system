import type { WardForm, WardRow } from '../types/wards'

export const initialWards: WardRow[] = [
  { id: 1, wardNo: 'Ward 01', wardName: 'North Temple Area', collector: 'Nimal Perera', location: 'North Temple Area', memberCount: 86, monthlyTarget: 215000 },
  { id: 2, wardNo: 'Ward 02', wardName: 'Lake View', collector: 'Kamal Silva', location: 'Lake View', memberCount: 72, monthlyTarget: 180000 },
  { id: 3, wardNo: 'Ward 03', wardName: 'Main Street', collector: 'Ruwan Jayasinghe', location: 'Main Street', memberCount: 64, monthlyTarget: 160000 },
  { id: 4, wardNo: 'Ward 04', wardName: 'New Town', collector: 'Sunil Dias', location: 'New Town', memberCount: 58, monthlyTarget: 145000 },
  { id: 5, wardNo: 'Ward 05', wardName: 'Market Street', collector: 'Amal Fernando', location: 'Market Street', memberCount: 69, monthlyTarget: 172500 },
  { id: 6, wardNo: 'Ward 06', wardName: 'River Side', collector: 'Dinesh Mendis', location: 'River Side', memberCount: 61, monthlyTarget: 152500 }
]

export const emptyWardForm: WardForm = {
  wardNo: '',
  wardName: '',
  collector: '',
  location: '',
  memberCount: 0,
  monthlyTarget: 0
}
