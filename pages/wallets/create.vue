<script setup lang="ts">
import type { Database } from '~/types/supabase'

useHead({ title: 'Create wallet - Troney' })

const sbClient = useSupabaseClient<Database>()

const payload = ref({
  name: '',
  initialBalance: 0
})

const isLoading = ref(false)

const alert = ref({
  type: '',
  message: ''
})

async function createWallet () {
  isLoading.value = true

  const { data, error } = await sbClient.from('wallets')
    .insert([{
      name: payload.value.name,
      initial_balance: payload.value.initialBalance
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
    message: 'Wallet created successfully. Redirecting...'
  }

  await useWallets().fetchItems()

  navigateTo('/wallets')

  return data
}
</script>

<template>
  <div>
    <h1 class="mb-4">
      Create wallet
    </h1>

    <form @submit.prevent="createWallet">
      <div class="mb-3">
        <FormInput
          v-model="payload.name"
          type="text"
          label="Name"
          icon="fa6-solid:wallet"
          :required="true"
          :focus="true"
        />
      </div>

      <div class="mb-3">
        <FormInput
          v-model="payload.initialBalance"
          type="number"
          label="Initial balance"
          icon="fa6-regular:money-bill-1"
          :required="true"
        />
      </div>

      <div v-if="alert.type" :class="`alert alert-${alert.type}`">
        {{ alert.message }}
      </div>

      <div class="d-flex justify-content-end">
        <AppButton type="submit" label="Create wallet" :loading="isLoading" />
      </div>
    </form>
  </div>
</template>
