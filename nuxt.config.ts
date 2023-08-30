export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt', '@nuxt/image', 'nuxt-icon', '@nuxtjs/google-fonts',
        '@nuxthq/ui', '@nuxtjs/apollo'
    ],
    devtools: {
        enabled: true
    },
    googleFonts: {
        families: {
            Roboto: {
                wght: [100, 300, 400, 500, 600, 700, 900],
                ital: [400, 500],
            },
        },
    },
    css: [
        '~/assets/css/tailwind.css', '~/assets/css/global.css'
    ],
    colorMode: {
        preference: 'light',
    },
    apollo: {
        autoImports: true,
        authType: "Bearer",
        authHeader: "Authorization",
        tokenStorage: "cookie",
        proxyCookies: true,
        clients: {
            default: {
                httpEndpoint: process.env.GRAPHQL_ENDPOINT || "http://127.0.0.1:8000/graphql"
            }
        },
    },
    build: {
        transpile: ['tslib'],
    },
})
