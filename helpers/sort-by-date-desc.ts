type ObjectWithDate = {
  date: string;
  [key: string]: unknown;
};

export function sortByDateDesc<T extends ObjectWithDate> (items: T[]): T[] {
  return items.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB.getTime() - dateA.getTime()
  })
}
