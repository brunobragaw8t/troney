import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const sbClient = await serverSupabaseClient<Database>(event)

  const { data, error } = await sbClient
    .from('movements')
    .select()

  if (error) {
    return error
  }

  return data
})
