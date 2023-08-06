<script setup lang="ts">
withDefaults(defineProps<{
  tag: string
  label: string
  icon?: string
  iconPosition?: 'left' | 'right'
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
  loading?: boolean
}>(), {
  icon: '',
  iconPosition: 'left',
  size: 'md',
  variant: 'primary'
})
</script>

<template>
  <component
    :is="tag"
    :class="`btn btn-${variant} btn-${size}`"
    :disabled="loading"
  >
    <div v-if="loading" class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>

    <i v-if="icon && 'left' === iconPosition" :class="`${icon} me-1`" />

    {{ label }}

    <i v-if="icon && 'right' === iconPosition" :class="`${icon} ms-1`" />
  </component>
</template>

<style scoped>
.spinner-border {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
}
</style>
