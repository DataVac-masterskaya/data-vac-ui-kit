import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from 'react'
import { SearchIcon, XmarkIcon } from '../../icons'
import { cn } from '../../lib/utils'
import { SearchDropdown } from '../SearchDropdown'
import type { SearchResultGroup, SearchResultItem } from '../SearchDropdown'
import type { SearchBarProps } from './SearchBar.types'

const MIN_QUERY_LENGTH = 1

function filterResultsByQuery(results: SearchResultGroup[], query: string): SearchResultGroup[] {
  const normalized = query.trim().toLocaleLowerCase('ru')
  if (normalized.length < MIN_QUERY_LENGTH) return []

  return results
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => item.label.toLocaleLowerCase('ru').includes(normalized)),
    }))
    .filter((group) => group.items.length > 0)
}

export function SearchBar({
  results = [],
  onSearch,
  onSelect,
  onSubmit,
  isLoading = false,
  placeholder = 'Для поиска введите название вакцины, противопоказания, инфекции',
  defaultValue = '',
  className,
  forceClose = false,
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue)
  const [isOpen, setIsOpen] = useState(
    !forceClose && defaultValue.trim().length >= MIN_QUERY_LENGTH,
  )
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownId = useId()

  const filteredResults = useMemo(() => filterResultsByQuery(results, query), [results, query])

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setQuery(value)
      if (!forceClose) {
        setIsOpen(value.trim().length >= MIN_QUERY_LENGTH)
      }
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => onSearch?.(value), 300)
    },
    [onSearch, forceClose],
  )

  const handleClear = useCallback(() => {
    setQuery('')
    setIsOpen(false)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    onSearch?.('')
    inputRef.current?.focus()
  }, [onSearch])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') {
        handleClear()
      } else if (e.key === 'ArrowDown' && isOpen) {
        e.preventDefault()
        document.getElementById(dropdownId)?.focus()
      }
    },
    [dropdownId, handleClear, isOpen],
  )

  const handleSelect = useCallback(
    (item: SearchResultItem, group: SearchResultGroup) => {
      onSelect?.(item, group)
      setQuery('')
      setIsOpen(false)
      if (debounceRef.current) clearTimeout(debounceRef.current)
      onSearch?.('')
    },
    [onSelect, onSearch],
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsOpen(false)
    onSubmit?.(query)
  }

  const trigger = (
    <div
      data-search-dropdown-trigger
      className={cn(
        'w-full min-h-12 bg-card border border-border px-3 py-3 flex items-center gap-4 group',
        isOpen ? 'rounded-t-card border-b-0' : 'rounded-card',
      )}
    >
      <span
        className="shrink-0 text-fg-muted group-hover:text-fg group-focus-within:text-fg"
        aria-hidden="true"
      >
        <SearchIcon width={24} height={24} />
      </span>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (!forceClose && query.trim().length >= MIN_QUERY_LENGTH) setIsOpen(true)
        }}
        placeholder={placeholder}
        aria-label="Поиск вакцин, инфекций, противопоказаний"
        aria-autocomplete="list"
        aria-expanded={isOpen}
        aria-controls={isOpen ? dropdownId : undefined}
        className="flex-1 min-w-0 bg-transparent outline-none font-sans text-sm leading-[130%] text-fg placeholder:text-fg-muted focus:ring-0"
      />
      {query && (
        <button
          type="button"
          aria-label="Очистить поиск"
          onClick={handleClear}
          className="group shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-subtle"
        >
          <XmarkIcon
            width={24}
            height={24}
            className="text-fg-muted group-hover:text-accent transition-colors"
          />
        </button>
      )}
      {query && isOpen && (
        <button
          type="submit"
          className="shrink-0 inline-flex items-center justify-center h-8 px-3 rounded-pill bg-accent hover:bg-subtle text-card hover:text-accent text-sm font-medium transition-colors"
        >
          Найти
        </button>
      )}
    </div>
  )

  return (
    <form
      role="search"
      aria-label="Поиск"
      className={cn('w-full md:w-[605px] xl:w-[720px]', className)}
      onSubmit={handleSubmit}
    >
      <SearchDropdown
        trigger={trigger}
        open={isOpen}
        onOpenChange={setIsOpen}
        query={query}
        results={filteredResults}
        onSelect={handleSelect}
        onClose={handleClose}
        isLoading={isLoading}
        listboxId={dropdownId}
      />
    </form>
  )
}
