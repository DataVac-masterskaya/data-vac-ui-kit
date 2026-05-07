import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Input, SearchBar } from './Input'

describe('Input', () => {
  it('renders with placeholder', () => {
    render(<Input placeholder="Ваш e-mail" />)
    expect(screen.getByPlaceholderText('Ваш e-mail')).toBeInTheDocument()
  })

  it('calls onChange with typed value', async () => {
    const onChange = vi.fn()
    render(<Input onChange={onChange} placeholder="test" />)
    await userEvent.type(screen.getByPlaceholderText('test'), 'hello')
    expect(onChange).toHaveBeenCalled()
  })

  it('renders grey variant', () => {
    const { container } = render(<Input variant="grey" placeholder="test" />)
    expect(container.firstChild).toHaveClass('bg-subtle')
  })
})

describe('SearchBar', () => {
  it('renders input with placeholder', () => {
    render(<SearchBar placeholder="Поиск" />)
    expect(screen.getByPlaceholderText('Поиск')).toBeInTheDocument()
  })

  it('renders search icon img', () => {
    const { container } = render(<SearchBar placeholder="Поиск" />)
    expect(container.querySelector('img')).toBeInTheDocument()
  })
})
