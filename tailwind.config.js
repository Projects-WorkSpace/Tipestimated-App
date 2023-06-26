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
            },
            transitionProperty: {
                length: 'height, width',
                spacing: 'margin, padding',
            },
        },
    },
    plugins: [],
}
