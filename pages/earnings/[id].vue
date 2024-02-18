<script setup lang="ts">
import { type Database } from '~/types/supabase'

const sbClient = useSupabaseClient<Database>()
const route = useRoute()

/**
 * State
 */

const wallets = [
  {
    value: 0,
    label: 'Select wallet'
  },
  ...useWallets().items.value.map(w => ({
    value: w.id,
    label: w.name
  }))
]

const payload = ref({
  wallet_id: 0,
  description: '',
  value: 0,
  source: ''
})

const isLoading = ref(true)
const isUpdating = ref(false)

const alert = ref({
  type: '',
  message: ''
})

/**
 * Actions
 */

async function fetchItem () {
  const { data, error } = await sbClient
    .from('earnings')
    .select()
    .eq('id', route.params.id)

  if (
    error ||
    !data[0] ||
    data[0].wallet_id === null ||
    data[0].description === null ||
    data[0].value === null ||
    data[0].source === null
  ) {
    navigateTo('/earnings')
    return
  }

  payload.value.wallet_id = data[0].wallet_id
  payload.value.description = data[0].description
  payload.value.value = data[0].value
  payload.value.source = data[0].source

  isLoading.value = false
}

async function updateItem () {
  isUpdating.value = true

  const { data, error } = await sbClient.from('earnings')
    .update({
      wallet_id: payload.value.wallet_id,
      description: payload.value.description,
      value: payload.value.value,
      source: payload.value.source
    })
    .eq('id', route.params.id)
    .select()

  if (error) {
    isUpdating.value = false

    alert.value = {
      type: 'danger',
      message: error.message
    }

    return error
  }

  alert.value = {
    type: 'success',
    message: 'Earning updated successfully. Redirecting...'
  }

  await useEarnings().fetchItems()

  navigateTo('/earnings')

  return data
}

/**
 * Lifecycle
 */

onMounted(() => {
  fetchItem()
})
</script>

<template>
  <div>
    <h1 class="mb-4">
      Update earning
    </h1>

    <div v-if="isLoading" class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>

    <form v-else @submit.prevent="updateItem">
      <div class="mb-3">
        <FormSelect
          v-model="payload.wallet_id"
          placeholder="Select wallet"
          label="Wallet"
          icon="fa6-solid:wallet"
          :required="true"
          :options="wallets"
        />
      </div>

      <div class="d-flex gap-3 mb-3">
        <div class="flex-fill">
          <FormInput
            v-model="payload.description"
            type="text"
            label="Description"
            :required="true"
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
          <FormInput
            v-model="payload.source"
            type="text"
            label="Source"
            :required="true"
          />
        </div>
      </div>

      <div v-if="alert.type" :class="`alert alert-${alert.type}`">
        {{ alert.message }}
      </div>

      <div class="d-flex justify-content-end">
        <AppButton type="submit" label="Update earning" :loading="isUpdating" />
      </div>
    </form>
  </div>
</template>
