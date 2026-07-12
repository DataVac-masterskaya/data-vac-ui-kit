'use client'
import { KeyboardEvent, ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { ArrowsIcon, MinusIcon } from '../../icons'
import { Tooltip } from '../Tooltip'
import { DataTableColumn, DesktopBreakpoint } from './types'

interface DataTableRowProps<T> {
  row: T
  index: number
  columns: DataTableColumn<T>[]
  isDisabled?: boolean
  hasAction?: boolean
  mobileActionLabel?: string
  /** @default "Нет сведений" */
  mobileDisabledLabel?: string
  disabledTooltip?: ReactNode
  /** @default 3 */
  tabletColumns?: number
  /** @default 'md' */
  desktopBreakpoint?: DesktopBreakpoint
  onClick?: () => void
}

// Классы должны быть статическими строками — Tailwind сканирует их исходники
const BP: Record<DesktopBreakpoint, { desktop: string; tablet: string }> = {
  md: {
    desktop: 'hidden md:flex',
    tablet: 'hidden min-[480px]:flex md:hidden',
  },
  lg: {
    desktop: 'hidden lg:flex',
    tablet: 'hidden min-[480px]:flex lg:hidden',
  },
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

/** Группирует колонки для мобайла: mobileHalf-соседи — в одну строку, остальные — по одному. */
function groupMobileColumns<T>(cols: DataTableColumn<T>[]): DataTableColumn<T>[][] {
  const groups: DataTableColumn<T>[][] = []
  let i = 0
  while (i < cols.length) {
    if (cols[i].mobileHalf) {
      const group: DataTableColumn<T>[] = []
      while (i < cols.length && cols[i].mobileHalf) {
        group.push(cols[i])
        i++
      }
      groups.push(group)
    } else {
      groups.push([cols[i]])
      i++
    }
  }
  return groups
}

function getColStyle(col: DataTableColumn<unknown>): React.CSSProperties {
  return {
    width:
      col.width != null
        ? typeof col.width === 'number'
          ? `${col.width}px`
          : col.width
        : undefined,
    flex: col.flex,
    minWidth: 0,
  }
}

function renderCell<T>(col: DataTableColumn<T>, row: T, index: number): ReactNode {
  if (col.render) return col.render(row, index)
  const val = (row as Record<string, unknown>)[col.key]
  if (val == null) return ''
  if (typeof val === 'string') return val
  return JSON.stringify(val)
}

export function DataTableRow<T>({
  row,
  index,
  columns,
  isDisabled = false,
  hasAction = false,
  mobileActionLabel = 'Подробнее',
  mobileDisabledLabel = 'Нет сведений',
  disabledTooltip,
  tabletColumns = 3,
  desktopBreakpoint = 'md',
  onClick,
}: DataTableRowProps<T>) {
  const isClickable = !!onClick && !isDisabled

  const handleClick = () => {
    if (isClickable) onClick()
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      onClick()
    }
  }

  const interactiveProps = isClickable
    ? {
        role: 'button' as const,
        tabIndex: 0,
        onClick: handleClick,
        onKeyDown: handleKeyDown,
      }
    : {}

  const rowBaseClass = cn(
    'group bg-card rounded-xl transition-colors',
    isDisabled ? 'text-fg-muted' : 'text-fg',
    !isDisabled && isClickable ? 'cursor-pointer hover:brightness-[0.97]' : '',
  )

  const rowPadding = isDisabled ? 'py-[11px]' : 'py-4'

  const visibleColumns = columns.filter((col) => !col.desktopOnly)
  const columnChunks = chunkArray(visibleColumns, tabletColumns)
  const mobileGroups = groupMobileColumns(visibleColumns)

  const { desktop: desktopClass, tablet: tabletClass } = BP[desktopBreakpoint]

  const disabledIcon = (
    <div className="shrink-0 flex items-center justify-center size-5 rounded-full bg-subtle">
      <MinusIcon width={12} height={12} className="text-fg-muted" />
    </div>
  )

  const actionIcon =
    hasAction &&
    (isDisabled ? (
      disabledTooltip ? (
        <Tooltip content={disabledTooltip}>{disabledIcon}</Tooltip>
      ) : (
        disabledIcon
      )
    ) : (
      <div className="shrink-0 flex items-center justify-center size-5 rounded-full bg-subtle group-hover:bg-accent">
        <ArrowsIcon className="text-fg group-hover:text-interactive" />
      </div>
    ))

  const mobileBadge = hasAction && (
    <span className="shrink-0 px-2 py-0.5 bg-subtle rounded-full text-xs text-neutral whitespace-nowrap">
      {isDisabled ? mobileDisabledLabel : mobileActionLabel}
    </span>
  )

  return (
    <>
      {/* Desktop */}
      <div
        className={cn(desktopClass, 'items-start px-3 gap-5', rowPadding, rowBaseClass)}
        aria-disabled={isDisabled || undefined}
        {...interactiveProps}
      >
        {columns.map((col) => (
          <div
            key={col.key}
            className="shrink-0 text-base overflow-hidden text-ellipsis"
            style={getColStyle(col as DataTableColumn<unknown>)}
          >
            {renderCell(col, row, index)}
          </div>
        ))}
        {hasAction && <div className="ml-auto self-center">{actionIcon}</div>}
      </div>

      {/* Tablet — 480px до desktopBreakpoint */}
      <div
        className={cn(tabletClass, 'items-start gap-[10px] p-3', rowBaseClass)}
        aria-disabled={isDisabled || undefined}
        {...interactiveProps}
      >
        <div className="flex-1 flex flex-col gap-[10px] min-w-0">
          {columnChunks.map((chunk, rowIdx) => (
            <div key={rowIdx} className="flex gap-3 w-full">
              {chunk.map((col) => (
                <div key={col.key} className="flex-1 flex flex-col gap-1 min-w-0">
                  <span className="text-xs text-fg-secondary">{col.label}</span>
                  <div className="text-sm">{renderCell(col, row, index)}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
        {actionIcon}
      </div>

      {/* Mobile — < 480px */}
      <div
        className={cn('min-[480px]:hidden flex flex-col gap-[10px] px-3 py-4', rowBaseClass)}
        aria-disabled={isDisabled || undefined}
        {...interactiveProps}
      >
        {mobileGroups.map((group, groupIdx) => (
          <div key={group[0].key} className="flex gap-3 w-full">
            {group.map((col, colIdx) => (
              <div key={col.key} className="flex-1 flex flex-col gap-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-fg-secondary">{col.label}</span>
                  {groupIdx === 0 && colIdx === 0 && mobileBadge}
                </div>
                <div className="text-sm">{renderCell(col, row, index)}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}
