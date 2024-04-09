import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        '/components/**/*.{js,vue,ts}',
        '/layouts/**/*.vue',
        '/pages/**/*.vue',
        '/plugin/**/*.{js,ts}',
        './app.vue',
        './error.vue'
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Pretendard', 'ui-sans-serif', 'system-ui'],
            },
        },
    },
    plugins: [],
};
export default config;