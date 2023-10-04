<script setup lang="ts">
import { ButtonIconPosition, ButtonVariant } from 'types/button'

withDefaults(defineProps<{
  title?: string
  description?: string
  buttonCallback:() => void
  buttonLabel: string
  buttonIcon?: string
  buttonIconPosition?: ButtonIconPosition
  buttonVariant?: ButtonVariant
  buttonLoading?: boolean
}>(), {
  title: '',
  description: '',
  buttonIcon: '',
  buttonIconPosition: 'left',
  buttonVariant: 'primary'
})

const emit = defineEmits<{
  close: [id: string]
}>()
</script>

<template>
  <div
    class="modal d-block bg-dark"
    style="--bs-bg-opacity: .5;"
    tabindex="-1"
    @click.self="() => emit('close', '')"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div v-if="title" class="modal-header">
          <h5 class="modal-title">
            {{ title }}
          </h5>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="() => emit('close', '')"
          />
        </div>

        <div v-if="description" class="modal-body">
          <p>{{ description }}</p>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="() => emit('close', '')"
          >
            Close
          </button>

          <AppButton
            tag="button"
            :label="buttonLabel"
            :icon="buttonIcon"
            :icon-position="buttonIconPosition"
            :variant="buttonVariant"
            @click="buttonCallback"
          />
        </div>
      </div>
    </div>
  </div>
</template>
