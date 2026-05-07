import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../Button/Button'
import { Drawer } from './Drawer'

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  argTypes: {
    trigger: {
      description: 'Элемент, открывающий панель (ReactNode)',
      table: { type: { summary: 'ReactNode' } },
      control: false,
    },
    title: {
      control: 'text',
      description: 'Заголовок боковой панели',
    },
    children: {
      description: 'Содержимое боковой панели (ReactNode)',
      table: { type: { summary: 'ReactNode' } },
      control: false,
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы для панели',
    },
  },
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    trigger: <Button variant="primary">Открыть панель</Button>,
    title: 'Подробная информация',
    children: (
      <p>
        Здесь отображается дополнительная информация о выбранном элементе. Панель открывается с
        правой стороны экрана и позволяет просматривать детали без потери контекста текущей
        страницы.
      </p>
    ),
  },
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: /открыть панель/i })
    await userEvent.click(trigger)
  },
}

export const WithLongContent: Story = {
  args: {
    trigger: <Button variant="dark">Открыть с длинным контентом</Button>,
    title: 'Детали вакцинации',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p>
          Вакцина против дифтерии, столбняка и коклюша (АКДС) — комбинированная вакцина,
          обеспечивающая защиту сразу от трёх инфекционных заболеваний.
        </p>
        <p>
          Вакцинация проводится в три этапа: в 3, 4,5 и 6 месяцев с последующей ревакцинацией в 18
          месяцев. Это позволяет сформировать стойкий иммунитет на длительный срок.
        </p>
        <p>
          После введения вакцины возможны местные реакции: покраснение, уплотнение в месте укола,
          незначительное повышение температуры тела. Эти реакции, как правило, проходят
          самостоятельно в течение 1–3 суток.
        </p>
        <p>
          Противопоказания: острые инфекционные заболевания, обострение хронических болезней,
          сильные аллергические реакции на предыдущее введение вакцины.
        </p>
      </div>
    ),
  },
}
