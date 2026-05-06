'use client'

import { ReactNode, useMemo, useState } from 'react'
import SVG from './Svg'

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

type SortDirection = 'asc' | 'desc'

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

  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(defaultPageSize)

  const sortedData = useMemo(() => {
    if (!sortKey) return data

    return [...data].sort((firstRow, secondRow) => {
      const firstValue = getCellValue(firstRow, sortKey)
      const secondValue = getCellValue(secondRow, sortKey)

      if (firstValue === secondValue) return 0
      if (firstValue === undefined || firstValue === null) return 1
      if (secondValue === undefined || secondValue === null) return -1

      const compare =
        typeof firstValue === 'number' && typeof secondValue === 'number'
          ? firstValue - secondValue
          : String(firstValue).localeCompare(String(secondValue))

      return sortDirection === 'asc' ? compare : compare * -1
    })
  }, [data, sortDirection, sortKey])

  const pageCount = Math.max(1, Math.ceil(sortedData.length / pageSize))
  const safeCurrentPage = Math.min(currentPage, pageCount)
  const pageStart = pagination ? (safeCurrentPage - 1) * pageSize : 0
  const pageEnd = pagination ? pageStart + pageSize : sortedData.length
  const visibleData = pagination ? sortedData.slice(pageStart, pageEnd) : sortedData
  const pageNumbers = Array.from({ length: pageCount }, (_, index) => index + 1)
  const allRowIds = visibleData.map(getRowId)
  const isAllSelected = allRowIds.length > 0 && allRowIds.every((id) => selectedIds.includes(id))

  const handleSort = (column: DataTableColumn<T>) => {
    if (!column.sortable) return

    const nextKey = String(column.key)

    if (sortKey === nextKey) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'))
      setCurrentPage(1)
      return
    }

    setSortKey(nextKey)
    setSortDirection('asc')
    setCurrentPage(1)
  }

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
    <div className={ `overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm ${className}` }>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              { selectable && (
                <th className="w-12 px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={ isAllSelected }
                    onChange={ handleSelectAll }
                    aria-label="Select all rows"
                    className="h-4 w-4"
                  />
                </th>
              ) }

              { columns.map((column) => {
                const isSorted = sortKey === String(column.key)
                const align = column.align || 'left'

                return (
                  <th
                    key={ String(column.key) }
                    className={ `px-4 py-3 font-semibold ${alignClasses[align]}` }
                  >
                    <button
                      type="button"
                      disabled={ !column.sortable }
                      onClick={ () => handleSort(column) }
                      className="inline-flex items-center gap-1 disabled:cursor-default"
                    >
                      { column.header }
                      { column.sortable && (
                        <SVG
                          type={ isSorted && sortDirection === 'desc' ? 'sort-desc' : 'sort-asc' }
                          className={ isSorted ? 'text-theme-primary' : 'text-gray-400' }
                          width={ 16 }
                          height={ 16 }
                        />
                      ) }
                    </button>
                  </th>
                )
              }) }
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            { sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={ columns.length + (selectable ? 1 : 0) }
                  className="px-4 py-10 text-center text-gray-500"
                >
                  { emptyMessage }
                </td>
              </tr>
            ) : (
              visibleData.map((row, index) => {
                const rowId = getRowId(row, pageStart + index)

                return (
                  <tr key={ rowId } className="hover:bg-gray-50">
                    { selectable && (
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={ selectedIds.includes(rowId) }
                          onChange={ () => handleSelectRow(rowId) }
                          aria-label="Select row"
                          className="h-4 w-4"
                        />
                      </td>
                    ) }

                    { columns.map((column) => {
                      const align = column.align || 'left'

                      return (
                        <td
                          key={ String(column.key) }
                          className={ `px-4 py-3 text-gray-700 ${alignClasses[align]}` }
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

      { pagination && sortedData.length > 0 && (
        <div className="flex flex-col gap-3 border-t border-gray-200 px-4 py-3 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">
          <div>
            Showing { pageStart + 1 } to { Math.min(pageEnd, sortedData.length) } of { sortedData.length } rows
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2">
              <span>Rows</span>
              <select
                value={ pageSize }
                onChange={ handlePageSizeChange }
                className="h-9 rounded-md border border-gray-300 bg-white px-2 text-sm text-gray-700 outline-none focus:border-theme-primary"
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
                      'h-9 min-w-9 rounded-md border px-3 font-medium transition-colors',
                      isActive
                        ? 'border-theme-primary bg-theme-primary text-white'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
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
