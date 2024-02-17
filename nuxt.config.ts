// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: false
  },
  modules: ['@nuxtjs/supabase', 'nuxt-icon', 'nuxt-vitest'],
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
