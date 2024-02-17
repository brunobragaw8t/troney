import { describe, expect, test } from 'vitest'
import { numberFormat } from './number-format'

describe('numberFormat', () => {
  test('default params', () => {
    expect(numberFormat(123456789)).toBe('123,456,789')
  })

  test('custom portuguese params', () => {
    expect(numberFormat(123456789, 2, ',', ' ')).toBe('123 456 789,00')
  })
})
