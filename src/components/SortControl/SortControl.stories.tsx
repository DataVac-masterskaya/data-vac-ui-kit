import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { SortControl, SortDirection } from './SortControl'
import { ArrowDownArrowUpIcon } from '../../icons'
import { Select } from '../Select'
import type { SelectOption } from '../Select'

const meta: Meta<typeof SortControl> = {
  title: 'Components/SortControl',
  component: SortControl,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Кнопка сортировки в заголовке таблицы. ' +
          'Стрелка (↓/↑) показана всегда: неактивная колонка — цвет `fg-muted` (#a6a6a6), ' +
          'активная — `fg` (#323335). На мобильном используется через DataTable как Select. ' +
          'В тёмной теме все заголовки `fg-secondary` (#a6a6a6).',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SortControl>

const InteractiveTemplate = (args: React.ComponentProps<typeof SortControl>) => {
  const [active, setActive] = useState(args.active)
  const [direction, setDirection] = useState<SortDirection>(args.direction)

  return (
    <div className="p-6 bg-page rounded-card">
      <SortControl
        {...args}
        active={active}
        direction={direction}
        onChange={(_, dir) => {
          setActive(true)
          setDirection(dir)
        }}
      />
    </div>
  )
}

export const ActiveAsc: Story = {
  name: 'Активная — по возрастанию ↑',
  args: {
    label: 'Название',
    field: 'name',
    active: true,
    direction: 'asc',
    onChange: () => {},
  },
  render: InteractiveTemplate,
}

export const ActiveDesc: Story = {
  name: 'Активная — по убыванию ↓',
  args: {
    label: 'Название',
    field: 'name',
    active: true,
    direction: 'desc',
    onChange: () => {},
  },
  render: InteractiveTemplate,
}

export const Inactive: Story = {
  name: 'Неактивная колонка',
  parameters: {
    docs: {
      description: {
        story:
          'Неактивная колонка — стрелка вниз, цвет `fg-muted` (#a6a6a6). ' +
          'При клике становится активной (стрелка разворачивается, цвет темнеет до `fg` #323335). ' +
          'В DataTable при одиночной сортировке активна только одна колонка.',
      },
    },
  },
  args: {
    label: 'Инфекция',
    field: 'infection',
    active: false,
    direction: 'asc',
    onChange: () => {},
  },
  render: InteractiveTemplate,
}

/** Одиночная сортировка — только одна колонка активна одновременно */
export const MultiColumn: Story = {
  name: 'Одиночная сортировка (реальный DataTable)',
  parameters: {
    docs: {
      description: {
        story:
          'Стандартное поведение DataTable: только одна колонка активна. ' +
          'Клик по другой колонке переключает активность на неё. ' +
          'Все неактивные показывают стрелку вниз в `fg-muted`.',
      },
    },
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeField, setActiveField] = useState<string>('name')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [direction, setDirection] = useState<SortDirection>('asc')

    const fields = [
      { field: 'name', label: 'Название' },
      { field: 'infection', label: 'Инфекция' },
      { field: 'manufacturer', label: 'Производитель' },
    ]

    const handleChange = (field: string, dir: SortDirection) => {
      setActiveField(field)
      setDirection(dir)
    }

    return (
      <div className="p-6 bg-page rounded-card flex items-center gap-5">
        {fields.map(({ field, label }) => (
          <SortControl
            key={field}
            label={label}
            field={field}
            active={activeField === field}
            direction={activeField === field ? direction : 'asc'}
            onChange={handleChange}
          />
        ))}
      </div>
    )
  },
}

/** Мультисортировка — два поля активны одновременно с независимыми направлениями */
export const TwoActiveSorts: Story = {
  name: 'Две сортировки одновременно',
  parameters: {
    docs: {
      description: {
        story:
          'Пример мультисортировки: каждое поле хранит собственное состояние `active + direction`. ' +
          'Оба SortControl могут быть активны одновременно. ' +
          'Клик по активному полю меняет направление; по неактивному — включает его.\n\n' +
          '**Примечание**: стандартный `DataTable` поддерживает только одно активное поле. ' +
          'Для мультисортировки потребуется расширить API (`sortFields?: {field, direction}[]`).',
      },
    },
  },
  render: () => {
    // Независимые состояния для каждого поля (мультисорт)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [sorts, setSorts] = useState<Record<string, SortDirection | null>>({
      name: 'asc',
      infection: null,
    })

    const handleChange = (field: string, dir: SortDirection) => {
      setSorts((prev) => ({
        ...prev,
        [field]: prev[field] === null ? 'asc' : dir,
      }))
    }

    const fields = [
      { field: 'name', label: 'Название' },
      { field: 'infection', label: 'Инфекция' },
    ]

    return (
      <div className="flex flex-col gap-4 p-6 bg-page rounded-card">
        <div className="flex items-center gap-5">
          {fields.map(({ field, label }) => (
            <SortControl
              key={field}
              label={label}
              field={field}
              active={sorts[field] !== null}
              direction={sorts[field] ?? 'asc'}
              onChange={handleChange}
            />
          ))}
        </div>

        {/* Текущее состояние сортировок для наглядности */}
        <div className="text-xs text-fg-muted font-mono">
          {fields.map(({ field, label }) => (
            <div key={field}>
              {label}: {sorts[field] ? `active (${sorts[field]})` : 'inactive'}
            </div>
          ))}
        </div>
      </div>
    )
  },
}

// Мобильный вариант — Select с опциями сортировки (используется внутри DataTable на < 768px)
const MOBILE_OPTIONS: SelectOption[] = [
  { value: 'name_asc', label: 'По названию А – Я' },
  { value: 'name_desc', label: 'По названию Я – А' },
  { value: 'infection_asc', label: 'По инфекции А – Я' },
  { value: 'infection_desc', label: 'По инфекции Я – А' },
]

export const MobileSelect: Story = {
  name: 'Мобильный Select (< 768px)',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(MOBILE_OPTIONS[0]?.value ?? '')
    return (
      <div className="p-6 bg-page rounded-card w-80">
        <Select
          options={MOBILE_OPTIONS}
          value={value}
          onChange={setValue}
          icon={<ArrowDownArrowUpIcon width={16} height={16} className="text-accent" />}
          triggerClassName="w-full"
          contentClassName="w-full"
        />
      </div>
    )
  },
}
