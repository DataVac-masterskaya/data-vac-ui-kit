import type { SearchResultGroup, SearchResultItem } from '../SearchDropdown'

export interface SearchBarProps {
  results?: SearchResultGroup[]
  onSearch?: (query: string) => void
  onSelect?: (item: SearchResultItem, group: SearchResultGroup) => void
  onSubmit?: (query: string) => void
  isLoading?: boolean
  placeholder?: string
  defaultValue?: string
  className?: string
  forceClose?: boolean
}
