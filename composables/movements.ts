import { sortByDateDesc } from '~/helpers/sort-by-date-desc'
import type { Database } from '~/types/supabase'

type MovementListItem = Database['public']['Tables']['movements']['Row'] & {
  displayDeleteModal: boolean
  deleting: boolean
}

export const useMovements = () => {
  const items = useState<MovementListItem[]>('movements', () => [])

  async function fetchItems () {
    const { data, error } = await useFetch('/api/movements', {
      cache: 'no-cache'
    })

    if (error.value) {
      return
    }

    if (!Array.isArray(data.value)) {
      setItems([])
      return
    }

    setItems(
      data.value.map(item => ({
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
