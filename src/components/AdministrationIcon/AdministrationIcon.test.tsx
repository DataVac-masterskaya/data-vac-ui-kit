import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { AdministrationIcon } from './AdministrationIcon'

describe('AdministrationIcon', () => {
  it('renders button with aria-label for method', () => {
    render(<AdministrationIcon method="cutaneously" />)
    expect(screen.getByRole('button', { name: 'Накожно' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    render(<AdministrationIcon method="intramuscularly" onClick={onClick} />)
    await userEvent.click(screen.getByRole('button', { name: 'Внутримышечно' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is passed', () => {
    render(<AdministrationIcon method="drops" disabled />)
    expect(screen.getByRole('button', { name: 'Перорально: капли' })).toBeDisabled()
  })

  it('renders SVG content inside button', () => {
    render(<AdministrationIcon method="pills" />)
    const button = screen.getByRole('button', { name: 'Перорально: таблетки' })
    expect(button.querySelector('svg')).toBeInTheDocument()
  })

  it('renders info icon as visual element', () => {
    render(<AdministrationIcon method="cutaneously" />)
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(1)
  })
})
