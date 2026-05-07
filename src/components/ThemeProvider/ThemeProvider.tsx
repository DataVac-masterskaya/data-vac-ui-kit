'use client'

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { defaultTheme, themes, tokensToCssVars } from '../../themes'
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
  const allThemes = { ...themes, ...customThemes }

  const getInitialTheme = (): ThemeName => {
    if (initialTheme) return initialTheme
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('datavac-theme')
      if (saved && allThemes[saved]) return saved
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
    }
    return 'light'
  }

  const [themeName, setThemeName] = useState<ThemeName>(getInitialTheme)

  const tokens = allThemes[themeName] ?? defaultTheme

  const applyVars = useCallback(
    (vars: Record<string, string>) => {
      const target = applyToRoot ? document.documentElement : null
      if (!target) return
      Object.entries(vars).forEach(([k, v]) => target.style.setProperty(k, v))
      target.classList.toggle('dark', themeName === 'dark')
    },
    [applyToRoot, themeName],
  )

  useEffect(() => {
    applyVars(tokensToCssVars(tokens))
    localStorage.setItem('datavac-theme', themeName)
  }, [tokens, themeName, applyVars])

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
