import { sortByDateDesc } from '~/helpers/sort-by-date-desc'
import type { Tables } from '~/types/supabase'

type MovementListItem = Tables<'movements'> & {
  displayDeleteModal: boolean
  deleting: boolean
}

export const useMovements = () => {
  const items = useState<MovementListItem[]>('movements', () => [])

  async function fetchItems () {
    let data: Tables<'movements'>[] = []

    try {
      const res = await $fetch('/api/movements', { cache: 'no-cache' })

      if (Array.isArray(res)) {
        data = res
      }
    } catch {
    }

    setItems(
      data.map(item => ({
        ...item,
        displayDeleteModal: false,
        deleting: false
      }))
    )
  }

  function setItems (data: MovementListItem[]) {
    items.value = sortByDateDesc(data)
  }

  return { items, fetchItems }
}
