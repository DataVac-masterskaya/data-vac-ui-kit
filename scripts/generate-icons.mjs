import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { resolve, basename, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rawDir = resolve(__dirname, '../src/icons/raw')
const iconsDir = resolve(__dirname, '../src/icons')
const outputFile = resolve(iconsDir, 'index.tsx')

function toComponentName(filename) {
  return filename
    .replace(/[-_](.)/g, (_, c) => c.toUpperCase())
    .replace(/^(.)/, (_, c) => c.toUpperCase())
}

function svgToJsx(svg) {
  return svg
    // Убираем XML-декларацию и xmlns (React не нужен)
    .replace(/<\?xml[^>]*\?>\n?/g, '')
    .replace(/ xmlns="[^"]+"/g, '')
    // Заменяем хардкод-цвета на currentColor (кроме fill="none")
    .replace(/fill="(?!none)[^"]+"/g, 'fill="currentColor"')
    .replace(/stroke="(?!none|currentColor)[^"]+"/g, 'stroke="currentColor"')
    // SVG-атрибуты → camelCase JSX
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/clip-rule=/g, 'clipRule=')
    .replace(/stroke-linecap=/g, 'strokeLinecap=')
    .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/stroke-dasharray=/g, 'strokeDasharray=')
    .replace(/class=/g, 'className=')
    .trim()
}

function parseSvg(svg) {
  const match = svg.match(/<svg([^>]*)>([\s\S]*?)<\/svg>/s)
  if (!match) throw new Error('Invalid SVG')
  const attrsStr = match[1]
  const inner = match[2].trim()

  const viewBox = (attrsStr.match(/viewBox="([^"]+)"/) || [])[1] || '0 0 24 24'
  const w = (attrsStr.match(/width="([^"]+)"/) || [])[1]
  const h = (attrsStr.match(/height="([^"]+)"/) || [])[1]

  return { viewBox, defaultWidth: w, defaultHeight: h, inner }
}

const svgFiles = readdirSync(rawDir)
  .filter(f => f.endsWith('.svg'))
  .sort()

const icons = svgFiles.map(file => {
  const rawName = basename(file, '.svg')
  const componentName = toComponentName(rawName) + 'Icon'
  const svgRaw = readFileSync(resolve(rawDir, file), 'utf8')
  const jsx = svgToJsx(svgRaw)
  const { viewBox, defaultWidth, defaultHeight, inner } = parseSvg(jsx)
  return { rawName, componentName, viewBox, defaultWidth, defaultHeight, inner }
})

const lines = [
  `// GENERATED — do not edit manually. Run: npm run icons:generate`,
  `import type { SVGProps } from 'react'`,
  ``,
  `export type IconProps = SVGProps<SVGSVGElement>`,
  ``,
]

for (const { componentName, viewBox, defaultWidth, defaultHeight, inner } of icons) {
  lines.push(
    `export function ${componentName}({ width = ${defaultWidth || 24}, height = ${defaultHeight || 24}, ...props }: IconProps) {`,
    `  return (`,
    `    <svg viewBox="${viewBox}" width={width} height={height} fill="none" aria-hidden="true" {...props}>`,
    `      ${inner.replace(/\n/g, '\n      ')}`,
    `    </svg>`,
    `  )`,
    `}`,
    ``,
  )
}

writeFileSync(outputFile, lines.join('\n'), 'utf8')
console.log(`✓ Сгенерировано ${icons.length} иконок из src/icons/raw/ → src/icons/index.tsx`)
icons.forEach(i => console.log(`  ${i.componentName}`))
