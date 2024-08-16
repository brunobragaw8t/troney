<script setup lang="ts">
import type { Tables, TablesUpdate } from '~/types/supabase'

useHead({ title: 'Edit movement - Troney' })

const id = useRoute().params.id

const wallets = computed(() => {
  return [
    {
      value: null,
      label: 'None'
    },
    ...useWallets().items.value.map(w => ({
      value: w.id,
      label: w.name
    }))
  ]
})

const buckets = computed(() => {
  return [
    {
      value: null,
      label: 'Select bucket'
    },
    ...useBuckets().items.value.map(i => ({
      value: i.id,
      label: i.name
    }))
  ]
})

const payload = ref<TablesUpdate<'movements'>>({
  description: '',
  wallet_id_from: null,
  value: 0,
  wallet_id_to: null,
  bucket_id_from: null,
  bucket_id_to: null,
  date: new Date().toISOString().slice(0, 10)
})

const isLoading = ref(true)
const isUpdating = ref(false)

const alert = ref({
  type: '',
  message: ''
})

async function fetchItem () {
  const res = await $fetch(`/api/movements/${id}`) as Tables<'movements'> | null | undefined

  if (!res) {
    navigateTo('/movements')
    return
  }

  payload.value = {
    description: res.description,
    wallet_id_from: res.wallet_id_from,
    value: res.value,
    wallet_id_to: res.wallet_id_to,
    bucket_id_from: res.bucket_id_from,
    bucket_id_to: res.bucket_id_to,
    date: res.date
  }

  isLoading.value = false
}

onMounted(() => {
  fetchItem()
})

async function updateItem () {
  isUpdating.value = true

  const res = await $fetch(`/api/movements/${id}`, {
    method: 'PUT',
    body: payload.value
  }) as Tables<'movements'> | null | undefined

  if (!res) {
    isUpdating.value = false
    navigateTo('/movements')
    return
  }

  alert.value = {
    type: 'success',
    message: 'Movement updated successfully. Redirecting...'
  }

  await useMovements().fetchItems()

  navigateTo('/movements')
}
</script>

<template>
  <div>
    <h1 class="mb-4">
      Update movement
    </h1>

    <div v-if="isLoading" class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>

    <form v-else @submit.prevent="updateItem">
      <div class="mb-3">
        <FormInput
          v-model="payload.description"
          type="text"
          label="Description"
          :required="true"
        />
      </div>

      <div class="d-flex gap-3 mb-3">
        <div class="flex-fill">
          <FormSelect
            v-model="payload.wallet_id_from"
            placeholder="Select wallet"
            label="Wallet from"
            icon="fa6-solid:wallet"
            :required="true"
            :options="wallets"
          />
        </div>

        <div class="flex-fill">
          <FormInput
            v-model="payload.value"
            type="number"
            label="Value"
            :required="true"
          />
        </div>

        <div class="flex-fill">
          <FormSelect
            v-model="payload.wallet_id_to"
            placeholder="Select wallet"
            label="Wallet to"
            icon="fa6-solid:wallet"
            :required="true"
            :options="wallets"
          />
        </div>
      </div>

      <div class="d-flex gap-3 mb-3">
        <div class="flex-fill">
          <FormSelect
            v-model="payload.bucket_id_from"
            placeholder="Select bucket"
            label="Bucket from"
            icon="fa6-solid:wallet"
            :required="true"
            :options="buckets"
          />
        </div>

        <div class="flex-fill">
          <FormSelect
            v-model="payload.bucket_id_to"
            placeholder="Select bucket"
            label="Bucket to"
            icon="fa6-solid:wallet"
            :required="true"
            :options="buckets"
          />
        </div>
      </div>

      <FormInput
        v-model="payload.date"
        type="date"
        label="Date"
        :required="true"
        class="mb-3"
      />

      <div v-if="alert.type" :class="`alert alert-${alert.type}`">
        {{ alert.message }}
      </div>

      <div class="d-flex justify-content-end">
        <AppButton type="submit" label="Update movement" :loading="isUpdating" />
      </div>
    </form>
  </div>
</template>
