import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Accordion, AccordionItem } from './Accordion'

describe('Accordion', () => {
  it('shows content when item is open', async () => {
    render(
      <Accordion>
        <AccordionItem title="1. Общие положения">Текст раздела</AccordionItem>
      </Accordion>,
    )
    await userEvent.click(screen.getByText('1. Общие положения'))
    expect(await screen.findByText('Текст раздела')).toBeVisible()
  })

  it('does not show content when item is collapsed', () => {
    render(
      <Accordion>
        <AccordionItem title="Раздел">Контент</AccordionItem>
      </Accordion>,
    )
    expect(screen.queryByText('Контент')).not.toBeInTheDocument()
  })
})
