import type { Meta, StoryObj } from '@storybook/react'
import { Caption, Heading, Label, Text } from './Typography'

const meta = { title: 'Components/Typography', tags: ['autodocs'] } satisfies Meta

export default meta

export const All: StoryObj = {
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
