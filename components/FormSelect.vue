<script setup lang="ts">
import type { SelectOption } from '~/types/select-option'

withDefaults(defineProps<{
  placeholder?: string
  label?: string
  icon?: string
  required?: boolean
  options: SelectOption[]
}>(), {
  placeholder: '',
  label: '',
  icon: '',
  required: false
})

const value = defineModel({ default: '' })
</script>

<template>
  <div class="input-group">
    <span v-if="icon" class="input-group-text">
      <Icon :name="icon" />
    </span>

    <div v-if="label" class="form-floating">
      <select
        :id="$.uid.toString()"
        v-model="value"
        :required="required"
        class="form-select"
      >
        <option v-if="placeholder" value="">
          {{ placeholder }}
        </option>

        <option
          v-for="(o, i) in options"
          :key="i"
          :value="o.value"
        >
          {{ o.label }}
        </option>
      </select>

      <label :for="$.uid.toString()">{{ label }}</label>
    </div>

    <select
      v-else
      :id="$.uid.toString()"
      v-model="value"
      :required="required"
      class="form-select"
    >
      <option v-if="placeholder" value="">
        {{ placeholder }}
      </option>

      <option
        v-for="(o, i) in options"
        :key="i"
        :value="o.value"
      >
        {{ o.label }}
      </option>
    </select>
  </div>
</template>
