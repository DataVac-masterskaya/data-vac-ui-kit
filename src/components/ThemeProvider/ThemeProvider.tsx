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

interface ThemeContextValue {
  themeName: ThemeName
  tokens: ThemeTokens
  setTheme: (name: ThemeName) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

interface ThemeProviderProps {
  children: ReactNode
  /** Начальная тема. По умолчанию следует системным настройкам */
  defaultTheme?: ThemeName
  /** Кастомная тема — переопределяет встроенные */
  customThemes?: Record<string, ThemeTokens>
  /** Применять CSS-переменные на :root (true) или на обёртку (false) */
  applyToRoot?: boolean
}

export function ThemeProvider({
  children,
  defaultTheme: initialTheme,
  customThemes,
  applyToRoot = true,
}: ThemeProviderProps) {
  const allThemes = useMemo(() => ({ ...themes, ...customThemes }), [customThemes])

  const [themeName, setThemeName] = useState<ThemeName>(initialTheme ?? 'light')

  const tokens = allThemes[themeName] ?? defaultTheme

  // Read localStorage after mount so toggle reflects saved preference.
  useEffect(() => {
    const saved = localStorage.getItem('datavac-theme')
    if (!saved || !allThemes[saved]) return
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setThemeName(saved)
  }, [allThemes])

  useEffect(() => {
    if (applyToRoot) {
      document.documentElement.classList.toggle('dark', themeName === 'dark')
    }
    localStorage.setItem('datavac-theme', themeName)
  }, [themeName, applyToRoot])

  const setTheme = useCallback(
    (name: ThemeName) => {
      if (allThemes[name]) setThemeName(name)
    },
    [allThemes],
  )

  const toggleTheme = useCallback(() => {
    setThemeName((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  return (
    <ThemeContext.Provider value={{ themeName, tokens, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within <ThemeProvider>')
  return ctx
}
