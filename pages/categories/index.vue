<script setup lang="ts">
import type { Database } from '~/types/supabase'

const sbClient = useSupabaseClient<Database>()

/**
 * States
 */

const items = useCategories().items

const alert = ref({
  type: '',
  message: ''
})

function closeDeletionModals () {
  items.value.forEach((w) => { w.displayDeleteModal = false })
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
    alert.value.message = 'An error occurred while tyring to delete your category.'
    closeDeletionModals()
    return
  }

  item.deleting = true

  const { error } = await sbClient
    .from('categories')
    .delete()
    .eq('id', id)

  if (error) {
    alert.value.type = 'danger'
    alert.value.message = error.message
    item.displayDeleteModal = false
    item.deleting = false
    return
  }

  item.displayDeleteModal = false
  item.deleting = false
  alert.value.type = 'success'
  alert.value.message = `Category ${item.name} deleted successfully.`
}
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-end mb-4">
      <h1 class="mb-0">
        Categories
      </h1>

      <AppButton
        v-keymap="'N'"
        label="Create"
        icon="fa6-solid:circle-plus"
        icon-position="right"
        to="/categories/create"
      />
    </div>

    <div v-if="!items.length">
      No categories
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
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.name }}</td>

            <td>
              <div class="d-flex justify-content-end gap-2">
                <AppButton
                  :to="`/categories/${item.id}`"
                  icon="fa6-solid:pen-to-square"
                  size="sm"
                />

                <AppButton
                  icon="fa6-solid:trash"
                  size="sm"
                  variant="danger"
                  @click="item.displayDeleteModal = true"
                />

                <DeleteModal
                  v-if="item.displayDeleteModal"
                  title="Delete category"
                  description="Are you sure you want to delete this category? This action is irreversible"
                  :button-callback="deleteItem"
                  :subject="item.id"
                  button-label="Delete"
                  button-variant="danger"
                  :button-loading="item.deleting"
                  @close="item.displayDeleteModal = false"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>
