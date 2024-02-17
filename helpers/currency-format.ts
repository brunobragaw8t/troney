import { numberFormat } from './number-format'

export function currencyFormat (value: number): string {
  return numberFormat(value, 2, ',', ' ') + ' €'
}
