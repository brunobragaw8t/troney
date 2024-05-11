import { sortByKeys } from '~/helpers/sort-by-keys'
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
      setItems(
        data.map(item => ({
          ...item,
          displayDeleteModal: false,
          deleting: false
        }))
      )
    }
  }

  function setItems (data: WalletListItem[]) {
    items.value = sortByKeys(data, 'asc', 'name')
  }

  return { items, fetchItems, setItems }
}
