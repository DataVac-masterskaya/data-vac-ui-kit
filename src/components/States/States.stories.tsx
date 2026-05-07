import type { Meta, StoryObj } from '@storybook/react'
import { EmptyState, ErrorState } from './States'

const meta = {
  title: 'Components/States',
  component: EmptyState,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    message: 'Ничего не найдено',
  },
  argTypes: {
    message: {
      control: 'text',
      description: 'Сообщение, отображаемое в пустом состоянии',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы',
    },
  },
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
  name: 'EmptyState',
  args: {
    message: 'Ничего не найдено',
  },
}

export const EmptyCustomMessage: Story = {
  name: 'EmptyState — кастомное сообщение',
  args: {
    message: 'По вашему запросу вакцины не найдены',
  },
}

export const Error: Story = {
  name: 'ErrorState',
  args: {
    message: 'Произошла ошибка',
  },
  argTypes: {
    message: {
      control: 'text',
      description: 'Сообщение об ошибке',
    },
  },
  render: (args) => <ErrorState message={args.message} className={args.className} />,
}

export const ErrorCustomMessage: Story = {
  name: 'ErrorState — кастомное сообщение',
  args: {
    message: 'Не удалось загрузить данные. Попробуйте позже.',
  },
  render: (args) => <ErrorState message={args.message} className={args.className} />,
}

export const BothStates: Story = {
  name: 'Оба состояния',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, width: 400 }}>
      <div>
        <p style={{ fontSize: 12, color: 'var(--color-fg-muted)', marginBottom: 8 }}>EmptyState</p>
        <EmptyState message="Ничего не найдено" />
      </div>
      <div>
        <p style={{ fontSize: 12, color: 'var(--color-fg-muted)', marginBottom: 8 }}>ErrorState</p>
        <ErrorState message="Произошла ошибка при загрузке" />
      </div>
    </div>
  ),
}
