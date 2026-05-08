import type { Meta, StoryObj } from '@storybook/react'
import { expect } from 'storybook/test'
import { ThemeProvider } from '../ThemeProvider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs'

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="bg-page p-6 rounded-card min-w-80">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  args: { children: null },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="card">
      <TabsList>
        <TabsTrigger value="card">Картой</TabsTrigger>
        <TabsTrigger value="requisites">По реквизитам</TabsTrigger>
        <TabsTrigger value="qr">Перевод по QR-коду</TabsTrigger>
        <TabsTrigger value="sbp">Через СБП</TabsTrigger>
      </TabsList>
      <TabsContent value="card">
        <div className="text-fg text-base">Содержимое вкладки «Картой»</div>
      </TabsContent>
      <TabsContent value="requisites">
        <div className="text-fg text-base">Содержимое вкладки «По реквизитам»</div>
      </TabsContent>
      <TabsContent value="qr">
        <div className="text-fg text-base">Содержимое вкладки «Перевод по QR-коду»</div>
      </TabsContent>
      <TabsContent value="sbp">
        <div className="text-fg text-base">Содержимое вкладки «Через СБП»</div>
      </TabsContent>
    </Tabs>
  ),
  play: async ({ canvas, userEvent }) => {
    // Initial state: «Картой» active, its content visible
    await expect(canvas.getByText('Содержимое вкладки «Картой»')).toBeVisible()

    // Switch to «Через СБП»
    await userEvent.click(canvas.getByRole('tab', { name: 'Через СБП' }))
    await expect(canvas.getByText('Содержимое вкладки «Через СБП»')).toBeVisible()

    // Previous tab content should no longer be visible
    await expect(canvas.queryByText('Содержимое вкладки «Картой»')).not.toBeInTheDocument()
  },
}

export const DarkMode: Story = {
  name: 'Тёмная тема',
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
    <Tabs defaultValue="qr">
      <TabsList>
        <TabsTrigger value="card">Картой</TabsTrigger>
        <TabsTrigger value="requisites">По реквизитам</TabsTrigger>
        <TabsTrigger value="qr">Перевод по QR-коду</TabsTrigger>
        <TabsTrigger value="sbp">Через СБП</TabsTrigger>
      </TabsList>
      <TabsContent value="card">
        <div className="text-fg text-base">Содержимое вкладки «Картой»</div>
      </TabsContent>
      <TabsContent value="requisites">
        <div className="text-fg text-base">Содержимое вкладки «По реквизитам»</div>
      </TabsContent>
      <TabsContent value="qr">
        <div className="text-fg text-base">Содержимое вкладки «Перевод по QR-коду»</div>
      </TabsContent>
      <TabsContent value="sbp">
        <div className="text-fg text-base">Содержимое вкладки «Через СБП»</div>
      </TabsContent>
    </Tabs>
  ),
}
