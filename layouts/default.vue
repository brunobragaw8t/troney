<script setup lang="ts">
import { User } from '@supabase/gotrue-js'

const sbClient = useSupabaseClient()
const user = useSupabaseUser() as { value: User }
const route = useRoute()

const welcome = ref<string>(`Hi, ${user.value.user_metadata.name}`)

const navItems = [
  {
    label: 'Home',
    icon: 'fas fa-home',
    to: '/'
  },
  {
    label: 'Wallets',
    icon: 'fas fa-wallet',
    to: '/wallets'
  },
  {
    label: 'Categories',
    icon: 'far fa-folder-open',
    to: '/categories'
  }
]

async function signOut () {
  await sbClient.auth.signOut()
  navigateTo('/auth')
}
</script>

<template>
  <div class="d-flex min-vh-100">
    <div class="py-5 bg-secondary-subtle" style="width: 200px">
      <h5 class="mb-3 px-3">
        {{ welcome }}
      </h5>

      <ul v-if="navItems.length" class="list-group list-group-flush">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="list-group-item list-group-item-action list-group-item-secondary d-flex justify-content-between align-items-center"
          :class="{ active: route.path === item.to }"
        >
          <span>{{ item.label }}</span>
          <i :class="item.icon" />
        </NuxtLink>

        <NuxtLink
          class="list-group-item list-group-item-action list-group-item-secondary d-flex justify-content-between align-items-center"
          to="#"
          @click="signOut"
        >
          <span><small>Sign out</small></span>

          <small>
            <i class="fas fa-sign-out" />
          </small>
        </NuxtLink>
      </ul>
    </div>

    <div class="flex-grow-1 py-5 px-5">
      <div class="container">
        <slot />
      </div>
    </div>
  </div>
</template>
