<script setup lang="ts">
const sbClient = useSupabaseClient()

const credentials = ref({
  email: '',
  password: ''
})

const isLoading = ref(false)

const alert = ref({
  type: '',
  message: ''
})

async function signIn () {
  isLoading.value = true

  const { data, error } = await sbClient.auth.signInWithPassword({
    email: credentials.value.email,
    password: credentials.value.password
  })

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
    message: 'Logged in successfully. Redirecting...'
  }

  return data
}
</script>

<template>
  <form @submit.prevent="signIn">
    <div class="mb-3">
      <FormInput
        v-model="credentials.email"
        type="email"
        placeholder="example@email.com"
        label="Email"
        icon="far fa-envelope"
        :required="true"
        :focus="true"
      />
    </div>

    <div class="mb-3">
      <FormInput
        v-model="credentials.password"
        type="password"
        placeholder="Your secret password"
        label="Password"
        icon="fas fa-key"
        :required="true"
      />
    </div>

    <div v-if="alert.type" :class="`alert alert-${alert.type}`">
      {{ alert.message }}
    </div>

    <div class="d-flex justify-content-end">
      <AppButton tag="button" type="submit" label="Sign in" :loading="isLoading" />
    </div>
  </form>
</template>
