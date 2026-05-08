import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    padding: 'md',
    shadow: true,
    children: 'Содержимое карточки',
  },
  argTypes: {
    padding: {
      control: 'radio',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Внутренние отступы',
    },
    shadow: {
      control: 'boolean',
      description: 'Тонкая тень',
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Paddings: Story = {
  render: () => (
    <div className="flex flex-col gap-4 bg-page p-6">
      <Card padding="sm">sm — 16px</Card>
      <Card padding="md">md — 20px (по умолчанию)</Card>
      <Card padding="lg">lg — 32/24px</Card>
    </div>
  ),
}

export const DarkCard: Story = {
  render: () => (
    <div className="bg-page p-6">
      <Card padding="sm" className="max-w-xs">
        <p className="text-base font-medium text-fg mb-8">Контент</p>
        <p className="text-sm text-fg-secondary">
          Поскольку инструкции к вакцинам меняются, нам необходимо регулярно отслеживать эти
          изменения.
        </p>
      </Card>
    </div>
  ),
}
