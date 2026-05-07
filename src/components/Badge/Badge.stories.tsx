import type { Meta, StoryObj } from '@storybook/react'
import { expect, fn } from 'storybook/test'
import { useState } from 'react'
import { Badge, Chip, Counter } from './Badge'

// Use a generic meta without tying to a specific component so sub-stories
// can showcase Chip and Counter with their own props alongside Badge.
const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    children: 'Дифтерия',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Текст внутри бейджа',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы',
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const BadgeStory: Story = {
  name: 'Badge',
  args: {
    children: 'Дифтерия',
  },
}

export const ChipStory: Story = {
  name: 'Chip',
  render: function Render(args) {
    const [selected, setSelected] = useState(false)
    const handleClick = fn()
    return (
      <Chip
        selected={selected}
        onClick={(e) => {
          setSelected((s) => !s)
          handleClick(e)
        }}
      >
        {typeof args.children === 'string' ? args.children : 'Вакцина'}
      </Chip>
    )
  },
  play: async ({ canvas, userEvent }) => {
    const chip = canvas.getByRole('button')
    await expect(chip).not.toHaveClass('bg-accent')
    await userEvent.click(chip)
    await expect(chip).toHaveClass('bg-accent')
  },
}

export const CounterStory: Story = {
  name: 'Counter',
  render: () => <Counter count={8} />,
}

export const All: Story = {
  name: 'Все варианты',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: 'var(--color-fg-muted)' }}>Badge</p>
        <div style={{ display: 'flex', gap: 8 }}>
          <Badge>Дифтерия</Badge>
          <Badge>Коклюш</Badge>
          <Badge>Столбняк</Badge>
        </div>
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: 'var(--color-fg-muted)' }}>Chip</p>
        <div style={{ display: 'flex', gap: 8 }}>
          <Chip>Вакцина</Chip>
          <Chip selected>Выбрана</Chip>
        </div>
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: 'var(--color-fg-muted)' }}>Counter</p>
        <Counter count={8} />
      </div>
    </div>
  ),
}
