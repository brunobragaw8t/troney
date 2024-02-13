<script setup lang="ts">
import type { User } from '@supabase/gotrue-js'
import type { Database } from './types/supabase'

useHead({
  htmlAttrs: {
    'data-bs-theme': 'dark'
  }
})

const sbClient = useSupabaseClient<Database>()
const user = useSupabaseUser() as { value: User }

async function fetchWallets () {
  const { data, error } = await sbClient
    .from('wallets')
    .select()
    .eq('user_id', user.value.id)

  if (error) {
    return
  }

  useWallets().setWallets(
    data.map((wallet) => {
      return {
        ...wallet,
        displayDeleteModal: false,
        deleting: false
      }
    })
  )
}

async function fetchBuckets () {
  const { data, error } = await sbClient
    .from('buckets')
    .select()
    .eq('user_id', user.value.id)

  if (error) {
    return
  }

  useBuckets().setItems(
    data.map((item) => {
      return {
        ...item,
        displayDeleteModal: false,
        deleting: false
      }
    })
  )
}

async function fetchCategories () {
  const { data, error } = await sbClient
    .from('categories')
    .select()

  if (error) {
    return
  }

  useCategories().setItems(
    data.map((item) => {
      return {
        ...item,
        displayDeleteModal: false,
        deleting: false
      }
    })
  )
}

fetchWallets()
fetchBuckets()
fetchCategories()
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
@import url('~/assets/global.css');
</style>
