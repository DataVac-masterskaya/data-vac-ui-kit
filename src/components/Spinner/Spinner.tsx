import { type HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type SpinnerSize = 'sm' | 'md' | 'lg'

const sizeClasses: Record<SpinnerSize, string> = {
  sm: 'w-4 h-4 border-[1.5px]',
  md: 'w-6 h-6 border-2',
  lg: 'w-10 h-10 border-[3px]',
}

export function Spinner({ size = 'md', className }: { size?: SpinnerSize; className?: string }) {
  return (
    <div
      role="status"
      aria-label="Загрузка"
      className={cn('flex items-center justify-center', className)}
    >
      <div
        className={cn('rounded-full border-subtle border-t-accent animate-spin', sizeClasses[size])}
      />
    </div>
  )
}

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-input bg-subtle animate-pulse', className)} {...props} />
}
