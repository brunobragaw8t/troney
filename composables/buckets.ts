import type { Database } from '~/types/supabase'

type BucketListItem = Database['public']['Tables']['buckets']['Row'] & {
  displayDeleteModal: boolean
  deleting: boolean
}

export const useBuckets = () => {
  const items = useState<BucketListItem[]>('buckets', () => [])

  function setItems (data: BucketListItem[]) {
    items.value = data
  }

  return { items, setItems }
}
