<template>
  <div>
    <div class="d-flex justify-content-between align-items-end mb-4">
      <h1 class="mb-0">
        Categories
      </h1>

      <AppButton
        v-keymap="'N'"
        tag="a"
        label="Create"
        icon="fas fa-circle-plus"
        icon-position="right"
        href="/categories/create"
      />
    </div>
  </div>
</template>
