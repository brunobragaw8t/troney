import type { Database } from '~/types/supabase'

type CategoryListItem = Database['public']['Tables']['categories']['Row'] & {
  displayDeleteModal: boolean
  deleting: boolean
}

export const useCategories = () => {
  const items = useState<CategoryListItem[]>('categories', () => [])

  function setItems (data: CategoryListItem[]) {
    items.value = data
  }

  return { items, setItems }
}
