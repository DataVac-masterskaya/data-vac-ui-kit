import type { ThemeTokens } from './tokens'
import defaultTheme from './default.json'
import darkTheme from './dark.json'
import varsMap from './vars-map.json'

export { defaultTheme, darkTheme }
export type { ThemeTokens, ThemeName } from './tokens'

export const themes: Record<string, ThemeTokens> = {
  light: defaultTheme,
  dark: darkTheme,
}

function getByPath(obj: Record<string, unknown>, path: string): string {
  return path.split('.').reduce<unknown>((o, k) => (o as Record<string, unknown>)[k], obj) as string
}

/** Конвертирует объект токенов в CSS custom properties */
export function tokensToCssVars(tokens: ThemeTokens): Record<string, string> {
  return Object.fromEntries(
    varsMap.map(({ path, cssVar }) => [
      cssVar,
      getByPath(tokens as unknown as Record<string, unknown>, path),
    ]),
  )
}
