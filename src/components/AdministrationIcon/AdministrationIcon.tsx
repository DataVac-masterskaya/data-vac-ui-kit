import { type ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'
import { Tooltip } from '../Tooltip'
import { Label } from '../Typography'
import { InfoCircleIcon } from '../../icons'
import CutaneouslyIcon from '../../icons/raw/cutaneously_method.svg?react'
import DropsIcon from '../../icons/raw/drops_method.svg?react'
import IntradermallyIcon from '../../icons/raw/intradermally_method.svg?react'
import IntramuscularlyIcon from '../../icons/raw/intramuscularly_method.svg?react'
import IntranasallyIcon from '../../icons/raw/intranasally_method.svg?react'
import PillsIcon from '../../icons/raw/pills_method.svg?react'
import SubcutaneouslyIcon from '../../icons/raw/subcutaneously_method.svg?react'

export type AdministrationMethod =
  | 'cutaneously'
  | 'intramuscularly'
  | 'subcutaneously'
  | 'intradermally'
  | 'drops'
  | 'pills'
  | 'intranasally'

const administrationLabels: Record<AdministrationMethod, string> = {
  cutaneously: 'Накожно',
  intramuscularly: 'Внутримышечно',
  subcutaneously: 'Подкожно',
  intradermally: 'Внутрикожно',
  drops: 'Перорально: капли',
  pills: 'Перорально: таблетки',
  intranasally: 'Интраназально',
}

const administrationIcons: Record<
  AdministrationMethod,
  (props: React.SVGProps<SVGSVGElement>) => React.ReactElement
> = {
  cutaneously: CutaneouslyIcon,
  intramuscularly: IntramuscularlyIcon,
  subcutaneously: SubcutaneouslyIcon,
  intradermally: IntradermallyIcon,
  drops: DropsIcon,
  pills: PillsIcon,
  intranasally: IntranasallyIcon,
}

export interface AdministrationIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  method: AdministrationMethod
}

export function AdministrationIcon({
  method,
  className,
  disabled,
  ...props
}: AdministrationIconProps) {
  const Icon = administrationIcons[method]
  const label = administrationLabels[method]

  const tooltipContent = (
    <>
      <Label className="text-white font-semibold">{label}.</Label>
      <Label className="text-white/60 italic">Нажмите, чтобы прочитать полную информацию</Label>
    </>
  )

  const inner = (
    <div
      className={cn(
        'relative inline-flex group',
        disabled && 'opacity-50 pointer-events-none',
        className,
      )}
    >
      <button
        type="button"
        aria-label={label}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center cursor-pointer',
          'transition-opacity hover:opacity-80',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
        )}
        {...props}
      >
        <Icon aria-hidden="true" />
      </button>
      <span
        aria-hidden="true"
        className="absolute -top-1 -right-1 text-fg-muted group-hover:text-accent transition-colors pointer-events-none"
      >
        <InfoCircleIcon className="w-3 h-3" />
      </span>
    </div>
  )

  if (disabled) return inner

  return (
    <Tooltip content={tooltipContent} className="max-w-[180px]">
      {inner}
    </Tooltip>
  )
}
