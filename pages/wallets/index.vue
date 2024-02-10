<script setup lang="ts">
import type { Database } from '~/types/supabase'

const sbClient = useSupabaseClient<Database>()

/**
 * States
 */

const wallets = useWallets().wallets

const alert = ref({
  type: '',
  message: ''
})

function closeDeletionModals () {
  wallets.value.forEach((w) => { w.displayDeleteModal = false })
}

/**
 * Actions
 */

async function deleteWallet (id: number) {
  alert.value.type = ''
  alert.value.message = ''

  const wallet = wallets.value.find(w => w.id === id)

  if (!wallet) {
    alert.value.type = 'danger'
    alert.value.message = 'An error occurred while tyring to delete your wallet.'
    closeDeletionModals()
    return
  }

  wallet.deleting = true

  const { error } = await sbClient
    .from('wallets')
    .delete()
    .eq('id', id)

  if (error) {
    alert.value.type = 'danger'
    alert.value.message = error.message
    wallet.displayDeleteModal = false
    wallet.deleting = false
    return
  }

  wallet.displayDeleteModal = false
  wallet.deleting = false
  alert.value.type = 'success'
  alert.value.message = `Wallet ${wallet.name} deleted successfully.`
}
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-end mb-4">
      <h1 class="mb-0">
        Wallets
      </h1>

      <AppButton
        v-keymap="'N'"
        label="Create"
        icon="fa6-solid:circle-plus"
        icon-position="right"
        to="/wallets/create"
      />
    </div>

    <div v-if="!wallets.length">
      No wallets
    </div>

    <template v-else>
      <div v-if="alert.message" :class="`alert alert-${alert.type}`">
        {{ alert.message }}
      </div>

      <table class="table table-striped table-hover">
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
                <AppButton
                  :to="`/wallets/${wallet.id}`"
                  icon="fa6-solid:pen-to-square"
                  size="sm"
                />

                <AppButton
                  icon="fa6-solid:trash"
                  size="sm"
                  variant="danger"
                  @click="wallet.displayDeleteModal = true"
                />

                <DeleteModal
                  v-if="wallet.displayDeleteModal"
                  title="Delete wallet"
                  description="Are you sure you want to delete this wallet? This action is irreversible"
                  :button-callback="deleteWallet"
                  :subject="wallet.id"
                  button-label="Delete"
                  button-variant="danger"
                  :button-loading="wallet.deleting"
                  @close="wallet.displayDeleteModal = false"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>
