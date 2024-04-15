import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const sbClient = await serverSupabaseClient<Database>(event)

  const { error } = await sbClient
    .from('movements')
    .delete()
    .eq('id', id)

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }

  setResponseStatus(event, 204)
})
