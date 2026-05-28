'use client'

import { useMemo, useState } from 'react'
import Button from '@/src/components/Button'
import DataTable, { type DataTableColumn } from '@/src/components/DataTable'
import SearchTextbox from '@/src/components/SearchTextbox'
import Select from '@/src/components/Select'
import SVG from '@/src/components/Svg'
import { emptyUserForm, initialUsers } from '../constants/users'
import type { UserForm, UserRow } from '../types/users'
import UserModal from './UserModal'


const PageChildren = () => {
  const [userRows, setUserRows] = useState<UserRow[]>(initialUsers)
  const [search, setSearch] = useState('')
  const [wardNo, setWardNo] = useState<string | number | (string | number)[] | null>('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingUserId, setEditingUserId] = useState<number | null>(null)
  const [form, setForm] = useState<UserForm>(emptyUserForm)

  const wardOptions = useMemo(() => [
    { id: 'all', name: 'All wards' },
    ...Array.from(new Set(userRows.map((user) => user.wardNo))).map((item) => ({
      id: item,
      name: item
    }))
  ], [userRows])

  const modalWardOptions = wardOptions.filter((option) => option.id !== 'all')

  const filteredUsers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return userRows.filter((user) => {
      const matchesWard = wardNo === 'all' || user.wardNo === wardNo
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [user.cardNo, user.name, user.wardNo, user.phone, user.address]
          .join(' ')
          .toLowerCase()
          .includes(normalizedSearch)

      return matchesWard && matchesSearch
    })
  }, [search, userRows, wardNo])

  const openAddModal = () => {
    setEditingUserId(null)
    setForm(emptyUserForm)
    setModalOpen(true)
  }

  const openUpdateModal = (user: UserRow) => {
    setEditingUserId(user.id)
    setForm({
      cardNo: user.cardNo,
      name: user.name,
      wardNo: user.wardNo,
      phone: user.phone,
      address: user.address,
      balance: user.balance,
    })
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingUserId(null)
    setForm(emptyUserForm)
  }

  const handleSubmit = () => {
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
      align: 'right',
      render: (row) => `Rs. ${row.balance.toLocaleString()}`
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
            aria-label="Update user"
            onClick={ () => openUpdateModal(row) }
          >
            <SVG type="edit" width={ 16 } height={ 16 } />
          </Button>
          <Button
            variant="danger"
            appearance="ghost"
            size="sm"
            className="h-9 w-9 px-0"
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

        <Button className="flex items-center gap-2" onClick={ openAddModal }>
          <SVG type="plus" width={ 17 } height={ 17 } />
          Add User
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_240px]">
        <SearchTextbox
          id="user-search"
          label="Search users"
          value={ search }
          onChange={ setSearch }
          placeholder="Search by card no, name, phone, or address"
        />

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
      </div>

      <DataTable
        data={ filteredUsers }
        columns={ columns }
        getRowId={ (row) => row.id }
        emptyMessage="No users match the current filters."
        pagination
        defaultPageSize={ 5 }
        pageSizeOptions={ [5, 10] }
      />

      <UserModal
        open={ modalOpen }
        editingUserId={ editingUserId }
        form={ form }
        wardOptions={ modalWardOptions }
        onClose={ closeModal }
        onSubmit={ handleSubmit }
        onFormChange={ setForm }
      />
    </div>
  )
}

export default PageChildren
