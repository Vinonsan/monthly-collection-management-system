'use client'

import { useMemo, useState } from 'react'
import Badge from '@/src/components/Badge'
import Button from '@/src/components/Button'
import DataTable, { type DataTableColumn } from '@/src/components/DataTable'
import SearchTextbox from '@/src/components/SearchTextbox'
import SVG from '@/src/components/Svg'
import { initialCollectors } from '../../collectors/constants/collectors'
import { emptyLocationForm, initialLocations } from '../constants/locations'
import type { LocationForm, LocationRow } from '../types/locations'
import LocationModal from './LocationModal'

const collectorOptions = initialCollectors.map((collector) => ({
  id: collector.name,
  name: collector.name
}))

const PageChildren = () => {
  const [locationRows, setLocationRows] = useState<LocationRow[]>(initialLocations)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingLocationId, setEditingLocationId] = useState<number | null>(null)
  const [form, setForm] = useState<LocationForm>(emptyLocationForm)

  const filteredLocations = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    if (!normalizedSearch) return locationRows

    return locationRows.filter((location) =>
      [location.locationCode, location.locationName, location.address, location.collector, location.status]
        .join(' ')
        .toLowerCase()
        .includes(normalizedSearch)
    )
  }, [locationRows, search])

  const openAddModal = () => {
    setEditingLocationId(null)
    setForm({
      ...emptyLocationForm,
      collector: collectorOptions[0]?.id || ''
    })
    setModalOpen(true)
  }

  const openUpdateModal = (location: LocationRow) => {
    setEditingLocationId(location.id)
    setForm({
      locationCode: location.locationCode,
      locationName: location.locationName,
      address: location.address,
      collector: location.collector,
      status: location.status
    })
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingLocationId(null)
    setForm(emptyLocationForm)
  }

  const handleSubmit = () => {
    if (editingLocationId) {
      setLocationRows((current) =>
        current.map((location) => (
          location.id === editingLocationId ? { ...location, ...form } : location
        ))
      )
      closeModal()
      return
    }

    setLocationRows((current) => [{ id: Date.now(), ...form }, ...current])
    closeModal()
  }

  const columns: DataTableColumn<LocationRow>[] = [
    { key: 'locationCode', header: 'Location Code' },
    { key: 'locationName', header: 'Location Name' },
    { key: 'address', header: 'Address' },
    { key: 'collector', header: 'Collector' },
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
          <Button variant="info" appearance="ghost" size="sm" className="h-9 w-9 px-0" aria-label="Update location" onClick={ () => openUpdateModal(row) }>
            <SVG type="edit" width={ 16 } height={ 16 } />
          </Button>
          <Button variant="danger" appearance="ghost" size="sm" className="h-9 w-9 px-0" aria-label="Delete location" onClick={ () => setLocationRows((current) => current.filter((location) => location.id !== row.id)) }>
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
          <h1 className="text-2xl font-semibold text-slate-950">Location Management</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage collection locations and their assigned collectors.
          </p>
        </div>

        <Button className="w-full gap-2 sm:w-auto" onClick={ openAddModal }>
          <SVG type="plus" width={ 17 } height={ 17 } />
          Add Location
        </Button>
      </div>

      <SearchTextbox
        id="location-search"
        label="Search locations"
        value={ search }
        onChange={ setSearch }
        placeholder="Search by code, name, address, or collector"
      />

      <DataTable
        data={ filteredLocations }
        columns={ columns }
        getRowId={ (row) => row.id }
        emptyMessage="No locations found."
        pagination
        defaultPageSize={ 5 }
        pageSizeOptions={ [5, 10] }
      />

      <LocationModal
        open={ modalOpen }
        editingLocationId={ editingLocationId }
        form={ form }
        collectorOptions={ collectorOptions }
        onClose={ closeModal }
        onSubmit={ handleSubmit }
        onFormChange={ setForm }
      />
    </div>
  )
}

export default PageChildren
