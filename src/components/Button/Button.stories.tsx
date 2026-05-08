import type { Meta, StoryObj } from '@storybook/react'
import { expect, fn } from 'storybook/test'
import { Button } from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    children: 'Смотреть все',
    variant: 'primary',
    size: 'md',
    disabled: false,
    onClick: fn(),
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Текст кнопки',
    },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'dark'],
      description: 'Визуальный вариант кнопки',
    },
    size: {
      control: 'radio',
      options: ['md', 'sm'],
      description: 'Размер кнопки',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключённое состояние',
    },
    asChild: {
      table: { disable: true },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas, userEvent, args }) => {
    const button = canvas.getByRole('button')
    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}

export const Disabled: Story = {
  args: {
    children: 'Недоступно',
    disabled: true,
  },
  play: async ({ canvas, args }) => {
    const button = canvas.getByRole('button')
    await expect(button).toBeDisabled()
    await expect(args.onClick).not.toHaveBeenCalled()
  },
}

export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <Button {...args} variant="primary" size="md">
          Primary md
        </Button>
        <Button {...args} variant="primary" size="sm">
          Primary sm
        </Button>
        <Button {...args} variant="primary" size="md" disabled>
          Primary disabled
        </Button>
      </div>
      <div className="flex gap-4 items-center">
        <Button {...args} variant="secondary" size="md">
          Secondary md
        </Button>
        <Button {...args} variant="secondary" size="sm">
          Secondary sm
        </Button>
        <Button {...args} variant="secondary" size="md" disabled>
          Secondary disabled
        </Button>
      </div>
      <div className="flex gap-4 items-center">
        <Button {...args} variant="dark" size="md">
          Dark md
        </Button>
        <Button {...args} variant="dark" size="sm">
          Dark sm
        </Button>
        <Button {...args} variant="dark" size="md" disabled>
          Dark disabled
        </Button>
      </div>
    </div>
  ),
}
