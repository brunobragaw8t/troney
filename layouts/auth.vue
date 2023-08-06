<template>
  <div
    class="d-flex justify-content-center align-items-center position-fixed top-0 start-0 py-5 w-100 h-100 overflow-y-auto"
  >
    <div class="container">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 540px;
}
</style>
