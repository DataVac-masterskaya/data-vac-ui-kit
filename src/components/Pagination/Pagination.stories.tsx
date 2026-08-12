import type { Meta, StoryObj } from '@storybook/react'
import { Pagination } from './Pagination'
import { usePagination } from './usePagination'
import { PaginatedResponse } from './types'

interface DemoItem {
  id: number
  title: string
}

const ALL_ITEMS: DemoItem[] = Array.from({ length: 47 }, (_, i) => ({
  id: i + 1,
  title: `Вакцина №${i + 1}`,
}))

/** Имитация DRF limit/offset ответа с искусственной задержкой сети */
function mockFetchPage({
  limit,
  offset,
}: {
  limit: number
  offset: number
}): Promise<PaginatedResponse<DemoItem>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = ALL_ITEMS.slice(offset, offset + limit)
      const nextOffset = offset + limit
      resolve({
        count: ALL_ITEMS.length,
        next: nextOffset < ALL_ITEMS.length ? `?limit=${limit}&offset=${nextOffset}` : null,
        previous: offset > 0 ? `?limit=${limit}&offset=${Math.max(offset - limit, 0)}` : null,
        results,
      })
    }, 400)
  })
}

const meta: Meta = {
  title: 'Components/Pagination',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Пагинация для generic-списков/таблиц (см. `DataTable`) поверх DRF limit/offset контракта.\n\n' +
          '`usePagination<T>` владеет дженериком, состоянием и запросами; `<Pagination>` — немой UI ' +
          'без дженерика, получающий уже готовые примитивные пропсы.\n\n' +
          '## Режимы\n\n' +
          '- **`pages`** — нумерованные кнопки страниц с эллипсисом\n' +
          '- **`scroll`** — автозагрузка следующей порции по появлению во вьюпорте (`IntersectionObserver`)',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

function ItemList({ items }: { items: DemoItem[] }) {
  return (
    <ul className="flex flex-col gap-1">
      {items.map((item) => (
        <li key={item.id} className="px-3 py-2 rounded-input bg-interactive text-fg text-sm">
          {item.title}
        </li>
      ))}
    </ul>
  )
}

function PagesDemo() {
  const { items, page, totalPages, goToPage } = usePagination<DemoItem>({
    fetchPage: mockFetchPage,
    mode: 'pages',
    limit: 8,
  })

  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <ItemList items={items} />
      <Pagination mode="pages" page={page} totalPages={totalPages} onPageChange={goToPage} />
    </div>
  )
}

function ScrollDemo() {
  const { items, hasMore, isLoadingMore, error, loadMore, retry } = usePagination<DemoItem>({
    fetchPage: mockFetchPage,
    mode: 'scroll',
    limit: 8,
  })

  return (
    <div className="flex flex-col gap-4 max-w-sm max-h-96 overflow-y-auto">
      <ItemList items={items} />
      <Pagination
        mode="scroll"
        hasMore={hasMore}
        isLoadingMore={isLoadingMore}
        onLoadMore={loadMore}
        error={error}
        onRetry={retry}
      />
    </div>
  )
}

export const Pages: Story = {
  render: () => <PagesDemo />,
}

export const Scroll: Story = {
  render: () => <ScrollDemo />,
}
