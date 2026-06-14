'use client'

import { useState } from 'react'
import Badge, { type BadgeVariant } from '@/src/components/Badge'
import Button from '@/src/components/Button'
import DataTable, { type DataTableColumn } from '@/src/components/DataTable'
import SearchTextbox, { type SearchTextboxFilterValue, useSearchTextbox } from '@/src/components/SearchTextbox'
import Select from '@/src/components/Select'
import SVG from '@/src/components/Svg'
import { usePageActions } from '@/src/lib/hooks/usePageActions'
import {
  collectorStatusOptions,
  emptyCollectorForm,
  initialCollectors
} from '../constants/collectors'
import type { CollectorForm, CollectorRow } from '../types/collectors'
import CollectorDeleteModal from './CollectorDeleteModal'
import CollectorModal from './CollectorModal'

const statusVariant: Record<CollectorRow['status'], BadgeVariant> = {
  Active: 'success',
  Inactive: 'danger'
}

const PageChildren = () => {
  const [collectorRows, setCollectorRows] = useState<CollectorRow[]>(initialCollectors)
  const [status, setStatus] = useState<SearchTextboxFilterValue>('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingCollectorId, setEditingCollectorId] = useState<number | null>(null)
  const [modalForm, setModalForm] = useState<CollectorForm>(emptyCollectorForm)
  const [deletingCollector, setDeletingCollector] = useState<CollectorRow | null>(null)
  const {
    search,
    setSearch,
    resetSearch,
    filteredData: filteredCollectors
  } = useSearchTextbox(
    collectorRows,
    [
      (collector) => collector.collectorNo,
      (collector) => collector.name,
      (collector) => collector.phone,
      (collector) => collector.assignedArea,
      (collector) => collector.status
    ],
    [
      {
        value: status,
        match: (collector, value) => value === 'all' || collector.status === value
      }
    ]
  )
  const resetFilters = () => {
    resetSearch()
    setStatus('all')
  }
  const {
    resetPage,
    refreshPage
  } = usePageActions({
    onReset: resetFilters,
    onRefresh: () => {
      setCollectorRows(initialCollectors)
      resetFilters()
    }
  })

  const openAddModal = () => {
    setEditingCollectorId(null)
    setModalForm(emptyCollectorForm)
    setModalOpen(true)
  }

  const openUpdateModal = (collector: CollectorRow) => {
    setEditingCollectorId(collector.id)
    setModalForm({
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
    setModalForm(emptyCollectorForm)
  }

  const openDeleteModal = (collector: CollectorRow) => {
    setDeletingCollector(collector)
  }

  const closeDeleteModal = () => {
    setDeletingCollector(null)
  }

  const handleDeleteConfirm = () => {
    if (!deletingCollector) return

    setCollectorRows((current) => current.filter((collector) => collector.id !== deletingCollector.id))
    closeDeleteModal()
  }

  const handleSubmit = (form: CollectorForm) => {
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
    { key: 'name', header: 'Collector Name' },
    { key: 'phone', header: 'Phone' },
    { key: 'assignedArea', header: 'Assigned Area' },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <Badge variant={ statusVariant[row.status] } appearance="solid" size="sm">
          { row.status }
        </Badge>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <Button
            variant="primary"
            appearance="solid"
            size="sm"
            aria-label="Update collector"
            onClick={ () => openUpdateModal(row) }
          >
            <SVG type="edit" width={ 16 } height={ 16 } />
          </Button>
          <Button
            variant="danger"
            appearance="solid"
            size="sm"
            aria-label="Delete collector"
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
          <h1 className="text-2xl font-semibold text-slate-950">Collector Management</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage collector details and assigned collection areas.
          </p>
        </div>

        <Button variant="primary" className="flex items-center gap-2" onClick={ openAddModal }>
          <SVG type="plus" width={ 17 } height={ 17 } />
          Add Collector
        </Button>
      </div>

      <div className="flex items-end justify-center gap-3">
        <Select
          label="Status"
          options={ collectorStatusOptions }
          labelKey="name"
          valueKey="id"
          value={ status }
          onChange={ setStatus }
          placeholder="Select status"
          position="bottom"
        />

        <SearchTextbox
          id="collector-search"
          label="Search collectors"
          value={ search }
          onChange={ setSearch }
          placeholder="Search by collector no, name, phone, or area"
        />

        <Button
          variant="secondary"
          appearance="outline"
          className="flex items-center gap-2"
          aria-label="Reset collectors"
          onClick={ resetPage }
        >
          <SVG type="reset" width={ 17 } height={ 17 } />
        </Button>
        <Button
          variant="secondary"
          appearance="outline"
          className="flex items-center gap-2"
          aria-label="Refresh collectors"
          onClick={ refreshPage }
        >
          <SVG type="refresh" width={ 17 } height={ 17 } />
        </Button>
      </div>

      <DataTable
        data={ filteredCollectors }
        columns={ columns }
        getRowId={ (row) => row.id }
        emptyMessage="No collectors found."
        pagination
        defaultPageSize={ 5 }
        pageSizeOptions={ [2, 5, 10] }
      />

      { modalOpen && (
        <CollectorModal
          key={ editingCollectorId ?? 'new-collector' }
          open={ modalOpen }
          isEditing={ editingCollectorId !== null }
          initialForm={ modalForm }
          onClose={ closeModal }
          onSubmit={ handleSubmit }
        />
      ) }

      <CollectorDeleteModal
        open={ deletingCollector !== null }
        collectorName={ deletingCollector?.name ?? '' }
        onClose={ closeDeleteModal }
        onConfirm={ handleDeleteConfirm }
      />
    </div>
  )
}

export default PageChildren
