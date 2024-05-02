import { defineNuxtConfig } from "nuxt/config"

export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        '@nuxt/eslint',
        '@nuxt/image',
        '@nuxtjs/tailwindcss',
        "@samk-dev/nuxt-vcalendar",
        "dayjs-nuxt",
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
            '/api/**': {
                proxy: 'https://manager-api-dev.kpop-radar.com/api/**',
                cors: true,
            }
        },
        awsAmplify: {
            catchAllStaticFallback: true,
            imageSettings: {
                domains: ['main.d14o70s4v4m7g0.amplifyapp.com'],
                dangerouslyAllowSVG: true
            }
        }
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    image: {
        domains: ['main.d14o70s4v4m7g0.amplifyapp.com']
    },
});