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

const buckets = [
  {
    value: 0,
    label: 'Select bucket'
  },
  ...useBuckets().items.value.map(i => ({
    value: i.id,
    label: i.name
  }))
]

const categories = [
  {
    value: 0,
    label: 'Select category'
  },
  ...useCategories().items.value.map(i => ({
    value: i.id,
    label: i.name
  }))
]

const payload = ref({
  wallet_id: 0,
  bucket_id: 0,
  category_id: 0,
  description: '',
  quantity: 1,
  value: 0,
  notes: '',
  date: new Date().toISOString().slice(0, 10)
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
    .from('expenses')
    .select()
    .eq('id', route.params.id)

  if (
    error ||
    !data[0] ||
    data[0].wallet_id === null ||
    data[0].bucket_id === null ||
    data[0].category_id === null ||
    data[0].quantity === null ||
    data[0].description === null ||
    data[0].value === null ||
    data[0].notes === null ||
    data[0].date === null
  ) {
    navigateTo('/expenses')
    return
  }

  payload.value.wallet_id = data[0].wallet_id
  payload.value.bucket_id = data[0].bucket_id
  payload.value.category_id = data[0].category_id
  payload.value.quantity = data[0].quantity
  payload.value.description = data[0].description
  payload.value.value = data[0].value
  payload.value.notes = data[0].notes
  payload.value.date = data[0].date

  isLoading.value = false
}

async function updateItem () {
  isUpdating.value = true

  const { data, error } = await sbClient.from('expenses')
    .update({
      wallet_id: payload.value.wallet_id,
      bucket_id: payload.value.bucket_id,
      category_id: payload.value.category_id,
      description: payload.value.description,
      quantity: payload.value.quantity,
      value: payload.value.value,
      notes: payload.value.notes,
      date: payload.value.date
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
    message: 'Expense updated successfully. Redirecting...'
  }

  await useExpenses().fetchItems()

  navigateTo('/expenses')

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
      Update expense
    </h1>

    <div v-if="isLoading" class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>

    <form v-else @submit.prevent="updateItem">
      <div class="d-flex gap-3 mb-3">
        <div class="flex-fill">
          <FormSelect
            v-model="payload.wallet_id"
            placeholder="Select wallet"
            label="Wallet"
            icon="fa6-solid:wallet"
            :required="true"
            :options="wallets"
          />
        </div>

        <div class="flex-fill">
          <FormSelect
            v-model="payload.bucket_id"
            placeholder="Select bucket"
            label="Bucket"
            icon="fa6-solid:wallet"
            :required="true"
            :options="buckets"
          />
        </div>

        <div class="flex-fill">
          <FormSelect
            v-model="payload.category_id"
            placeholder="Select category"
            label="Category"
            icon="fa6-solid:wallet"
            :required="true"
            :options="categories"
          />
        </div>
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
            v-model="payload.quantity"
            type="text"
            label="Quantity"
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
      </div>

      <FormInput
        v-model="payload.notes"
        type="text"
        label="Notes"
        class="mb-3"
      />

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
        <AppButton type="submit" label="Update expense" :loading="isUpdating" />
      </div>
    </form>
  </div>
</template>
