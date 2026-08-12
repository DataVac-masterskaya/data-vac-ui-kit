'use client'
import { useEffect, useRef } from 'react'
import { cn } from '../../lib/utils'
import { ArrowIcon } from '../../icons'
import { Spinner } from '../Spinner'
import { getPageRange } from './getPageRange'
import { PaginationProps } from './types'

function PageButton({
  page,
  active,
  onClick,
}: {
  page: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-label={`Страница ${page}`}
      aria-current={active ? 'page' : undefined}
      onClick={onClick}
      className={cn(
        'flex items-center justify-center size-8 rounded-pill text-sm font-medium transition-colors',
        active ? 'bg-accent text-white' : 'text-fg hover:bg-interactive',
      )}
    >
      {page}
    </button>
  )
}

function ArrowButton({
  direction,
  label,
  disabled,
  onClick,
}: {
  direction: 'prev' | 'next'
  label: string
  disabled: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex items-center justify-center size-8 rounded-pill text-fg disabled:opacity-40 disabled:pointer-events-none hover:bg-interactive transition-colors"
    >
      <ArrowIcon
        width={16}
        height={16}
        className={direction === 'prev' ? 'rotate-90' : '-rotate-90'}
      />
    </button>
  )
}

export function Pagination(props: PaginationProps) {
  if (props.mode === 'pages') {
    const { page, totalPages, onPageChange, className } = props
    const range = getPageRange(page, totalPages)

    return (
      <nav aria-label="Пагинация" className={cn('flex items-center gap-1', className)}>
        <ArrowButton
          direction="prev"
          label="Предыдущая страница"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        />
        {range.map((item, i) =>
          item === 'ellipsis' ? (
            <span
              key={`ellipsis-${i}`}
              aria-hidden
              className="flex items-center justify-center size-8 text-fg-muted"
            >
              …
            </span>
          ) : (
            <PageButton
              key={item}
              page={item}
              active={item === page}
              onClick={() => onPageChange(item)}
            />
          ),
        )}
        <ArrowButton
          direction="next"
          label="Следующая страница"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        />
      </nav>
    )
  }

  return <ScrollTrigger {...props} />
}

function ScrollTrigger({
  hasMore,
  isLoadingMore,
  onLoadMore,
  error,
  onRetry,
  className,
}: Extract<PaginationProps, { mode: 'scroll' }>) {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const canLoadMore = hasMore && !isLoadingMore && !error

  useEffect(() => {
    const node = sentinelRef.current
    if (!node || !canLoadMore) return

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        onLoadMore()
      }
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [canLoadMore, onLoadMore])

  return (
    <div className={cn('flex flex-col items-center gap-2 py-4', className)}>
      <div ref={sentinelRef} aria-hidden className="h-px w-full shrink-0" />
      {isLoadingMore && <Spinner size="sm" />}
      {error && (
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-sm text-fg-secondary">Не удалось загрузить данные</p>
          <button
            type="button"
            onClick={onRetry}
            className="text-sm font-medium text-accent hover:opacity-80 transition-opacity"
          >
            Повторить
          </button>
        </div>
      )}
    </div>
  )
}
