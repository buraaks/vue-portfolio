// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@pinia/nuxt', '@nuxt/icon'],
  devtools: { enabled: true },
  compatibilityDate: '2026-01-14',
  css: ['~/assets/main.css'],
})
