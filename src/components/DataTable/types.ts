import { ReactNode } from 'react'
import { SortDirection } from '../SortControl'

export type { SortDirection }

/**
 * Viewport-ширина, при которой включается desktop-layout (горизонтальная таблица).
 * Используйте 'lg' для таблиц с 5+ колонками.
 * @default 'md' (768px)
 */
export type DesktopBreakpoint = 'md' | 'lg'

/**
 * Дескриптор колонки. Передайте дженерик-параметр для типизированного `render`:
 * @example
 * const columns: DataTableColumn<VaccineData>[] = [
 *   { key: 'name', label: 'Название', render: (row) => row.name },
 * ]
 */
export interface DataTableColumn<T = Record<string, unknown>> {
  key: string
  label: string
  /** Для отображения с верным склонением в выпадающем Select-компоненте */
  sortLabel?: string
  /** Фиксированная ширина колонки в px или любая CSS-строка */
  width?: string | number
  /** flex-grow для колонки (растягивается пропорционально) */
  flex?: number
  /** Показать SortControl в заголовке (desktop) и включить колонку в мобильный Select */
  sortable?: boolean
  /** Подсказка, которая появляется при наведении на иконку ⓘ в заголовке колонки. */
  tooltip?: ReactNode
  /** Кастомный рендер ячейки. Если не задан — выводится значение row[key] */
  render?: (row: T, index: number) => ReactNode
  /**
   * Показывать колонку только в desktop-таблице.
   * В планшетных и мобильных карточках колонка скрывается.
   */
  desktopOnly?: boolean
  /**
   * На мобайле (< 480px) колонка занимает половину ширины.
   * Соседние `mobileHalf`-колонки группируются в одну строку.
   */
  mobileHalf?: boolean
}

export interface DataTableProps<T = Record<string, unknown>> {
  columns: DataTableColumn<T>[]
  rows: T[]
  /** Делает строку недоступной для клика; меняет стиль на fgMuted */
  isRowDisabled?: (row: T) => boolean
  /** Вызывается только для активных строк */
  onRowClick?: (row: T) => void
  /** Уникальный ключ строки для React; по умолчанию — индекс */
  getRowKey?: (row: T, index: number) => string
  /** Текущее поле сортировки */
  sortField?: string
  /** Текущее направление сортировки */
  sortDirection?: SortDirection
  /** Сортировку данных делает родитель; DataTable лишь сигнализирует об изменении */
  onSortChange?: (field: string, direction: SortDirection) => void
  /**
   * Текст бейджа в мобильной карточке (< 480px) для активной строки.
   * Показывается в правом верхнем углу первого поля, когда задан onRowClick.
   * На планшете бейдж не показывается — только стрелка.
   * @default "Подробнее"
   */
  mobileActionLabel?: string
  /**
   * Текст бейджа в мобильной карточке (< 480px) для disabled-строки.
   * Показывается вместо mobileActionLabel когда строка недоступна.
   * @default "Нет сведений"
   */
  mobileDisabledLabel?: string
  /**
   * Содержимое тултипа, который появляется при наведении на иконку минуса
   * в десктопной и планшетной строке, когда строка disabled.
   */
  disabledTooltip?: ReactNode
  /**
   * Количество колонок в строке планшетной карточки.
   * Если колонок больше — они переносятся на новые строки с тем же шагом.
   * @default 3
   */
  tabletColumns?: number
  /**
   * Viewport-ширина, при которой включается desktop-layout.
   * Используйте 'lg' (1024px) для таблиц с 5+ колонками.
   * @default 'md' (768px)
   */
  desktopBreakpoint?: DesktopBreakpoint
  className?: string
}
