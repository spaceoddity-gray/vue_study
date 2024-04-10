import { defineNuxtConfig } from "nuxt/config"

export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        '@nuxtjs/tailwindcss'
    ],
    css: ['~/assets/css/global.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
});