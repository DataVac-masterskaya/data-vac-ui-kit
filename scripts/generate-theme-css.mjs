/**
 * Генерирует src/tailwind.css из токенов в src/themes/*.json
 * Единственный источник правды — три файла:
 *   src/themes/default.json   — светлая тема
 *   src/themes/dark.json      — тёмная тема
 *   src/themes/vars-map.json  — маппинг токен → CSS-переменная
 *
 * Запуск: npm run theme:generate
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const read = (rel) => JSON.parse(readFileSync(resolve(root, rel), 'utf8'))

const varsMap = read('src/themes/vars-map.json')
const light   = read('src/themes/default.json')
const dark    = read('src/themes/dark.json')

// ─── helpers ─────────────────────────────────────────────────────────────────

function getByPath(obj, path) {
  return path.split('.').reduce((o, k) => o[k], obj)
}

function buildVars(theme) {
  return Object.fromEntries(
    varsMap.map(({ path, cssVar }) => [cssVar, getByPath(theme, path)])
  )
}

function lines(entries, indent = '  ') {
  return entries.map(([k, v]) => `${indent}${k}: ${v};`).join('\n')
}

// ─── build ────────────────────────────────────────────────────────────────────

const lightVars = buildVars(light)
const darkVars  = buildVars(dark)

// В .dark{} — только переопределения, которые отличаются от светлой темы
const darkDiff = Object.entries(darkVars).filter(([k, v]) => lightVars[k] !== v)

// Группируем @theme по префиксу для читаемости
const groups = [
  { comment: '/* Типографика */',   prefix: '--font-'   },
  { comment: '/* Цвета */',         prefix: '--color-'  },
  { comment: '/* Border radius */', prefix: '--radius-' },
]

const themeContent = groups
  .map(({ comment, prefix }) => {
    const entries = Object.entries(lightVars).filter(([k]) => k.startsWith(prefix))
    return `  ${comment}\n${lines(entries)}`
  })
  .join('\n\n')

// ─── output ──────────────────────────────────────────────────────────────────

const css = `\
@import 'tailwindcss';

/* Класс-based dark mode (переключается через .dark на <html>) */
@custom-variant dark (&:where(.dark, .dark *));

@font-face {
  font-family: 'Inter Tight';
  src: url('./fonts/InterTight-VariableFont_wght.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

/* Force-generate responsive variants used in components (library build doesn't auto-scan TSX) */
@source inline("md:w-[605px] xl:w-[720px]");
/* DataTable breakpoints — md/lg desktop + tablet/mobile */
@source inline("hidden md:flex md:hidden hidden lg:flex lg:hidden min-[480px]:flex min-[480px]:hidden");
/* SortControl + DataTable header colors (kebab-case CSS vars) */
@source inline("text-fg text-fg-muted text-fg-secondary hover:text-fg-secondary dark:text-fg-secondary dark:text-fg-muted text-interactive");
/* DataTable tooltip icon hover + group-hover (non-sortable column with tooltip) */
@source inline("hover:text-accent group group-hover:text-accent transition-colors");
/* Arrow icon rotation for SortControl */
@source inline("rotate-180 rotate-0");

/* ==========================================================================
   GENERATED FILE — не редактировать вручную!
   Источники: src/themes/default.json, dark.json, vars-map.json
   Обновить:  npm run theme:generate
   ========================================================================== */

@theme {
${themeContent}

  /* Accordion height animation (uses the Radix CSS variable) */
  --animate-accordion-down: accordion-down 0.25s ease-out;
  --animate-accordion-up: accordion-up 0.25s ease-out;
}

@keyframes accordion-down {
  from {
    height: 0;
  }
  to {
    height: var(--radix-accordion-content-height);
  }
}

@keyframes accordion-up {
  from {
    height: var(--radix-accordion-content-height);
  }
  to {
    height: 0;
  }
}

/* Тёмная тема — только значения, отличающиеся от светлой */
.dark {
${lines(darkDiff)}
}
`

const outPath = resolve(root, 'src/tailwind.css')
writeFileSync(outPath, css, 'utf8')

console.log(`✓ src/tailwind.css обновлён`)
console.log(`  ${varsMap.length} токенов, ${darkDiff.length} тёмных переопределений`)
console.log(`  Изменились в dark: ${darkDiff.map(([k]) => k).join(', ')}`)
