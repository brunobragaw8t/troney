export function numberFormat (
  number: number,
  decimals = 0,
  decPoint = '.',
  thousandsSep = ','
): string {
  if (!isFinite(number)) {
    return 'error'
  }

  const roundedNumber = Number(
    Math.round(Number(number + 'e' + decimals)) + 'e-' + decimals
  )

  let formattedNumber = roundedNumber.toFixed(decimals)

  const parts = formattedNumber.split('.')

  // Add thousand separators
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSep)

  formattedNumber = parts.join(decPoint)

  return formattedNumber
}
