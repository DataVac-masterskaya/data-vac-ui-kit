import type { Meta, StoryObj } from '@storybook/react'
import { expect } from 'storybook/test'
import { ThemeProvider } from '../ThemeProvider'
import { ThemeToggle } from './ThemeToggle'

const meta = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="bg-page text-fg p-6 rounded-card transition-colors duration-200 min-w-48">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы',
    },
  },
} satisfies Meta<typeof ThemeToggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    // The desktop switch (md:flex) is rendered but may be hidden by CSS —
    // find the input[role=switch] which is a real interactive element.
    // The mobile button (role=switch) is also present.
    const switches = canvas.getAllByRole('switch')
    // Click the first available switch
    await userEvent.click(switches[0])
    // After toggle, dark class should appear on documentElement
    await expect(document.documentElement.classList.contains('dark')).toBe(true)
    // Reset for subsequent runs
    document.documentElement.classList.remove('dark')
  },
}

export const DarkMode: Story = {
  name: 'Тёмная тема (задекорировано)',
  decorators: [
    (Story) => {
      document.documentElement.classList.add('dark')
      return (
        <div className="dark bg-page text-fg p-6 rounded-card transition-colors duration-200 min-w-48">
          <Story />
        </div>
      )
    },
  ],
}
