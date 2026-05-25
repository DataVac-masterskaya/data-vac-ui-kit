import { useEffect, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { SearchBar } from './SearchBar'
import type { SearchResultGroup } from '../SearchDropdown'

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
  title: 'Components/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'padded',
    viewport: { defaultViewport: 'responsive' },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    defaultValue: { control: 'text' },
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
} satisfies Meta<typeof SearchBar>

export default meta
type Story = StoryObj<typeof meta>

function useCloseOnScroll() {
  const [key, setKey] = useState(0)
  useEffect(() => {
    const close = () => setKey((k) => k + 1)
    window.addEventListener('scroll', close, { passive: true })
    return () => window.removeEventListener('scroll', close)
  }, [])
  return key
}

export const Default: Story = {
  render: function DefaultStory() {
    const key = useCloseOnScroll()
    const [results, setResults] = useState<typeof mockResults>([])
    const handleSearch = (query: string) => {
      setResults(query.trim().length > 0 ? mockResults : [])
    }
    return (
      <SearchBar
        key={key}
        results={results}
        onSearch={handleSearch}
        onSelect={fn()}
        onSubmit={fn()}
      />
    )
  },
}

export const WithValue: Story = {
  args: {
    defaultValue: 'в',
    results: [],
    forceClose: true,
    onSearch: fn(),
    onSelect: fn(),
    onSubmit: fn(),
  },
}

export const WithResults: Story = {
  render: function WithResultsStory() {
    const key = useCloseOnScroll()
    return (
      <SearchBar key={key} results={mockResults} onSearch={fn()} onSelect={fn()} onSubmit={fn()} />
    )
  },
}

export const Loading: Story = {
  render: function LoadingStory() {
    const key = useCloseOnScroll()
    return (
      <SearchBar key={key} results={[]} isLoading onSearch={fn()} onSelect={fn()} onSubmit={fn()} />
    )
  },
}
