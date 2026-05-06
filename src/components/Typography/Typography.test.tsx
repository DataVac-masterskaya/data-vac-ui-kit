import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Caption, Heading, Label, Text } from './Typography'

describe('Heading', () => {
  it('renders as h1 by default', () => {
    render(<Heading>Заголовок</Heading>)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders as specified tag', () => {
    render(<Heading as="h2">Заголовок</Heading>)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })
})

describe('Text', () => {
  it('renders children', () => {
    render(<Text>Основной текст</Text>)
    expect(screen.getByText('Основной текст')).toBeInTheDocument()
  })

  it('renders small size', () => {
    const { container } = render(<Text size="sm">Текст</Text>)
    expect(container.firstChild).toHaveClass('text-sm')
  })
})

describe('Label', () => {
  it('renders as p by default', () => {
    render(<Label>Метка</Label>)
    expect(screen.getByText('Метка')).toBeInTheDocument()
  })
})

describe('Caption', () => {
  it('renders caption text', () => {
    render(<Caption>Подпись</Caption>)
    expect(screen.getByText('Подпись')).toBeInTheDocument()
  })
})
