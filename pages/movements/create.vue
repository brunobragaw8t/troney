<script setup lang="ts">
import { type TablesInsert } from '~/types/supabase'

useHead({ title: 'Create movement - Troney' })

const wallets = [
  {
    value: null,
    label: 'Select wallet'
  },
  ...useWallets().items.value.map(w => ({
    value: w.id,
    label: w.name
  }))
]

const payload = ref<TablesInsert<'movements'>>({
  description: '',
  wallet_id_from: null,
  value: 0,
  wallet_id_to: null,
  date: new Date().toISOString().slice(0, 10)
})

const isLoading = ref(false)

const alert = ref({
  type: '',
  message: ''
})

async function create () {
  isLoading.value = true

  const { error } = await useFetch('/api/movements', {
    method: 'POST',
    body: {
      description: payload.value.description,
      wallet_id_from: payload.value.wallet_id_from,
      value: payload.value.value,
      wallet_id_to: payload.value.wallet_id_to,
      date: payload.value.date
    }
  })

  if (error.value) {
    isLoading.value = false

    alert.value = {
      type: 'danger',
      message: error.value.message
    }

    return
  }

  alert.value = {
    type: 'success',
    message: 'Movement created successfully. Redirecting...'
  }

  await useMovements().fetchItems()

  navigateTo('/movements')
}
</script>

<template>
  <div>
    <h1 class="mb-4">
      Create movement
    </h1>

    <form @submit.prevent="create">
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
        <AppButton type="submit" label="Register movement" :loading="isLoading" />
      </div>
    </form>
  </div>
</template>
