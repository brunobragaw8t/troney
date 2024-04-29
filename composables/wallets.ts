import { sortByKey } from '~/helpers/sort-by-key'
import { type Database } from '~/types/supabase'

type WalletListItem = Database['public']['Tables']['wallets']['Row'] & {
  displayDeleteModal: boolean
  deleting: boolean
}

export const useWallets = () => {
  const items = useState<WalletListItem[]>('wallets', () => [])

  async function fetchItems () {
    const sbClient = useSupabaseClient<Database>()

    const { data, error } = await sbClient
      .from('wallets')
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

  function setItems (data: WalletListItem[]) {
    items.value = data
  }

  return { items, fetchItems, setItems }
}
