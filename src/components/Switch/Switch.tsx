import { cn } from '../../lib/utils'

export interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  /** sm — 32×20 (ThemeToggle desktop), md — 45×24 (default) */
  size?: 'sm' | 'md'
  /** Overrides track color (replaces default bg-accent/bg-subtle logic) */
  trackClassName?: string
  /** Overrides thumb color (replaces default bg-white) */
  thumbClassName?: string
  id?: string
  disabled?: boolean
  className?: string
  'aria-label'?: string
  'aria-labelledby'?: string
}

const sizes = {
  sm: { track: 'w-8 h-5', thumb: 'top-0.5 w-4 h-4', on: 'left-[14px]', off: 'left-[2px]' },
  md: {
    track: 'w-[45px] h-6',
    thumb: 'top-[3px] w-[18px] h-[18px]',
    on: 'left-[24px]',
    off: 'left-[3px]',
  },
}

export function Switch({
  checked,
  onChange,
  size = 'md',
  trackClassName,
  thumbClassName,
  id,
  disabled,
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}: SwitchProps) {
  const { track, thumb, on, off } = sizes[size]

  return (
    <label
      className={cn(
        'inline-flex items-center cursor-pointer',
        disabled && 'opacity-40 cursor-not-allowed',
        className,
      )}
    >
      <input
        id={id}
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className="sr-only peer"
      />
      <span
        className={cn(
          'relative rounded-pill transition-colors duration-200',
          'peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-1',
          track,
          trackClassName ?? (checked ? 'bg-accent' : 'bg-subtle'),
        )}
      >
        <span
          className={cn(
            'absolute rounded-full shadow transition-all duration-200',
            thumb,
            checked ? on : off,
            thumbClassName ?? 'bg-white',
          )}
        />
      </span>
    </label>
  )
}
