import type { Meta, StoryObj } from '@storybook/react'
import * as Icons from './index'

const meta: Meta = {
  title: 'Icons/All',
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj

const iconEntries = Object.entries(Icons).filter(
  ([name, val]) => name.endsWith('Icon') && typeof val === 'function',
) as [string, React.FC<Icons.IconProps>][]

const iconNames = iconEntries.map(([name]) => name.replace('Icon', ''))

export const Gallery: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      {iconEntries.map(([name, Icon]) => (
        <div key={name} className="flex flex-col items-center gap-2 w-20">
          <div className="flex items-center justify-center w-10 h-10 rounded-sm bg-subtle text-fg">
            <Icon width={24} height={24} />
          </div>
          <span className="text-center text-fg-muted" style={{ fontSize: 10 }}>
            {name.replace('Icon', '')}
          </span>
        </div>
      ))}
    </div>
  ),
}

export const Individual: Story = {
  name: 'Individual',
  args: {
    name: iconNames[0],
    size: 24,
  },
  argTypes: {
    name: {
      control: 'select',
      options: iconNames,
      description: 'Название иконки (без суффикса Icon)',
    },
    size: {
      control: { type: 'range', min: 12, max: 64, step: 4 },
      description: 'Размер иконки в пикселях',
    },
  },
  render: (args: { name?: string; size?: number }) => {
    const iconName = `${args.name ?? iconNames[0]}Icon`
    const IconComponent = (Icons as Record<string, React.FC<Icons.IconProps>>)[iconName]
    const size = args.size ?? 24
    if (!IconComponent) {
      return <span style={{ color: 'red' }}>Иконка не найдена: {iconName}</span>
    }
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center justify-center w-20 h-20 rounded-sm bg-subtle text-fg">
          <IconComponent width={size} height={size} />
        </div>
        <span className="text-fg-muted text-sm">
          {args.name}Icon — {size}px
        </span>
      </div>
    )
  },
}
