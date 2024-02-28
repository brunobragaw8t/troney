<script setup lang="ts">
import { type Database } from '~/types/supabase'

const sbClient = useSupabaseClient<Database>()

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

const isLoading = ref(false)

const alert = ref({
  type: '',
  message: ''
})

async function create () {
  isLoading.value = true

  const { data, error } = await sbClient.from('expenses')
    .insert([{
      wallet_id: payload.value.wallet_id,
      bucket_id: payload.value.bucket_id,
      category_id: payload.value.category_id,
      description: payload.value.description,
      quantity: payload.value.quantity,
      value: payload.value.value,
      notes: payload.value.notes,
      date: payload.value.date
    }])
    .select()

  if (error) {
    isLoading.value = false

    alert.value = {
      type: 'danger',
      message: error.message
    }

    return error
  }

  alert.value = {
    type: 'success',
    message: 'Expense created successfully. Redirecting...'
  }

  await useExpenses().fetchItems()

  navigateTo('/expenses')

  return data
}
</script>

<template>
  <div>
    <h1 class="mb-4">
      Create expense
    </h1>

    <form @submit.prevent="create">
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
        <AppButton type="submit" label="Register expense" :loading="isLoading" />
      </div>
    </form>
  </div>
</template>
