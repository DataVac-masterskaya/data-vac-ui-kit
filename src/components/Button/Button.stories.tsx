import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { children: 'Смотреть все', variant: 'primary' },
}

export const Dark: Story = {
  args: { children: 'Поддержать проект', variant: 'dark' },
}

export const Disabled: Story = {
  args: { children: 'Недоступно', disabled: true },
}
