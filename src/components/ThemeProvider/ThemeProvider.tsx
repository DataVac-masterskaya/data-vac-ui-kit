'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { defaultTheme, themes } from '../../themes'
import type { ThemeName, ThemeTokens } from '../../themes'

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export type ExtendedThemeName = ThemeName | 'system'
interface ThemeContextValue {
  themeName: ExtendedThemeName
  resolvedTheme: ThemeName
  tokens: ThemeTokens
  setTheme: (name: ThemeName) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

interface ThemeProviderProps {
  children: ReactNode
  /** Начальная тема. По умолчанию следует системным настройкам */
  defaultTheme?: ExtendedThemeName
  /** Кастомная тема — переопределяет встроенные */
  customThemes?: Record<string, ThemeTokens>
  /** Применять CSS-переменные на :root (true) или на обёртку (false) */
  applyToRoot?: boolean
}

// Получает текущую системную тему
function getSystemTheme(): ThemeName {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Резолвит тему: если 'system' — возвращает актуальную системную, иначе — саму тему
function resolveThemeName(theme: ExtendedThemeName): ThemeName {
  return theme === 'system' ? getSystemTheme() : theme
}

// Получает начальную тему (вызывается и на сервере тоже)
function getInitialTheme(defaultTheme?: ExtendedThemeName): ExtendedThemeName {
  if (defaultTheme) return defaultTheme

  if (typeof window === 'undefined') return 'system'

  const saved = localStorage.getItem('datavac-theme')
  if (saved && (saved === 'light' || saved === 'dark' || saved === 'system')) {
    return saved
  }

  return 'system' // Fallback к системной
}

export function ThemeProvider({
  children,
  defaultTheme: initialTheme,
  customThemes,
  applyToRoot = true,
}: ThemeProviderProps) {
  const allThemes = useMemo(() => ({ ...themes, ...customThemes }), [customThemes])

  const [themeName, setThemeName] = useState<ExtendedThemeName>(() => getInitialTheme(initialTheme))

  // Вычисляем фактическую тему (light/dark) и токены
  const resolvedTheme = useMemo(() => resolveThemeName(themeName), [themeName])
  const tokens = allThemes[resolvedTheme] ?? defaultTheme

  // Эффект: подписка на изменение системной темы
  useEffect(() => {
    if (themeName !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = () => {
      // Force re-render для обновления resolvedTheme
      setThemeName('system')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [themeName])

  // Эффект: применение темы к DOM и сохранение в localStorage
  useEffect(() => {
    const classNameList = applyToRoot ? document.documentElement.classList : document.body.classList

    classNameList.toggle('dark', resolvedTheme === 'dark')
    localStorage.setItem('datavac-theme', themeName)
  }, [resolvedTheme, themeName, applyToRoot])

  const setTheme = useCallback(
    (name: ExtendedThemeName) => {
      if (name === 'system' || allThemes[name]) {
        setThemeName(name)
      }
    },
    [allThemes],
  )

  const toggleTheme = useCallback(() => {
    setThemeName((prev) => {
      const current = resolveThemeName(prev)
      return current === 'dark' ? 'light' : 'dark'
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ themeName, resolvedTheme, tokens, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within <ThemeProvider>')
  return ctx
}
