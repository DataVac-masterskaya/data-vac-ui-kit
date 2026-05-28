'use client'
import { cn } from '../../lib/utils'
import { ArrowIcon } from '../../icons'

export type SortDirection = 'asc' | 'desc'

export interface SortControlProps {
  label: string
  field: string
  active: boolean
  direction: SortDirection
  onChange: (field: string, direction: SortDirection) => void
  className?: string
}

export function SortControl({
  label,
  field,
  active,
  direction,
  onChange,
  className,
}: SortControlProps) {
  const handleClick = () => {
    if (active) {
      onChange(field, direction === 'asc' ? 'desc' : 'asc')
    } else {
      onChange(field, 'asc')
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'flex items-center gap-1 text-base transition-colors cursor-pointer select-none',
        // Тёмная тема: все заголовки одинаково #a6a6a6 (fg-secondary в dark)
        'dark:text-fg-secondary',
        // Светлая тема:
        //   active  → #323335 (text-fg, тёмный)
        //   inactive → #a6a6a6 (text-fg-muted), при hover → #868686 (text-fg-secondary)
        active ? 'text-fg' : 'text-fg-muted hover:text-fg-secondary',
        className,
      )}
    >
      <span>{label}</span>
      {/* Стрелка всегда показана на сортируемых колонках.
          Активная + asc → повёрнута вверх (↑); desc / неактивная → вниз (↓). */}
      <ArrowIcon
        width={16}
        height={16}
        className={cn(
          'shrink-0 transition-transform duration-200',
          active && direction === 'asc' ? 'rotate-180' : 'rotate-0',
        )}
      />
    </button>
  )
}
