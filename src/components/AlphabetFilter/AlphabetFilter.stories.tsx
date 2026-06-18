import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { useState } from 'react';
import { AlphabetFilter } from './AlphabetFilter';

const ruLetters = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'];
const enLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const meta = {
  title: 'Components/AlphabetFilter',
  component: AlphabetFilter,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    letters: ruLetters,
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
    language: {
      control: 'radio',
      options: ['ru', 'en'],
      description: 'Текущий язык',
    },
    onLanguageChange: {
      action: 'onLanguageChange',
      description: 'Колбэк при смене языка',
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
    active: 'В',
  },
  render: function Render(args) {
    const [active, setActive] = useState<string | null>(args.active ?? null);
    return <AlphabetFilter {...args} active={active} onChange={setActive} />;
  },
};

export const WithActiveAndDisabled: Story = {
  args: {
    letters: ['А', 'Б', 'В', 'Г', 'Д', 'Е'],
    disabled: ['А', 'Е'],
    active: 'В',
  },
  render: function Render(args) {
    const [active, setActive] = useState<string | null>(args.active ?? null);
    return <AlphabetFilter {...args} active={active} onChange={setActive} />;
  },
};

export const WithLanguageToggle: Story = {
  args: {
    language: 'ru',
  },
  render: function Render(args) {
    const [active, setActive] = useState<string | null>(null);
    const [language, setLanguage] = useState<'ru' | 'en'>(args.language ?? 'ru');

    return (
      <AlphabetFilter
        {...args}
        letters={language === 'ru' ? ruLetters : enLetters}
        active={active}
        onChange={setActive}
        language={language}
        onLanguageChange={setLanguage}
      />
    );
  },
};
