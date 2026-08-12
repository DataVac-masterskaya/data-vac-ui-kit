import { describe, expect, it } from 'vitest'
import { getPageRange } from './getPageRange'

describe('getPageRange', () => {
  it('returns a single page for totalPages = 1', () => {
    expect(getPageRange(1, 1)).toEqual([1])
  })

  it('returns the full range without ellipsis when everything fits', () => {
    expect(getPageRange(4, 7)).toEqual([1, 2, 3, 4, 5, 6, 7])
  })

  it('collapses the tail into an ellipsis near the start', () => {
    expect(getPageRange(1, 20)).toEqual([1, 2, 3, 'ellipsis', 20])
  })

  it('collapses both sides into ellipses around the current page', () => {
    expect(getPageRange(6, 20)).toEqual([1, 'ellipsis', 4, 5, 6, 7, 8, 'ellipsis', 20])
  })

  it('collapses the head into an ellipsis near the end', () => {
    expect(getPageRange(20, 20)).toEqual([1, 'ellipsis', 18, 19, 20])
  })

  it('shows the page itself instead of an ellipsis when only one page is hidden', () => {
    expect(getPageRange(1, 5)).toEqual([1, 2, 3, 4, 5])
  })
})
