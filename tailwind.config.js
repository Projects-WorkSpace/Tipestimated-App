/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
    ],
    theme: {
        extend: {
            colors: {
                'c-light': '#F8F8F8',
                'c-mode': '#f3f3f3',
                'c-dark': '#191919',
                'alt-dark': '#212121',
                't-dark': '#585858',
                't-gray': '#737373',
                'c-seperator': '#DBDBDB',
                primary: '#0095F6',
                'base-pink': '#FF66BF',
                'base-green': '#68DBA1',
                'light-hover': '#e2e2e2',
            },
            transitionProperty: {
                length: 'height, width',
                spacing: 'margin, padding',
            },
        },
    },
    plugins: [],
}
