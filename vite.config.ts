import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { defineConfig, type Plugin } from 'vite'
import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr'

function renameUtilitiesLayer(): Plugin {
  return {
    name: 'rename-utilities-layer',
    closeBundle() {
      const cssPath = resolve(__dirname, 'dist/index.css')
      const css = readFileSync(cssPath, 'utf-8')
      const patched = css.replaceAll('@layer utilities{', '@layer ui-kit-utilities{')
      writeFileSync(cssPath, patched, 'utf-8')
    },
  }
}

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
    renameUtilitiesLayer(),
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
