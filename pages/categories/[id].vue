<script setup lang="ts">
import type { Database } from '~/types/supabase'

const sbClient = useSupabaseClient<Database>()
const route = useRoute()

/**
 * State
 */

const payload = ref({
  name: ''
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
    .from('categories')
    .select()
    .eq('id', route.params.id)

  if (
    error ||
    !data[0] ||
    data[0].name === null
  ) {
    navigateTo('/categories')
    return
  }

  payload.value.name = data[0].name

  isLoading.value = false
}

async function updateItem () {
  isUpdating.value = true

  const { data, error } = await sbClient.from('categories')
    .update({
      name: payload.value.name
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
    message: 'Category updated successfully. Redirecting...'
  }

  setTimeout(() => navigateTo('/categories'), 2000)

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
      Update category
    </h1>

    <div v-if="isLoading" class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>

    <form v-else @submit.prevent="updateItem">
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
        <AppButton type="submit" label="Update category" :loading="isUpdating" />
      </div>
    </form>
  </div>
</template>
