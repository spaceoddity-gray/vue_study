import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        '/plugin/**/*.{js,ts}',
        './app.vue',
        './error.vue'
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Pretendard', 'ui-sans-serif', 'system-ui'],
            },
            keyframes: {
                'button-ripple': {
                    '0%': { filter:'blur(0px)', width: '0px', opacity: '0.15' },
                    '100%': { filter:'blur(30px)', width: '300%', opacity: '0' },
                },
            },
            animation: {
                'button-ripple': 'button-ripple 0.4s linear forwards',
            }
        },
    },
    plugins: [],
};
export default config;