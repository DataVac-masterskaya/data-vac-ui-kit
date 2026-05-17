import type { Meta, StoryObj } from '@storybook/react';
import { ScrollToTopButton } from './ScrollToTopButton';
import { useRef } from 'react';

const meta: Meta<typeof ScrollToTopButton> = {
  title: 'Components/ScrollToTopButton',
  component: ScrollToTopButton,
  tags: ['autodocs'],
  argTypes: {
    scrollThreshold: {
      control: 'number',
      description: 'Порог прокрутки для отображения кнопки',
    },
    className: {
      control: 'text',
      description: 'Дополнительные классы для кнопки',
    },
    scrollContainer: {
      table: { disable: true },
    },
  },
} satisfies Meta<typeof ScrollToTopButton>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
    scrollThreshold: 200,
  },
  render: (args) => {
    const Wrapper = () => {
      const ref = useRef<HTMLDivElement>(null);
      return (
        <div ref={ref} style={{ height: 300, overflow: 'auto' }}>
          <div style={{ height: 1000 }}>Прокрутите этот блок вниз...</div>
          <ScrollToTopButton {...args} scrollContainer={ref} />
        </div>
      );
    };

    return <Wrapper />;
  }
}

export const CustomContainer: Story = {

  render: (args) => {
    const Wrapper = () => {
      const ref = useRef<HTMLDivElement>(null)
      return (
        <div ref={ref} style={{ height: 300, overflow: 'auto' }}>
          <div style={{ height: 1000 }}>Прокрутите этот блок вниз...</div>
          <ScrollToTopButton {...args} scrollContainer={ref} />
        </div>
      )
    }
    return <Wrapper />
  },
}


export const OnBodyWindow: Story = {
  render: (args) => {
    const Wrapper = () => {
      return (
        <div style={{overflow: 'auto', minHeight: '1200px', padding: '20px' }}>
          <div style={{ height: 1000 }}>Прокрутите этот блок вниз...</div>
          <ScrollToTopButton {...args} />
        </div>
      )
    }
    return <Wrapper />
  }
}