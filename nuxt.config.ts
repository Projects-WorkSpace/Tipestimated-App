// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxt/ui', '@pinia/nuxt', 'nuxt-icon', '@nuxtjs/apollo', '@nuxt/image', '@nuxtjs/google-fonts'],
  css: [
    '~/assets/css/tailwind.css', '~/assets/css/global.css'
  ],
  colorMode: {
    classSuffix: '',
    preference: 'light'
  },
  apollo: {
    autoImports: true,
    authType: "Bearer",
    authHeader: "Authorization",
    tokenStorage: "cookie",
    proxyCookies: true,
    clients: {
      default: './apollo/default.ts',
    },
  },
  runtimeConfig: {
    public: {
      apiEndpoint: '', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
      rapidApiKey: process.env.NUXT_PUBLIC_RAPIDAPIKEY,
      rapidApiHost: process.env.NUXT_PUBLIC_RAPIDAPIHOST
    }
  },
  router: {
    options: {
      linkActiveClass: "link-active",
      linkExactActiveClass: "link-exact-active"
    }
  },
  googleFonts: {
    families: {
      Roboto: {
        wght: [100, 300, 400, 500, 600, 700, 900],
        ital: [400, 500],
      },
    },
  },
})
