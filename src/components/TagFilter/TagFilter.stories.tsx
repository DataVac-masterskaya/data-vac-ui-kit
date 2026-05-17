import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { useState } from 'react';
import { TagFilter } from './TagFilter';

const meta = {
  title: 'Components/TagFilter',
  component: TagFilter,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    tags: ['Все', 'Национальный календарь', 'Сверх календаря', 'Другие'],
    active: null,
    onChange: fn(),
  },
  argTypes: {
    tags: {
      control: 'object',
      description: 'Массив тегов для отображения',
    },
    active: {
      control: 'text',
      description: 'Активный тег (значение из tags)',
    },
    onChange: {
      action: 'onChange',
      description: 'Колбэк при выборе/сбросе тега',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы',
    },
  },
} satisfies Meta<typeof TagFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render(args) {
    const [active, setActive] = useState<string | null>(null);
    return <TagFilter {...args} active={active} onChange={setActive} />;
  },
};

export const WithActiveTag: Story = {
  render: function Render(args) {
    const [active, setActive] = useState<string | null>('Все');
    return <TagFilter {...args} active={active} onChange={setActive} />;
  },
};

export const WithPinkHighlight: Story = {
  render: function Render(args) {
    const [active, setActive] = useState<string | null>(null);
    return (
      <div className="pink-tag">
        <style>{'.pink-tag button:nth-child(3) { color: #E30C5C; }'}</style>
        <TagFilter {...args} active={active} onChange={setActive} />
      </div>
    );
  },
};

export const ManyTags: Story = {
  args: {
    tags: [
      'Вирусные', 'Бактериальные', 'Паразитарные', 'Грибковые',
      'Прионные', 'Протозойные', 'Риккетсиозы', 'Микоплазменные',
    ],
  },
  render: function Render(args) {
    const [active, setActive] = useState<string | null>(null);
    return (
      <div className="w-96">
        <TagFilter {...args} active={active} onChange={setActive} />
      </div>
    );
  },
};