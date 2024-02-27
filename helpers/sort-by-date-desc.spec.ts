import { describe, expect, it } from 'vitest'
import { sortByDateDesc } from './sort-by-date-desc'

describe('sortByDateDesc', () => {
  it('should sort by date DESC', () => {
    const unsorted = [
      {
        date: '2024-01-01'
      },
      {
        date: '2023-03-12'
      },
      {
        date: '2023-12-01'
      }
    ]

    const sorted = [
      {
        date: '2024-01-01'
      },
      {
        date: '2023-12-01'
      },
      {
        date: '2023-03-12'
      }
    ]

    expect(sortByDateDesc(unsorted)).toStrictEqual(sorted)
  })
})
