<script setup lang="ts">
import type { Database } from './types/supabase'

useHead({
  htmlAttrs: {
    'data-bs-theme': 'dark'
  }
})

const sbClient = useSupabaseClient<Database>()

async function fetchWallets () {
  const { data, error } = await sbClient
    .from('wallets')
    .select()

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
