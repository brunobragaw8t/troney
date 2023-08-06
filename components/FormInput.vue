<script setup lang="ts">
withDefaults(defineProps<{
  type: 'text' | 'password' | 'email'
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

const value = defineModel()
</script>

<template>
  <div class="input-group">
    <span v-if="icon" class="input-group-text">
      <i :class="icon" />
    </span>

    <div v-if="label" class="form-floating">
      <input
        :id="$.uid.toString()"
        v-model="value"
        v-focus="focus"
        :type="type"
        :placeholder="placeholder"
        :required="required"
        class="form-control"
      >

      <label :for="$.uid.toString()">{{ label }}</label>
    </div>

    <input
      v-else
      v-model="value"
      v-focus="focus"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      class="form-control"
    >
  </div>
</template>
