import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { SearchBar } from './SearchBar'
import type { SearchResultGroup } from '../SearchDropdown'

const mockResults: SearchResultGroup[] = [
  {
    category: 'Вакцины',
    items: [
      { id: 'v1', label: 'Бактривир' },
      { id: 'v2', label: 'Коревая (Вектор)' },
    ],
  },
  {
    category: 'Инфекции',
    items: [{ id: 'i1', label: 'Ветряная оспа' }],
  },
]

function getInput() {
  return screen.getByRole('textbox')
}

describe('SearchBar', () => {
  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  it('renders the input with the default placeholder', () => {
    render(<SearchBar />)
    expect(
      screen.getByPlaceholderText(
        'Для поиска введите название вакцины, противопоказания, инфекции',
      ),
    ).toBeInTheDocument()
  })

  it('renders a custom placeholder when provided', () => {
    render(<SearchBar placeholder="Введите запрос" />)
    expect(screen.getByPlaceholderText('Введите запрос')).toBeInTheDocument()
  })

  it('has role="search" on the wrapper', () => {
    render(<SearchBar />)
    expect(screen.getByRole('search')).toBeInTheDocument()
  })

  it('renders the search (magnifier) svg icon', () => {
    const { container } = render(<SearchBar />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('does NOT show the "Найти" button when the input is empty', () => {
    render(<SearchBar />)
    expect(screen.queryByRole('button', { name: 'Найти' })).not.toBeInTheDocument()
  })

  it('shows the "Найти" button after typing', async () => {
    render(<SearchBar />)
    await userEvent.type(getInput(), 'в')
    expect(screen.getByRole('button', { name: 'Найти' })).toBeInTheDocument()
  })

  it('uses subtle hover styles for the clear and submit buttons', async () => {
    render(<SearchBar />)
    await userEvent.type(getInput(), 'в')

    const clearButton = screen.getByRole('button', { name: 'Очистить поиск' })
    expect(clearButton).toHaveClass('hover:bg-subtle')
    expect(clearButton.querySelector('svg')).toHaveClass('group-hover:text-accent')

    const submitButton = screen.getByRole('button', { name: 'Найти' })
    expect(submitButton).toHaveClass('hover:bg-subtle', 'hover:text-accent')
  })

  it('pre-fills the input from defaultValue', () => {
    render(<SearchBar defaultValue="тест" />)
    expect(getInput()).toHaveValue('тест')
  })

  it('clears the input on Escape key press', () => {
    render(<SearchBar defaultValue="тест" />)
    fireEvent.keyDown(getInput(), { key: 'Escape' })
    expect(getInput()).toHaveValue('')
  })

  it('calls onSearch("") when Escape is pressed with a query', () => {
    const onSearch = vi.fn()
    render(<SearchBar defaultValue="тест" onSearch={onSearch} />)
    fireEvent.keyDown(getInput(), { key: 'Escape' })
    expect(onSearch).toHaveBeenCalledWith('')
  })

  it('does NOT call onSearch immediately on input change', () => {
    vi.useFakeTimers()
    const onSearch = vi.fn()
    render(<SearchBar onSearch={onSearch} />)
    fireEvent.change(getInput(), { target: { value: 'в' } })
    expect(onSearch).not.toHaveBeenCalled()
  })

  it('calls onSearch with the typed value after 300 ms', () => {
    vi.useFakeTimers()
    const onSearch = vi.fn()
    render(<SearchBar onSearch={onSearch} />)
    fireEvent.change(getInput(), { target: { value: 'корь' } })
    void act(() => vi.advanceTimersByTime(300))
    expect(onSearch).toHaveBeenCalledWith('корь')
    expect(onSearch).toHaveBeenCalledTimes(1)
  })

  it('debounces rapid keystrokes — only the last value is emitted', () => {
    vi.useFakeTimers()
    const onSearch = vi.fn()
    render(<SearchBar onSearch={onSearch} />)
    fireEvent.change(getInput(), { target: { value: 'к' } })
    fireEvent.change(getInput(), { target: { value: 'ко' } })
    fireEvent.change(getInput(), { target: { value: 'кор' } })
    void act(() => vi.advanceTimersByTime(300))
    expect(onSearch).toHaveBeenCalledTimes(1)
    expect(onSearch).toHaveBeenCalledWith('кор')
  })

  it('calls onSubmit with the current query when "Найти" is clicked', async () => {
    const onSubmit = vi.fn()
    render(<SearchBar defaultValue="корь" results={mockResults} onSubmit={onSubmit} />)
    await waitFor(() => expect(screen.getByRole('button', { name: 'Найти' })).toBeInTheDocument())
    await userEvent.click(screen.getByRole('button', { name: 'Найти' }))
    expect(onSubmit).toHaveBeenCalledWith('корь')
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })
  it('opens the dropdown when query + results are provided (from first letter)', async () => {
    render(<SearchBar defaultValue="б" results={mockResults} />)
    await waitFor(() => {
      expect(document.body).toHaveTextContent('Вакцины')
      expect(document.body).toHaveTextContent('Бактривир')
    })
  })

  it('shows empty dropdown state when results array is empty', () => {
    render(<SearchBar defaultValue="б" results={[]} />)
    expect(document.body).toHaveTextContent('Ничего не найдено')
  })

  it('opens the dropdown with a spinner when isLoading=true', async () => {
    render(<SearchBar defaultValue="б" isLoading />)
    await waitFor(() => {
      expect(document.body.querySelector('[role="status"]')).toBeInTheDocument()
    })
  })

  it('calls onSelect when a chip in the dropdown is clicked', async () => {
    const onSelect = vi.fn()
    render(<SearchBar defaultValue="б" results={mockResults} onSelect={onSelect} />)
    await waitFor(() => expect(document.body).toHaveTextContent('Бактривир'))
    const chip = screen.getAllByRole('option').find((el) => el.textContent === 'Бактривир')
    expect(chip).toBeDefined()
    await userEvent.click(chip!)
    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(onSelect).toHaveBeenCalledWith(
      { id: 'v1', label: 'Бактривир' },
      expect.objectContaining({ category: 'Вакцины' }),
    )
  })
})
