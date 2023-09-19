<script setup lang="ts">
import { Database } from 'types/supabase'

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

  const user = await sbClient.auth.getUser()

  if (user.error) {
    isLoading.value = false

    alert.value = {
      type: 'danger',
      message: user.error.message
    }

    return user.error
  }

  const { data, error } = await sbClient.from('wallets')
    .insert([{
      user_id: user.data.user.id,
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

  setTimeout(() => navigateTo('/wallets'), 2000)

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
          icon="fas fa-wallet"
          :required="true"
          :focus="true"
        />
      </div>

      <div class="mb-3">
        <FormInput
          v-model="payload.initialBalance"
          type="number"
          label="Initial balance"
          icon="far fa-money-bill"
          :required="true"
        />
      </div>

      <div v-if="alert.type" :class="`alert alert-${alert.type}`">
        {{ alert.message }}
      </div>

      <div class="d-flex justify-content-end">
        <AppButton tag="button" type="submit" label="Create wallet" :loading="isLoading" />
      </div>
    </form>
  </div>
</template>
