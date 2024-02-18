<script setup lang="ts">
useHead({
  htmlAttrs: {
    'data-bs-theme': 'dark'
  }
})

const wallets = useWallets()
const buckets = useBuckets()
const categories = useCategories()
const earnings = useEarnings()

onMounted(() => {
  wallets.fetchItems()
  buckets.fetchItems()
  categories.fetchItems()
  earnings.fetchItems()
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
