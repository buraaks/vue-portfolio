// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@pinia/nuxt', '@nuxt/icon'],
  devtools: { enabled: true },
  app: {
    baseURL: '/vue-portfolio/', // GitHub Pages repo name
    buildAssetsDir: 'assets' // Nuxt standard
  },
  ssr: true,
  nitro: {
    preset: 'github-pages'
  },
  compatibilityDate: '2026-01-14',
  css: ['~/assets/main.css'],
})
