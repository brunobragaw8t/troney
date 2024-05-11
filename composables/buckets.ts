import { sortByKeys } from '~/helpers/sort-by-keys'
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
      setItems(
        data.map(item => ({
          ...item,
          displayDeleteModal: false,
          deleting: false
        }))
      )
    }
  }

  function setItems (data: BucketListItem[]) {
    items.value = sortByKeys(data, 'asc', 'name')
  }

  return { items, fetchItems, setItems }
}
