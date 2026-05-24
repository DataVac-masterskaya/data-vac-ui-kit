import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'
import { vitestTransform } from 'storybook/internal/csf-tools'
import svgr from 'vite-plugin-svgr'

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))
const storybookConfigDir = path.join(dirname, '.storybook')

const transformStorybookStories = () => ({
  name: 'storybook-stories-transform',
  enforce: 'pre' as const,
  async transform(code: string, id: string) {
    const filePath = id.split('?')[0]
    if (
      !/\.stories\.[tj]sx?$/.test(filePath) ||
      filePath.includes('node_modules') ||
      code.includes('@storybook/addon-vitest/internal/test-utils')
    ) {
      return
    }

    const result = await vitestTransform({
      code,
      fileName: id,
      configDir: storybookConfigDir,
      tagsFilter: { include: [], exclude: [], skip: [] },
      stories: ['../src/**/*.stories.@(ts|tsx)'],
      previewLevelTags: [],
    })

    result.code = result.code.replace(
      'if (_isRunningFromThisFile) {',
      'if (_isRunningFromThisFile || true) {',
    )

    return result
  },
})

export default defineConfig({
  plugins: [react()],
  test: {
    projects: [
      {
        plugins: [react(), svgr()],
        test: {
          name: 'unit',
          globals: true,
          environment: 'jsdom',
          setupFiles: ['./src/test-setup.ts'],
          include: ['src/**/*.test.{ts,tsx}'],
          exclude: ['**/node_modules/**', '**/dist/**'],
        },
      },
      {
        extends: true,
        plugins: [
          svgr(),
          transformStorybookStories(),
        ],
        optimizeDeps: {
          include: [
            '@storybook/addon-vitest/internal/setup-file',
            '@storybook/addon-vitest/internal/test-utils',
            '@storybook/addon-themes',
            '@storybook/react',
            'storybook/preview-api',
            'react-dom/test-utils',
          ],
        },
        test: {
          name: 'storybook',
          setupFiles: ['@storybook/addon-vitest/internal/setup-file', '.storybook/vitest.setup.ts'],
          include: ['src/**/*.stories.{ts,tsx}'],
          exclude: ['**/node_modules/**', '**/dist/**'],
          env: {
            __STORYBOOK_URL__: 'http://localhost:6006',
            __VITEST_INCLUDE_TAGS__: '',
            __VITEST_EXCLUDE_TAGS__: '',
            __VITEST_SKIP_TAGS__: '',
          },
          browser: {
            enabled: true,
            headless: true,
            api: { host: '127.0.0.1' },
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
})
