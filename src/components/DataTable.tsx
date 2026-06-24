'use client'

import { ReactNode, useState } from 'react'

export interface DataTableColumn<T> {
  key: keyof T | string
  header: ReactNode
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
  render?: (_row: T) => ReactNode
}

interface DataTableProps<T> {
  data: T[]
  columns: DataTableColumn<T>[]
  getRowId: (_row: T, _index: number) => string | number
  emptyMessage?: string
  selectable?: boolean
  selectedIds?: Array<string | number>
  onSelectionChange?: (_selectedIds: Array<string | number>) => void
  pagination?: boolean
  defaultPageSize?: number
  pageSizeOptions?: number[]
  className?: string
}

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right'
}

const getCellValue = <T,>(row: T, key: keyof T | string) => {
  if (typeof key === 'string' && key.includes('.')) {
    return key.split('.').reduce<unknown>((value, part) => {
      if (value && typeof value === 'object' && part in value) {
        return (value as Record<string, unknown>)[part]
      }

      return undefined
    }, row)
  }

  return row[key as keyof T]
}

const DataTable = <T,>(props: DataTableProps<T>) => {
  const {
    data,
    columns,
    getRowId,
    emptyMessage = 'No records found.',
    selectable = false,
    selectedIds = [],
    onSelectionChange,
    pagination = false,
    defaultPageSize = 5,
    pageSizeOptions = [5, 10, 20],
    className = ''
  } = props

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(defaultPageSize)

  const pageCount = Math.max(1, Math.ceil(data.length / pageSize))
  const safeCurrentPage = Math.min(currentPage, pageCount)
  const pageStart = pagination ? (safeCurrentPage - 1) * pageSize : 0
  const pageEnd = pagination ? pageStart + pageSize : data.length
  const visibleData = pagination ? data.slice(pageStart, pageEnd) : data
  const pageNumbers = Array.from({ length: pageCount }, (_, index) => index + 1)
  const allRowIds = visibleData.map(getRowId)
  const isAllSelected = allRowIds.length > 0 && allRowIds.every((id) => selectedIds.includes(id))

  const handleSelectAll = () => {
    if (!onSelectionChange) return

    onSelectionChange(isAllSelected ? [] : allRowIds)
  }

  const handleSelectRow = (rowId: string | number) => {
    if (!onSelectionChange) return

    const nextSelected = selectedIds.includes(rowId)
      ? selectedIds.filter((id) => id !== rowId)
      : [...selectedIds, rowId]

    onSelectionChange(nextSelected)
  }

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  return (
    <div className={ `space-y-4 ${className}` }>
      <div className="overflow-hidden rounded-md border border-slate-200 bg-slate-50 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0 text-sm">
            <thead className="bg-theme-primary/10 text-theme-primary">
              <tr>
                { selectable && (
                  <th className="w-12 px-5 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={ isAllSelected }
                      onChange={ handleSelectAll }
                      aria-label="Select all rows"
                      className="h-4 w-4 rounded border-slate-300 accent-theme-primary"
                    />
                  </th>
                ) }

                { columns.map((column) => {
                  const align = column.align || 'left'

                  return (
                    <th
                      key={ String(column.key) }
                      className={ `px-5 py-4 text-xs font-semibold uppercase tracking-wide ${alignClasses[align]}` }
                    >
                      { column.header }
                    </th>
                  )
                }) }
              </tr>
            </thead>

            <tbody>
              { data.length === 0 ? (
                <tr>
                  <td
                    colSpan={ columns.length + (selectable ? 1 : 0) }
                    className="bg-white px-5 py-12 text-center text-slate-500"
                  >
                    { emptyMessage }
                  </td>
                </tr>
              ) : (
                visibleData.map((row, index) => {
                  const rowId = getRowId(row, pageStart + index)

                  return (
                    <tr key={ rowId } className="group transition-colors hover:bg-white">
                      { selectable && (
                        <td className="border-b border-slate-100 bg-white px-5 py-4 group-hover:bg-slate-50">
                          <input
                            type="checkbox"
                            checked={ selectedIds.includes(rowId) }
                            onChange={ () => handleSelectRow(rowId) }
                            aria-label="Select row"
                            className="h-4 w-4 rounded border-slate-300 accent-theme-primary"
                          />
                        </td>
                      ) }

                      { columns.map((column) => {
                        const align = column.align || 'left'

                        return (
                          <td
                            key={ String(column.key) }
                            className={ `border-b border-slate-100 bg-white px-5 py-4 text-slate-700 transition-colors group-hover:bg-slate-50 ${alignClasses[align]}` }
                          >
                            { column.render
                              ? column.render(row)
                              : String(getCellValue(row, column.key) ?? '') }
                          </td>
                        )
                      }) }
                    </tr>
                  )
                })
              ) }
            </tbody>
          </table>
        </div>
      </div>

      { pagination && data.length > 0 && (
        <div className="flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <div className="font-medium">
            Showing { pageStart + 1 } to { Math.min(pageEnd, data.length) } of { data.length } rows
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2">
              <span>Rows</span>
              <select
                value={ pageSize }
                onChange={ handlePageSizeChange }
                className="h-9 rounded-md border border-slate-200 bg-white px-2 text-sm text-slate-700 shadow-sm outline-none focus:border-theme-primary"
              >
                { pageSizeOptions.map((option) => (
                  <option key={ option } value={ option }>
                    { option }
                  </option>
                )) }
              </select>
            </label>

            <div className="flex flex-wrap items-center gap-2">
              { pageNumbers.map((pageNumber) => {
                const isActive = pageNumber === safeCurrentPage

                return (
                  <button
                    key={ pageNumber }
                    type="button"
                    onClick={ () => setCurrentPage(pageNumber) }
                    className={ [
                      'h-9 min-w-9 rounded-md border px-3 font-medium shadow-sm transition-colors',
                      isActive
                        ? 'border-theme-primary bg-theme-primary text-white'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-theme-primary/30 hover:bg-theme-primary/5 hover:text-theme-primary'
                    ].join(' ') }
                    aria-current={ isActive ? 'page' : undefined }
                  >
                    { pageNumber }
                  </button>
                )
              }) }
            </div>
          </div>
        </div>
      ) }
    </div>
  )
}

export default DataTable
