import { defineNuxtConfig } from "nuxt/config"

export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        '@nuxtjs/tailwindcss'
    ],
    css: ['~/assets/css/global.css'],
    nitro: {
        devProxy: {
            "/api": {
                target: "https://manager-api-dev.kpop-radar.com/api",
                changeOrigin: true,
            }
        },
        routeRules: {
            '/api': {
                proxy: 'https://manager-api-dev.kpop-radar.com/api',
                cors: true,
            }
        }
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
});