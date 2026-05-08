import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { ThemeProvider } from '../ThemeProvider'
import { ThemeToggle } from './ThemeToggle'

const renderWithProvider = () =>
  render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  )

describe('ThemeToggle', () => {
  it('renders день and ночь labels', () => {
    renderWithProvider()
    expect(screen.getByText('День')).toBeInTheDocument()
    expect(screen.getByText('Ночь')).toBeInTheDocument()
  })

  it('toggles dark class on html element when clicked', async () => {
    renderWithProvider()
    const [desktopToggle] = screen.getAllByRole('switch')
    await userEvent.click(desktopToggle)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    await userEvent.click(desktopToggle)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })
})
