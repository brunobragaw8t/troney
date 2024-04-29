import { sortByKey } from '~/helpers/sort-by-key'
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
      const items = data.map(item => ({
        ...item,
        displayDeleteModal: false,
        deleting: false
      }))

      const sortedItems = sortByKey(items, 'name')

      setItems(sortedItems)
    }
  }

  function setItems (data: CategoryListItem[]) {
    items.value = data
  }

  return { items, fetchItems, setItems }
}
