<script setup lang="ts">
import type { User } from '@supabase/gotrue-js'
import type { Database } from '~/types/supabase'

const sbClient = useSupabaseClient<Database>()
const user = useSupabaseUser() as { value: User }
const route = useRoute()

/**
 * State
 */

const payload = ref({
  name: '',
  initialBalance: 0
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

async function fetchWallet () {
  const { data, error } = await sbClient
    .from('wallets')
    .select()
    .eq('id', route.params.id)
    .eq('user_id', user.value.id)

  if (
    error ||
    !data[0] ||
    data[0].name === null ||
    data[0].initial_balance === null
  ) {
    navigateTo('/wallets')
    return
  }

  payload.value.name = data[0].name
  payload.value.initialBalance = data[0].initial_balance

  isLoading.value = false
}

async function updateWallet () {
  isUpdating.value = true

  const { data, error } = await sbClient.from('wallets')
    .update({
      name: payload.value.name,
      initial_balance: payload.value.initialBalance
    })
    .eq('id', route.params.id)
    .eq('user_id', user.value.id)
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
    message: 'Wallet updated successfully. Redirecting...'
  }

  setTimeout(() => navigateTo('/wallets'), 2000)

  return data
}

/**
 * Lifecycle
 */

onMounted(() => {
  fetchWallet()
})
</script>

<template>
  <div>
    <h1 class="mb-4">
      Update wallet
    </h1>

    <div v-if="isLoading" class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>

    <form v-else @submit.prevent="updateWallet">
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
        <AppButton type="submit" label="Update wallet" :loading="isUpdating" />
      </div>
    </form>
  </div>
</template>
