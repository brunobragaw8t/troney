import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const sbClient = await serverSupabaseClient<Database>(event)

  const { data, error } = await sbClient
    .from('movements')
    .select()

  if (error) {
    return error
  }

  if (!data) {
    return []
  }

  return data
})
