import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton, Spinner } from './Spinner'

const sizeClassMap: Record<string, string> = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-10 h-10',
}

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { className: '' },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const SpinnerStory: Story = {
  name: 'Spinner',
  args: {
    className: 'md',
  },
  argTypes: {
    className: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Размер спиннера (sm=16px, md=24px, lg=40px)',
    },
  },
  render: (args) => {
    const sizeClass = sizeClassMap[args.className ?? 'md'] ?? sizeClassMap['md']
    return <Spinner className={sizeClass} />
  },
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
        <Spinner className="w-4 h-4" />
        <span style={{ fontSize: 10, color: 'var(--color-fg-muted)' }}>sm</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Spinner className="w-6 h-6" />
        <span style={{ fontSize: 10, color: 'var(--color-fg-muted)' }}>md</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Spinner className="w-10 h-10" />
        <span style={{ fontSize: 10, color: 'var(--color-fg-muted)' }}>lg</span>
      </div>
    </div>
  ),
}
