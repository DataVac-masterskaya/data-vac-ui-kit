import type { Meta, StoryObj } from '@storybook/react'
import { Caption, Heading, Label, Text } from './Typography'

const meta = {
  title: 'Components/Typography',
  component: Heading,
  tags: ['autodocs'],
  args: {
    children: 'Заголовок',
    size: 'xl' as const,
    as: 'h1' as const,
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Содержимое заголовка',
    },
    size: {
      control: 'radio',
      options: ['xl', 'lg', 'md'],
      description: 'Размер заголовка',
    },
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4'],
      description: 'HTML-тег заголовка',
    },
  },
} satisfies Meta<typeof Heading>

export default meta
type Story = StoryObj<typeof meta>

export const HeadingStory: Story = {
  name: 'Heading',
  args: {
    children: 'Заголовок',
    size: 'xl',
    as: 'h1',
  },
}

export const TextStory: Story = {
  name: 'Text',
  argTypes: {
    size: {
      control: 'radio',
      options: ['md', 'sm'],
      description: 'Размер текста',
    },
    as: { table: { disable: true } },
  },
  render: (args) => {
    const textSize: 'md' | 'sm' = args.size === 'md' ? 'md' : 'sm'
    return (
      <Text size={textSize}>
        {typeof args.children === 'string' ? args.children : 'Основной текст'}
      </Text>
    )
  },
  args: {
    children: 'Основной текст страницы',
    size: 'md',
  },
}

export const All: Story = {
  name: 'Все варианты',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Heading size="xl">Заголовок страницы (24px SemiBold)</Heading>
      <Heading as="h2" size="lg">
        Заголовок попапа (18px SemiBold)
      </Heading>
      <Heading as="h3" size="md">
        Заголовок аккордеона (16px SemiBold)
      </Heading>
      <Text>Основной текст (16px Regular)</Text>
      <Text size="sm">Таблица и вторичный текст (14px Regular)</Text>
      <Label>Метка 12px</Label>
      <Caption>Подпись 10px</Caption>
    </div>
  ),
}
