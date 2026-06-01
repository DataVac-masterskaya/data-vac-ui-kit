import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { useState } from 'react';
import { AlphabetFilter } from './AlphabetFilter';

const meta = {
  title: 'Components/AlphabetFilter',
  component: AlphabetFilter,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    letters: ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'],
    active: null,
    onChange: fn(),
    disabled: [],
  },
  argTypes: {
    letters: {
      control: 'object',
      description: 'Массив букв для отображения',
    },
    active: {
      control: 'text',
      description: 'Активная буква',
    },
    onChange: {
      action: 'onChange',
      description: 'Колбэк при выборе/сбросе буквы',
    },
    disabled: {
      control: 'object',
      description: 'Массив недоступных букв',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы',
    },
  },
} satisfies Meta<typeof AlphabetFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RUAlphabet: Story = {
  render: function Render(args) {
    const [active, setActive] = useState<string | null>(null);
    return <AlphabetFilter {...args} active={active} onChange={setActive} />;
  },
};

export const WithDisabled: Story = {
  args: {
    letters: ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З'],
    disabled: ['Ё', 'Ж'],
  },
  render: function Render(args) {
    const [active, setActive] = useState<string | null>(null);
    return <AlphabetFilter {...args} active={active} onChange={setActive} />;
  },
};

export const WithActive: Story = {
  args: {
    letters: ['А', 'Б', 'В', 'Г', 'Д'],
  },
  render: function Render(args) {
    const [active, setActive] = useState<string | null>('В');
    return <AlphabetFilter {...args} active={active} onChange={setActive} />;
  },
};

export const WithActiveAndDisabled: Story = {
  args: {
    letters: ['А', 'Б', 'В', 'Г', 'Д', 'Е'],
    disabled: ['А', 'Е'],
  },
  render: function Render(args) {
    const [active, setActive] = useState<string | null>('В');
    return <AlphabetFilter {...args} active={active} onChange={setActive} />;
  },
};
