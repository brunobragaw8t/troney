import type { Database } from '~/types/supabase'

type ExpenseListItem = Database['public']['Tables']['expenses']['Row'] & {
  displayDeleteModal: boolean
  deleting: boolean
}

export const useExpenses = () => {
  const items = useState<ExpenseListItem[]>('expenses', () => [])

  async function fetchItems () {
    const sbClient = useSupabaseClient<Database>()

    const { data, error } = await sbClient
      .from('expenses')
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

  function setItems (data: ExpenseListItem[]) {
    items.value = data
  }

  return { items, fetchItems, setItems }
}
