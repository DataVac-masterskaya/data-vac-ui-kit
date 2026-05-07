import type { Meta, StoryObj } from '@storybook/react'
import { expect } from 'storybook/test'
import { useState } from 'react'
import { Switch } from './Switch'

const meta = {
  title: 'Components/Switch',
  component: Switch,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  // checked and onChange are required by Switch; they are always injected via render
  args: {
    checked: false,
    onChange: () => {},
    size: 'md',
    disabled: false,
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: 'Размер переключателя (sm — 32×20, md — 45×24)',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключённое состояние',
    },
    trackClassName: {
      control: 'text',
      description: 'Переопределяет цвет трека переключателя',
    },
    thumbClassName: {
      control: 'text',
      description: 'Переопределяет цвет ползунка переключателя',
    },
    checked: {
      table: { disable: true },
    },
    onChange: {
      table: { disable: true },
    },
    id: {
      table: { disable: true },
    },
    'aria-labelledby': {
      table: { disable: true },
    },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render(args) {
    const [checked, setChecked] = useState(false)
    return <Switch {...args} checked={checked} onChange={setChecked} aria-label="Переключатель" />
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole('switch')
    await expect(input).not.toBeChecked()
    await userEvent.click(input)
    await expect(input).toBeChecked()
  },
}

export const Small: Story = {
  name: 'Маленький (sm)',
  args: {
    size: 'sm',
    checked: false,
    onChange: () => {},
  },
  render: function Render(args) {
    const [checked, setChecked] = useState(false)
    return (
      <Switch
        {...args}
        checked={checked}
        onChange={setChecked}
        aria-label="Маленький переключатель"
      />
    )
  },
}

export const AllStates: Story = {
  name: 'Все состояния',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Switch checked={false} onChange={() => {}} aria-label="Выключен" />
        <span style={{ fontSize: 14, color: 'var(--color-fg)' }}>Выключен (Off)</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Switch checked onChange={() => {}} aria-label="Включён" />
        <span style={{ fontSize: 14, color: 'var(--color-fg)' }}>Включён (On)</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Switch checked={false} onChange={() => {}} disabled aria-label="Выключен и недоступен" />
        <span style={{ fontSize: 14, color: 'var(--color-fg-muted)' }}>Выключен + Disabled</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Switch checked onChange={() => {}} disabled aria-label="Включён и недоступен" />
        <span style={{ fontSize: 14, color: 'var(--color-fg-muted)' }}>Включён + Disabled</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Switch checked={false} onChange={() => {}} size="sm" aria-label="Маленький выключен" />
        <span style={{ fontSize: 14, color: 'var(--color-fg)' }}>Size sm — Выключен</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Switch checked onChange={() => {}} size="sm" aria-label="Маленький включён" />
        <span style={{ fontSize: 14, color: 'var(--color-fg)' }}>Size sm — Включён</span>
      </div>
    </div>
  ),
}
