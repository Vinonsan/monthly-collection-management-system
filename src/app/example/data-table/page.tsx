'use client'

import { useState } from 'react'
import Badge from '@/src/components/Badge'
import DataTable, { type DataTableColumn } from '@/src/components/DataTable'

type CollectionRow = {
  id: number
  cardNo: string
  name: string
  ward: string
  amount: number
  status: 'Paid' | 'Due' | 'Partial'
}

const rows: CollectionRow[] = [
  { id: 1, cardNo: 'C-1001', name: 'Nimal Perera', ward: 'Ward A', amount: 2500, status: 'Paid' },
  { id: 2, cardNo: 'C-1002', name: 'Kamal Silva', ward: 'Ward B', amount: 1800, status: 'Due' },
  { id: 3, cardNo: 'C-1003', name: 'Saman Kumara', ward: 'Ward A', amount: 1200, status: 'Partial' },
  { id: 4, cardNo: 'C-1004', name: 'Ruwan Jay', ward: 'Ward C', amount: 3200, status: 'Paid' },
  { id: 5, cardNo: 'C-1005', name: 'Amal Fernando', ward: 'Ward B', amount: 2100, status: 'Paid' },
  { id: 6, cardNo: 'C-1006', name: 'Sunil Dias', ward: 'Ward D', amount: 900, status: 'Due' },
  { id: 7, cardNo: 'C-1007', name: 'Kasun Nirosh', ward: 'Ward C', amount: 1450, status: 'Partial' },
  { id: 8, cardNo: 'C-1008', name: 'Dinesh Mendis', ward: 'Ward A', amount: 2800, status: 'Paid' },
  { id: 9, cardNo: 'C-1009', name: 'Lalith Perera', ward: 'Ward D', amount: 1600, status: 'Due' },
  { id: 10, cardNo: 'C-1010', name: 'Pradeep Silva', ward: 'Ward B', amount: 2200, status: 'Paid' },
  { id: 11, cardNo: 'C-1011', name: 'Mahesh Kumara', ward: 'Ward C', amount: 1350, status: 'Partial' },
  { id: 12, cardNo: 'C-1012', name: 'Chathura Jay', ward: 'Ward A', amount: 3100, status: 'Paid' }
]

const columns: DataTableColumn<CollectionRow>[] = [
  { key: 'cardNo', header: 'Card No', sortable: true },
  { key: 'name', header: 'Name', sortable: true },
  { key: 'ward', header: 'Ward', sortable: true },
  {
    key: 'amount',
    header: 'Amount',
    sortable: true,
    align: 'right',
    render: (row) => `Rs. ${row.amount.toLocaleString()}`
  },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    render: (row) => (
      <Badge
        variant={ row.status === 'Paid' ? 'success' : row.status === 'Due' ? 'danger' : 'warning' }
        appearance="outline"
      >
        { row.status }
      </Badge>
    )
  }
]

const Page = () => {
  const [selectedIds, setSelectedIds] = useState<Array<string | number>>([1])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Data Table Examples</h1>
        <p className="mt-2 text-gray-600">Sortable columns, selectable rows, custom cells, and empty state.</p>
      </div>

      <section className="space-y-4">
        <DataTable
          data={ rows }
          columns={ columns }
          getRowId={ (row) => row.id }
          selectable
          selectedIds={ selectedIds }
          onSelectionChange={ setSelectedIds }
          pagination
          defaultPageSize={ 5 }
          pageSizeOptions={ [5, 10] }
        />
        <p className="text-sm text-gray-600">Selected row IDs: { selectedIds.join(', ') || 'none' }</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Empty State</h2>
        <DataTable
          data={ [] }
          columns={ columns }
          getRowId={ (row) => row.id }
          emptyMessage="No collection records to show."
        />
      </section>
    </div>
  )
}

export default Page
