import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SearchDropdown } from './SearchDropdown'
import type { SearchResultGroup } from './SearchDropdown.types'

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

const DummyTrigger = <button type="button">Search trigger</button>

describe('SearchDropdown', () => {
  it('renders group labels and chip items', () => {
    render(
      <SearchDropdown
        trigger={DummyTrigger}
        open={true}
        onOpenChange={vi.fn()}
        query=""
        results={mockResults}
        onSelect={vi.fn()}
        onClose={vi.fn()}
      />,
    )

    expect(screen.getByText('Вакцины')).toBeInTheDocument()
    expect(screen.getByText('Бактривир')).toBeInTheDocument()
  })

  it('calls onSelect when chip is clicked', async () => {
    const onSelect = vi.fn()

    render(
      <SearchDropdown
        trigger={DummyTrigger}
        open={true}
        onOpenChange={vi.fn()}
        query=""
        results={mockResults}
        onSelect={onSelect}
        onClose={vi.fn()}
      />,
    )

    await userEvent.click(screen.getByText('Бактривир'))

    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(onSelect).toHaveBeenCalledWith(
      { id: 'v1', label: 'Бактривир' },
      mockResults[0],
    )
  })

  it('shows spinner when loading', () => {
    render(
      <SearchDropdown
        trigger={DummyTrigger}
        open={true}
        onOpenChange={vi.fn()}
        query="в"
        results={[]}
        isLoading
        onSelect={vi.fn()}
        onClose={vi.fn()}
      />,
    )

    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('shows empty state text', () => {
    render(
      <SearchDropdown
        trigger={DummyTrigger}
        open={true}
        onOpenChange={vi.fn()}
        query="чума"
        results={[]}
        onSelect={vi.fn()}
        onClose={vi.fn()}
      />,
    )

    expect(screen.getByText('Ничего не найдено')).toBeInTheDocument()
  })

  it('highlights matching query text', () => {
    render(
      <SearchDropdown
        trigger={DummyTrigger}
        open={true}
        onOpenChange={vi.fn()}
        query="ви"
        results={mockResults}
        onSelect={vi.fn()}
        onClose={vi.fn()}
      />,
    )

    const highlighted = document.body.querySelectorAll('span.text-accent')
    expect(highlighted.length).toBeGreaterThan(0)
  })

  it('keeps dropdown items subtle with accent text on hover', () => {
    render(
      <SearchDropdown
        trigger={DummyTrigger}
        open={true}
        onOpenChange={vi.fn()}
        query="Бак"
        results={mockResults}
        onSelect={vi.fn()}
        onClose={vi.fn()}
      />,
    )

    const option = screen.getByRole('option', { name: 'Бактривир' })
    expect(option).toHaveClass('bg-[#F3F3F3]', 'hover:bg-[#F3F3F3]', 'hover:text-accent')
    expect(option.querySelector('span')).toHaveClass('group-hover:text-accent')
  })

  it('does not render results while loading', () => {
    render(
      <SearchDropdown
        trigger={DummyTrigger}
        open={true}
        onOpenChange={vi.fn()}
        query="в"
        results={mockResults}
        isLoading
        onSelect={vi.fn()}
        onClose={vi.fn()}
      />,
    )

    expect(screen.queryByText('Вакцины')).not.toBeInTheDocument()
  })

  it('Escape closes dropdown', () => {
    const onClose = vi.fn()
    const onOpenChange = vi.fn()

    render(
      <SearchDropdown
        trigger={DummyTrigger}
        open={true}
        onOpenChange={onOpenChange}
        query=""
        results={mockResults}
        onSelect={vi.fn()}
        onClose={onClose}
      />,
    )

    fireEvent.keyDown(screen.getByRole('listbox'), { key: 'Escape' })

    expect(onClose).toHaveBeenCalled()
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('ArrowDown + Enter selects item', () => {
    const onSelect = vi.fn()

    render(
      <SearchDropdown
        trigger={DummyTrigger}
        open={true}
        onOpenChange={vi.fn()}
        query=""
        results={mockResults}
        onSelect={onSelect}
        onClose={vi.fn()}
      />,
    )

    const listbox = screen.getByRole('listbox')

    fireEvent.keyDown(listbox, { key: 'ArrowDown' })
    fireEvent.keyDown(listbox, { key: 'Enter' })

    expect(onSelect).toHaveBeenCalled()
  })

  it('closes on outside click', async () => {
    const onClose = vi.fn()
    const onOpenChange = vi.fn()

    render(
      <div>
        <button type="button">Outside</button>
        <SearchDropdown
          trigger={DummyTrigger}
          open={true}
          onOpenChange={onOpenChange}
          query=""
          results={mockResults}
          onSelect={vi.fn()}
          onClose={onClose}
        />
      </div>,
    )

    await userEvent.click(screen.getByText('Outside'))

    expect(onOpenChange).toHaveBeenCalledWith(false)
  })
})
