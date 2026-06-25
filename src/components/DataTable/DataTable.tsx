'use client'
import { cn } from '../../lib/utils'
import { ArrowDownArrowUpIcon, InfoCircleIcon } from '../../icons'
import { Select } from '../Select'
import { SortControl } from '../SortControl'
import { Tooltip } from '../Tooltip'
import { DataTableRow } from './DataTableRow'
import { DataTableProps, DesktopBreakpoint, SortDirection } from './types'

const HEADER_BP: Record<DesktopBreakpoint, { show: string; hide: string }> = {
  md: { show: 'hidden md:flex', hide: 'md:hidden' },
  lg: { show: 'hidden lg:flex', hide: 'lg:hidden' },
}

export function DataTable<T = Record<string, unknown>>({
  columns,
  rows,
  isRowDisabled,
  onRowClick,
  getRowKey,
  sortField,
  sortDirection = 'asc',
  onSortChange,
  mobileActionLabel = 'Подробнее',
  mobileDisabledLabel = 'Нет сведений',
  tabletColumns = 3,
  desktopBreakpoint = 'md',
  className,
}: DataTableProps<T>) {
  const sortableColumns = columns.filter((col) => col.sortable)
  const hasSortable = sortableColumns.length > 0 && !!onSortChange

  const mobileOptions = sortableColumns.flatMap((col) => [
    {
      value: `${col.key}::asc`,
      label: `По ${col.sortLabel || col.label} А – Я`,
    },
    {
      value: `${col.key}::desc`,
      label: `По ${col.sortLabel || col.label} Я – А`,
    },
  ])

  const mobileSortValue =
    sortField && sortDirection ? `${sortField}::${sortDirection}` : (mobileOptions[0]?.value ?? '')

  const handleMobileChange = (value: string) => {
    const sep = value.lastIndexOf('::')
    if (sep === -1 || !onSortChange) return
    const field = value.slice(0, sep)
    const direction = value.slice(sep + 2) as SortDirection
    onSortChange(field, direction)
  }

  const hasAction = !!onRowClick
  const { show: headerShow, hide: mobileSelectHide } = HEADER_BP[desktopBreakpoint]

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {hasSortable && (
        <div className={cn(mobileSelectHide, 'flex')}>
          <Select
            options={mobileOptions}
            value={mobileSortValue}
            onChange={handleMobileChange}
            icon={<ArrowDownArrowUpIcon width={16} height={16} className="text-accent" />}
            contentClassName="w-[var(--radix-select-trigger-width)] min-w-[var(--radix-select-trigger-width)]"
          />
        </div>
      )}

      {/* Header row */}
      <div className={cn(headerShow, 'items-center px-3 gap-5')}>
        {columns.map((col) => (
          <div
            key={col.key}
            className="shrink-0 text-base text-fg-muted dark:text-fg-secondary"
            style={{
              width:
                col.width != null
                  ? typeof col.width === 'number'
                    ? `${col.width}px`
                    : col.width
                  : undefined,
              flex: col.flex,
              minWidth: 0,
            }}
          >
            {col.sortable && onSortChange ? (
              <span className="flex items-center gap-1">
                <SortControl
                  label={col.label}
                  field={col.key}
                  active={sortField === col.key}
                  direction={sortField === col.key ? sortDirection : 'asc'}
                  onChange={onSortChange}
                />
                {col.tooltip && (
                  <Tooltip content={col.tooltip}>
                    <span className="flex items-center cursor-help text-fg-secondary hover:text-accent transition-colors">
                      <InfoCircleIcon width={12} height={12} />
                    </span>
                  </Tooltip>
                )}
              </span>
            ) : col.tooltip ? (
              <Tooltip content={col.tooltip}>
                <span className="flex items-center gap-1 cursor-help group">
                  {col.label}
                  <span className="flex items-center text-fg-secondary group-hover:text-accent transition-colors">
                    <InfoCircleIcon width={12} height={12} />
                  </span>
                </span>
              </Tooltip>
            ) : (
              <span>{col.label}</span>
            )}
          </div>
        ))}

        {hasAction && <div className="ml-auto shrink-0 size-5" />}
      </div>

      <div className="flex flex-col gap-1">
        {rows.map((row, i) => (
          <DataTableRow
            key={getRowKey ? getRowKey(row, i) : String(i)}
            row={row}
            index={i}
            columns={columns}
            isDisabled={isRowDisabled?.(row)}
            hasAction={hasAction}
            mobileActionLabel={mobileActionLabel}
            mobileDisabledLabel={mobileDisabledLabel}
            tabletColumns={tabletColumns}
            desktopBreakpoint={desktopBreakpoint}
            onClick={onRowClick ? () => onRowClick(row) : undefined}
          />
        ))}
      </div>
    </div>
  )
}
