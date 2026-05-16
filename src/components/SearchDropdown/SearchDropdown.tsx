import * as Popover from '@radix-ui/react-popover'
import { useCallback, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { Chip } from '../Badge'
import { Spinner } from '../Spinner'
import { cn } from '../../lib/utils'
import type {
  SearchDropdownProps,
  SearchResultGroup,
  SearchResultItem,
} from './SearchDropdown.types'

function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'))

  return (
    <span className="group-hover:text-accent">
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="text-accent font-semibold">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </span>
  )
}

interface FlatItem {
  item: SearchResultItem
  group: SearchResultGroup
  groupIdx: number
  itemIdx: number
}

export function SearchDropdown({
  trigger,
  open,
  onOpenChange,
  query,
  results,
  onSelect,
  onClose,
  isLoading = false,
  emptyStateText = 'Ничего не найдено',
}: SearchDropdownProps) {
  const [activeIndex, setActiveIndex] = useState(-1)
  const listboxRef = useRef<HTMLDivElement>(null)

  const flatItems = useMemo<FlatItem[]>(
    () =>
      results.flatMap((group, groupIdx) =>
        group.items.map((item, itemIdx) => ({ item, group, groupIdx, itemIdx })),
      ),
    [results],
  )

  const activeDescendant =
    activeIndex >= 0 && activeIndex < flatItems.length
      ? `option-${flatItems[activeIndex].groupIdx}-${flatItems[activeIndex].itemIdx}`
      : undefined

  const closeDropdown = useCallback(() => {
    onClose()
    onOpenChange(false)
  }, [onClose, onOpenChange])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (flatItems.length === 0) {
        if (e.key === 'Escape') closeDropdown()
        return
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setActiveIndex((prev) => (prev + 1) % flatItems.length)
          break
        case 'ArrowUp':
          e.preventDefault()
          setActiveIndex((prev) => (prev - 1 + flatItems.length) % flatItems.length)
          break
        case 'Enter':
          if (activeIndex >= 0 && flatItems[activeIndex]) {
            const { item, group } = flatItems[activeIndex]
            onSelect(item, group)
            closeDropdown()
          }
          break
        case 'Escape':
          closeDropdown()
          break
      }
    },
    [flatItems, activeIndex, onSelect, closeDropdown],
  )

  const handleItemClick = (item: SearchResultItem, group: SearchResultGroup) => {
    onSelect(item, group)
    closeDropdown()
  }

  return (
    <Popover.Root open={open} onOpenChange={onOpenChange} modal={false}>
      <Popover.Anchor asChild>{trigger}</Popover.Anchor>

      <Popover.Portal>
        <Popover.Content
          sideOffset={0}
          align="start"
          collisionPadding={16}
          avoidCollisions
          onInteractOutside={(e) => {
            const target = e.target as HTMLElement
            if (target.closest('[data-search-dropdown-trigger]')) {
              e.preventDefault()
              return
            }
            closeDropdown()
          }}
          onOpenAutoFocus={(e) => {
            e.preventDefault()
            setActiveIndex(-1)
          }}
          style={{ width: 'var(--radix-popover-trigger-width)' }}
          className="z-50 max-w-[calc(100vw-2rem)]"
        >
          <div
            ref={listboxRef}
            id="search-dropdown-listbox"
            role="listbox"
            aria-label="Результаты поиска"
            aria-activedescendant={activeDescendant}
            tabIndex={-1}
            onKeyDown={handleKeyDown}
            className={cn(
              'relative flex flex-col gap-4 outline-none',
              'bg-card border border-border border-t-0 rounded-b-card p-3',
              'max-h-[564px] overflow-y-auto',
              'shadow-[0px_4px_32px_-2px_rgba(12,12,13,0.12)]',
              'w-full',
            )}
          >
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <Spinner size="md" />
              </div>
            ) : results.length === 0 ? (
              <p className="text-center text-fg-secondary text-sm py-4">{emptyStateText}</p>
            ) : (
              results.map((group, groupIdx) => (
                <div key={group.category} className="flex flex-col gap-1.5">
                  <span className="text-sm font-normal text-[#959595]">{group.category}</span>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item, itemIdx) => {
                      const flatIdx = flatItems.findIndex(
                        (fi) => fi.groupIdx === groupIdx && fi.itemIdx === itemIdx,
                      )
                      const isActive = flatIdx === activeIndex
                      return (
                        <Chip
                          key={item.id}
                          role="option"
                          id={`option-${groupIdx}-${itemIdx}`}
                          aria-selected={isActive}
                          className={cn(
                            'group h-8 px-3 text-sm font-semibold leading-[18px] cursor-pointer',
                            'bg-[#F3F3F3] hover:bg-[#F3F3F3] hover:text-accent transition-colors',
                            isActive && 'ring-2 ring-accent',
                          )}
                          onClick={() => handleItemClick(item, group)}
                        >
                          <HighlightedText text={item.label} query={query} />
                        </Chip>
                      )
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
