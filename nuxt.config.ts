import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "@samk-dev/nuxt-vcalendar",
    "dayjs-nuxt",
  ],
  css: ["~/assets/css/global.css"],
  nitro: {
    devProxy: {
      "/api": {
        target: process.env.NUXT_API_URL,
        changeOrigin: true,
      },
    },
    routeRules: {
      "/api/**": {
        proxy: process.env.NUXT_API_URL + "/**",
        cors: true,
      },
    },
    awsAmplify: {
      catchAllStaticFallback: true,
      imageSettings: {
        domains: ["main.d14o70s4v4m7g0.amplifyapp.com"],
        dangerouslyAllowSVG: true,
      },
    },
    firebase: {
      gen: 2,
      nodeVersion: "18",
    },
    preset: "firebase",
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  image: {
    domains: ["main.d14o70s4v4m7g0.amplifyapp.com"],
  },
});
