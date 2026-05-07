import { type HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

export function Spinner({ className }: { className?: string }) {
  return (
    <div
      role="status"
      aria-label="Загрузка"
      className={cn('flex items-center justify-center', className)}
    >
      <div className="w-6 h-6 rounded-full border-2 border-subtle border-t-accent animate-spin" />
    </div>
  )
}

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-input bg-subtle animate-pulse', className)} {...props} />
}
