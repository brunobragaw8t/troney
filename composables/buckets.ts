import { sortByKey } from '~/helpers/sort-by-key'
import type { Database } from '~/types/supabase'

type BucketListItem = Database['public']['Tables']['buckets']['Row'] & {
  displayDeleteModal: boolean
  deleting: boolean
}

export const useBuckets = () => {
  const items = useState<BucketListItem[]>('buckets', () => [])

  async function fetchItems () {
    const sbClient = useSupabaseClient<Database>()

    const { data, error } = await sbClient
      .from('buckets')
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

  function setItems (data: BucketListItem[]) {
    items.value = data
  }

  return { items, fetchItems, setItems }
}
