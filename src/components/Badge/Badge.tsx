import { type ButtonHTMLAttributes, type HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

// --- Badge ---
export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-pill text-xs font-medium bg-subtle text-fg-secondary',
        className,
      )}
      {...props}
    />
  )
}

// --- Chip (кликабельный, для поиска) ---
interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
}

export function Chip({ selected, className, ...props }: ChipProps) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-pill text-sm font-medium transition-colors',
        selected ? 'bg-accent text-white' : 'bg-subtle text-fg hover:bg-accent/10',
        className,
      )}
      {...props}
    />
  )
}

// --- Counter ---
interface CounterProps extends HTMLAttributes<HTMLSpanElement> {
  count: number
}

export function Counter({ count, className, ...props }: CounterProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-1 py-px rounded-pill bg-subtle text-accent text-xs',
        className,
      )}
      {...props}
    >
      +{count}
    </span>
  )
}
