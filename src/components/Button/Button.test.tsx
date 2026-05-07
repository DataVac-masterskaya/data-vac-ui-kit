import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders label', () => {
    render(<Button>Нажми</Button>)
    expect(screen.getByRole('button', { name: 'Нажми' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Нажми</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is passed', () => {
    render(<Button disabled>Нажми</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('renders dark variant', () => {
    render(<Button variant="dark">Нажми</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toMatch(/bg-neutral/)
  })
})
