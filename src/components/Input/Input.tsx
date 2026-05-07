import { type InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/utils'

// --- Input ---
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'white' | 'grey'
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = 'white', className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'w-full h-14 px-5 rounded-input font-sans text-base text-fg placeholder:text-fg-secondary outline-none transition-colors',
        variant === 'white' && 'bg-card border border-border focus:border-accent',
        variant === 'grey' && 'bg-subtle border-transparent focus:border-accent',
        className,
      )}
      {...props}
    />
  ),
)
Input.displayName = 'Input'

// --- SearchBar ---
type SearchBarProps = InputHTMLAttributes<HTMLInputElement>

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, ...props }, ref) => (
    <div className={cn('relative flex items-center w-full', className)}>
      <img
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%23A6A6A6' stroke-width='2' viewBox='0 0 24 24'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.35-4.35'/%3E%3C/svg%3E"
        alt=""
        aria-hidden="true"
        className="absolute left-3 w-6 h-6 pointer-events-none"
      />
      <input
        ref={ref}
        className={cn(
          'w-full h-12 pl-12 pr-4 bg-card rounded-card font-sans text-sm text-fg placeholder:text-fg-muted outline-none',
        )}
        {...props}
      />
    </div>
  ),
)
SearchBar.displayName = 'SearchBar'
