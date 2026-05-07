import type { Meta, StoryObj } from '@storybook/react'
import { expect, screen } from 'storybook/test'
import { Button } from '../Button/Button'
import { Tooltip } from './Tooltip'

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    content: 'Подсказка при наведении',
    children: <Button variant="primary">Наведите курсор</Button>,
  },
  argTypes: {
    content: {
      control: 'text',
      description: 'Текст или содержимое подсказки (ReactNode)',
    },
    children: {
      description: 'Элемент-триггер тултипа (ReactNode)',
      table: { type: { summary: 'ReactNode' } },
      control: false,
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы для контейнера тултипа',
    },
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: /наведите курсор/i })
    await userEvent.hover(trigger)
    const tooltip = await screen.findByRole('tooltip')
    await expect(tooltip).toBeVisible()
  },
}

export const WithLongContent: Story = {
  args: {
    content: 'Вакцина вводится внутримышечно в переднебоковую поверхность бедра',
    children: <Button variant="dark">Подробнее о вводе</Button>,
  },
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: /подробнее о вводе/i })
    await userEvent.hover(trigger)
    const tooltip = await screen.findByRole('tooltip')
    await expect(tooltip).toBeVisible()
    await expect(tooltip).toHaveTextContent('Вакцина вводится')
  },
}

export const OnText: Story = {
  args: {
    content: 'Национальный календарь профилактических прививок России',
    children: <span style={{ textDecoration: 'underline dotted', cursor: 'help' }}>НКПП</span>,
  },
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByText('НКПП')
    await userEvent.hover(trigger)
    const tooltip = await screen.findByRole('tooltip')
    await expect(tooltip).toBeVisible()
  },
}
