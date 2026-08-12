import { useEffect, useRef, useState } from 'react'
import { UsePaginationOptions, UsePaginationResult } from './types'

const DEFAULT_LIMIT = 20

export function usePagination<T>({
  fetchPage,
  mode,
  limit = DEFAULT_LIMIT,
  enabled = true,
}: UsePaginationOptions<T>): UsePaginationResult<T> {
  const [items, setItems] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(enabled)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const isFetchingMoreRef = useRef(false)
  const requestIdRef = useRef(0)
  const lastRequestRef = useRef<{ offset: number; append: boolean }>({ offset: 0, append: false })

  // Сброс состояния при смене fetchPage/enabled — во время рендера, а не в эффекте
  // (см. "Adjusting state when a prop changes" в React docs), чтобы не вызывать
  // setState синхронно в теле useEffect.
  const [prevFetchPage, setPrevFetchPage] = useState(() => fetchPage)
  const [prevEnabled, setPrevEnabled] = useState(enabled)
  if (fetchPage !== prevFetchPage || enabled !== prevEnabled) {
    setPrevFetchPage(() => fetchPage)
    setPrevEnabled(enabled)
    setPage(1)
    setItems([])
    setError(null)
    setIsLoading(enabled)
  }

  const totalPages = Math.ceil(count / limit)

  const fetchAtOffset = (offset: number, { append }: { append: boolean }) => {
    const requestId = ++requestIdRef.current
    lastRequestRef.current = { offset, append }
    return fetchPage({ limit, offset }).then(
      (response) => {
        if (requestId !== requestIdRef.current) return
        setItems((prev) => (append ? [...prev, ...response.results] : response.results))
        setCount(response.count)
        setHasMore(response.next !== null)
        setError(null)
      },
      (err: unknown) => {
        if (requestId !== requestIdRef.current) return
        setError(err instanceof Error ? err : new Error(String(err)))
      },
    )
  }

  useEffect(() => {
    if (!enabled) return
    void fetchAtOffset(0, { append: false }).then(() => setIsLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchPage, enabled])

  const goToPage = (targetPage: number) => {
    const clamped = Math.min(Math.max(targetPage, 1), Math.max(totalPages, 1))
    setPage(clamped)
    setIsLoading(true)
    void fetchAtOffset((clamped - 1) * limit, { append: false }).then(() => setIsLoading(false))
  }

  const loadMore = () => {
    if (isFetchingMoreRef.current) return
    isFetchingMoreRef.current = true
    setIsLoadingMore(true)
    void fetchAtOffset(items.length, { append: true }).then(() => {
      isFetchingMoreRef.current = false
      setIsLoadingMore(false)
    })
  }

  const retry = () => {
    const { offset, append } = lastRequestRef.current
    if (append) {
      if (isFetchingMoreRef.current) return
      isFetchingMoreRef.current = true
      setIsLoadingMore(true)
      void fetchAtOffset(offset, { append: true }).then(() => {
        isFetchingMoreRef.current = false
        setIsLoadingMore(false)
      })
    } else {
      setIsLoading(true)
      void fetchAtOffset(offset, { append: false }).then(() => setIsLoading(false))
    }
  }

  return {
    items,
    isLoading,
    isLoadingMore,
    error,
    count,
    page,
    totalPages,
    hasMore: mode === 'scroll' ? hasMore : false,
    loadMore,
    goToPage,
    retry,
  }
}
