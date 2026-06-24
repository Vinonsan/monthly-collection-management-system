'use client'

import { useState } from 'react'
import Button from '@/src/components/Button'
import DataTable, { type DataTableColumn } from '@/src/components/DataTable'
import SearchTextbox, { useSearchTextbox } from '@/src/components/SearchTextbox'
import SVG from '@/src/components/Svg'
import { usePageActions } from '@/src/lib/hooks/usePageActions'
import { emptyLocationForm, initialLocations } from '../constants/locations'
import type { LocationForm, LocationRow } from '../types/locations'
import LocationDeleteModal from './LocationDeleteModal'
import LocationModal from './LocationModal'

const PageChildren = () => {
  const [locationRows, setLocationRows] = useState<LocationRow[]>(initialLocations)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingLocationId, setEditingLocationId] = useState<number | null>(null)
  const [modalForm, setModalForm] = useState<LocationForm>(emptyLocationForm)
  const [deletingLocation, setDeletingLocation] = useState<LocationRow | null>(null)
  const {
    search,
    setSearch,
    resetSearch,
    filteredData: filteredLocations
  } = useSearchTextbox(
    locationRows,
    [
      (location) => location.locationName
    ]
  )
  const {
    resetPage,
    refreshPage
  } = usePageActions({
    onReset: resetSearch,
    onRefresh: () => {
      setLocationRows(initialLocations)
      resetSearch()
    }
  })

  const openAddModal = () => {
    setEditingLocationId(null)
    setModalForm(emptyLocationForm)
    setModalOpen(true)
  }

  const openUpdateModal = (location: LocationRow) => {
    setEditingLocationId(location.id)
    setModalForm({
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
    setModalForm(emptyLocationForm)
  }

  const openDeleteModal = (location: LocationRow) => {
    setDeletingLocation(location)
  }

  const closeDeleteModal = () => {
    setDeletingLocation(null)
  }

  const handleDeleteConfirm = () => {
    if (!deletingLocation) return

    setLocationRows((current) => current.filter((location) => location.id !== deletingLocation.id))
    closeDeleteModal()
  }

  const handleSubmit = (form: LocationForm) => {
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
    { key: 'locationName', header: 'Location Name' },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <Button
            variant="primary"
            appearance="solid"
            size="sm"
            aria-label="Update location"
            onClick={ () => openUpdateModal(row) }
          >
            <SVG type="edit" width={ 16 } height={ 16 } />
          </Button>
          <Button
            variant="danger"
            appearance="solid"
            size="sm"
            aria-label="Delete location"
            onClick={ () => openDeleteModal(row) }
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
          <h1 className="text-2xl font-semibold text-slate-950">Location Management</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage collection locations.
          </p>
        </div>

        <Button variant="primary" className="flex items-center gap-2" onClick={ openAddModal }>
          <SVG type="plus" width={ 17 } height={ 17 } />
          Add Location
        </Button>
      </div>

      <div className="flex items-end justify-center gap-3">
        <SearchTextbox
          id="location-search"
          label="Search locations"
          value={ search }
          onChange={ setSearch }
          placeholder="Search by location name"
        />

        <Button
          variant="secondary"
          appearance="outline"
          className="flex items-center gap-2"
          aria-label="Reset locations"
          onClick={ resetPage }
        >
          <SVG type="reset" width={ 17 } height={ 17 } />
        </Button>
        <Button
          variant="secondary"
          appearance="outline"
          className="flex items-center gap-2"
          aria-label="Refresh locations"
          onClick={ refreshPage }
        >
          <SVG type="refresh" width={ 17 } height={ 17 } />
        </Button>
      </div>

      <DataTable
        data={ filteredLocations }
        columns={ columns }
        getRowId={ (row) => row.id }
        emptyMessage="No locations found."
        pagination
        defaultPageSize={ 5 }
        pageSizeOptions={ [2, 5, 10] }
      />

      { modalOpen && (
        <LocationModal
          key={ editingLocationId ?? 'new-location' }
          open={ modalOpen }
          isEditing={ editingLocationId !== null }
          initialForm={ modalForm }
          onClose={ closeModal }
          onSubmit={ handleSubmit }
        />
      ) }

      <LocationDeleteModal
        open={ deletingLocation !== null }
        locationName={ deletingLocation?.locationName ?? '' }
        onClose={ closeDeleteModal }
        onConfirm={ handleDeleteConfirm }
      />
    </div>
  )
}

export default PageChildren
