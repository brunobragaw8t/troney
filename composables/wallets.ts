import { Database } from 'types/supabase'

type WalletListItem = Database['public']['Tables']['wallets']['Row'] & {
  displayDeleteModal: boolean
  deleting: boolean
}

export const useWallets = () => {
  const wallets = useState<WalletListItem[]>('wallets', () => [])

  function setWallets (data: WalletListItem[]) {
    wallets.value = data
  }

  return { wallets, setWallets }
}
