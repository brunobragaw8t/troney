import { serverSupabaseClient } from '#supabase/server'
import type { Database, Tables } from '~/types/supabase'

export default defineEventHandler(async (event): Promise<Tables<'movements'>> => {
  const id = getRouterParam(event, 'id')

  const sbClient = await serverSupabaseClient<Database>(event)

  const { data, error } = await sbClient
    .from('movements')
    .select()
    .eq('id', id)

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }

  if (!data) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Movement not found'
    })
  }

  setResponseStatus(event, 200)

  return data[0]
})
