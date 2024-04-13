<script setup lang="ts">
import { bindKeymapFunctionality } from './helpers/click-with-keymap'

useHead({
  htmlAttrs: {
    'data-bs-theme': 'dark'
  }
})

useSupabaseClient().auth.onAuthStateChange((_, session) => {
  if (!session) {
    return
  }

  useWallets().fetchItems()
  useBuckets().fetchItems()
  useCategories().fetchItems()
  useEarnings().fetchItems()
  useExpenses().fetchItems()
  useMovements().fetchItems()

  bindKeymapFunctionality()
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
@import url('~/assets/global.css');
</style>
