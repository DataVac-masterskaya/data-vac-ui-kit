import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Select, SelectOption, SelectProps } from './Select'
import { ArrowDownArrowUpIcon } from '../../icons'

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Generic-компонент выпадающего списка на основе Radix Select',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: 'Массив опций',
    },
    value: {
      control: 'text',
      description: 'Выбранное значение из списка',
    },
    onChange: {
      action: 'selected',
      description: 'Колбэк при смене значения',
    },
    placeholder: {
      control: 'text',
      description: 'Название select',
    },
    icon: {
      control: 'text',
      description: 'Иконка слева',
    },
    triggerClassName: {
      control: 'text',
      description: 'CSS класс для обертки кнопки, которая переключает select',
    },
    contentClassName: {
      control: 'text',
      description:
        'CSS класс для обертки компонента, появляющегося при открытии выпадающего списка',
    },
    viewportClassName: {
      control: 'text',
      description: 'CSS класс для прокручиваемой области просмотра, содержащей все элементы',
    },
    itemClassName: {
      control: 'text',
      description: 'CSS класс для выбранного элемента',
    },
  },
}

export default meta
type Story = StoryObj<typeof Select>

const DEMO_OPTIONS: SelectOption[] = [
  { value: 'name_asc', label: 'По названию А – Я' },
  { value: 'name_desc', label: 'По названию Я – А' },
  { value: 'other_1', label: 'Еще пункт' },
  { value: 'other_2', label: 'Еще пункт2' },
]

// Вспомогательный компонент-обёртка для управления состоянием в story
const SelectTemplate = (args: SelectProps) => {
  const [value, setValue] = useState(args.value || DEMO_OPTIONS[0]?.value || '')

  const handleChange = (v: string) => {
    args.onChange?.(v)
    setValue(v)
  }

  return (
    <div className="px-6 pt-6 pb-16 bg-page">
      <Select {...args} value={value} onChange={handleChange} />
    </div>
  )
}

export const Default: Story = {
  args: {
    options: DEMO_OPTIONS,
    placeholder: DEMO_OPTIONS[0]?.label || 'Выберите значение',
  },
  render: SelectTemplate,
}

export const WithIcon: Story = {
  args: {
    options: DEMO_OPTIONS,
    placeholder: DEMO_OPTIONS[0]?.label || 'Выберите значение',
    icon: <ArrowDownArrowUpIcon color="#E30C5C" />,
  },
  render: SelectTemplate,
}

export const SelectDarkMode: Story = {
  name: 'Тёмная тема селекта',
  args: {
    options: DEMO_OPTIONS,
    placeholder: DEMO_OPTIONS[0]?.label || 'Выберите значение',
    icon: <ArrowDownArrowUpIcon color="#E30C5C" />,
    contentClassName: 'text-[#f3f3f3] bg-[#26282b]',
    itemClassName: 'data-[state=checked]:bg-[#4F5153]',
  },
  decorators: [
    (Story) => {
      document.documentElement.classList.add('dark')
      return (
        <div className="dark bg-page p-6 rounded-card min-w-80">
          <Story />
        </div>
      )
    },
  ],
  render: (args) => <SelectTemplate {...args} />,
}
