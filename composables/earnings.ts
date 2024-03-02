import { sortByDateDesc } from '~/helpers/sort-by-date-desc'
import type { Database } from '~/types/supabase'

type EarningListItem = Database['public']['Tables']['earnings']['Row'] & {
  displayDeleteModal: boolean
  deleting: boolean
}

export const useEarnings = () => {
  const items = useState<EarningListItem[]>('earnings', () => [])

  async function fetchItems () {
    const sbClient = useSupabaseClient<Database>()

    const { data, error } = await sbClient
      .from('earnings')
      .select()

    if (error) {
      return
    }

    if (data) {
      setItems(
        data.map(item => ({
          ...item,
          displayDeleteModal: false,
          deleting: false
        }))
      )
    }
  }

  function setItems (data: EarningListItem[]) {
    items.value = sortByDateDesc(data)
  }

  return { items, fetchItems, setItems }
}
