import { Database } from 'types/supabase'

type TransactionCategoryListItem = Database['public']['Tables']['transaction_categories']['Row'] & {
  displayDeleteModal: boolean
  deleting: boolean
}

export const useTransactionCategories = () => {
  const transactionCategories = useState<TransactionCategoryListItem[]>('transactionCategories', () => [])

  function setTransactionCategories (data: TransactionCategoryListItem[]) {
    transactionCategories.value = data
  }

  return { wallets: transactionCategories, setTransactionCategories }
}
