export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('keymap', {
    mounted (el, binding) {
      window.addEventListener('keypress', (e) => {
        if (
          document.activeElement instanceof HTMLInputElement ||
          !e.shiftKey ||
          e.key !== binding.value
        ) {
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
