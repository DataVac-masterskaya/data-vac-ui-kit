import type { Meta, StoryObj } from '@storybook/react'
import { expect } from 'storybook/test'
import { useState } from 'react'
import { Input, SearchBar } from './Input'

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    variant: 'white',
    placeholder: 'Введите значение',
    disabled: false,
    value: '',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['white', 'grey'],
      description: 'Цветовой вариант поля ввода',
    },
    placeholder: {
      control: 'text',
      description: 'Текст-заполнитель',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключённое состояние',
    },
    value: {
      control: 'text',
      description: 'Текущее значение (для контролируемого использования)',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render(args) {
    const [value, setValue] = useState(String(args.value ?? ''))
    return <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole('textbox')
    await userEvent.clear(input)
    await userEvent.type(input, 'Тестовое значение')
    await expect(input).toHaveValue('Тестовое значение')
  },
}

export const White: Story = {
  args: {
    variant: 'white',
    placeholder: 'Ваш e-mail',
  },
}

export const Grey: Story = {
  args: {
    variant: 'grey',
    placeholder: 'Номер карты',
  },
}

export const DisabledInput: Story = {
  name: 'Disabled',
  args: {
    placeholder: 'Недоступно для ввода',
    disabled: true,
  },
}

export const SearchBarStory: Story = {
  name: 'SearchBar',
  argTypes: {
    variant: { table: { disable: true } },
    value: { table: { disable: true } },
  },
  render: (args) => (
    <SearchBar
      placeholder={String(args.placeholder ?? 'Для поиска введите название вакцины')}
      disabled={args.disabled}
    />
  ),
  args: {
    placeholder: 'Для поиска введите название вакцины, противопоказания, инфекции',
    disabled: false,
  },
}
