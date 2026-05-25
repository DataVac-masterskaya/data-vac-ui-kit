import { useEffect, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { SearchDropdown } from './SearchDropdown'
import type { SearchDropdownProps, SearchResultGroup } from './SearchDropdown.types'

const mockResults: SearchResultGroup[] = [
  {
    category: 'Вакцины',
    items: [
      { id: 'v1', label: 'Бактривир' },
      { id: 'v2', label: 'Коревая (Вектор)' },
      { id: 'v3', label: 'Вакцина для профилактики ветряной оспы' },
    ],
  },
  {
    category: 'Инфекции',
    items: [
      { id: 'i1', label: 'Ветряная оспа' },
      { id: 'i2', label: 'Вирус папиломы человека' },
      { id: 'i3', label: 'Вирус простого герпеса' },
    ],
  },
  {
    category: 'Ингредиенты',
    items: [
      { id: 'g1', label: 'Название игредиента' },
      { id: 'g2', label: 'Название игредиента 2' },
    ],
  },
  {
    category: 'Противопоказания',
    items: [
      { id: 'c1', label: 'ВИЧ' },
      { id: 'c2', label: 'ВИЧ у матери' },
      { id: 'c3', label: 'Внутриутробная гипотрофия' },
      { id: 'c4', label: 'Высокая температура тела' },
    ],
  },
]

const meta = {
  title: 'Components/SearchDropdown',
  component: SearchDropdown,
  parameters: {
    layout: 'padded',
    viewport: { defaultViewport: 'responsive' },
  },
  tags: ['autodocs'],
  argTypes: {
    query: { control: 'text' },
    isLoading: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div className="w-full px-4">
        <div className="max-w-[720px] mx-auto">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof SearchDropdown>

export default meta
type Story = StoryObj<typeof SearchDropdown>

function DropdownStory(args: Partial<SearchDropdownProps>) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    window.addEventListener('scroll', close, { passive: true })
    return () => window.removeEventListener('scroll', close)
  }, [open])

  return (
    <SearchDropdown
      open={open}
      onOpenChange={setOpen}
      query={args.query ?? ''}
      results={args.results ?? []}
      onSelect={args.onSelect ?? fn()}
      onClose={args.onClose ?? fn()}
      isLoading={args.isLoading}
      emptyStateText={args.emptyStateText}
      listboxId={args.listboxId}
      trigger={
        <button
          type="button"
          className="w-full min-h-12 bg-card border border-border px-3 py-3 text-left rounded-card text-fg"
          onClick={() => setOpen((current) => !current)}
        >
          {args?.query || 'Поиск'}
        </button>
      }
    />
  )
}

export const Default: Story = {
  render: DropdownStory,
  args: {
    query: '',
    results: [],
    onSelect: fn(),
    onClose: fn(),
    open: true,
    onOpenChange: fn(),
    trigger: null,
  },
}

export const WithResults: Story = {
  render: DropdownStory,
  args: {
    query: 'в',
    results: mockResults,
    onSelect: fn(),
    onClose: fn(),
    open: true,
    onOpenChange: fn(),
    trigger: null,
  },
}

export const EmptyState: Story = {
  render: DropdownStory,
  args: {
    query: 'чума',
    results: [],
    onSelect: fn(),
    onClose: fn(),
    open: true,
    onOpenChange: fn(),
    trigger: null,
  },
}

export const Loading: Story = {
  render: DropdownStory,
  args: {
    query: 'в',
    results: [],
    isLoading: true,
    onSelect: fn(),
    onClose: fn(),
    open: true,
    onOpenChange: fn(),
    trigger: null,
  },
}
