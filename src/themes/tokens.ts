export interface ThemeTokens {
  colors: {
    accent: string
    accentHover: string

    fg: string
    fgSecondary: string
    fgMuted: string

    page: string
    card: string
    subtle: string
    interactive: string
    overlay: string
    neutral: string

    border: string
    link: string
  }
  radius: {
    tooltip: string
    icon: string
    sm: string
    input: string
    card: string
    pill: string
    button: string
  }
  font: {
    sans: string
  }
}

export type ThemeName = 'light' | 'dark'
