import { describe, expect, it } from 'vitest'
import { sortByKey } from './sort-by-key'

describe('sortAlphabetically', () => {
  it('should sort by name', () => {
    const unsorted = [
      {
        id: 1,
        name: 'John'
      },
      {
        id: 2,
        name: 'Jane'
      },
      {
        id: 3,
        name: 'Doe'
      }
    ]

    const sorted = [
      {
        id: 3,
        name: 'Doe'
      },
      {
        id: 2,
        name: 'Jane'
      },
      {
        id: 1,
        name: 'John'
      }
    ]

    expect(sortByKey(unsorted, 'name')).toStrictEqual(sorted)
  })
})
