import type { ReactNode } from 'react'

export interface SearchResultItem {
  id: string
  label: string
  category?: string
}

export interface SearchResultGroup {
  category: string
  items: SearchResultItem[]
}

export interface SearchDropdownProps {
  trigger: ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
  query: string
  results: SearchResultGroup[]
  onSelect: (item: SearchResultItem, group: SearchResultGroup) => void
  onClose: () => void
  isLoading?: boolean
  emptyStateText?: string
  listboxId?: string
}
