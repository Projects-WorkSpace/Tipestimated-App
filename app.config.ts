export default defineAppConfig({
    ui: {
        primary: 'green',
        gray: 'white',
        notifications: {
            // Show toasts at the top right of the screen
            position: 'top-0 left-1/2 -translate-x-1/2',
        },
        selectMenu: {
            height: 'max-h-48',
            shadow: 'shadow-none',
            padding: 'px-1 py-2',
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
