<script setup lang="ts">
import { currencyFormat } from '~/helpers/currency-format'

const props = defineProps<{
  name: string
  value: number
}>()

const color = computed(() => {
  if (props.value > 10) {
    return 'success'
  }

  if (props.value > 0) {
    return 'warning'
  }

  return 'danger'
})
</script>

<template>
  <div :class="`alert alert-${color} mb-0`">
    <div class="d-flex align-items-center gap-1 mb-1">
      <Icon name="fa6-solid:bucket" />

      <h6 class="mb-0">
        {{ name }}
      </h6>
    </div>

    <h4 class="mb-0">
      {{ currencyFormat(value) }}
    </h4>
  </div>
</template>
