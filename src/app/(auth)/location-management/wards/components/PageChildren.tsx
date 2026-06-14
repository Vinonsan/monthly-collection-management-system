'use client'

import { useState } from 'react'
import Button from '@/src/components/Button'
import DataTable, { type DataTableColumn } from '@/src/components/DataTable'
import SVG from '@/src/components/Svg'
import { initialCollectors } from '../../../user-management/collectors/constants/collectors'
import { initialLocations } from '../../locations/constants/locations'
import { emptyWardForm, initialWards } from '../constants/wards'
import type { WardForm, WardRow } from '../types/wards'
import WardModal from './WardModal'

const collectorOptions = initialCollectors.map((collector) => ({
  id: collector.name,
  name: collector.name
}))

const locationOptions = initialLocations.map((location) => ({
  id: location.locationName,
  name: location.locationName
}))

const PageChildren = () => {
  const [wardRows, setWardRows] = useState<WardRow[]>(initialWards)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingWardId, setEditingWardId] = useState<number | null>(null)
  const [form, setForm] = useState<WardForm>(emptyWardForm)

  const openAddModal = () => {
    setEditingWardId(null)
    setForm({
      ...emptyWardForm,
      collector: collectorOptions[0]?.id || '',
      location: locationOptions[0]?.id || ''
    })
    setModalOpen(true)
  }

  const openUpdateModal = (ward: WardRow) => {
    setEditingWardId(ward.id)
    setForm({
      wardNo: ward.wardNo,
      wardName: ward.wardName,
      collector: ward.collector,
      location: ward.location,
      memberCount: ward.memberCount,
      monthlyTarget: ward.monthlyTarget
    })
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingWardId(null)
    setForm(emptyWardForm)
  }

  const handleSubmit = () => {
    if (editingWardId) {
      setWardRows((current) =>
        current.map((ward) => (ward.id === editingWardId ? { ...ward, ...form } : ward))
      )
      closeModal()
      return
    }

    setWardRows((current) => [{ id: Date.now(), ...form }, ...current])
    closeModal()
  }

  const columns: DataTableColumn<WardRow>[] = [
    { key: 'wardNo', header: 'Ward No' },
    { key: 'wardName', header: 'Ward Name' },
    { key: 'collector', header: 'Collector' },
    { key: 'location', header: 'Location' },
    {
      key: 'memberCount',
      header: 'Members',
      align: 'right'
    },
    {
      key: 'monthlyTarget',
      header: 'Monthly Target',
      align: 'right',
      render: (row) => `Rs. ${row.monthlyTarget.toLocaleString()}`
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (row) => (
        <div className="flex justify-end gap-2">
          <Button
            variant="info"
            appearance="ghost"
            size="sm"
            className="h-9 w-9 px-0"
            aria-label="Update ward"
            onClick={ () => openUpdateModal(row) }
          >
            <SVG type="edit" width={ 16 } height={ 16 } />
          </Button>
          <Button
            variant="danger"
            appearance="ghost"
            size="sm"
            className="h-9 w-9 px-0"
            aria-label="Delete ward"
            onClick={ () => setWardRows((current) => current.filter((ward) => ward.id !== row.id)) }
          >
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
          <h1 className="text-2xl font-semibold text-slate-950">Ward Management</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage ward numbers, collectors, locations, members, and monthly targets.
          </p>
        </div>

        <Button className="w-full gap-2 sm:w-auto" onClick={ openAddModal }>
          <SVG type="plus" width={ 17 } height={ 17 } />
          Add Ward
        </Button>
      </div>

      <DataTable
        data={ wardRows }
        columns={ columns }
        getRowId={ (row) => row.id }
        emptyMessage="No wards found."
        pagination
        defaultPageSize={ 5 }
        pageSizeOptions={ [5, 10] }
      />

      <WardModal
        open={ modalOpen }
        editingWardId={ editingWardId }
        form={ form }
        collectorOptions={ collectorOptions }
        locationOptions={ locationOptions }
        onClose={ closeModal }
        onSubmit={ handleSubmit }
        onFormChange={ setForm }
      />
    </div>
  )
}

export default PageChildren
