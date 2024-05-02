<script setup lang="ts">
withDefaults(defineProps<{
  type: 'text' | 'password' | 'email' | 'number' | 'color' | 'date'
  placeholder?: string
  label?: string
  icon?: string
  required?: boolean
  focus?: boolean
}>(), {
  placeholder: '',
  label: '',
  icon: '',
  required: false,
  focus: false
})

const id = useId()
const value = defineModel()
</script>

<template>
  <div class="input-group">
    <span v-if="icon" class="input-group-text">
      <Icon :name="icon" />
    </span>

    <div v-if="label" class="form-floating">
      <input
        :id="id"
        v-model="value"
        v-focus="focus"
        :type="type"
        :placeholder="placeholder"
        :required="required"
        class="form-control"
        :step="'number' === type ? '0.01' : undefined"
      >

      <label :for="id">{{ label }}</label>
    </div>

    <input
      v-else
      v-model="value"
      v-focus="focus"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      class="form-control"
      :step="'number' === type ? '0.01' : undefined"
    >
  </div>
</template>
