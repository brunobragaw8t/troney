<script setup lang="ts">
import { User } from '@supabase/gotrue-js'
import { Database } from 'types/supabase'

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

fetchWallets()
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
@import url('~/assets/global.css');
</style>
