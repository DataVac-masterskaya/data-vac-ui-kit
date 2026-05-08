import '../src/tailwind.css'
import { withThemeByClassName } from '@storybook/addon-themes'
import type { Preview, ReactRenderer } from '@storybook/react'

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
  },
}

export default preview
