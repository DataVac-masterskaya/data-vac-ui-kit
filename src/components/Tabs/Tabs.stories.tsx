import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Tabs, type TabItem } from './Tabs'

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Универсальный компонент вкладок на основе Radix Tabs',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    activeId: {
      control: 'text',
      description: 'ID активной вкладки',
    },
    onChange: {
      action: 'changed',
      description: 'Колбэк при смене вкладки',
    },
    tabs: {
      description: 'Массив вкладок',
      control: 'object',
    },
    className: {
      control: 'text',
      description: 'CSS класс для обертки',
    },
    tabClassName: {
      control: 'text',
      description: 'Базовые стили каждой вкладки',
    },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof Tabs>

// Вспомогательный компонент-обёртка для управления состоянием в story
const TabsWithState = ({
  tabs,
  initialActiveId,
  ...props
}: {
  tabs: TabItem[]
  initialActiveId?: string
} & Omit<React.ComponentProps<typeof Tabs>, 'activeId' | 'onChange'>) => {
  const [activeId, setActiveId] = useState(initialActiveId || tabs[0]?.id || '')

  return <Tabs tabs={tabs} activeId={activeId} onChange={setActiveId} {...props} />
}

export const PillTabs: Story = {
  render: () => (
    <TabsWithState
      tabs={[
        { id: '123', label: 'Картой', content: <div className="p-4">Раскладка с суммами</div> },
        { id: '345', label: 'Перевод по QR-коду', content: <div className="p-4">QR-код</div> },
        { id: '567', label: 'По реквизитам', content: <div className="p-4">Ревизиты</div> },
      ]}
      className="gap-6 p-6 bg-page rounded-card min-w-80"
      listClassName="gap-2 justify-center items-center"
      tabClassName="py-1.5 px-3 bg-interactive hover:text-accent data-[state=active]:text-interactive data-[state=active]:bg-neutral data-[state=active]:hover:text-interactive rounded-full"
    />
  ),
}

export const TextTabs: Story = {
  render: () => (
    <TabsWithState
      tabs={[
        {
          id: '321',
          label: 'Переработанная информация из разделов',
          content: <div className="p-4">Полное название вакцины...</div>,
        },
        {
          id: '654',
          label: 'Информация из инструкции',
          content: <div className="p-4">Инструкция</div>,
        },
      ]}
      className="gap-5 bg-page p-6 rounded-card min-w-80"
      listClassName="gap-8 justify-start items-center"
      tabClassName="text-fg-muted hover:text-accent font-semibold data-[state=active]:text-fg data-[state=active]:hover:text-fg"
      contentClassName="pt-4"
    />
  ),
}

export const PillTabsDarkMode: Story = {
  name: 'Тёмная тема пилюльные табы',
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
  render: () => (
    <TabsWithState
      tabs={[
        { id: '123', label: 'Картой', content: <div className="p-4">Раскладка с суммами</div> },
        { id: '345', label: 'Перевод по QR-коду', content: <div className="p-4">QR-код</div> },
        { id: '567', label: 'По реквизитам', content: <div className="p-4">Ревизиты</div> },
      ]}
      className="gap-6"
      listClassName="gap-2 justify-center items-center"
      tabClassName="py-1.5 px-3 bg-[#26282B] text-fg hover:text-accent data-[state=active]:text-white data-[state=active]:bg-neutral data-[state=active]:hover:text-white rounded-full"
      contentClassName="pt-4 text-fg"
    />
  ),
}

export const TextTabsDarkMode: Story = {
  name: 'Тёмная тема текстовые табы',
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
  render: () => (
    <TabsWithState
      tabs={[
        {
          id: '321',
          label: 'Переработанная информация из разделов',
          content: <div className="p-4">Полное название вакцины...</div>,
        },
        {
          id: '654',
          label: 'Информация из инструкции',
          content: <div className="p-4">Инструкция</div>,
        },
      ]}
      className="gap-5"
      listClassName="gap-8 justify-start items-center"
      tabClassName="text-fg-muted hover:text-accent font-semibold data-[state=active]:text-fg data-[state=active]:hover:text-fg"
      contentClassName="pt-4 text-fg"
    />
  ),
}
