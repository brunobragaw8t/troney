<script setup lang="ts">
import { bindKeymapFunctionality } from './helpers/click-with-keymap'

useHead({
  htmlAttrs: {
    'data-bs-theme': 'dark'
  }
})

const wallets = useWallets()
const buckets = useBuckets()
const categories = useCategories()
const earnings = useEarnings()
const expenses = useExpenses()

onMounted(() => {
  wallets.fetchItems()
  buckets.fetchItems()
  categories.fetchItems()
  earnings.fetchItems()
  expenses.fetchItems()
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
