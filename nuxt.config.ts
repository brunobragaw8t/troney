// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/supabase', 'nuxt-icon'],
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
