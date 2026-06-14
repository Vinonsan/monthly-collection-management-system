'use client'

import { useState } from 'react'
import Button from '@/src/components/Button'
import DataTable, { type DataTableColumn } from '@/src/components/DataTable'
import SearchTextbox, { type SearchTextboxFilterValue, useSearchTextbox } from '@/src/components/SearchTextbox'
import Select from '@/src/components/Select'
import SVG from '@/src/components/Svg'
import { usePageActions } from '@/src/lib/hooks/usePageActions'
import { emptyUserForm, initialUsers } from '../constants/users'
import type { UserForm, UserRow } from '../types/users'
import UserModal from './UserModal'

const PageChildren = () => {
  const [userRows, setUserRows] = useState<UserRow[]>(initialUsers)
  const [wardNo, setWardNo] = useState<SearchTextboxFilterValue>('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingUserId, setEditingUserId] = useState<number | null>(null)
  const [modalForm, setModalForm] = useState<UserForm>(emptyUserForm)
  const wardOptions = [
    { id: 'all', name: 'All wards' },
    ...Array.from(new Set(userRows.map((user) => user.wardNo))).map((item) => ({
      id: item,
      name: item
    }))
  ]
  const modalWardOptions = wardOptions.filter((option) => option.id !== 'all')
  const {
    search,
    setSearch,
    resetSearch,
    filteredData: filteredUsers
  } = useSearchTextbox(
    userRows,
    [
      (user) => user.cardNo,
      (user) => user.name,
      (user) => user.wardNo,
      (user) => user.phone,
      (user) => user.address
    ],
    [
      {
        value: wardNo,
        match: (user, value) => value === 'all' || user.wardNo === value
      }
    ]
  )
  const resetFilters = () => {
    resetSearch()
    setWardNo('all')
  }
  const {
    resetPage,
    refreshPage
  } = usePageActions({
    onReset: resetFilters,
    onRefresh: () => {
      setUserRows(initialUsers)
      resetFilters()
    }
  })

  const openAddModal = () => {
    setEditingUserId(null)
    setModalForm(emptyUserForm)
    setModalOpen(true)
  }

  const openUpdateModal = (user: UserRow) => {
    setEditingUserId(user.id)
    setModalForm({
      cardNo: user.cardNo,
      name: user.name,
      wardNo: user.wardNo,
      phone: user.phone,
      address: user.address,
      balance: user.balance
    })
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingUserId(null)
    setModalForm(emptyUserForm)
  }

  const handleSubmit = (form: UserForm) => {
    if (editingUserId) {
      setUserRows((current) =>
        current.map((user) => (user.id === editingUserId ? { ...user, ...form } : user))
      )
      closeModal()
      return
    }

    setUserRows((current) => [{ id: Date.now(), ...form }, ...current])
    closeModal()
  }

  const columns: DataTableColumn<UserRow>[] = [
    { key: 'cardNo', header: 'Card No' },
    { key: 'name', header: 'User Name' },
    { key: 'wardNo', header: 'Ward No' },
    { key: 'phone', header: 'Phone' },
    { key: 'address', header: 'Address' },
    {
      key: 'balance',
      header: 'Balance',
      render: (row) => `Rs. ${row.balance.toLocaleString()}`
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex justify-end gap-2">
          <Button
            variant="info"
            appearance="ghost"
            size="sm"
            aria-label="Update user"
            onClick={ () => openUpdateModal(row) }
          >
            <SVG type="edit" width={ 16 } height={ 16 } />
          </Button>
          <Button
            variant="danger"
            appearance="ghost"
            size="sm"
            aria-label="Delete user"
            onClick={ () => setUserRows((current) => current.filter((user) => user.id !== row.id)) }
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
          <h1 className="text-2xl font-semibold text-slate-950">User Management</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage user cards, ward assignments, and collection balances.
          </p>
        </div>

        <Button variant="primary" className="flex items-center gap-2" onClick={ openAddModal }>
          <SVG type="plus" width={ 17 } height={ 17 } />
          Add User
        </Button>
      </div>

      <div className="flex items-end justify-center gap-3">
        <Select
          label="Ward No"
          options={ wardOptions }
          labelKey="name"
          valueKey="id"
          value={ wardNo }
          onChange={ setWardNo }
          placeholder="Select ward"
          position="bottom"
        />

        <SearchTextbox
          id="user-search"
          label="Search users"
          value={ search }
          onChange={ setSearch }
          placeholder="Search by card no, name, phone, or address"
        />

        <Button
          variant="secondary"
          appearance="outline"
          className="flex items-center gap-2"
          aria-label="Reset users"
          onClick={ resetPage }
        >
          <SVG type="reset" width={ 17 } height={ 17 } />
        </Button>
        <Button
          variant="secondary"
          appearance="outline"
          className="flex items-center gap-2"
          aria-label="Refresh users"
          onClick={ refreshPage }
        >
          <SVG type="refresh" width={ 17 } height={ 17 } />
        </Button>
      </div>

      <DataTable
        data={ filteredUsers }
        columns={ columns }
        getRowId={ (row) => row.id }
        emptyMessage="No users match the current filters."
        pagination
        defaultPageSize={ 5 }
        pageSizeOptions={ [2, 5, 10] }
      />

      { modalOpen && (
        <UserModal
          key={ editingUserId ?? 'new-user' }
          open={ modalOpen }
          editingUserId={ editingUserId }
          initialForm={ modalForm }
          wardOptions={ modalWardOptions }
          onClose={ closeModal }
          onSubmit={ handleSubmit }
        />
      ) }
    </div>
  )
}

export default PageChildren
