// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", '@pinia/nuxt', "@nuxtjs/supabase"],

  ui:{
    icons: ['heroicons', 'ph']
  },
  supabase:{
    redirectOptions:{
      login: '/login',
      callback: '/login/confirm',
      exclude: ['/signup', '/signup/*']

    }
  }
})