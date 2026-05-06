import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { EmptyState, ErrorState } from './States'

describe('EmptyState', () => {
  it('renders default message', () => {
    render(<EmptyState />)
    expect(screen.getByText('Ничего не найдено')).toBeInTheDocument()
  })

  it('renders custom message', () => {
    render(<EmptyState message="Список пуст" />)
    expect(screen.getByText('Список пуст')).toBeInTheDocument()
  })
})

describe('ErrorState', () => {
  it('renders default error', () => {
    render(<ErrorState />)
    expect(screen.getByText('Произошла ошибка')).toBeInTheDocument()
  })

  it('renders custom message', () => {
    render(<ErrorState message="Нет соединения" />)
    expect(screen.getByText('Нет соединения')).toBeInTheDocument()
  })
})
