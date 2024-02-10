<script setup lang="ts">
import type { Database } from '~/types/supabase'

const sbClient = useSupabaseClient<Database>()

const payload = ref({
  name: '',
  percentage: 0
})

const isLoading = ref(false)

const alert = ref({
  type: '',
  message: ''
})

async function create () {
  isLoading.value = true

  const { data, error } = await sbClient.from('buckets')
    .insert([{
      name: payload.value.name,
      percentage: payload.value.percentage
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
    message: 'Bucket created successfully. Redirecting...'
  }

  setTimeout(() => navigateTo('/buckets'), 2000)

  return data
}
</script>

<template>
  <div>
    <h1 class="mb-4">
      Create bucket
    </h1>

    <form @submit.prevent="create">
      <div class="mb-3">
        <FormInput
          v-model="payload.name"
          type="text"
          label="Name"
          icon="fa6-solid:bucket"
          :required="true"
          :focus="true"
        />
      </div>

      <div class="mb-3">
        <FormInput
          v-model="payload.percentage"
          type="number"
          label="Budget percentage"
          icon="fa6-solid:percent"
          :required="true"
        />
      </div>

      <div v-if="alert.type" :class="`alert alert-${alert.type}`">
        {{ alert.message }}
      </div>

      <div class="d-flex justify-content-end">
        <AppButton type="submit" label="Create bucket" :loading="isLoading" />
      </div>
    </form>
  </div>
</template>
