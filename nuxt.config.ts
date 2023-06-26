export default defineNuxtConfig({
    modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@nuxt/image','nuxt-icon', '@nuxtjs/google-fonts'],
    devtools: { enabled: true },
    googleFonts: {
        families: {
            Roboto: {
                wght: [100, 300, 400, 500, 700, 900],
                ital: [400, 500]
            }
        }
    },
})
