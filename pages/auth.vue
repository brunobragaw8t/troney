<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

useHead({ title: 'Troney' })

const form = ref('signIn')

const user = useSupabaseUser()

watchEffect(() => {
  if (user.value) {
    navigateTo('/')
  }
})
</script>

<template>
  <div>
    <h1 class="text-center mb-4">
      Troney
    </h1>

    <ul class="nav nav-tabs nav-fill">
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{active: 'signIn' === form}"
          href="#"
          @click.prevent="form = 'signIn'"
        >
          Sign in
        </a>
      </li>

      <li class="nav-item">
        <a
          class="nav-link"
          :class="{active: 'signUp' === form}"
          href="#"
          @click.prevent="form = 'signUp'"
        >
          Sign up
        </a>
      </li>
    </ul>

    <div class="border border-top-0 rounded-bottom p-3">
      <FormSignIn v-if="'signIn' === form" />
      <FormSignUp v-if="'signUp' === form" />
    </div>
  </div>
</template>
