import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/utils'

const paddingMap = {
  none: '',
  sm: 'p-4',
  md: 'p-5',
  lg: 'px-8 py-6',
} as const

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Внутренние отступы: sm=16px, md=20px (по умолчанию), lg=32/24px */
  padding?: keyof typeof paddingMap
  /** Тонкая тень из дизайна */
  shadow?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, padding = 'md', shadow = true, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'bg-card rounded-card text-fg',
        shadow && 'shadow-[0_4px_50px_rgba(0,0,0,0.03)]',
        paddingMap[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
)

Card.displayName = 'Card'
