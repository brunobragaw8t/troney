<script setup lang="ts">
import type { Database } from '~/types/supabase'

const sbClient = useSupabaseClient<Database>()

const payload = ref({
  name: ''
})

const isLoading = ref(false)

const alert = ref({
  type: '',
  message: ''
})

async function create () {
  isLoading.value = true

  const { data, error } = await sbClient.from('categories')
    .insert([{
      name: payload.value.name
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
    message: 'Category created successfully. Redirecting...'
  }

  setTimeout(() => navigateTo('/categories'), 2000)

  return data
}
</script>

<template>
  <div>
    <h1 class="mb-4">
      Create category
    </h1>

    <form @submit.prevent="create">
      <div class="mb-3">
        <FormInput
          v-model="payload.name"
          type="text"
          label="Name"
          icon="fa6-regular:folder-open"
          :required="true"
          :focus="true"
        />
      </div>

      <div v-if="alert.type" :class="`alert alert-${alert.type}`">
        {{ alert.message }}
      </div>

      <div class="d-flex justify-content-end">
        <AppButton type="submit" label="Create category" :loading="isLoading" />
      </div>
    </form>
  </div>
</template>
