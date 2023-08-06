<script setup lang="ts">
const sbClient = useSupabaseClient()

const signOutLoading = ref(false)

async function signOut () {
  signOutLoading.value = true
  await sbClient.auth.signOut()
  navigateTo('/auth')
}
</script>

<template>
  <div class="py-5">
    <div class="container">
      <slot />

      <div class="mt-5 text-center">
        <AppButton
          tag="button"
          label="Sign out"
          icon="fas fa-sign-out"
          icon-position="right"
          size="sm"
          variant="secondary"
          :loading="signOutLoading"
          @click="signOut"
        />
      </div>
    </div>
  </div>
</template>
