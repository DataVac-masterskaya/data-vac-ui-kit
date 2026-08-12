import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { usePagination } from './usePagination'
import { PaginatedResponse } from './types'

function makeResponse<T>(
  items: T[],
  count: number,
  next: string | null = null,
): PaginatedResponse<T> {
  return { count, next, previous: null, results: items }
}

describe('usePagination — pages mode', () => {
  it('fetches the first page on mount with the default limit', async () => {
    const fetchPage = vi.fn().mockResolvedValue(makeResponse([{ id: 1 }, { id: 2 }], 2))

    const { result } = renderHook(() => usePagination({ fetchPage, mode: 'pages' }))

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(fetchPage).toHaveBeenCalledWith({ limit: 20, offset: 0 })
    expect(result.current.items).toEqual([{ id: 1 }, { id: 2 }])
    expect(result.current.page).toBe(1)
    expect(result.current.count).toBe(2)
  })

  it('replaces items and requests the right offset on goToPage', async () => {
    const fetchPage = vi
      .fn()
      .mockResolvedValueOnce(makeResponse([{ id: 1 }, { id: 2 }], 5))
      .mockResolvedValueOnce(makeResponse([{ id: 3 }, { id: 4 }], 5))

    const { result } = renderHook(() => usePagination({ fetchPage, mode: 'pages', limit: 2 }))
    await waitFor(() => expect(result.current.isLoading).toBe(false))

    result.current.goToPage(2)

    await waitFor(() => expect(result.current.page).toBe(2))
    expect(fetchPage).toHaveBeenLastCalledWith({ limit: 2, offset: 2 })
    expect(result.current.items).toEqual([{ id: 3 }, { id: 4 }])
    expect(result.current.totalPages).toBe(3)
  })

  it('clamps goToPage to the valid page range', async () => {
    const fetchPage = vi.fn().mockResolvedValue(makeResponse([{ id: 1 }], 3))
    const { result } = renderHook(() => usePagination({ fetchPage, mode: 'pages', limit: 1 }))
    await waitFor(() => expect(result.current.isLoading).toBe(false))

    result.current.goToPage(999)
    await waitFor(() => expect(fetchPage).toHaveBeenLastCalledWith({ limit: 1, offset: 2 }))

    result.current.goToPage(0)
    await waitFor(() => expect(fetchPage).toHaveBeenLastCalledWith({ limit: 1, offset: 0 }))
  })
})

describe('usePagination — scroll mode', () => {
  it('appends items on loadMore and exposes hasMore from the response', async () => {
    const fetchPage = vi
      .fn()
      .mockResolvedValueOnce(makeResponse([{ id: 1 }, { id: 2 }], 4, 'next-url'))
      .mockResolvedValueOnce(makeResponse([{ id: 3 }, { id: 4 }], 4, null))

    const { result } = renderHook(() => usePagination({ fetchPage, mode: 'scroll', limit: 2 }))
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.items).toEqual([{ id: 1 }, { id: 2 }])
    expect(result.current.hasMore).toBe(true)

    result.current.loadMore()

    await waitFor(() => expect(result.current.isLoadingMore).toBe(false))
    expect(fetchPage).toHaveBeenLastCalledWith({ limit: 2, offset: 2 })
    expect(result.current.items).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }])
    expect(result.current.hasMore).toBe(false)
  })

  it('does not call fetchPage again while a loadMore request is already in flight', async () => {
    let resolveSecond: (r: PaginatedResponse<{ id: number }>) => void = () => {}
    const fetchPage = vi
      .fn()
      .mockResolvedValueOnce(makeResponse([{ id: 1 }], 3, 'next-url'))
      .mockImplementationOnce(
        () =>
          new Promise((resolve) => {
            resolveSecond = resolve
          }),
      )

    const { result } = renderHook(() => usePagination({ fetchPage, mode: 'scroll', limit: 1 }))
    await waitFor(() => expect(result.current.isLoading).toBe(false))

    result.current.loadMore()
    result.current.loadMore()
    await waitFor(() => expect(result.current.isLoadingMore).toBe(true))
    expect(fetchPage).toHaveBeenCalledTimes(2)

    resolveSecond(makeResponse([{ id: 2 }], 3, null))
    await waitFor(() => expect(result.current.isLoadingMore).toBe(false))
  })
})

describe('usePagination — reset on fetchPage change', () => {
  it('resets to page 1 and refetches when fetchPage reference changes', async () => {
    const fetchPageA = vi.fn().mockResolvedValue(makeResponse([{ id: 1 }], 1))
    const fetchPageB = vi.fn().mockResolvedValue(makeResponse([{ id: 2 }], 1))

    const { result, rerender } = renderHook(
      ({ fetchPage }) => usePagination({ fetchPage, mode: 'pages' }),
      { initialProps: { fetchPage: fetchPageA } },
    )
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    result.current.goToPage(1)

    rerender({ fetchPage: fetchPageB })

    await waitFor(() => expect(result.current.items).toEqual([{ id: 2 }]))
    expect(fetchPageB).toHaveBeenCalledWith({ limit: 20, offset: 0 })
  })

  it('ignores a stale response from a superseded fetchPage', async () => {
    let resolveA: (r: PaginatedResponse<{ id: number }>) => void = () => {}
    const fetchPageA = vi.fn().mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveA = resolve
        }),
    )
    const fetchPageB = vi.fn().mockResolvedValue(makeResponse([{ id: 2 }], 1))

    const { result, rerender } = renderHook(
      ({ fetchPage }) => usePagination({ fetchPage, mode: 'pages' }),
      { initialProps: { fetchPage: fetchPageA } },
    )

    rerender({ fetchPage: fetchPageB })
    await waitFor(() => expect(result.current.items).toEqual([{ id: 2 }]))

    resolveA(makeResponse([{ id: 1 }], 1))
    await new Promise((r) => setTimeout(r, 0))

    expect(result.current.items).toEqual([{ id: 2 }])
  })
})

describe('usePagination — error handling', () => {
  it('exposes an error when the initial fetch fails, and clears it on retry', async () => {
    const fetchPage = vi
      .fn()
      .mockRejectedValueOnce(new Error('network down'))
      .mockResolvedValueOnce(makeResponse([{ id: 1 }], 1))

    const { result } = renderHook(() => usePagination({ fetchPage, mode: 'pages' }))

    await waitFor(() => expect(result.current.error).toBeInstanceOf(Error))
    expect(result.current.isLoading).toBe(false)

    result.current.retry()

    await waitFor(() => expect(result.current.items).toEqual([{ id: 1 }]))
    expect(result.current.error).toBeNull()
  })
})

describe('usePagination — enabled option', () => {
  it('does not fetch while enabled is false, then fetches once it becomes true', async () => {
    const fetchPage = vi.fn().mockResolvedValue(makeResponse([{ id: 1 }], 1))

    const { result, rerender } = renderHook(
      ({ enabled }) => usePagination({ fetchPage, mode: 'pages', enabled }),
      { initialProps: { enabled: false } },
    )

    expect(result.current.isLoading).toBe(false)
    expect(fetchPage).not.toHaveBeenCalled()

    rerender({ enabled: true })

    await waitFor(() => expect(result.current.items).toEqual([{ id: 1 }]))
    expect(fetchPage).toHaveBeenCalledTimes(1)
  })
})
