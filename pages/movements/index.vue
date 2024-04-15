<script setup lang="ts">
import { currencyFormat } from '~/helpers/currency-format'

useHead({ title: 'Movements - Troney' })

const movements = useMovements()
const wallets = useWallets().items.value.reduce<Record<number, string>>((acc, w) => {
  acc[w.id] = w.name
  return acc
}, {})

const items = computed({
  get: () => {
    return movements.items.value.map((i) => {
      return {
        ...i,
        wallet_from: i.wallet_id_from === null ? 'None' : wallets[i.wallet_id_from],
        wallet_to: i.wallet_id_to === null ? 'None' : wallets[i.wallet_id_to]
      }
    })
  },
  set: (value) => {
    movements.items.value = value
  }
})

const alert = ref({
  type: '',
  message: ''
})

function openDeletionModal (id: number): void {
  items.value = [...items.value.map((i) => {
    return {
      ...i,
      displayDeleteModal: i.id === id
    }
  })]
}

function closeDeletionModals () {
  items.value = [...items.value.map((i) => {
    return {
      ...i,
      displayDeleteModal: false
    }
  })]
}

function toggleDeletionLoading (id: number, value: boolean): void {
  items.value = [...items.value.map((i) => {
    return {
      ...i,
      deleting: i.id === id ? value : i.deleting
    }
  })]
}

/**
 * Actions
 */

async function deleteItem (id: number) {
  alert.value.type = ''
  alert.value.message = ''

  const item = items.value.find(w => w.id === id)

  if (!item) {
    alert.value.type = 'danger'
    alert.value.message = 'An error occurred while tyring to delete your movement.'
    closeDeletionModals()
    return
  }

  toggleDeletionLoading(item.id, true)

  try {
    await $fetch(`/api/movements/${id}`, {
      method: 'DELETE'
    })
  } catch {
    alert.value.type = 'danger'
    alert.value.message = 'An error occurred while tyring to delete your movement.'
    closeDeletionModals()
    return
  }

  await movements.fetchItems()

  closeDeletionModals()
  toggleDeletionLoading(item.id, false)
  alert.value.type = 'success'
  alert.value.message = `Movement ${item.description} deleted successfully.`
}
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-end mb-4">
      <h1 class="mb-0">
        Movements
      </h1>

      <AppButton
        data-keymap="N"
        label="Create"
        icon="fa6-solid:circle-plus"
        icon-position="right"
        to="/movements/create"
      />
    </div>

    <div v-if="!items.length">
      No movements
    </div>

    <template v-else>
      <div v-if="alert.message" :class="`alert alert-${alert.type}`">
        {{ alert.message }}
      </div>

      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Name</th>

            <th>From wallet</th>

            <th>Value</th>

            <th>To wallet</th>

            <th class="text-end">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.description }}</td>

            <td>{{ item.wallet_from }}</td>

            <td>{{ currencyFormat(item.value) }}</td>

            <td>{{ item.wallet_to }}</td>

            <td>
              <div class="d-flex justify-content-end gap-2">
                <AppButton
                  :to="`/movements/${item.id}`"
                  icon="fa6-solid:pen-to-square"
                  size="sm"
                />

                <AppButton
                  icon="fa6-solid:trash"
                  size="sm"
                  variant="danger"
                  @click="openDeletionModal(item.id)"
                />

                <DeleteModal
                  v-if="item.displayDeleteModal"
                  title="Delete movement"
                  description="Are you sure you want to delete this movement? This action is irreversible"
                  :button-callback="deleteItem"
                  :subject="item.id"
                  button-label="Delete"
                  button-variant="danger"
                  :button-loading="item.deleting"
                  @close="closeDeletionModals"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>
