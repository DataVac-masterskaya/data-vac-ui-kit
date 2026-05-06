import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Badge, Chip, Counter } from './Badge'

describe('Badge', () => {
  it('renders text', () => {
    render(<Badge>Дифтерия</Badge>)
    expect(screen.getByText('Дифтерия')).toBeInTheDocument()
  })
})

describe('Chip', () => {
  it('renders and is clickable', async () => {
    const onClick = vi.fn()
    render(<Chip onClick={onClick}>Коклюш</Chip>)
    await userEvent.click(screen.getByText('Коклюш'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('renders selected state', () => {
    const { container } = render(<Chip selected>Выбран</Chip>)
    expect(container.firstChild).toHaveClass('bg-primary')
  })
})

describe('Counter', () => {
  it('renders count with + prefix', () => {
    render(<Counter count={8} />)
    expect(screen.getByText('+8')).toBeInTheDocument()
  })
})
