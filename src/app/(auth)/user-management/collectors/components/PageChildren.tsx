'use client'

import { useMemo, useState } from 'react'
import Badge from '@/src/components/Badge'
import Button from '@/src/components/Button'
import DataTable, { type DataTableColumn } from '@/src/components/DataTable'
import SearchTextbox from '@/src/components/SearchTextbox'
import SVG from '@/src/components/Svg'
import { emptyCollectorForm, initialCollectors } from '../constants/collectors'
import type { CollectorForm, CollectorRow } from '../types/collectors'
import CollectorModal from './CollectorModal'

const PageChildren = () => {
  const [collectorRows, setCollectorRows] = useState<CollectorRow[]>(initialCollectors)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingCollectorId, setEditingCollectorId] = useState<number | null>(null)
  const [form, setForm] = useState<CollectorForm>(emptyCollectorForm)

  const filteredCollectors = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    if (!normalizedSearch) return collectorRows

    return collectorRows.filter((collector) =>
      [collector.collectorNo, collector.name, collector.phone, collector.assignedArea, collector.status]
        .join(' ')
        .toLowerCase()
        .includes(normalizedSearch)
    )
  }, [collectorRows, search])

  const openAddModal = () => {
    setEditingCollectorId(null)
    setForm(emptyCollectorForm)
    setModalOpen(true)
  }

  const openUpdateModal = (collector: CollectorRow) => {
    setEditingCollectorId(collector.id)
    setForm({
      collectorNo: collector.collectorNo,
      name: collector.name,
      phone: collector.phone,
      assignedArea: collector.assignedArea,
      status: collector.status
    })
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingCollectorId(null)
    setForm(emptyCollectorForm)
  }

  const handleSubmit = () => {
    if (editingCollectorId) {
      setCollectorRows((current) =>
        current.map((collector) => (
          collector.id === editingCollectorId ? { ...collector, ...form } : collector
        ))
      )
      closeModal()
      return
    }

    setCollectorRows((current) => [{ id: Date.now(), ...form }, ...current])
    closeModal()
  }

  const columns: DataTableColumn<CollectorRow>[] = [
    { key: 'collectorNo', header: 'Collector No' },
    { key: 'name', header: 'Collector Name' },
    { key: 'phone', header: 'Phone' },
    { key: 'assignedArea', header: 'Assigned Area' },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <Badge variant={ row.status === 'Active' ? 'success' : 'secondary' }>
          { row.status }
        </Badge>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (row) => (
        <div className="flex justify-end gap-2">
          <Button variant="info" appearance="ghost" size="sm" className="h-9 w-9 px-0" aria-label="Update collector" onClick={ () => openUpdateModal(row) }>
            <SVG type="edit" width={ 16 } height={ 16 } />
          </Button>
          <Button variant="danger" appearance="ghost" size="sm" className="h-9 w-9 px-0" aria-label="Delete collector" onClick={ () => setCollectorRows((current) => current.filter((collector) => collector.id !== row.id)) }>
            <SVG type="delete" width={ 16 } height={ 16 } />
          </Button>
        </div>
      )
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl bg-theme-primary/10 px-3 py-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-950">Collector Management</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage collector details and assigned collection areas.
          </p>
        </div>

        <Button className="w-full gap-2 sm:w-auto" onClick={ openAddModal }>
          <SVG type="plus" width={ 17 } height={ 17 } />
          Add Collector
        </Button>
      </div>

      <SearchTextbox
        id="collector-search"
        label="Search collectors"
        value={ search }
        onChange={ setSearch }
        placeholder="Search by collector no, name, phone, or area"
      />

      <DataTable
        data={ filteredCollectors }
        columns={ columns }
        getRowId={ (row) => row.id }
        emptyMessage="No collectors found."
        pagination
        defaultPageSize={ 5 }
        pageSizeOptions={ [5, 10] }
      />

      <CollectorModal
        open={ modalOpen }
        editingCollectorId={ editingCollectorId }
        form={ form }
        onClose={ closeModal }
        onSubmit={ handleSubmit }
        onFormChange={ setForm }
      />
    </div>
  )
}

export default PageChildren
