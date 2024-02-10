<script setup lang="ts">
import type { ButtonIconPosition, ButtonVariant } from '~/types/button'

const props = withDefaults(defineProps<{
  tag: string
  label?: string
  icon?: string
  iconPosition?: ButtonIconPosition
  size?: 'sm' | 'md' | 'lg'
  variant?: ButtonVariant
  loading?: boolean
}>(), {
  label: '',
  icon: '',
  iconPosition: 'left',
  size: 'md',
  variant: 'primary'
})

const height = computed(() => {
  switch (props.size) {
    case 'sm':
      return '1.25rem'
    case 'lg':
      return '1.875rem'
    default:
      return '1.5rem'
  }
})
</script>

<template>
  <component
    :is="tag"
    :class="`btn btn-${variant} btn-${size} d-inline-flex align-items-center`"
    :disabled="loading"
  >
    <div v-if="loading" class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>

    <div
      v-if="icon && 'left' === iconPosition"
      :style="`height: ${height};`"
      class="d-flex align-items-center"
      :class="label ? 'me-2' : ''"
    >
      <Icon :name="icon" />
    </div>

    <span>{{ label }}</span>

    <div
      v-if="icon && 'right' === iconPosition"
      :style="`height: ${height};`"
      class="d-flex align-items-center"
      :class="label ? 'ms-2' : ''"
    >
      <Icon :name="icon" />
    </div>
  </component>
</template>

<style scoped>
.spinner-border {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
}
</style>
