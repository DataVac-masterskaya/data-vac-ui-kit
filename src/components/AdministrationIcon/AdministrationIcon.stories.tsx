import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { AdministrationIcon, type AdministrationMethod } from './AdministrationIcon'

const allMethods: AdministrationMethod[] = [
  'cutaneously',
  'intramuscularly',
  'subcutaneously',
  'intradermally',
  'drops',
  'pills',
  'intranasally',
]

const meta = {
  title: 'Components/AdministrationIcon',
  component: AdministrationIcon,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    method: 'cutaneously',
    onClick: fn(),
  },
  argTypes: {
    method: {
      control: 'select',
      options: allMethods,
      description: 'Способ введения вакцины',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключённое состояние',
    },
  },
} satisfies Meta<typeof AdministrationIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const AllMethods: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-6 p-4">
      {allMethods.map((method) => (
        <AdministrationIcon key={method} {...args} method={method} />
      ))}
    </div>
  ),
}
