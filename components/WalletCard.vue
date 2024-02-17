<script setup lang="ts">
import { currencyFormat } from '~/helpers/currency-format'

defineProps<{
  name: string
  balance: number
}>()
</script>

<template>
  <div class="border p-3 text-center">
    <Icon name="fa6-solid:wallet" size="3rem" class="mb-2" />

    <h6 class="mb-1">
      {{ name }}
    </h6>

    <h4 class="mb-0">
      {{ currencyFormat(balance) }}
    </h4>
  </div>
</template>
