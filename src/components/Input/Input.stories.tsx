import type { Meta, StoryObj } from '@storybook/react'
import { Input, SearchBar } from './Input'

const meta = { title: 'Components/Input', tags: ['autodocs'] } satisfies Meta
export default meta

export const White: StoryObj = {
  render: () => <Input variant="white" placeholder="Ваш e-mail" />,
}

export const Grey: StoryObj = {
  render: () => <Input variant="grey" placeholder="Номер карты" />,
}

export const Search: StoryObj = {
  render: () => (
    <SearchBar placeholder="Для поиска введите название вакцины, противопоказания, инфекции" />
  ),
}
