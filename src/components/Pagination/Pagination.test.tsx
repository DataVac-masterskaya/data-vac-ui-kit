import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Pagination } from './Pagination'

describe('Pagination — pages mode', () => {
  it('renders numbered buttons with the current page marked active', () => {
    render(<Pagination mode="pages" page={3} totalPages={5} onPageChange={vi.fn()} />)
    ;[1, 2, 3, 4, 5].forEach((n) => {
      expect(screen.getByRole('button', { name: `Страница ${n}` })).toBeInTheDocument()
    })
    expect(screen.getByRole('button', { name: 'Страница 3' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(screen.getByRole('button', { name: 'Страница 1' })).not.toHaveAttribute('aria-current')
  })

  it('renders an ellipsis for collapsed ranges', () => {
    render(<Pagination mode="pages" page={1} totalPages={20} onPageChange={vi.fn()} />)
    expect(screen.getByText('…')).toBeInTheDocument()
  })

  it('calls onPageChange when a page button is clicked', async () => {
    const onPageChange = vi.fn()
    render(<Pagination mode="pages" page={1} totalPages={5} onPageChange={onPageChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'Страница 4' }))
    expect(onPageChange).toHaveBeenCalledWith(4)
  })

  it('disables the previous button on the first page and next on the last page', () => {
    const { rerender } = render(
      <Pagination mode="pages" page={1} totalPages={5} onPageChange={vi.fn()} />,
    )
    expect(screen.getByRole('button', { name: 'Предыдущая страница' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Следующая страница' })).toBeEnabled()

    rerender(<Pagination mode="pages" page={5} totalPages={5} onPageChange={vi.fn()} />)
    expect(screen.getByRole('button', { name: 'Предыдущая страница' })).toBeEnabled()
    expect(screen.getByRole('button', { name: 'Следующая страница' })).toBeDisabled()
  })

  it('points the previous arrow left and the next arrow right', () => {
    render(<Pagination mode="pages" page={3} totalPages={5} onPageChange={vi.fn()} />)
    const prevIcon = screen
      .getByRole('button', { name: 'Предыдущая страница' })
      .querySelector('svg')
    const nextIcon = screen.getByRole('button', { name: 'Следующая страница' }).querySelector('svg')
    expect(prevIcon).toHaveClass('rotate-90')
    expect(nextIcon).toHaveClass('-rotate-90')
  })

  it('moves one page forward/back via the arrow buttons', async () => {
    const onPageChange = vi.fn()
    render(<Pagination mode="pages" page={3} totalPages={5} onPageChange={onPageChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'Следующая страница' }))
    expect(onPageChange).toHaveBeenCalledWith(4)
    await userEvent.click(screen.getByRole('button', { name: 'Предыдущая страница' }))
    expect(onPageChange).toHaveBeenCalledWith(2)
  })
})

describe('Pagination — scroll mode', () => {
  let intersectionCallbacks: IntersectionObserverCallback[]
  const originalIO = global.IntersectionObserver

  beforeEach(() => {
    intersectionCallbacks = []
    global.IntersectionObserver = class {
      constructor(callback: IntersectionObserverCallback) {
        intersectionCallbacks.push(callback)
      }
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords(): IntersectionObserverEntry[] {
        return []
      }
    } as unknown as typeof IntersectionObserver
  })

  afterEach(() => {
    global.IntersectionObserver = originalIO
  })

  function fireIntersection() {
    intersectionCallbacks.forEach((cb) =>
      cb([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver),
    )
  }

  it('calls onLoadMore when the sentinel intersects and more items are available', () => {
    const onLoadMore = vi.fn()
    render(<Pagination mode="scroll" hasMore isLoadingMore={false} onLoadMore={onLoadMore} />)
    fireIntersection()
    expect(onLoadMore).toHaveBeenCalledTimes(1)
  })

  it('does not call onLoadMore when there is nothing more to load', () => {
    const onLoadMore = vi.fn()
    render(
      <Pagination mode="scroll" hasMore={false} isLoadingMore={false} onLoadMore={onLoadMore} />,
    )
    fireIntersection()
    expect(onLoadMore).not.toHaveBeenCalled()
  })

  it('shows a loading indicator while isLoadingMore is true', () => {
    render(<Pagination mode="scroll" hasMore isLoadingMore onLoadMore={vi.fn()} />)
    expect(screen.getByRole('status', { name: 'Загрузка' })).toBeInTheDocument()
  })

  it('shows an error message with a retry button and does not auto-trigger onLoadMore', () => {
    const onLoadMore = vi.fn()
    const onRetry = vi.fn()
    render(
      <Pagination
        mode="scroll"
        hasMore
        isLoadingMore={false}
        onLoadMore={onLoadMore}
        error={new Error('network down')}
        onRetry={onRetry}
      />,
    )
    fireIntersection()
    expect(onLoadMore).not.toHaveBeenCalled()

    screen.getByRole('button', { name: 'Повторить' }).click()
    expect(onRetry).toHaveBeenCalledTimes(1)
  })
})
