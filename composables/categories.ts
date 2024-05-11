import { sortByKeys } from '~/helpers/sort-by-keys'
import type { Database } from '~/types/supabase'

type CategoryListItem = Database['public']['Tables']['categories']['Row'] & {
  displayDeleteModal: boolean
  deleting: boolean
}

export const useCategories = () => {
  const items = useState<CategoryListItem[]>('categories', () => [])

  async function fetchItems () {
    const sbClient = useSupabaseClient<Database>()

    const { data, error } = await sbClient
      .from('categories')
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

  function setItems (data: CategoryListItem[]) {
    items.value = sortByKeys(data, 'asc', 'name')
  }

  return { items, fetchItems, setItems }
}
