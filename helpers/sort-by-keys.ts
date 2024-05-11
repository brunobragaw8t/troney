export function sortByKeys<T> (
  arr: T[],
  order: 'asc' | 'desc' = 'desc',
  ...keys: (keyof T)[]
): T[] {
  return [...arr].sort((a, b) => {
    for (const key of keys) {
      if (a[key] < b[key]) {
        return order === 'asc' ? -1 : 1
      }

      if (a[key] > b[key]) {
        return order === 'asc' ? 1 : -1
      }
    }

    return 0
  })
}
