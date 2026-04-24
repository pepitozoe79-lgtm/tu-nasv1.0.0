export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
  ],
  build: {
    transpile: ['vuetify'],
  },
  css: ['vuetify/styles'],
})
