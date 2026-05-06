import type { Meta, StoryObj } from '@storybook/react'
import { Badge, Chip, Counter } from './Badge'

const meta = { title: 'Components/Badge', tags: ['autodocs'] } satisfies Meta
export default meta

export const Badges: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Badge>Дифтерия</Badge>
      <Badge>Коклюш</Badge>
    </div>
  ),
}

export const Chips: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Chip>Вакцина</Chip>
      <Chip selected>Выбрана</Chip>
    </div>
  ),
}

export const Counters: StoryObj = {
  render: () => <Counter count={8} />,
}
