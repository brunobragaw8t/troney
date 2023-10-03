<script setup lang="ts">
import { User } from '@supabase/gotrue-js'
import { Database } from 'types/supabase'

const sbClient = useSupabaseClient<Database>()
const user = useSupabaseUser() as { value: User }

const { data: wallets, error } = await sbClient
  .from('wallets')
  .select()
  .eq('user_id', user.value.id)
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-end mb-4">
      <h1 class="mb-0">
        Wallets
      </h1>

      <AppButton
        tag="a"
        label="Create"
        icon="fas fa-circle-plus"
        icon-position="right"
        href="/wallets/create"
      />
    </div>

    <div v-if="!wallets || error">
      No wallets
    </div>

    <table v-else class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Name</th>

          <th class="text-end">
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="wallet in wallets" :key="wallet.id">
          <td>{{ wallet.name }}</td>

          <td>
            <div class="d-flex justify-content-end gap-2">
              <AppButton tag="button" icon="fas fa-edit" size="sm" />

              <AppButton
                tag="button"
                icon="fas fa-trash"
                size="sm"
                variant="danger"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
