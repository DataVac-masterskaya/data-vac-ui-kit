import '../src/tailwind.css'
import { withThemeByClassName } from '@storybook/addon-themes'
import { MINIMAL_VIEWPORTS } from 'storybook/viewport'
import type { Preview, ReactRenderer } from '@storybook/react'

/**
 * Кастомный viewport для планшетного диапазона (480–767 px).
 * MINIMAL_VIEWPORTS.tablet = 834px — это уже desktop в нашей сетке.
 */
const CUSTOM_VIEWPORTS = {
  ...MINIMAL_VIEWPORTS,
  dataVacTablet: {
    name: 'Tablet (480–767 px)',
    styles: { width: '600px', height: '900px' },
    type: 'tablet' as const,
  },
}

const preview: Preview = {
  decorators: [
    withThemeByClassName<ReactRenderer>({
      themes: {
        'Светлая': '',
        'Тёмная': 'dark',
      },
      defaultTheme: 'Светлая',
    }),
  ],
  parameters: {
    backgrounds: { disable: true },
    viewport: {
      options: CUSTOM_VIEWPORTS,
    },
  },
}

export default preview
