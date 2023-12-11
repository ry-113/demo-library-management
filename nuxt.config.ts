// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: [
    "@nuxtjs/tailwindcss",
    "vue3-carousel-nuxt",
    "dayjs-nuxt",
    "nuxt-icon",
  ],
  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.NUXT_FIREBASE_APIKEY,
      firebaseAuthDomain: process.env.NUXT_FIREBASE_AUTHDOMAIN,
      firebaseProjectId: process.env.NUXT_FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.NUXT_FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.NUXT_FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.NUXT_FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.NUXT_FIREBASE_MEASUREMENTID,
      algolia: {
        apiKey: process.env.NUXT_ALGOLIA_ADMIN_APIKEY,
        applicationId: process.env.NUXT_ALGOLIA_APP_ID,
      },
    },
  },
  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },
});
