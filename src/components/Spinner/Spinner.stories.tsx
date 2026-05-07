import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton, Spinner } from './Spinner'

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { size: 'md' },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Размер спиннера (sm=16px, md=24px, lg=40px)',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы для обёртки',
    },
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const SpinnerStory: Story = {
  name: 'Spinner',
}

export const SkeletonStory: Story = {
  name: 'Skeleton',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 320 }}>
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  ),
}

export const AllSizes: Story = {
  name: 'Все размеры',
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Spinner size="sm" />
        <span style={{ fontSize: 10, color: 'var(--color-fg-muted)' }}>sm (16px)</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Spinner size="md" />
        <span style={{ fontSize: 10, color: 'var(--color-fg-muted)' }}>md (24px)</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Spinner size="lg" />
        <span style={{ fontSize: 10, color: 'var(--color-fg-muted)' }}>lg (40px)</span>
      </div>
    </div>
  ),
}
