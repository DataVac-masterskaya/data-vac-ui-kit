import { useState } from 'react'
import { cn } from '../../lib/utils'

export function ThemeToggle({ className }: { className?: string }) {
  const [isDark, setIsDark] = useState(false)

  const toggle = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className={cn('text-xs font-sans', !isDark ? 'text-text' : 'text-text-muted')}>
        День
      </span>
      <button
        role="switch"
        aria-checked={isDark}
        onClick={toggle}
        className={cn(
          'relative w-8 h-5 rounded-pill transition-colors',
          isDark ? 'bg-primary' : 'bg-surface',
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform',
            isDark ? 'translate-x-4' : 'translate-x-0.5',
          )}
        />
      </button>
      <span className={cn('text-xs font-sans', isDark ? 'text-text' : 'text-text-muted')}>
        Ночь
      </span>
    </div>
  )
}
