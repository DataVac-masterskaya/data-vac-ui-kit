import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Drawer } from './Drawer'

describe('Drawer', () => {
  it('opens when trigger is clicked', async () => {
    render(
      <Drawer trigger={<button>Открыть</button>} title="Возрастные ограничения">
        Контент drawer
      </Drawer>,
    )
    await userEvent.click(screen.getByText('Открыть'))
    expect(await screen.findByText('Возрастные ограничения')).toBeInTheDocument()
    expect(screen.getByText('Контент drawer')).toBeInTheDocument()
  })

  it('renders close button when open', async () => {
    render(
      <Drawer trigger={<button>Открыть</button>} title="Заголовок">
        Контент
      </Drawer>,
    )
    await userEvent.click(screen.getByText('Открыть'))
    await screen.findByText('Заголовок')
    expect(screen.getByRole('button', { name: /закрыть/i })).toBeInTheDocument()
  })
})
