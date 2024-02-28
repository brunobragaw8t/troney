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

const payload = ref({
  wallet_id: 0,
  description: '',
  value: 0,
  source: '',
  date: new Date().toISOString().slice(0, 10)
})

const isLoading = ref(false)

const alert = ref({
  type: '',
  message: ''
})

async function create () {
  isLoading.value = true

  const { data, error } = await sbClient.from('earnings')
    .insert([{
      wallet_id: payload.value.wallet_id,
      description: payload.value.description,
      value: payload.value.value,
      source: payload.value.source,
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
    message: 'Earning created successfully. Redirecting...'
  }

  await useEarnings().fetchItems()

  navigateTo('/earnings')

  return data
}
</script>

<template>
  <div>
    <h1 class="mb-4">
      Create earning
    </h1>

    <form @submit.prevent="create">
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

      <div class="mb-3">
        <FormInput
          v-model="payload.date"
          type="date"
          label="Date"
          :required="true"
        />
      </div>

      <div v-if="alert.type" :class="`alert alert-${alert.type}`">
        {{ alert.message }}
      </div>

      <div class="d-flex justify-content-end">
        <AppButton type="submit" label="Register earning" :loading="isLoading" />
      </div>
    </form>
  </div>
</template>
