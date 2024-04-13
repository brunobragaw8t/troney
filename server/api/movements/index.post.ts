import { serverSupabaseClient } from '#supabase/server'
import { z } from 'zod'
import type { Database, TablesInsert } from '~/types/supabase'

const createMovementSchema = z.object({
  description: z.string(),
  wallet_id_from: z.union([z.number(), z.null()]),
  wallet_id_to: z.union([z.number(), z.null()]),
  value: z.number()
})

export default defineEventHandler(async (event) => {
  const payload = await readValidatedBody(event, createMovementSchema.safeParse)

  if (!payload.success) {
    throw createError({
      statusCode: 400,
      statusMessage: payload.error.message
    })
  }

  const body = payload.data

  const sbClient = await serverSupabaseClient<Database>(event)

  const { data, error } = await sbClient.from('movements')
    .insert<TablesInsert<'movements'>>({
      description: body.description,
      wallet_id_from: body.wallet_id_from,
      wallet_id_to: body.wallet_id_to,
      value: body.value
    })
    .select()

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }

  setResponseStatus(event, 201)

  return data[0]
})
