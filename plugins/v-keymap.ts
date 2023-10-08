export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('keymap', {
    mounted (el, binding) {
      window.addEventListener('keypress', (e) => {
        if (!e.shiftKey || e.key !== binding.value) {
          return
        }

        el.click()
      })
    },
    unmounted () {
      // TODO
    }
  })
})
