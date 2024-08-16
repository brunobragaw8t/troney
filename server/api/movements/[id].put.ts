import { z } from 'zod'
import { serverSupabaseClient } from '#supabase/server'
import type { Database, TablesUpdate } from '~/types/supabase'

const updateMovementSchema = z.object({
  description: z.string(),
  wallet_id_from: z.union([z.number(), z.null()]),
  bucket_id_from: z.union([z.number(), z.null()]),
  value: z.number(),
  wallet_id_to: z.union([z.number(), z.null()]),
  bucket_id_to: z.union([z.number(), z.null()]),
  date: z.string()
})

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const payload = await readValidatedBody(event, updateMovementSchema.safeParse)

  if (!payload.success) {
    throw createError({
      statusCode: 400,
      statusMessage: payload.error.message
    })
  }

  const body = payload.data

  const sbClient = await serverSupabaseClient<Database>(event)

  const { data, error } = await sbClient.from('movements')
    .update<TablesUpdate<'movements'>>({
      description: body.description,
      wallet_id_from: body.wallet_id_from,
      bucket_id_from: body.bucket_id_from,
      value: body.value,
      wallet_id_to: body.wallet_id_to,
      bucket_id_to: body.bucket_id_to,
      date: body.date
    })
    .eq('id', id)
    .select()

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }

  return data[0]
})
