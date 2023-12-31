// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/supabase'],
  supabase: {
    redirectOptions: {
      login: '/auth',
      callback: '/confirm'
    }
  },
  vite: {
    vue: {
      script: {
        defineModel: true
      }
    }
  }
})
