import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { ThemeToggle } from './ThemeToggle'

describe('ThemeToggle', () => {
  it('renders день and ночь labels', () => {
    render(<ThemeToggle />)
    expect(screen.getByText('День')).toBeInTheDocument()
    expect(screen.getByText('Ночь')).toBeInTheDocument()
  })

  it('toggles dark class on html element when clicked', async () => {
    render(<ThemeToggle />)
    const toggle = screen.getByRole('switch')
    await userEvent.click(toggle)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    await userEvent.click(toggle)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })
})
