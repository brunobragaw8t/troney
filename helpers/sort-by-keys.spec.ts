import { describe, expect, it } from 'vitest'
import { sortByKeys } from './sort-by-keys'

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

    expect(sortByKeys(unsorted, 'asc', 'name')).toStrictEqual(sorted)
  })

  it('should sort by date and then by name DESC', () => {
    const unsorted = [
      {
        id: 1,
        name: 'John',
        date: '2021-01-01'
      },
      {
        id: 2,
        name: 'Jane',
        date: '2021-01-02'
      },
      {
        id: 3,
        name: 'Doe',
        date: '2021-01-02'
      }
    ]

    const sorted = [
      {
        id: 2,
        name: 'Jane',
        date: '2021-01-02'
      },
      {
        id: 3,
        name: 'Doe',
        date: '2021-01-02'
      },
      {
        id: 1,
        name: 'John',
        date: '2021-01-01'
      }
    ]

    expect(sortByKeys(unsorted, 'desc', 'date', 'name')).toStrictEqual(sorted)
  })
})
