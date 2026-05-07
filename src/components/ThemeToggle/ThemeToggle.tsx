import { useState } from 'react'
import { cn } from '../../lib/utils'
import { SunIcon, MoonStarsIcon } from '../../icons'
import { Switch } from '../Switch'

export function ThemeToggle({ className }: { className?: string }) {
  const [isDark, setIsDark] = useState(false)

  const toggle = (next: boolean) => {
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
  }

  return (
    <>
      {/* Desktop: текстовые метки + переключатель */}
      <div className={cn('hidden md:flex items-center gap-2', className)}>
        <span className={cn('text-xs font-sans', isDark ? 'text-fg-muted' : 'text-fg')}>День</span>
        <Switch
          checked={isDark}
          onChange={toggle}
          size="sm"
          trackClassName={isDark ? 'bg-neutral' : 'bg-subtle'}
          thumbClassName={isDark ? 'bg-accent' : 'bg-neutral'}
          aria-label={isDark ? 'Включить светлую тему' : 'Включить тёмную тему'}
        />
        <span className={cn('text-xs font-sans', isDark ? 'text-fg' : 'text-fg-muted')}>Ночь</span>
      </div>

      {/* Mobile: иконки внутри трека */}
      <button
        role="switch"
        aria-checked={isDark}
        aria-label={isDark ? 'Включить светлую тему' : 'Включить тёмную тему'}
        onClick={() => toggle(!isDark)}
        className={cn(
          'relative flex md:hidden w-[58px] h-8 rounded-pill bg-neutral overflow-hidden',
          className,
        )}
      >
        {/* Кружок первый в DOM — иконки рендерятся поверх него */}
        <span
          className={cn(
            'absolute top-[3px] w-[26px] h-[26px] bg-white rounded-full shadow transition-all duration-200',
            isDark ? 'left-[29px]' : 'left-[3px]',
          )}
        />
        {/* Солнце — светлый stroke, виден на тёмном фоне, сливается с белым кружком */}
        <span className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none text-white">
          <SunIcon />
        </span>
        {/* Луна — тёмный stroke, видна на белом кружке, сливается с тёмным фоном */}
        <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-fg">
          <MoonStarsIcon />
        </span>
      </button>
    </>
  )
}
