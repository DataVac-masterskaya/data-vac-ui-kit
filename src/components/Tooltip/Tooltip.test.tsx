import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Tooltip } from './Tooltip'

describe('Tooltip', () => {
  it('shows content on hover', async () => {
    render(
      <Tooltip content="Подкожно">
        <button>Hover me</button>
      </Tooltip>,
    )
    await userEvent.hover(screen.getByText('Hover me'))
    const tooltips = await screen.findAllByText('Подкожно')
    expect(tooltips.length).toBeGreaterThan(0)
  })
})
