import type { Meta, StoryObj } from '@storybook/react'
import { expect } from 'storybook/test'
import { Accordion, AccordionItem } from './Accordion'

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  // children is required by Accordion but is always supplied via render
  args: { children: null },
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Accordion>
      <AccordionItem title="Что такое АКДС?">
        АКДС — комбинированная вакцина против дифтерии, столбняка и коклюша. Входит в национальный
        календарь профилактических прививок.
      </AccordionItem>
      <AccordionItem title="Когда проводится вакцинация?">
        Первичная вакцинация проводится в три этапа: в 3, 4,5 и 6 месяцев жизни ребёнка. Первая
        ревакцинация — в 18 месяцев.
      </AccordionItem>
      <AccordionItem title="Есть ли противопоказания?">
        Да. К основным противопоказаниям относятся острые инфекционные заболевания, обострение
        хронических болезней и аллергические реакции на компоненты вакцины.
      </AccordionItem>
    </Accordion>
  ),
  play: async ({ canvas, userEvent }) => {
    const firstTrigger = canvas.getByRole('button', { name: /что такое акдс/i })
    await userEvent.click(firstTrigger)
    const content = await canvas.findByText(/комбинированная вакцина против дифтерии/i)
    await expect(content).toBeVisible()
  },
}

export const SingleItem: Story = {
  render: () => (
    <Accordion>
      <AccordionItem title="Побочные эффекты" value="side-effects">
        Возможны местные реакции: покраснение и уплотнение в месте укола, повышение температуры до
        38 °C. Проходят самостоятельно в течение 1–3 суток.
      </AccordionItem>
    </Accordion>
  ),
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: /побочные эффекты/i })
    await userEvent.click(trigger)
    const content = await canvas.findByText(/покраснение и уплотнение/i)
    await expect(content).toBeVisible()
  },
}

export const MultipleOpen: Story = {
  name: 'Несколько открытых',
  render: () => (
    <Accordion>
      <AccordionItem title="Инструкция по применению" value="instructions">
        Вакцина вводится внутримышечно в переднебоковую поверхность бедра детям до 3 лет и в
        дельтовидную мышцу плеча детям старшего возраста.
      </AccordionItem>
      <AccordionItem title="Хранение вакцины" value="storage">
        Хранить при температуре от +2°C до +8°C. Замораживание не допускается. Беречь от света.
      </AccordionItem>
      <AccordionItem title="Состав препарата" value="composition">
        Дифтерийный анатоксин, столбнячный анатоксин, инактивированный коклюшный компонент, алюминия
        гидроксид в качестве адъюванта.
      </AccordionItem>
    </Accordion>
  ),
}
