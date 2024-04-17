import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './app.vue',
        './error.vue'
    ],
    safelist: [
        'animate-fade-in',
        'animate-fade-out'
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Pretendard', 'ui-sans-serif', 'system-ui'],
            },
            backgroundImage: {
                'auth-bg': "url('/public/images/bg/login_bg.png')"
            },
            keyframes: {
                'button-ripple': {
                    '0%': { filter:'blur(0px)', width: '0px', opacity: '0.25' },
                    '100%': { filter:'blur(3px)', width: '300%', opacity: '0' },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'fade-out': {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0' },
                },
            },
            animation: {
                'button-ripple': 'button-ripple 0.5s linear forwards',
                'fade-in': 'fade-in 0.15s linear forwards',
                'fade-out': 'fade-out 0.15s linear forwards',
            }
        },
    },
    plugins: [],
};
export default config;