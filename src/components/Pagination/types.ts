/** Ответ бэкенда в формате DRF limit/offset пагинации */
export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export type PaginationMode = 'pages' | 'scroll'

export interface UsePaginationOptions<T> {
  /** Приложение само делает HTTP-запрос и возвращает ответ в формате DRF */
  fetchPage: (params: { limit: number; offset: number }) => Promise<PaginatedResponse<T>>
  mode: PaginationMode
  /** @default 20 */
  limit?: number
  /** Отложить первый запрос, например пока не готовы фильтры. @default true */
  enabled?: boolean
}

export interface UsePaginationResult<T> {
  /** pages: только текущая страница · scroll: накопленные данные */
  items: T[]
  /** Первая загрузка */
  isLoading: boolean
  /** scroll: догрузка следующей порции */
  isLoadingMore: boolean
  error: Error | null
  count: number
  /** 1-based, актуально для mode="pages" */
  page: number
  totalPages: number
  /** scroll: есть ли что догружать */
  hasMore: boolean
  loadMore: () => void
  goToPage: (page: number) => void
  /** Повторить последний неудавшийся запрос */
  retry: () => void
}

export type PaginationProps =
  | {
      mode: 'pages'
      page: number
      totalPages: number
      onPageChange: (page: number) => void
      className?: string
    }
  | {
      mode: 'scroll'
      hasMore: boolean
      isLoadingMore: boolean
      onLoadMore: () => void
      error?: Error | null
      onRetry?: () => void
      className?: string
    }
