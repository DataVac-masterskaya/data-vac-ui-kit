import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { DataTable } from './DataTable'
import { DataTableColumn, SortDirection } from './types'

/** Безопасное приведение к строке: объекты и null/undefined → ''. */
function toStr(v: unknown): string {
  if (typeof v === 'string') return v
  if (typeof v === 'number') return String(v)
  if (typeof v === 'boolean') return String(v)
  return ''
}

/** Сортирует массив строк по одному полю.
 *  DataTable только сигнализирует об изменении сортировки — данные сортирует родитель. */
function sortRows<T>(rows: T[], field: string, direction: SortDirection): T[] {
  return [...rows].sort((a, b) => {
    const ra = a as Record<string, unknown>
    const rb = b as Record<string, unknown>
    const cmp = toStr(ra[field]).localeCompare(toStr(rb[field]), 'ru')
    return direction === 'asc' ? cmp : -cmp
  })
}

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Generic-таблица с конфигурируемыми колонками. ' +
          'Три layout: desktop (≥ 768px) — горизонтальная строка; ' +
          'tablet (480–767 px) — карточка с полями в несколько строк (`tabletColumns`); ' +
          'mobile (< 480px) — вертикальная карточка. ' +
          'Поддерживает сортировку, disabled-строки и клик по строке. ' +
          '**DataTable не сортирует данные сам** — `onSortChange` сигнализирует родителю, ' +
          'родитель пересортировывает `rows` и передаёт обратно.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DataTable>

// ---- Демо-данные ----

interface VaccineRow {
  id: number
  name: string
  infection: string
  age: string
  isIncompatible?: boolean
}

const DEMO_ROWS: VaccineRow[] = [
  {
    id: 1,
    name: 'Клещевой энцефалит (Чумакова)',
    infection: 'Клещевой энцефалит',
    age: 'от 36 мес.',
  },
  { id: 2, name: 'Гриппол Плюс', infection: 'Грипп', age: 'от 6 мес.' },
  { id: 3, name: 'Пентаксим', infection: 'Коклюш, дифтерия, столбняк', age: 'от 3 мес.' },
  {
    id: 4,
    name: 'Инфанрикс',
    infection: 'Коклюш, дифтерия, столбняк',
    age: 'от 3 мес.',
    isIncompatible: true,
  },
  { id: 5, name: 'Превенар 13', infection: 'Пневмококк', age: 'от 2 мес.' },
]

const VACCINE_COLUMNS: DataTableColumn<VaccineRow>[] = [
  {
    key: 'name',
    label: 'Название',
    flex: 2,
    sortable: true,
    render: (row) => <span className="font-medium">{row.name}</span>,
  },
  {
    key: 'infection',
    label: 'Инфекция',
    flex: 2,
    sortable: true,
  },
  {
    key: 'age',
    label: 'Возраст',
    width: 120,
    tooltip: 'Минимальный допустимый возраст вакцинации',
  },
]

// ---- Расширенные данные для планшетного демо (6 колонок → 2 строки по 3) ----

interface VaccineFullRow {
  id: number
  name: string
  infection: string
  age: string
  route: string
  pregnancy: string
  contraindications: string
}

const TABLET_ROWS: VaccineFullRow[] = [
  {
    id: 1,
    name: 'Клещевой энцефалит (Чумакова)',
    infection: 'Клещевой энцефалит',
    age: 'от 36 мес.',
    route: 'в/м',
    pregnancy: 'Противопоказано',
    contraindications: 'Острые заболевания',
  },
  {
    id: 2,
    name: 'Инфанрикс',
    infection: 'Коклюш, дифтерия, столбняк',
    age: 'от 3 мес.',
    route: 'в/м',
    pregnancy: 'С осторожностью',
    contraindications: 'ВИЧ у матери',
  },
  {
    id: 3,
    name: 'Превенар 13',
    infection: 'Пневмококк',
    age: 'от 2 мес.',
    route: 'в/м',
    pregnancy: 'Данных нет',
    contraindications: 'Гиперчувствительность',
  },
]

const TABLET_COLUMNS: DataTableColumn<VaccineFullRow>[] = [
  {
    key: 'name',
    label: 'Название вакцины',
    flex: 1,
    sortable: true,
    render: (row) => <span className="font-semibold">{row.name}</span>,
  },
  { key: 'infection', label: 'Инфекции', flex: 1, sortable: true },
  { key: 'route', label: 'Способ введения', flex: 1 },
  { key: 'age', label: 'Допустимый возраст', flex: 1, tooltip: 'Минимальный возраст вакцинации' },
  { key: 'pregnancy', label: 'При беременности и ГВ', flex: 1 },
  { key: 'contraindications', label: 'Противопоказания', flex: 1 },
]

// ---- Истории ----

export const Desktop: Story = {
  name: 'Десктоп (таблица + SortControl)',
  parameters: {
    docs: {
      description: {
        story:
          'DataTable использует **container queries**: layout определяется шириной самого компонента, ' +
          'а не viewport. При ширине ≥ 768px — горизонтальная таблица; 480–767px — карточки; < 480px — мобиль.',
      },
    },
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [sortField, setSortField] = useState('name')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

    const sortedRows = sortRows(DEMO_ROWS, sortField, sortDirection)

    return (
      <div className="bg-page p-6 rounded-card">
        <DataTable
          columns={VACCINE_COLUMNS}
          rows={sortedRows}
          sortField={sortField}
          sortDirection={sortDirection}
          onSortChange={(field, dir) => {
            setSortField(field)
            setSortDirection(dir)
          }}
          onRowClick={(row) => alert(`Открыть: ${row.name}`)}
          getRowKey={(row) => String(row.id)}
        />
      </div>
    )
  },
}

export const TabletCards: Story = {
  name: 'Планшет (карточки 480–767 px)',
  globals: {
    viewport: { value: 'dataVacTablet' },
  },
  parameters: {
    docs: {
      description: {
        story: '6 колонок, `tabletColumns={3}` — поля автоматически переносятся на вторую строку.',
      },
    },
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [sortField, setSortField] = useState('name')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

    const sortedRows = sortRows(TABLET_ROWS, sortField, sortDirection)

    return (
      <div className="bg-page p-4 rounded-card">
        <DataTable
          columns={TABLET_COLUMNS}
          rows={sortedRows}
          tabletColumns={3}
          desktopBreakpoint="lg"
          sortField={sortField}
          sortDirection={sortDirection}
          onSortChange={(field, dir) => {
            setSortField(field)
            setSortDirection(dir)
          }}
          onRowClick={(row) => alert(`Открыть: ${row.name}`)}
          getRowKey={(row) => String(row.id)}
        />
      </div>
    )
  },
}

export const MobileCards: Story = {
  name: 'Мобайл (карточки < 480px)',
  // Storybook 10 API: globals вместо parameters.viewport.defaultViewport
  globals: {
    viewport: { value: 'mobile1' },
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [sortField, setSortField] = useState('name')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

    const sortedRows = sortRows(DEMO_ROWS, sortField, sortDirection)

    return (
      <div className="bg-page p-4 rounded-card">
        <DataTable
          columns={VACCINE_COLUMNS}
          rows={sortedRows}
          sortField={sortField}
          sortDirection={sortDirection}
          onSortChange={(field, dir) => {
            setSortField(field)
            setSortDirection(dir)
          }}
          onRowClick={(row) => alert(`Открыть: ${row.name}`)}
          getRowKey={(row) => String(row.id)}
        />
      </div>
    )
  },
}

export const WithDisabledRows: Story = {
  name: 'Disabled строки (desktop)',
  render: () => (
    <div className="bg-page p-6 rounded-card">
      <DataTable
        columns={VACCINE_COLUMNS}
        rows={DEMO_ROWS}
        isRowDisabled={(row) => !!row.isIncompatible}
        onRowClick={(row) => alert(`Открыть: ${row.name}`)}
        getRowKey={(row) => String(row.id)}
      />
    </div>
  ),
}

export const WithDisabledRowsMobile: Story = {
  name: 'Disabled строки (мобайл < 480px)',
  globals: {
    viewport: { value: 'mobile1' },
  },
  render: () => (
    <div className="bg-page p-4 rounded-card">
      <DataTable
        columns={VACCINE_COLUMNS}
        rows={DEMO_ROWS}
        isRowDisabled={(row) => !!row.isIncompatible}
        onRowClick={(row) => alert(`Открыть: ${row.name}`)}
        getRowKey={(row) => String(row.id)}
      />
    </div>
  ),
}

export const WithoutSort: Story = {
  name: 'Без сортировки',
  render: () => (
    <div className="bg-page p-6 rounded-card">
      <DataTable columns={VACCINE_COLUMNS} rows={DEMO_ROWS} getRowKey={(row) => String(row.id)} />
    </div>
  ),
}

export const WideTable: Story = {
  name: '6 колонок (desktopBreakpoint="lg")',
  parameters: {
    docs: {
      description: {
        story:
          '6 колонок — нужен `desktopBreakpoint="lg"` (1024px), иначе при 768px колонки не влезают. ' +
          'Tablet-карточки активны до 1023px, desktop-таблица — от 1024px.',
      },
    },
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [sortField, setSortField] = useState('name')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

    const sortedRows = sortRows(TABLET_ROWS, sortField, sortDirection)

    return (
      <div className="bg-page p-6 rounded-card">
        <DataTable
          columns={TABLET_COLUMNS}
          rows={sortedRows}
          tabletColumns={3}
          desktopBreakpoint="lg"
          sortField={sortField}
          sortDirection={sortDirection}
          onSortChange={(field, dir) => {
            setSortField(field)
            setSortDirection(dir)
          }}
          onRowClick={(row) => alert(`Открыть: ${row.name}`)}
          getRowKey={(row) => String(row.id)}
        />
      </div>
    )
  },
}

export const DesktopOnlyColumns: Story = {
  name: 'desktopOnly: скрытие колонок на планшете/мобайле',
  parameters: {
    docs: {
      description: {
        story:
          'Колонка «Инфекция» помечена `desktopOnly: true` — она видна только в desktop-таблице. ' +
          'На планшете (480–767px) и мобайле (< 480px) поле исчезает из карточки. ' +
          'Используйте это для второстепенных данных, которые не нужны на узком экране.',
      },
    },
  },
  render: () => (
    <div className="bg-page p-6 rounded-card">
      <DataTable
        columns={[
          {
            key: 'name',
            label: 'Название',
            flex: 2,
            sortable: true,
            render: (row) => <span className="font-medium">{row.name}</span>,
          },
          {
            key: 'infection',
            label: 'Инфекция',
            flex: 2,
            desktopOnly: true,
          },
          {
            key: 'age',
            label: 'Возраст',
            width: 120,
            tooltip: 'Минимальный допустимый возраст вакцинации',
          },
        ]}
        rows={DEMO_ROWS}
        onRowClick={(row) => alert(`Открыть: ${row.name}`)}
        getRowKey={(row) => String(row.id)}
      />
    </div>
  ),
}

export const DarkMode: Story = {
  name: 'Тёмная тема',
  decorators: [
    (Story) => {
      document.documentElement.classList.add('dark')
      return (
        <div className="dark bg-page p-6 rounded-card">
          <Story />
        </div>
      )
    },
  ],
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [sortField, setSortField] = useState('name')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

    const sortedRows = sortRows(DEMO_ROWS, sortField, sortDirection)

    return (
      <DataTable
        columns={VACCINE_COLUMNS}
        rows={sortedRows}
        sortField={sortField}
        sortDirection={sortDirection}
        onSortChange={(field, dir) => {
          setSortField(field)
          setSortDirection(dir)
        }}
        onRowClick={(row) => alert(`Открыть: ${row.name}`)}
        getRowKey={(row) => String(row.id)}
      />
    )
  },
}
