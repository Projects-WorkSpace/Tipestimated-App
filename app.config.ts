export default defineAppConfig({
    ui: {
        notifications: {
            // Show toasts at the top right of the screen
            position: 'top-0 left-1/2 -translate-x-1/2',
        },
    },
    nuxtIcon: {
        size: '1em',
        aliases: {
            github: 'carbon:logo-github',
            nuxt: 'logos:nuxt-icon',
            rocket: 'fluent-emoji:rocket',
        }
    }
})
