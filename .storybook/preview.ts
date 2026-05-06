import '../src/tailwind.css'
import type { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#F3F3F3' },
        { name: 'dark', value: '#1a1a1a' },
      ],
    },
  },
}

export default preview
