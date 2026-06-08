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

export const FAQStyle: Story = {
  name: 'FAQ — стиль страницы поддержки',
  render: () => (
    <Accordion className="max-w-[588px]">
      {[
        {
          value: '1',
          title: 'Почему вы не получаете гранты и просите жертвовать физических лиц?',
          content:
            'Мы работаем над всеми видами фандрейзинга, в том числе над грантами, однако гранты от государства и коммерческих компаний не обеспечивают рутинную административную работу НКО — их можно потратить только на один конкретный проект. Увы, но общие расходы НКО можно обеспечить только пожертвованиями физических лиц.',
        },
        {
          value: '2',
          title:
            'У меня нет денег / я не готов(а) помогать деньгами, но я хочу вам помочь. Что я могу сделать?',
          content:
            'Для более чем сотни вакцин мы обработали четыре ключевых параметра: инфекции, возраст, противопоказания и способы введения. Но мы хотим сделать приложение ещё удобнее — для этого нам нужна ваша помощь.',
        },
      ].map((item) => (
        <div
          key={item.value}
          className="bg-card rounded-xl p-5 shadow-[0_4px_25px_rgba(0,0,0,0.03)]"
        >
          <AccordionItem
            title={item.title}
            value={item.value}
            titleClassName="text-xl font-medium py-0"
            iconClassName="text-accent"
            contentClassName="pt-6 pb-0 text-sm"
          >
            {item.content}
          </AccordionItem>
        </div>
      ))}
    </Accordion>
  ),
  play: async ({ canvas, userEvent }) => {
    const firstTrigger = canvas.getByRole('button', { name: /почему вы не получаете гранты/i })
    await userEvent.click(firstTrigger)
    const content = await canvas.findByText(/всеми видами фандрейзинга/i)
    await expect(content).toBeVisible()
  },
}
