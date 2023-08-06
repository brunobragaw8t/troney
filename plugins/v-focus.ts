export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('focus', {
    mounted (el, binding) {
      if (binding.value === false) { return }
      el.focus()
    }
  })
})
