export type PageRangeItem = number | 'ellipsis'

const SIBLING_COUNT = 2

/** Окно страниц вокруг текущей + первая/последняя, с «ellipsis» в разрывах */
export function getPageRange(page: number, totalPages: number): PageRangeItem[] {
  if (totalPages <= 0) return []

  const pages = new Set<number>([1, totalPages])
  for (let p = page - SIBLING_COUNT; p <= page + SIBLING_COUNT; p++) {
    if (p >= 1 && p <= totalPages) pages.add(p)
  }

  const sorted = [...pages].sort((a, b) => a - b)
  const result: PageRangeItem[] = []
  sorted.forEach((p, i) => {
    if (i > 0) {
      const gap = p - sorted[i - 1]
      // Разрыв в одну страницу — показываем её саму, а не «…» вместо неё
      if (gap === 2) result.push(sorted[i - 1] + 1)
      else if (gap > 2) result.push('ellipsis')
    }
    result.push(p)
  })
  return result
}
