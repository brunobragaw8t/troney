import { expect, test } from 'vitest'
import { currencyFormat } from './currency-format'

test('currencyFormat', () => {
  expect(currencyFormat(123456789)).toBe('123 456 789,00 €')
})
