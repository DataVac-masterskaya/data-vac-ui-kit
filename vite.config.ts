import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    svgr(),
    storybookTest(),
    dts({
      include: ['src'],
      exclude: ['src/**/*.stories.tsx', 'src/**/*.test.tsx'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DatavacUiKit',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        assetFileNames: (info) =>
          info.names?.some((n) => /\.(woff2?|ttf|otf|eot)$/.test(n))
            ? 'fonts/[name][extname]'
            : '[name][extname]',
      },
    },
    cssCodeSplit: false,
    assetsInlineLimit: 0,
  },
})
