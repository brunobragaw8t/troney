import { describe, expect, test } from 'vitest'
import { getRandomColor } from './get-random-color'

describe('getRandomColor', () => {
  test('basic', () => {
    expect(getRandomColor()).toMatch(/^#[0-9a-f]{6}$/)
  })
})
