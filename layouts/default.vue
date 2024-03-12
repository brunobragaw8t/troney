<script setup lang="ts">
import type { User } from '@supabase/gotrue-js'

const sbClient = useSupabaseClient()
const user = useSupabaseUser() as { value: User }
const route = useRoute()

const welcome = ref<string>(`Hi, ${user.value.user_metadata.name}`)

const navItems = [
  {
    label: 'Home',
    icon: 'fa6-solid:house',
    to: '/',
    keymap: 'H'
  },
  {
    label: 'Earnings',
    icon: 'fa6-solid:circle-dollar-to-slot',
    to: '/earnings',
    keymap: 'R'
  },
  {
    label: 'Expenses',
    icon: 'fa6-solid:money-bill-transfer',
    to: '/expenses',
    keymap: 'X'
  },
  {
    label: 'Wallets',
    icon: 'fa6-solid:wallet',
    to: '/wallets',
    keymap: 'W'
  },
  {
    label: 'Buckets',
    icon: 'fa6-solid:bucket',
    to: '/buckets',
    keymap: 'B'
  },
  {
    label: 'Categories',
    icon: 'fa6-regular:folder-open',
    to: '/categories',
    keymap: 'C'
  }
]

async function signOut () {
  await sbClient.auth.signOut()
  navigateTo('/auth')
}
</script>

<template>
  <div class="d-flex min-vh-100">
    <div class="flex-shrink-0 py-5 bg-secondary-subtle" style="width: 200px">
      <h5 class="mb-3 px-3">
        {{ welcome }}
      </h5>

      <ul v-if="navItems.length" class="list-group list-group-flush">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :data-keymap="item.keymap"
          :to="item.to"
          class="list-group-item list-group-item-action list-group-item-secondary d-flex justify-content-between align-items-center"
          :class="{ active: route.path === item.to }"
        >
          <span>{{ item.label }}</span>
          <Icon :name="item.icon" />
        </NuxtLink>

        <NuxtLink
          class="list-group-item list-group-item-action list-group-item-secondary d-flex justify-content-between align-items-center"
          to="#"
          @click="signOut"
        >
          <span><small>Sign out</small></span>

          <small>
            <Icon name="fa6-solid:arrow-right-from-bracket" />
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
