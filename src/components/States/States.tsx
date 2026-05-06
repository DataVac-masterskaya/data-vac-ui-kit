import { cn } from '../../lib/utils'

interface StateProps {
  message?: string
  className?: string
}

export function EmptyState({ message = 'Ничего не найдено', className }: StateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
      <p className="font-sans text-base text-text-muted">{message}</p>
    </div>
  )
}

export function ErrorState({ message = 'Произошла ошибка', className }: StateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
      <p className="font-sans text-base text-text-muted">{message}</p>
    </div>
  )
}
